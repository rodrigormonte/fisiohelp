import { useCallback, useState } from 'react'

/**
 * Persiste estado simples no `localStorage`.
 * `validar` confere o formato do que veio do disco antes de confiar no valor:
 * um JSON corrompido ou adulterado cai no valor inicial.
 */
export function useLocalStorage<T>(
  chave: string,
  inicial: T,
  validar?: (valor: unknown) => valor is T,
) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const salvo = window.localStorage.getItem(chave)
      if (!salvo) return inicial
      const lido: unknown = JSON.parse(salvo)
      if (validar && !validar(lido)) return inicial
      return lido as T
    } catch {
      return inicial
    }
  })

  const atualizar = useCallback(
    (fn: (atual: T) => T) => {
      setValor((atual) => {
        const novo = fn(atual)
        try {
          window.localStorage.setItem(chave, JSON.stringify(novo))
        } catch {
          /* armazenamento indisponível: segue só em memória */
        }
        return novo
      })
    },
    [chave],
  )

  return [valor, atualizar] as const
}
