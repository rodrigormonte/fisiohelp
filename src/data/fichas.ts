import type { Ficha } from '../types'

const FONTE = 'AMIB. Orientações Práticas de Ventilação Mecânica, 2024, Tema 6.'

export const fichas: Ficha[] = [
  {
    id: 'vcv',
    nome: 'VCV — curva de referência',
    fase: 'Referência',
    modos: ['VCV'],
    resumo: 'Fluxo constante, volume linear e pressão em dois níveis durante a inspiração.',
    deformacao:
      'O fluxo inspiratório é constante (onda quadrada), o volume cresce de forma linear e a pressão sobe até o pico para depois estabilizar no platô. A pressão varia com a resistência e a complacência; o volume e o fluxo são impostos pelo ventilador.',
    causas: [
      'Curva de referência para comparação com as assincronias.',
      'O pico reflete a soma da resistência e da complacência; o platô reflete a complacência.',
    ],
    ajustes: [
      {
        modo: 'VCV',
        texto:
          'Não se aplica. Use esta curva como base para reconhecer deformações: pico alto com platô normal sugere resistência; pico e platô altos sugerem baixa complacência.',
      },
    ],
    consequencia: 'Serve de referência para interpretar as demais curvas.',
    fonte: 'AMIB, Temas 5 e 6.',
    diagrama: 'vcv',
  },
  {
    id: 'pcv',
    nome: 'PCV — curva de referência',
    fase: 'Referência',
    modos: ['PCV'],
    resumo: 'Pressão constante, fluxo desacelerante e volume dependente da mecânica.',
    deformacao:
      'A pressão é constante no nível ajustado durante a inspiração, o fluxo é desacelerante e o volume depende da mecânica do paciente. O tempo inspiratório é definido pelo operador.',
    causas: [
      'Curva de referência para comparação com as assincronias.',
      'Como o volume não é garantido, a vigilância do volume corrente é essencial neste modo.',
    ],
    ajustes: [
      {
        modo: 'PCV',
        texto:
          'Não se aplica. Observe o volume corrente gerado: se cair com a mesma pressão, a complacência piorou ou a resistência aumentou.',
      },
    ],
    consequencia: 'Serve de referência para interpretar as demais curvas.',
    fonte: 'AMIB, Temas 5 e 6.',
    diagrama: 'pcv',
  },
  {
    id: 'psv',
    nome: 'PSV — curva de referência',
    fase: 'Referência',
    modos: ['PSV'],
    resumo: 'Ciclo iniciado pelo paciente, pressão assistida e ciclagem pela queda do fluxo.',
    deformacao:
      'O ciclo é iniciado pelo paciente, a pressão é assistida em nível ajustado, o fluxo é desacelerante e a ciclagem ocorre pela queda do fluxo inspiratório. O volume corrente é livre e varia com o esforço e a mecânica.',
    causas: [
      'Curva de referência para comparação com as assincronias.',
      'O esforço do paciente é parte da curva: observe o disparo e o momento da ciclagem.',
    ],
    ajustes: [
      {
        modo: 'PSV',
        texto:
          'Não se aplica. Use esta curva como base para reconhecer disparo ineficaz, duplo disparo e ciclagem precoce ou tardia.',
      },
    ],
    consequencia: 'Serve de referência para interpretar as demais curvas.',
    fonte: 'AMIB, Temas 5 e 6.',
    diagrama: 'psv',
  },
  {
    id: 'disparo-ineficaz',
    nome: 'Disparo ineficaz',
    fase: 'Disparo',
    modos: ['VCV', 'PCV', 'PSV'],
    resumo: 'O esforço do paciente aparece na curva, mas não gera um ciclo assistido.',
    deformacao:
      'O esforço inspiratório do paciente aparece na curva de pressão (deflexão negativa / queda de Pmus) e no fluxo, mas não gera um ciclo assistido. O volume não sobe.',
    causas: [
      'Sensibilidade pouco sensível.',
      'Fraqueza da musculatura respiratória ou depressão do comando neural.',
      'Hiperinsuflação dinâmica (autoPEEP).',
      'Tempo inspiratório mecânico prolongado.',
    ],
    ajustes: [
      { modo: 'VCV', texto: 'Aumentar a sensibilidade, aumentar o fluxo inspiratório ou reduzir a pausa inspiratória. Tratar autoPEEP.' },
      { modo: 'PCV', texto: 'Aumentar a sensibilidade e reduzir o tempo inspiratório.' },
      { modo: 'PSV', texto: 'Aumentar a sensibilidade, reduzir o nível de pressão ou ajustar o percentual de ciclagem.' },
    ],
    consequencia:
      'Aumento do trabalho respiratório, desconforto, disfunção muscular ventilatória e piora clínica.',
    fonte: `${FONTE} B.1.`,
    diagrama: 'disparo-ineficaz',
  },
  {
    id: 'duplo-disparo',
    nome: 'Duplo disparo',
    fase: 'Disparo',
    modos: ['VCV', 'PCV', 'PSV'],
    resumo: 'Dois ciclos consecutivos sem exalação completa, com empilhamento de volume.',
    deformacao:
      'Dois ciclos consecutivos com exalação incompleta entre eles e empilhamento de volume. A Pmus pode estar prolongada e profunda, gerando um segundo disparo.',
    causas: [
      'Assistência insuficiente.',
      'Alta demanda ventilatória.',
      'Tempo inspiratório mecânico menor que o tempo inspiratório neural (ciclagem precoce).',
    ],
    ajustes: [
      {
        modo: 'VCV',
        texto:
          'Reduzir o fluxo inspiratório e/ou aumentar o volume corrente dentro dos limites de segurança; adicionar pausa inspiratória; ou mudar para PCV/PSV.',
      },
      {
        modo: 'PCV',
        texto:
          'Aumentar o tempo inspiratório e/ou a pressão controlada, respeitando os limites de volume corrente.',
      },
      { modo: 'PSV', texto: 'Aumentar o nível de pressão ou reduzir o percentual de ciclagem.' },
    ],
    consequencia:
      'Empilhamento de ar, hiperinsuflação, risco de volutrauma/barotrauma e instabilidade hemodinâmica.',
    fonte: `${FONTE} B.2.`,
    diagrama: 'duplo-disparo',
  },
  {
    id: 'disparo-reverso',
    nome: 'Disparo reverso',
    fase: 'Disparo',
    modos: ['VCV', 'PCV'],
    resumo: 'Esforço começa durante a insuflação de um ciclo controlado e continua na expiração.',
    deformacao:
      'Esforço inspiratório que começa durante a insuflação de um ciclo controlado e continua na expiração, podendo gerar um novo ciclo. Pode haver pico de fluxo expiratório pouco intenso e queda da pressão inspiratória do meio para o fim da inspiração.',
    causas: [
      'Sedação profunda ou transição de sedação para ventilação assistida.',
      'Reflexo desencadeado pela distensão da musculatura diafragmática.',
    ],
    ajustes: [
      {
        modo: 'Geral',
        texto:
          'Reduzir a sedação é a conduta principal, principalmente quando há duplo disparo. Ajustar a frequência respiratória pode ser útil em alguns casos, sem consenso. Em casos intensos, sem possibilidade de reduzir a sedação, considerar curarização como última conduta.',
      },
    ],
    consequencia:
      'Duplo disparo, hiperinsuflação e piora da interação paciente-ventilador.',
    fonte: `${FONTE} B.3.`,
    diagrama: 'disparo-reverso',
  },
  {
    id: 'autodisparo',
    nome: 'Autodisparo',
    fase: 'Disparo',
    modos: ['VCV', 'PCV', 'PSV'],
    resumo: 'O ventilador dispara sem esforço do paciente; a frequência fica acima da ajustada.',
    deformacao:
      'O ventilador dispara sem esforço do paciente. A frequência respiratória fica maior que a ajustada e os ciclos não são precedidos de sinais de esforço.',
    causas: [
      'Sensibilidade excessivamente sensível.',
      'Vazamento ou condensado no circuito.',
      'Detecção de batimentos cardíacos.',
      'Grandes variações de pressão torácica.',
    ],
    ajustes: [
      {
        modo: 'Geral',
        texto:
          'Corrigir vazamentos e condensado no circuito. Reduzir progressivamente a sensibilidade (deixar menos sensível) até o autodisparo desaparecer, observando o impacto nos disparos verdadeiros.',
      },
    ],
    consequencia: 'Hiperventilação iatrogênica, alcalose, autoPEEP e desconforto.',
    fonte: `${FONTE} B.4.`,
    diagrama: 'autodisparo',
  },
  {
    id: 'fluxo-insuficiente',
    nome: 'Fluxo insuficiente',
    fase: 'Fluxo',
    modos: ['VCV', 'PCV', 'PSV'],
    resumo: 'Concavidade na pressão em VCV ou fluxo em “M” em PCV/PSV.',
    deformacao:
      'Em VCV com fluxo quadrado, aparece uma concavidade na curva de pressão. Em PCV e PSV, a curva de fluxo pode formar dois picos (padrão em “M”) durante a inspiração.',
    causas: [
      'Aumento da demanda ventilatória (febre, dor, ansiedade, acidose).',
      'Fluxo inspiratório ajustado baixo.',
      'Pressão de suporte insuficiente.',
    ],
    ajustes: [
      {
        modo: 'VCV',
        texto:
          'Aumentar o fluxo inspiratório, observando conforto e a curva de pressão; ou mudar para PCV/PSV.',
      },
      {
        modo: 'PCV / PSV',
        texto:
          'Ajustar o tempo de subida (rise time) ou aumentar a pressão controlada/suporte. Tratar as causas de aumento da demanda.',
      },
    ],
    consequencia:
      'Desconforto, uso de musculatura acessória e aumento do trabalho respiratório.',
    fonte: `${FONTE} C.1.`,
    diagrama: 'fluxo-insuficiente',
  },
  {
    id: 'fluxo-excessivo',
    nome: 'Fluxo excessivo (overshoot)',
    fase: 'Fluxo',
    modos: ['VCV', 'PCV', 'PSV'],
    resumo: 'Pico de pressão precoce em VCV ou pressão acima do ajustado em PCV/PSV.',
    deformacao:
      'Em VCV, o pico de pressão é alcançado precocemente. Em PCV/PSV, a pressão de vias aéreas ultrapassa o nível ajustado (overshoot). A curva de fluxo pode ficar quase perpendicular ao eixo do tempo e surgir uma espícula.',
    causas: [
      'Fluxo inspiratório acima do desejado.',
      'Pressões ajustadas elevadas.',
      'Tempo de subida muito rápido.',
    ],
    ajustes: [
      { modo: 'VCV', texto: 'Reduzir o fluxo inspiratório.' },
      {
        modo: 'PCV / PSV',
        texto: 'Reduzir a pressão inspiratória e aumentar o tempo de subida (rise time).',
      },
    ],
    consequencia:
      'Desconforto, pressão acima do alvo e risco de lesão pulmonar induzida pela ventilação.',
    fonte: `${FONTE} C.2.`,
    diagrama: 'fluxo-excessivo',
  },
  {
    id: 'ciclagem-precoce',
    nome: 'Ciclagem precoce',
    fase: 'Ciclagem',
    modos: ['VCV', 'PCV', 'PSV'],
    resumo: 'A inspiração termina antes do fim do esforço neural do paciente.',
    deformacao:
      'O ventilador termina a inspiração antes do fim do esforço neural. No início da expiração há oscilação do fluxo expiratório, com queda rápida (podendo tender a zero) e aumento depois que o esforço cessa.',
    causas: [
      'Tempo inspiratório curto.',
      'Alta demanda.',
      'Em PSV, percentual de ciclagem alto.',
    ],
    ajustes: [
      { modo: 'VCV', texto: 'Aumentar o tempo inspiratório reduzindo o fluxo.' },
      { modo: 'PCV', texto: 'Aumentar o tempo inspiratório.' },
      {
        modo: 'PSV',
        texto:
          'Reduzir o limiar de ciclagem (geralmente para valores abaixo de 25%) para aumentar o tempo inspiratório.',
      },
    ],
    consequencia: 'Duplo disparo, empilhamento de volume e desconforto.',
    fonte: `${FONTE} D.1.`,
    diagrama: 'ciclagem-precoce',
  },
  {
    id: 'ciclagem-tardia',
    nome: 'Ciclagem tardia',
    fase: 'Ciclagem',
    modos: ['VCV', 'PCV', 'PSV'],
    resumo: 'A inspiração termina depois do desejado pelo paciente.',
    deformacao:
      'O ventilador termina a inspiração depois do desejado pelo paciente. Em PCV/PSV, há elevação da pressão de vias aéreas acima do ajustado ao final da inspiração e mudança na inclinação da curva de fluxo (overshoot de saída).',
    causas: ['Tempo inspiratório longo.', 'Em PSV, percentual de ciclagem baixo.'],
    ajustes: [
      { modo: 'VCV', texto: 'Reduzir o tempo inspiratório aumentando o fluxo.' },
      { modo: 'PCV', texto: 'Reduzir o tempo inspiratório.' },
      {
        modo: 'PSV',
        texto:
          'Aumentar o limiar de ciclagem (geralmente para valores acima de 50%) para reduzir o tempo inspiratório.',
      },
    ],
    consequencia:
      'Desconforto, esforço expiratório contra o ventilador, autoPEEP e piora da sincronia.',
    fonte: `${FONTE} D.2.`,
    diagrama: 'ciclagem-tardia',
  },
]

export const fases = ['Todas', 'Referência', 'Disparo', 'Fluxo', 'Ciclagem'] as const

export const encontrarFicha = (id: string) => fichas.find((f) => f.id === id)
