import type { Calculadora } from '../types'
import { lerNumero } from '../lib/validacao'

/**
 * As calculadoras só são executadas depois da validação do formulário.
 * O fallback 0 evita que uma chamada inesperada produza NaN/Infinity na tela.
 */
const num = (valores: Record<string, string>, id: string) =>
  lerNumero(String(valores[id] ?? '')).valor ?? 0

const fmt = (valor: number, casas = 0) =>
  valor.toLocaleString('pt-BR', {
    minimumFractionDigits: casas,
    maximumFractionDigits: casas,
  })

export const calculadoras: Calculadora[] = [
  {
    id: 'pbw',
    nome: 'Peso predito (PBW)',
    descricao: 'Peso corporal predito a partir da altura, usado para calcular o volume corrente.',
    grupo: 'Ventilação',
    campos: [
      {
        tipo: 'opcao',
        id: 'sexo',
        rotulo: 'Sexo biológico',
        padrao: 'M',
        opcoes: [
          { valor: 'M', rotulo: 'Masculino' },
          { valor: 'F', rotulo: 'Feminino' },
        ],
        ajuda: 'A fórmula de ARDSNet usa o sexo biológico, não o gênero.',
      },
      {
        tipo: 'numero',
        id: 'altura',
        rotulo: 'Altura',
        unidade: 'cm',
        min: 120,
        max: 230,
        passo: 1,
        placeholder: 'Ex.: 170',
        ajuda: 'Altura medida ou estimada, em centímetros.',
      },
    ],
    calcular: (valores) => {
      const altura = num(valores, 'altura')
      const sexo = valores.sexo === 'F' ? 'F' : 'M'
      const base = sexo === 'M' ? 50 : 45.5
      const pbw = base + 0.91 * (altura - 152.4)
      return {
        valor: fmt(pbw, 1),
        unidade: 'kg',
        rotulo: 'Peso predito',
        linhas: [
          { rotulo: 'Altura informada', valor: `${fmt(altura, 0)} cm` },
          { rotulo: 'Fórmula aplicada', valor: sexo === 'M' ? 'Masculino' : 'Feminino' },
        ],
        interpretacao: {
          texto:
            'Use o peso predito — e não o peso real — para definir o volume corrente, principalmente em obesidade ou desnutrição.',
          nivel: 'info',
        },
        formula:
          'Homem: 50 + 0,91 × (altura − 152,4) · Mulher: 45,5 + 0,91 × (altura − 152,4)',
        referencia:
          'ARDSNet. Ventilation with lower tidal volumes as compared with traditional tidal volumes (NEJM, 2000); AMIB, Orientações Práticas de VM, 2024.',
      }
    },
  },
  {
    id: 'volume-corrente',
    nome: 'Volume corrente alvo',
    descricao: 'Volume corrente protetor calculado pelo peso predito, de 6 a 10 mL/kg.',
    grupo: 'Ventilação',
    campos: [
      {
        tipo: 'numero',
        id: 'pbw',
        rotulo: 'Peso predito (PBW)',
        unidade: 'kg',
        min: 20,
        max: 200,
        passo: 0.1,
        placeholder: 'Ex.: 65',
        ajuda: 'Calcule na primeira calculadora se precisar.',
      },
      {
        tipo: 'numero',
        id: 'alvo',
        rotulo: 'Alvo de volume corrente',
        unidade: 'mL/kg',
        min: 6,
        max: 10,
        passo: 0.5,
        padrao: '6',
        ajuda: '6–8 mL/kg é a faixa usual na SARA. A faixa aceita vai até 10 mL/kg.',
      },
    ],
    calcular: (valores) => {
      const pbw = num(valores, 'pbw')
      const alvo = num(valores, 'alvo')
      const vt = pbw * alvo
      const faixa6a8 = `${fmt(pbw * 6, 0)}–${fmt(pbw * 8, 0)} mL`
      const faixa6a10 = `${fmt(pbw * 6, 0)}–${fmt(pbw * 10, 0)} mL`

      let interpretacao: { texto: string; nivel: 'ok' | 'info' | 'atencao' } = {
        texto: 'Dentro da faixa usual de ventilação protetora na SARA (6–8 mL/kg de peso predito).',
        nivel: 'ok',
      }
      if (alvo > 8) {
        interpretacao = {
          texto:
            'Acima da faixa usual na SARA (6–8 mL/kg). Confirme a indicação e acompanhe pressão de platô e driving pressure.',
          nivel: 'atencao',
        }
      }
      if (alvo === 6) {
        interpretacao = {
          texto:
            'Alvo inicial de 6 mL/kg de peso predito, dentro da faixa usual na SARA. Reduza até 4 mL/kg se a driving pressure ou o platô estiverem altos.',
          nivel: 'ok',
        }
      }

      return {
        valor: fmt(vt, 0),
        unidade: 'mL',
        rotulo: 'Volume corrente',
        linhas: [
          { rotulo: 'Alvo', valor: `${fmt(alvo, 1)} mL/kg` },
          { rotulo: 'Faixa 6–8 mL/kg (usual na SARA)', valor: faixa6a8 },
          { rotulo: 'Faixa 6–10 mL/kg', valor: faixa6a10 },
        ],
        interpretacao,
        formula: 'Volume corrente = PBW × alvo (mL/kg)',
        referencia:
          'AMIB, Orientações Práticas de Ventilação Mecânica, 2024; ARDSNet (2000) para a estratégia de 6 mL/kg.',
      }
    },
  },
  {
    id: 'volume-minuto',
    nome: 'Volume minuto',
    descricao: 'Volume de ar movimentado por minuto a partir do volume corrente e da frequência.',
    grupo: 'Ventilação',
    campos: [
      {
        tipo: 'numero',
        id: 'vt',
        rotulo: 'Volume corrente',
        unidade: 'mL',
        min: 100,
        max: 1200,
        passo: 10,
        placeholder: 'Ex.: 450',
        ajuda: 'Use o volume corrente efetivamente entregue no ventilador.',
      },
      {
        tipo: 'numero',
        id: 'fr',
        rotulo: 'Frequência respiratória',
        unidade: 'rpm',
        min: 5,
        max: 60,
        passo: 1,
        placeholder: 'Ex.: 14',
      },
    ],
    calcular: (valores) => {
      const vt = num(valores, 'vt')
      const fr = num(valores, 'fr')
      const vm = (vt * fr) / 1000
      let nivel: 'ok' | 'atencao' | 'info' = 'ok'
      let texto = 'Volume minuto dentro de uma faixa habitual em ventilação controlada (5–10 L/min).'
      if (vm > 10) {
        nivel = 'atencao'
        texto =
          'Volume minuto elevado. Avalie demanda metabólica, acidose e o custo em pressões; volume minuto alto está associado a pior desfecho em SARA.'
      } else if (vm < 5) {
        nivel = 'atencao'
        texto = 'Volume minuto baixo. Avalie hipoventilação, sedação excessiva e necessidade de suporte.'
      }
      return {
        valor: fmt(vm, 1),
        unidade: 'L/min',
        rotulo: 'Volume minuto',
        linhas: [
          { rotulo: 'Volume corrente', valor: `${fmt(vt, 0)} mL` },
          { rotulo: 'Frequência respiratória', valor: `${fmt(fr, 0)} rpm` },
        ],
        interpretacao: { texto, nivel },
        formula: 'Volume minuto = Vt × FR ÷ 1000',
        referencia:
          'AMIB, Orientações Práticas de Ventilação Mecânica, 2024. Faixa de referência aproximada; interpretar conforme demanda e PaCO₂.',
      }
    },
  },
  {
    id: 'pf',
    nome: 'Relação P/F',
    descricao: 'Relação PaO₂/FiO₂ com classificação de Berlim para a gravidade da SDRA.',
    grupo: 'Oxigenação',
    campos: [
      {
        tipo: 'numero',
        id: 'pao2',
        rotulo: 'PaO₂',
        unidade: 'mmHg',
        min: 20,
        max: 600,
        passo: 1,
        placeholder: 'Ex.: 90',
        ajuda: 'Valor da gasometria arterial.',
      },
      {
        tipo: 'numero',
        id: 'fio2',
        rotulo: 'FiO₂',
        unidade: '%',
        min: 21,
        max: 100,
        passo: 1,
        placeholder: 'Ex.: 40',
      },
    ],
    calcular: (valores) => {
      const pao2 = num(valores, 'pao2')
      const fio2 = num(valores, 'fio2')
      const razao = pao2 / (fio2 / 100)

      let nivel: 'ok' | 'info' | 'atencao' | 'alerta' = 'info'
      let classificacao = 'Sem critério de SDRA pela relação P/F'
      if (razao <= 300 && razao > 200) {
        classificacao = 'SDRA leve (201–300)'
        nivel = 'atencao'
      } else if (razao <= 200 && razao > 100) {
        classificacao = 'SDRA moderada (101–200)'
        nivel = 'atencao'
      } else if (razao <= 100) {
        classificacao = 'SDRA grave (≤100)'
        nivel = 'alerta'
      }

      return {
        valor: fmt(razao, 0),
        unidade: 'mmHg',
        rotulo: 'Relação PaO₂/FiO₂',
        linhas: [
          { rotulo: 'PaO₂', valor: `${fmt(pao2, 0)} mmHg` },
          { rotulo: 'FiO₂', valor: `${fmt(fio2, 0)}%` },
          { rotulo: 'Classificação de Berlim', valor: classificacao },
        ],
        interpretacao: {
          texto: `${classificacao}. A classificação de Berlim exige PEEP ≥ 5 cmH₂O, opacidades bilaterais e causa identificada, sem edema cardiogênico como causa principal. A relação isolada não define SDRA.`,
          nivel,
        },
        formula: 'Relação P/F = PaO₂ ÷ (FiO₂ ÷ 100)',
        referencia:
          'Definição de Berlim (ARDS Definition Task Force, JAMA, 2012). Citada separadamente da AMIB. AMIB, Orientações Práticas de VM, 2024.',
      }
    },
  },
  {
    id: 'driving-pressure',
    nome: 'Driving pressure',
    descricao: 'Pressão de distensão do sistema respiratório: platô menos PEEP total.',
    grupo: 'Mecânica',
    campos: [
      {
        tipo: 'numero',
        id: 'pplat',
        rotulo: 'Pressão de platô',
        unidade: 'cmH₂O',
        min: 5,
        max: 60,
        passo: 1,
        placeholder: 'Ex.: 24',
        ajuda: 'Medida em pausa inspiratória, sem esforço do paciente.',
      },
      {
        tipo: 'numero',
        id: 'peep',
        rotulo: 'PEEP total',
        unidade: 'cmH₂O',
        min: 0,
        max: 30,
        passo: 1,
        placeholder: 'Ex.: 8',
        ajuda: 'Inclua a autoPEEP se estiver medindo a PEEP total.',
      },
    ],
    calcular: (valores) => {
      const pplat = num(valores, 'pplat')
      const peep = num(valores, 'peep')
      const dp = pplat - peep
      return {
        valor: fmt(dp, 0),
        unidade: 'cmH₂O',
        rotulo: 'Driving pressure',
        linhas: [
          { rotulo: 'Pressão de platô', valor: `${fmt(pplat, 0)} cmH₂O` },
          { rotulo: 'PEEP total', valor: `${fmt(peep, 0)} cmH₂O` },
        ],
        interpretacao: {
          texto:
            dp > 15
              ? 'Driving pressure acima de 15 cmH₂O está associada a pior desfecho em SARA. Reveja volume corrente, PEEP e causa da redução de complacência.'
              : 'Driving pressure ≤ 15 cmH₂O está dentro do alvo habitualmente recomendado em ventilação protetora.',
          nivel: dp > 15 ? 'atencao' : 'ok',
        },
        formula: 'Driving pressure = Pplatô − PEEP',
        referencia:
          'AMIB, Orientações Práticas de Ventilação Mecânica, 2024; Amato et al., NEJM, 2015.',
      }
    },
  },
  {
    id: 'complacencia',
    nome: 'Complacência estática',
    descricao: 'Complacência do sistema respiratório a partir do volume corrente e da pressão de distensão.',
    grupo: 'Mecânica',
    campos: [
      {
        tipo: 'numero',
        id: 'vt',
        rotulo: 'Volume corrente',
        unidade: 'mL',
        min: 100,
        max: 1200,
        passo: 10,
        placeholder: 'Ex.: 450',
        ajuda: 'Use o volume corrente entregue, em pausa inspiratória.',
      },
      {
        tipo: 'numero',
        id: 'pplat',
        rotulo: 'Pressão de platô',
        unidade: 'cmH₂O',
        min: 5,
        max: 60,
        passo: 1,
        placeholder: 'Ex.: 24',
      },
      {
        tipo: 'numero',
        id: 'peep',
        rotulo: 'PEEP total',
        unidade: 'cmH₂O',
        min: 0,
        max: 30,
        passo: 1,
        placeholder: 'Ex.: 8',
      },
    ],
    calcular: (valores) => {
      const vt = num(valores, 'vt')
      const pplat = num(valores, 'pplat')
      const peep = num(valores, 'peep')
      const dp = pplat - peep
      const complacencia = dp > 0 ? vt / dp : 0
      return {
        valor: fmt(complacencia, 0),
        unidade: 'mL/cmH₂O',
        rotulo: 'Complacência estática',
        linhas: [
          { rotulo: 'Driving pressure', valor: `${fmt(dp, 0)} cmH₂O` },
          { rotulo: 'Volume corrente', valor: `${fmt(vt, 0)} mL` },
        ],
        interpretacao: {
          texto:
            'Quanto menor a complacência, maior a rigidez do sistema respiratório. Compare com a evolução do paciente e com a driving pressure; valores isolados não definem conduta.',
          nivel: complacencia < 30 ? 'atencao' : 'info',
        },
        formula: 'Complacência estática = Vt ÷ (Pplatô − PEEP)',
        referencia:
          'AMIB, Orientações Práticas de Ventilação Mecânica, 2024. Referência aproximada: 50–70 mL/cmH₂O em pulmões normais; valores abaixo de 40 sugerem complacência reduzida. Interpretar conforme a doença de base.',
      }
    },
  },
  {
    id: 'resistencia',
    nome: 'Resistência de vias aéreas',
    descricao: 'Resistência ao fluxo a partir da diferença entre pico e platô e do fluxo inspiratório.',
    grupo: 'Mecânica',
    campos: [
      {
        tipo: 'numero',
        id: 'pip',
        rotulo: 'Pressão de pico (PIP)',
        unidade: 'cmH₂O',
        min: 5,
        max: 70,
        passo: 1,
        placeholder: 'Ex.: 32',
        ajuda: 'Pico de pressão durante a inspiração.',
      },
      {
        tipo: 'numero',
        id: 'pplat',
        rotulo: 'Pressão de platô',
        unidade: 'cmH₂O',
        min: 5,
        max: 60,
        passo: 1,
        placeholder: 'Ex.: 24',
      },
      {
        tipo: 'numero',
        id: 'fluxo',
        rotulo: 'Fluxo inspiratório',
        unidade: 'L/min',
        min: 10,
        max: 120,
        passo: 1,
        placeholder: 'Ex.: 60',
        ajuda: 'Fluxo constante programado ou o fluxo médio entregue.',
      },
    ],
    calcular: (valores) => {
      const pip = num(valores, 'pip')
      const pplat = num(valores, 'pplat')
      const fluxo = num(valores, 'fluxo')
      const fluxoLs = fluxo / 60
      const resistencia = fluxoLs > 0 ? (pip - pplat) / fluxoLs : 0
      return {
        valor: fmt(resistencia, 1),
        unidade: 'cmH₂O/L/s',
        rotulo: 'Resistência de vias aéreas',
        linhas: [
          { rotulo: 'Gradiente pico − platô', valor: `${fmt(pip - pplat, 0)} cmH₂O` },
          { rotulo: 'Fluxo inspiratório', valor: `${fmt(fluxoLs, 2)} L/s` },
        ],
        interpretacao: {
          texto:
            resistencia > 15
              ? 'Resistência elevada. Considere broncoespasmo, secreção, tubo de pequeno calibre ou circuito; avalie aspiração, broncodilatador e ajuste de fluxo.'
              : 'Resistência dentro de faixa habitualmente aceitável. Valores muito baixos também merecem conferência da medida.',
          nivel: resistencia > 15 ? 'atencao' : 'ok',
        },
        formula: 'Resistência = (PIP − Pplatô) ÷ (fluxo ÷ 60)',
        referencia:
          'AMIB, Orientações Práticas de Ventilação Mecânica, 2024. Referência aproximada: até 10 cmH₂O/L/s; acima de 15 sugere aumento relevante. A resistência do tubo endotraqueal contribui para o valor medido.',
      }
    },
  },
  {
    id: 'ie',
    nome: 'Relação I:E e tempo inspiratório',
    descricao: 'Tempos inspiratório e expiratório a partir da frequência e da relação I:E ajustada.',
    grupo: 'Ventilação',
    campos: [
      {
        tipo: 'numero',
        id: 'fr',
        rotulo: 'Frequência respiratória',
        unidade: 'rpm',
        min: 5,
        max: 60,
        passo: 1,
        placeholder: 'Ex.: 14',
      },
      {
        tipo: 'opcao',
        id: 'ie',
        rotulo: 'Relação I:E',
        padrao: '1:2',
        opcoes: [
          { valor: '1:1', rotulo: '1:1' },
          { valor: '1:1.5', rotulo: '1:1,5' },
          { valor: '1:2', rotulo: '1:2' },
          { valor: '1:2.5', rotulo: '1:2,5' },
          { valor: '1:3', rotulo: '1:3' },
          { valor: '1:4', rotulo: '1:4' },
        ],
      },
    ],
    calcular: (valores) => {
      const fr = num(valores, 'fr')
      const rel = String(valores.ie ?? '1:2')
      const exp = Number(rel.split(':')[1] ?? '2')
      const ttot = 60 / fr
      const ti = ttot / (1 + exp)
      const te = ttot - ti
      const expiracaoCurta = exp <= 1.5
      return {
        valor: fmt(ti, 2),
        unidade: 's',
        rotulo: 'Tempo inspiratório',
        linhas: [
          { rotulo: 'Tempo expiratório', valor: `${fmt(te, 2)} s` },
          { rotulo: 'Tempo total do ciclo', valor: `${fmt(ttot, 2)} s` },
          { rotulo: 'Relação I:E', valor: rel.replace('.', ',') },
          { rotulo: 'Frequência', valor: `${fmt(fr, 0)} rpm` },
        ],
        interpretacao: {
          texto: expiracaoCurta
            ? 'Relação com expiração curta. Em pacientes com limitação ao fluxo, isso favorece autoPEEP e hiperinsuflação; monitore a PEEP total.'
            : 'Relação com expiração predominante, habitualmente usada para favorecer o esvaziamento pulmonar e reduzir autoPEEP.',
          nivel: expiracaoCurta ? 'atencao' : 'info',
        },
        formula: 'Ttot = 60 ÷ FR · Ti = Ttot × I ÷ (I + E) · Te = Ttot − Ti',
        referencia:
          'AMIB, Orientações Práticas de Ventilação Mecânica, 2024. Relações 1:1 a 1:2 são habituais; ajuste conforme mecânica e sincronia.',
      }
    },
  },
]

export const grupos = ['Ventilação', 'Oxigenação', 'Mecânica'] as const

export const encontrarCalculadora = (id: string) => calculadoras.find((c) => c.id === id)
