export type Nivel = 'ok' | 'info' | 'atencao' | 'alerta'

export type CampoNumero = {
  tipo: 'numero'
  id: string
  rotulo: string
  unidade: string
  min: number
  max: number
  passo?: number
  padrao?: string
  ajuda?: string
  placeholder?: string
}

export type CampoOpcao = {
  tipo: 'opcao'
  id: string
  rotulo: string
  opcoes: { valor: string; rotulo: string }[]
  padrao: string
  ajuda?: string
}

export type Campo = CampoNumero | CampoOpcao

export type LinhaResultado = { rotulo: string; valor: string }

export type Resultado = {
  valor: string
  unidade?: string
  rotulo?: string
  linhas?: LinhaResultado[]
  interpretacao?: { texto: string; nivel: Nivel }
  formula: string
  referencia: string
}

export type Calculadora = {
  id: string
  nome: string
  descricao: string
  grupo: 'Ventilação' | 'Oxigenação' | 'Mecânica'
  campos: Campo[]
  calcular: (valores: Record<string, string>) => Resultado
}

export type Fase = 'Referência' | 'Disparo' | 'Fluxo' | 'Ciclagem'

export type Ficha = {
  id: string
  nome: string
  fase: Fase
  modos: string[]
  resumo: string
  deformacao: string
  causas: string[]
  ajustes: { modo: string; texto: string }[]
  consequencia: string
  fonte: string
  diagrama: DiagramaId
}

export type DiagramaId =
  | 'vcv'
  | 'pcv'
  | 'psv'
  | 'disparo-ineficaz'
  | 'duplo-disparo'
  | 'disparo-reverso'
  | 'autodisparo'
  | 'fluxo-insuficiente'
  | 'fluxo-excessivo'
  | 'ciclagem-precoce'
  | 'ciclagem-tardia'
