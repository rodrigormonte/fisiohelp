import { useEffect, useState } from 'react'

export type Rota =
  | { pagina: 'calculadoras' }
  | { pagina: 'calculadora'; id: string }
  | { pagina: 'curvas' }
  | { pagina: 'ficha'; id: string }
  | { pagina: 'favoritos' }
  | { pagina: 'sobre' }

export function lerRota(): Rota {
  const bruto = window.location.hash.replace(/^#\/?/, '')
  const [secao, id] = bruto.split('/')

  if (secao === 'calculadoras') {
    return id ? { pagina: 'calculadora', id } : { pagina: 'calculadoras' }
  }
  if (secao === 'curvas') {
    return id ? { pagina: 'ficha', id } : { pagina: 'curvas' }
  }
  if (secao === 'favoritos') return { pagina: 'favoritos' }
  if (secao === 'sobre') return { pagina: 'sobre' }
  return { pagina: 'calculadoras' }
}

export function navegar(caminho: string) {
  const alvo = `#${caminho}`
  if (window.location.hash === alvo) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.location.hash = alvo
}

export function useRota() {
  const [rota, setRota] = useState<Rota>(lerRota)

  useEffect(() => {
    const aoMudar = () => {
      setRota(lerRota())
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('hashchange', aoMudar)
    return () => window.removeEventListener('hashchange', aoMudar)
  }, [])

  return rota
}
