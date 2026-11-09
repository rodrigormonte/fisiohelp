import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertIcon } from './Icons'

type Props = { children: ReactNode }
type State = { comErro: boolean }

/**
 * Evita tela em branco em erro inesperado de renderização.
 * A mensagem é genérica de propósito: nada de stack trace ou detalhe interno.
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { comErro: false }

  static getDerivedStateFromError(): State {
    return { comErro: true }
  }

  componentDidCatch(erro: Error, info: ErrorInfo) {
    if (import.meta.env.DEV) {
      console.error('Erro de renderização:', erro, info)
    }
  }

  private reiniciar = () => {
    window.location.hash = '#/calculadoras'
    window.location.reload()
  }

  render() {
    if (this.state.comErro) {
      return (
        <main className="erro-app" role="alert">
          <div className="erro-app-icone">
            <AlertIcon size={24} />
          </div>
          <h1>Algo deu errado</h1>
          <p>
            Não foi possível mostrar esta tela. Recarregue o app para tentar novamente. Seus
            favoritos e sua preferência de tema continuam salvos neste aparelho.
          </p>
          <div className="erro-app-acoes">
            <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>
              Recarregar
            </button>
            <button type="button" className="btn btn-ghost" onClick={this.reiniciar}>
              Ir para o início
            </button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
