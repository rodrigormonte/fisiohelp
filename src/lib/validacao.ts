/**
 * Validação centralizada de números e de dados persistidos.
 *
 * O Fisiohelp não interpreta expressões matemáticas digitadas pelo usuário:
 * as fórmulas são funções puras e os campos só aceitam números simples.
 * A regex abaixo rejeita hexadecimal, notação científica, `Infinity`, `NaN`,
 * separadores indevidos e strings muito longas.
 */

export type ErroLeituraNumero = 'vazio' | 'formato'

/** Suficiente para "-123456,1234" e evita entradas gigantes no campo. */
export const MAX_CARACTERES_NUMERO = 12

const PADRAO_NUMERO = /^-?\d{1,6}(?:[.,]\d{1,4})?$/

export function lerNumero(texto: string): {
  valor: number | null
  erro: ErroLeituraNumero | null
} {
  const limpo = texto.trim()
  if (!limpo) return { valor: null, erro: 'vazio' }
  if (limpo.length > MAX_CARACTERES_NUMERO) return { valor: null, erro: 'formato' }
  if (!PADRAO_NUMERO.test(limpo)) return { valor: null, erro: 'formato' }

  const numero = Number(limpo.replace(',', '.'))
  if (!Number.isFinite(numero)) return { valor: null, erro: 'formato' }

  return { valor: numero, erro: null }
}

export function ehTema(valor: unknown): valor is 'claro' | 'escuro' {
  return valor === 'claro' || valor === 'escuro'
}

const PADRAO_FAVORITO = /^(?:calc|ficha):[a-z0-9-]{1,48}$/

export function ehListaFavoritos(valor: unknown): valor is string[] {
  return (
    Array.isArray(valor) &&
    valor.length <= 200 &&
    valor.every((item) => typeof item === 'string' && PADRAO_FAVORITO.test(item))
  )
}
