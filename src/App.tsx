import { useEffect, useState } from 'react'
import { DISCLAIMER, VERSAO } from './config'
import { lerRota, navegar, useRota } from './lib/router'
import { useLocalStorage } from './lib/storage'
import { ehListaFavoritos, ehTema } from './lib/validacao'
import { CalculadoraDetalhe, CalculadorasPage } from './pages/Calculadoras'
import { CurvasPage, FichaDetalhe } from './pages/Curvas'
import { FavoritosPage } from './pages/Favoritos'
import { SobrePage } from './pages/Sobre'
import {
  AlertIcon,
  CalculatorIcon,
  InfoIcon,
  MoonIcon,
  StarIcon,
  SunIcon,
  WaveIcon,
} from './components/Icons'

const CHAVE_AVISO = 'fisiohelp:aviso-v1'

export default function App() {
  const rota = useRota()
  const [tema, definirTema] = useLocalStorage<'claro' | 'escuro'>(
    'fisiohelp:tema',
    'claro',
    ehTema,
  )
  const [favoritos, atualizarFavoritos] = useLocalStorage<string[]>(
    'fisiohelp:favoritos',
    [],
    ehListaFavoritos,
  )
  const [avisoAberto, setAvisoAberto] = useState(() => {
    try {
      return window.localStorage.getItem(CHAVE_AVISO) !== 'ok'
    } catch {
      return true
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = tema
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', tema === 'escuro' ? '#121917' : '#3E7C6B')
  }, [tema])

  useEffect(() => {
    document.body.classList.toggle('modal-aberto', avisoAberto)
    return () => document.body.classList.remove('modal-aberto')
  }, [avisoAberto])

  useEffect(() => {
    const nomes: Record<string, string> = {
      calculadoras: 'Calculadoras',
      calculadora: 'Calculadora',
      curvas: 'Curvas e assincronias',
      ficha: 'Curva',
      favoritos: 'Favoritos',
      sobre: 'Sobre',
    }
    document.title = `Fisiohelp — ${nomes[rota.pagina] ?? 'Ventilação mecânica'}`
  }, [rota])

  const alternarFavorito = (chave: string) => {
    atualizarFavoritos((atual) =>
      atual.includes(chave) ? atual.filter((item) => item !== chave) : [...atual, chave],
    )
  }

  const aceitarAviso = () => {
    try {
      window.localStorage.setItem(CHAVE_AVISO, 'ok')
    } catch {
      /* segue sem persistir */
    }
    setAvisoAberto(false)
  }

  const secaoAtiva =
    rota.pagina === 'calculadora'
      ? 'calculadoras'
      : rota.pagina === 'ficha'
        ? 'curvas'
        : rota.pagina

  const itens = [
    { caminho: '/calculadoras', id: 'calculadoras', rotulo: 'Calculadoras', icone: CalculatorIcon },
    { caminho: '/curvas', id: 'curvas', rotulo: 'Curvas', icone: WaveIcon },
    { caminho: '/favoritos', id: 'favoritos', rotulo: 'Favoritos', icone: StarIcon },
    { caminho: '/sobre', id: 'sobre', rotulo: 'Sobre', icone: InfoIcon },
  ]

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <button
            type="button"
            className="brand"
            onClick={() => navegar('/calculadoras')}
            aria-label="Fisiohelp — ir para o início"
          >
            <img src="./icon.svg" alt="" width={38} height={38} />
            <span className="brand-text">
              <span className="brand-name" style={{ display: 'block' }}>
                Fisiohelp
              </span>
              <span className="brand-sub" style={{ display: 'block' }}>
                Calculadoras e curvas de VM
              </span>
            </span>
          </button>

          <div className="topbar-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={() => definirTema((atual) => (atual === 'claro' ? 'escuro' : 'claro'))}
              aria-label={tema === 'claro' ? 'Ativar tema escuro' : 'Ativar tema claro'}
              title={tema === 'claro' ? 'Tema escuro' : 'Tema claro'}
            >
              {tema === 'claro' ? <MoonIcon /> : <SunIcon />}
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        {rota.pagina === 'calculadoras' && (
          <CalculadorasPage favoritos={favoritos} alternarFavorito={alternarFavorito} />
        )}
        {rota.pagina === 'calculadora' && (
          <CalculadoraDetalhe
            key={rota.id}
            id={rota.id}
            favoritos={favoritos}
            alternarFavorito={alternarFavorito}
          />
        )}
        {rota.pagina === 'curvas' && (
          <CurvasPage favoritos={favoritos} alternarFavorito={alternarFavorito} />
        )}
        {rota.pagina === 'ficha' && (
          <FichaDetalhe
            key={rota.id}
            id={rota.id}
            favoritos={favoritos}
            alternarFavorito={alternarFavorito}
          />
        )}
        {rota.pagina === 'favoritos' && (
          <FavoritosPage favoritos={favoritos} alternarFavorito={alternarFavorito} />
        )}
        {rota.pagina === 'sobre' && <SobrePage />}

        <div className="flex-spacer" aria-hidden="true" />

        <footer className="rodape">
          <div className="rodape-marca">
            <img src="./icon.svg" alt="" width={20} height={20} />
            Fisiohelp · versão {VERSAO}
          </div>
          <p>{DISCLAIMER}</p>
          <p style={{ marginTop: 6 }}>
            Conteúdo baseado na AMIB, Orientações Práticas de Ventilação Mecânica, 2024.
          </p>
        </footer>
      </main>

      <nav className="bottom-nav" aria-label="Navegação principal">
        <div className="bottom-nav-inner">
          {itens.map((item) => {
            const Icone = item.icone
            const ativo = secaoAtiva === item.id
            return (
              <button
                key={item.id}
                type="button"
                className="nav-item"
                aria-current={ativo ? 'page' : undefined}
                onClick={() => navegar(item.caminho)}
              >
                <Icone />
                {item.rotulo}
                {item.id === 'favoritos' && favoritos.length > 0 && (
                  <span className="nav-badge">{favoritos.length}</span>
                )}
              </button>
            )
          })}
        </div>
      </nav>

      {avisoAberto && (
        <div className="modal-backdrop" role="presentation">
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-aviso"
          >
            <div className="modal-icon">
              <AlertIcon size={24} />
            </div>
            <h2 id="titulo-aviso">Antes de usar o Fisiohelp</h2>
            <p>
              Este app é uma ferramenta de apoio à decisão para profissionais de saúde. Ele
              não avalia pacientes, não emite diagnóstico e não substitui o julgamento
              clínico.
            </p>
            <ul>
              <li>Confira sempre os valores no ventilador e na gasometria.</li>
              <li>
                As sugestões de ajuste seguem a diretriz da AMIB 2024, mas precisam ser
                adaptadas ao contexto de cada paciente.
              </li>
              <li>Nenhum dado de paciente é coletado ou armazenado.</li>
              <li>Os desenhos de curvas são esquemáticos, não reproduzem telas de marcas.</li>
            </ul>
            <button type="button" className="btn btn-primary" onClick={aceitarAviso}>
              Entendi e vou usar com critério
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Mantém o roteador acessível para depuração local no console.
if (import.meta.env.DEV) {
  ;(window as unknown as { fisiohelpRota?: unknown }).fisiohelpRota = lerRota
}
