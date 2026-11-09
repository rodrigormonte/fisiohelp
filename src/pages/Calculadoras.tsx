import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import type { Calculadora, Campo } from '../types'
import { calculadoras, encontrarCalculadora, grupos } from '../data/calculadoras'
import { DISCLAIMER } from '../config'
import { navegar } from '../lib/router'
import { lerNumero, MAX_CARACTERES_NUMERO } from '../lib/validacao'
import {
  CalculatorIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  SearchIcon,
  StarIcon,
} from '../components/Icons'

type Props = {
  favoritos: string[]
  alternarFavorito: (chave: string) => void
}

const chaveFavorito = (id: string) => `calc:${id}`

export function CalculadorasPage({ favoritos, alternarFavorito }: Props) {
  const [busca, setBusca] = useState('')

  const filtradas = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    if (!termo) return calculadoras
    return calculadoras.filter((calc) =>
      `${calc.nome} ${calc.descricao} ${calc.grupo}`.toLowerCase().includes(termo),
    )
  }, [busca])

  return (
    <>
      <header className="page-head">
        <span className="eyebrow">
          <CalculatorIcon size={14} /> Calculadoras
        </span>
        <h1 className="page-title">Cálculo à beira do leito</h1>
        <p className="page-lead">
          Oito fórmulas de ventilação mecânica com a fórmula aplicada, a referência e a
          interpretação ao lado do resultado.
        </p>
      </header>

      <div className="search">
        <SearchIcon />
        <label className="sr-only" htmlFor="busca-calculadoras">
          Buscar calculadora
        </label>
        <input
          id="busca-calculadoras"
          type="search"
          placeholder="Buscar calculadora…"
          value={busca}
          onChange={(evento) => setBusca(evento.target.value)}
          autoComplete="off"
        />
      </div>

      {filtradas.length === 0 && (
        <div className="vazio">
          Nenhuma calculadora encontrada para “{busca}”. Tente “volume”, “P/F” ou
          “complacência”.
        </div>
      )}

      {grupos.map((grupo) => {
        const doGrupo = filtradas.filter((calc) => calc.grupo === grupo)
        if (doGrupo.length === 0) return null
        return (
          <section key={grupo} aria-labelledby={`grupo-${grupo}`}>
            <h2 className="section-title" id={`grupo-${grupo}`}>
              <span>{grupo}</span>
              <span>{doGrupo.length}</span>
            </h2>
            <div className="grid-cards">
              {doGrupo.map((calc) => (
                <article className="card-row" key={calc.id}>
                  <button
                    type="button"
                    className="card-link"
                    onClick={() => navegar(`/calculadoras/${calc.id}`)}
                  >
                    <span className="card-icon">
                      <CalculatorIcon />
                    </span>
                    <span className="card-body">
                      <span className="card-title" style={{ display: 'block' }}>
                        {calc.nome}
                      </span>
                      <span className="card-desc" style={{ display: 'block' }}>
                        {calc.descricao}
                      </span>
                    </span>
                    <ChevronRightIcon className="card-chevron" />
                  </button>
                  <button
                    type="button"
                    className="fav-btn"
                    data-ativo={favoritos.includes(chaveFavorito(calc.id))}
                    aria-label={
                      favoritos.includes(chaveFavorito(calc.id))
                        ? `Remover ${calc.nome} dos favoritos`
                        : `Adicionar ${calc.nome} aos favoritos`
                    }
                    aria-pressed={favoritos.includes(chaveFavorito(calc.id))}
                    onClick={() => alternarFavorito(chaveFavorito(calc.id))}
                  >
                    <StarIcon size={19} preenchido={favoritos.includes(chaveFavorito(calc.id))} />
                  </button>
                </article>
              ))}
            </div>
          </section>
        )
      })}
    </>
  )
}

function valoresIniciais(calc: Calculadora) {
  const estado: Record<string, string> = {}
  for (const campo of calc.campos) {
    estado[campo.id] = campo.tipo === 'opcao' ? campo.padrao : (campo.padrao ?? '')
  }
  return estado
}

function validar(campo: Campo, valor: string): string | null {
  if (campo.tipo === 'opcao') return valor ? null : 'Escolha uma opção.'

  const { valor: numero, erro } = lerNumero(valor)
  if (erro === 'vazio') return 'Informe um valor.'
  if (erro || numero === null) return 'Use apenas números simples, por exemplo 12,5.'
  if (numero < campo.min || numero > campo.max) {
    return `Informe um valor entre ${campo.min.toLocaleString('pt-BR')} e ${campo.max.toLocaleString('pt-BR')} ${campo.unidade}.`
  }
  return null
}

function validarCruzado(calc: Calculadora, valores: Record<string, string>) {
  const erros: Record<string, string> = {}
  // Só é chamada depois que todos os campos passaram por `validar`,
  // então os números abaixo já são válidos.
  const n = (id: string) => lerNumero(valores[id] ?? '').valor
  const pplat = n('pplat')
  const peep = n('peep')
  if (calc.id === 'driving-pressure' || calc.id === 'complacencia') {
    if (pplat !== null && peep !== null && pplat <= peep) {
      erros.peep = 'A PEEP deve ser menor que a pressão de platô.'
    }
  }
  const pip = n('pip')
  if (calc.id === 'resistencia' && pip !== null && pplat !== null && pip < pplat) {
    erros.pplat = 'O platô deve ser menor ou igual à pressão de pico.'
  }
  return erros
}

export function CalculadoraDetalhe({ id, favoritos, alternarFavorito }: Props & { id: string }) {
  const calc = encontrarCalculadora(id)
  const [valores, setValores] = useState<Record<string, string>>(() =>
    calc ? valoresIniciais(calc) : {},
  )
  const [erros, setErros] = useState<Record<string, string>>({})
  const [resultado, setResultado] = useState<ReturnType<Calculadora['calcular']> | null>(null)
  const [copiado, setCopiado] = useState(false)

  if (!calc) {
    return (
      <>
        <button className="back-btn" type="button" onClick={() => navegar('/calculadoras')}>
          <ChevronLeftIcon /> Calculadoras
        </button>
        <div className="vazio">Calculadora não encontrada.</div>
      </>
    )
  }

  const favorito = favoritos.includes(chaveFavorito(calc.id))

  const alterar = (campoId: string, valor: string) => {
    setValores((atual) => ({ ...atual, [campoId]: valor }))
    setErros((atual) => {
      if (!atual[campoId]) return atual
      const proximo = { ...atual }
      delete proximo[campoId]
      return proximo
    })
    setResultado(null)
    setCopiado(false)
  }

  const calcular = (evento: FormEvent) => {
    evento.preventDefault()
    const novosErros: Record<string, string> = {}
    for (const campo of calc.campos) {
      const erro = validar(campo, valores[campo.id] ?? '')
      if (erro) novosErros[campo.id] = erro
    }
    if (Object.keys(novosErros).length === 0) {
      Object.assign(novosErros, validarCruzado(calc, valores))
    }
    setErros(novosErros)
    if (Object.keys(novosErros).length > 0) {
      setResultado(null)
      return
    }
    setResultado(calc.calcular(valores))
  }

  const limpar = () => {
    setValores(valoresIniciais(calc))
    setErros({})
    setResultado(null)
    setCopiado(false)
  }

  const copiar = async () => {
    if (!resultado) return
    const linhas = (resultado.linhas ?? []).map((linha) => `${linha.rotulo}: ${linha.valor}`)
    const texto = [
      `${calc.nome}: ${resultado.valor}${resultado.unidade ? ` ${resultado.unidade}` : ''}`,
      ...linhas,
      `Fórmula: ${resultado.formula}`,
      resultado.referencia,
      DISCLAIMER,
    ].join('\n')

    try {
      await navigator.clipboard.writeText(texto)
      setCopiado(true)
    } catch {
      const area = document.createElement('textarea')
      area.value = texto
      document.body.appendChild(area)
      area.select()
      try {
        document.execCommand('copy')
        setCopiado(true)
      } finally {
        document.body.removeChild(area)
      }
    }
    window.setTimeout(() => setCopiado(false), 2200)
  }

  return (
    <>
      <button className="back-btn" type="button" onClick={() => navegar('/calculadoras')}>
        <ChevronLeftIcon /> Calculadoras
      </button>

      <header className="page-head">
        <span className="eyebrow">{calc.grupo}</span>
        <div className="ficha-hero-top" style={{ marginBottom: 4 }}>
          <h1 className="page-title" style={{ fontSize: 'clamp(1.45rem, 5vw, 1.8rem)' }}>
            {calc.nome}
          </h1>
          <button
            type="button"
            className="fav-btn"
            style={{ width: 44, height: 44, border: '1px solid var(--border)', borderRadius: 12 }}
            data-ativo={favorito}
            aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            aria-pressed={favorito}
            onClick={() => alternarFavorito(chaveFavorito(calc.id))}
          >
            <StarIcon size={20} preenchido={favorito} />
          </button>
        </div>
        <p className="page-lead">{calc.descricao}</p>
      </header>

      <div className="calc-layout">
        <form className="card form-card" onSubmit={calcular} noValidate>
          <div className="form-grid">
            {calc.campos.map((campo) => {
              const erro = erros[campo.id]
              if (campo.tipo === 'opcao') {
                return (
                  <div className="field" key={campo.id}>
                    <span className="rotulo" style={{ display: 'block', marginBottom: 7, fontSize: '0.86rem', fontWeight: 650, color: 'var(--text-soft)' }}>
                      {campo.rotulo}
                    </span>
                    <div className="select-grid" role="group" aria-label={campo.rotulo}>
                      {campo.opcoes.map((opcao) => (
                        <button
                          key={opcao.valor}
                          type="button"
                          aria-pressed={valores[campo.id] === opcao.valor}
                          onClick={() => alterar(campo.id, opcao.valor)}
                        >
                          {opcao.rotulo}
                        </button>
                      ))}
                    </div>
                    {campo.ajuda && <p className="field-help">{campo.ajuda}</p>}
                  </div>
                )
              }

              return (
                <div className="field" key={campo.id}>
                  <label htmlFor={`campo-${campo.id}`}>
                    <span>{campo.rotulo}</span>
                    <span className="field-unit">{campo.unidade}</span>
                  </label>
                  <div className="input-wrap">
                    <input
                      id={`campo-${campo.id}`}
                      type="text"
                      inputMode="decimal"
                      autoComplete="off"
                      enterKeyHint="done"
                      maxLength={MAX_CARACTERES_NUMERO}
                      placeholder={campo.placeholder}
                      value={valores[campo.id] ?? ''}
                      aria-invalid={Boolean(erro)}
                      aria-describedby={
                        erro ? `erro-${campo.id}` : campo.ajuda ? `ajuda-${campo.id}` : undefined
                      }
                      onChange={(evento) => alterar(campo.id, evento.target.value)}
                    />
                  </div>
                  {erro ? (
                    <p className="field-erro" id={`erro-${campo.id}`} role="alert">
                      {erro}
                    </p>
                  ) : (
                    campo.ajuda && (
                      <p className="field-help" id={`ajuda-${campo.id}`}>
                        {campo.ajuda}
                      </p>
                    )
                  )}
                </div>
              )
            })}
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Calcular
            </button>
            <button className="btn btn-ghost" type="button" onClick={limpar}>
              Limpar
            </button>
          </div>
        </form>

        {resultado ? (
          <section className="result" aria-live="polite" aria-label="Resultado">
            <div className="result-label">{resultado.rotulo ?? calc.nome}</div>
            <div className="result-value">
              {resultado.valor}
              {resultado.unidade && <span className="result-unit">{resultado.unidade}</span>}
            </div>

            {resultado.linhas && resultado.linhas.length > 0 && (
              <div className="result-linhas">
                {resultado.linhas.map((linha) => (
                  <div className="result-linha" key={linha.rotulo}>
                    <span>{linha.rotulo}</span>
                    <b>{linha.valor}</b>
                  </div>
                ))}
              </div>
            )}

            {resultado.interpretacao && (
              <div className="interpretacao" data-nivel={resultado.interpretacao.nivel}>
                {resultado.interpretacao.texto}
              </div>
            )}

            <div className="result-meta">
              <div>
                <b>Fórmula</b>
                <br />
                {resultado.formula}
              </div>
              <div>
                <b>Referência</b>
                <br />
                {resultado.referencia}
              </div>
            </div>

            <div className="result-actions">
              <button className="btn btn-ghost" type="button" onClick={copiar}>
                {copiado ? <CheckIcon /> : <CopyIcon />}
                {copiado ? 'Copiado' : 'Copiar resultado'}
              </button>
            </div>
          </section>
        ) : (
          <div className="vazio">
            Preencha os campos e toque em <b>Calcular</b>. O resultado aparece aqui com a
            fórmula e a faixa de referência.
          </div>
        )}
      </div>
    </>
  )
}
