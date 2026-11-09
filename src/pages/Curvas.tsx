import { useMemo, useState } from 'react'
import type { Fase } from '../types'
import { fases, fichas, encontrarFicha } from '../data/fichas'
import { AMIB_URL, REVISAO_DATA, REVISAO_NOME } from '../config'
import { navegar } from '../lib/router'
import { CurveDiagram } from '../components/CurveDiagram'
import {
  AlertIcon,
  BookIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalIcon,
  StarIcon,
  UserCheckIcon,
  WaveIcon,
} from '../components/Icons'

type Props = {
  favoritos: string[]
  alternarFavorito: (chave: string) => void
}

const chaveFavorito = (id: string) => `ficha:${id}`

const tomDaFase = (fase: Fase) => {
  if (fase === 'Referência') return 'azul'
  if (fase === 'Disparo') return 'verde'
  if (fase === 'Fluxo') return 'dourado'
  return 'ambar'
}

export function CurvasPage({ favoritos, alternarFavorito }: Props) {
  const [filtro, setFiltro] = useState<(typeof fases)[number]>('Todas')

  const lista = useMemo(
    () => (filtro === 'Todas' ? fichas : fichas.filter((ficha) => ficha.fase === filtro)),
    [filtro],
  )

  return (
    <>
      <header className="page-head">
        <span className="eyebrow">
          <WaveIcon size={14} /> Curvas &amp; assincronias
        </span>
        <h1 className="page-title">Ler a curva, entender o ajuste</h1>
        <p className="page-lead">
          Onze fichas com desenho esquemático original: três curvas de referência e as oito
          assincronias do Tema 6 da AMIB. A interpretação e a sugestão de ajuste aparecem
          depois do toque.
        </p>
      </header>

      <div className="chips" role="group" aria-label="Filtrar por fase">
        {fases.map((fase) => (
          <button
            key={fase}
            type="button"
            className="chip"
            aria-pressed={filtro === fase}
            onClick={() => setFiltro(fase)}
          >
            {fase}
          </button>
        ))}
      </div>

      <div className="grid-cards">
        {lista.map((ficha) => {
          const favorito = favoritos.includes(chaveFavorito(ficha.id))
          const tom = tomDaFase(ficha.fase)
          return (
            <article className="card-row" key={ficha.id}>
              <button
                type="button"
                className="card-link"
                onClick={() => navegar(`/curvas/${ficha.id}`)}
              >
                <span
                  className="card-icon"
                  style={
                    tom === 'dourado'
                      ? { background: 'var(--gold-soft)', color: 'var(--gold)' }
                      : tom === 'ambar'
                        ? { background: 'var(--amber-soft)', color: 'var(--amber)' }
                        : tom === 'azul'
                          ? { background: 'var(--blue-soft)', color: 'var(--blue)' }
                          : undefined
                  }
                >
                  <WaveIcon />
                </span>
                <span className="card-body">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 7, flexWrap: 'wrap' }}>
                    <span className="card-title">{ficha.nome}</span>
                    <span className="badge" data-tone={tom}>
                      {ficha.fase}
                    </span>
                  </span>
                  <span className="card-desc" style={{ display: 'block' }}>
                    {ficha.resumo}
                  </span>
                </span>
                <ChevronRightIcon className="card-chevron" />
              </button>
              <button
                type="button"
                className="fav-btn"
                data-ativo={favorito}
                aria-label={
                  favorito
                    ? `Remover ${ficha.nome} dos favoritos`
                    : `Adicionar ${ficha.nome} aos favoritos`
                }
                aria-pressed={favorito}
                onClick={() => alternarFavorito(chaveFavorito(ficha.id))}
              >
                <StarIcon size={19} preenchido={favorito} />
              </button>
            </article>
          )
        })}
      </div>
    </>
  )
}

export function FichaDetalhe({ id, favoritos, alternarFavorito }: Props & { id: string }) {
  const ficha = encontrarFicha(id)
  const [aberta, setAberta] = useState(false)

  if (!ficha) {
    return (
      <>
        <button className="back-btn" type="button" onClick={() => navegar('/curvas')}>
          <ChevronLeftIcon /> Curvas
        </button>
        <div className="vazio">Ficha não encontrada.</div>
      </>
    )
  }

  const favorito = favoritos.includes(chaveFavorito(ficha.id))
  const tom = tomDaFase(ficha.fase)

  return (
    <>
      <button className="back-btn" type="button" onClick={() => navegar('/curvas')}>
        <ChevronLeftIcon /> Curvas
      </button>

      <section className="ficha-hero">
        <div className="ficha-hero-top">
          <div className="badge-row">
            <span className="badge" data-tone={tom}>
              {ficha.fase}
            </span>
            {ficha.modos.map((modo) => (
              <span className="badge" key={modo}>
                {modo}
              </span>
            ))}
          </div>
          <button
            type="button"
            className="fav-btn"
            style={{ width: 44, height: 44, border: '1px solid var(--border)', borderRadius: 12 }}
            data-ativo={favorito}
            aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            aria-pressed={favorito}
            onClick={() => alternarFavorito(chaveFavorito(ficha.id))}
          >
            <StarIcon size={20} preenchido={favorito} />
          </button>
        </div>

        <div className="diagrama-wrap">
          <CurveDiagram id={ficha.diagrama} />
        </div>

        <h1 className="ficha-titulo">{ficha.nome}</h1>
        <p className="ficha-resumo">{ficha.resumo}</p>
      </section>

      <section className="ficha-secao">
        <h2>O que a deformação mostra</h2>
        <p>{ficha.deformacao}</p>
      </section>

      <section className="ficha-secao">
        <h2>Causas prováveis</h2>
        <ul>
          {ficha.causas.map((causa) => (
            <li key={causa}>{causa}</li>
          ))}
        </ul>
      </section>

      <section className="ficha-secao">
        <h2>Sugestão de ajuste</h2>
        <p style={{ marginBottom: 12 }}>
          A sugestão fica escondida para preservar a leitura da curva. Abra apenas depois de
          interpretar o que a deformação mostra.
        </p>
        <button
          type="button"
          className="sugestao-toggle"
          aria-expanded={aberta}
          aria-controls="sugestao-conteudo"
          onClick={() => setAberta((atual) => !atual)}
        >
          {aberta ? 'Ocultar sugestão' : 'Ver sugestão'}
          <ChevronDownIcon />
        </button>

        {aberta && (
          <div className="sugestao" id="sugestao-conteudo">
            {ficha.ajustes.map((ajuste) => (
              <div className="ajuste" key={ajuste.modo}>
                <span className="ajuste-modo">{ajuste.modo}</span>
                <p>{ajuste.texto}</p>
              </div>
            ))}
            <p className="field-help">
              Ajuste é sugestão de apoio, não prescrição. Decida com a avaliação clínica e
              confira os valores no ventilador.
            </p>
          </div>
        )}
      </section>

      <section className="ficha-secao">
        <h2>
          <AlertIcon size={16} /> Consequência se não corrigir
        </h2>
        <p className="alerta-consequencia">{ficha.consequencia}</p>
      </section>

      <div className="fonte">
        <BookIcon />
        <span>
          <b>{ficha.fonte}</b> Baseado em AMIB, Orientações Práticas de Ventilação Mecânica,
          2024. Conteúdo adaptado, sem reprodução das figuras originais.{' '}
          <a href={AMIB_URL} target="_blank" rel="noreferrer">
            Abrir a diretriz <ExternalIcon size={12} />
          </a>
        </span>
      </div>

      <div className="revisao">
        <UserCheckIcon />
        {REVISAO_NOME ? (
          <span>
            Revisado por <b>{REVISAO_NOME}</b>
            {REVISAO_DATA ? `, ${REVISAO_DATA}` : ''}.
          </span>
        ) : (
          <span>
            Revisão clínica <b>pendente de assinatura</b>. Conteúdo baseado na AMIB 2024,
            aguardando validação do profissional responsável.
          </span>
        )}
      </div>
    </>
  )
}
