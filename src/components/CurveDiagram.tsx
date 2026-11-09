import { useMemo } from 'react'
import type { DiagramaId } from '../types'

type Ciclo = {
  inicio: number
  ti: number
  vt: number
  pico: number
  plato: number
  tipo: 'vcv' | 'pcv'
  disparo?: boolean
}

type Cenario = {
  ciclos: Ciclo[]
  banda?: [number, number]
  rotuloBanda?: string
  ajustes?: { alvo: 'paw' | 'flow' | 'vol'; t: number; sigma: number; amp: number }[]
}

const T = 6.4
const N = 320
const PEEP = 5

const cicloVcv = (inicio: number, ti = 1, vt = 500, pico = 31, plato = 22): Ciclo => ({
  inicio,
  ti,
  vt,
  pico,
  plato,
  tipo: 'vcv',
})

const cicloPcv = (inicio: number, ti = 1, vt = 480, plato = 25, disparo = false): Ciclo => ({
  inicio,
  ti,
  vt,
  pico: plato,
  plato,
  tipo: 'pcv',
  disparo,
})

function construir(id: DiagramaId): Cenario {
  switch (id) {
    case 'vcv':
      return { ciclos: [cicloVcv(0.4), cicloVcv(3.4)] }
    case 'pcv':
      return { ciclos: [cicloPcv(0.4), cicloPcv(3.4)] }
    case 'psv':
      return {
        ciclos: [cicloPcv(0.55, 0.85, 450, 20, true), cicloPcv(3.55, 0.85, 450, 20, true)],
      }
    case 'disparo-ineficaz':
      return {
        ciclos: [cicloVcv(0.4), cicloVcv(3.4)],
        banda: [2.0, 2.65],
        rotuloBanda: 'esforço sem ciclo',
        ajustes: [
          { alvo: 'paw', t: 2.28, sigma: 0.12, amp: -6.5 },
          { alvo: 'flow', t: 2.28, sigma: 0.1, amp: -0.55 },
        ],
      }
    case 'duplo-disparo':
      return {
        ciclos: [cicloVcv(0.4), cicloVcv(3.15, 0.62, 430), cicloVcv(3.82, 0.85, 450)],
        banda: [3.05, 4.95],
        rotuloBanda: 'dois ciclos sem exalar',
      }
    case 'disparo-reverso':
      return {
        ciclos: [cicloVcv(0.4), cicloVcv(3.4)],
        banda: [3.42, 4.9],
        rotuloBanda: 'esforço durante o ciclo',
        ajustes: [
          { alvo: 'paw', t: 3.62, sigma: 0.14, amp: -7 },
          { alvo: 'flow', t: 3.62, sigma: 0.11, amp: -0.5 },
          { alvo: 'paw', t: 4.65, sigma: 0.16, amp: -4 },
          { alvo: 'flow', t: 4.65, sigma: 0.14, amp: 0.5 },
          { alvo: 'vol', t: 4.72, sigma: 0.18, amp: 55 },
        ],
      }
    case 'autodisparo':
      return {
        ciclos: [
          cicloVcv(0.3, 0.68, 450),
          cicloVcv(1.5, 0.68, 450),
          cicloVcv(2.7, 0.68, 450),
          cicloVcv(3.9, 0.68, 450),
          cicloVcv(5.1, 0.68, 450),
        ],
        banda: [0.15, 5.95],
        rotuloBanda: 'ciclos sem esforço do paciente',
      }
    case 'fluxo-insuficiente':
      return {
        ciclos: [cicloVcv(0.4), cicloVcv(3.4)],
        banda: [0.45, 1.3],
        rotuloBanda: 'concavidade na pressão',
        ajustes: [
          { alvo: 'paw', t: 0.82, sigma: 0.23, amp: -7 },
          { alvo: 'paw', t: 3.82, sigma: 0.23, amp: -7 },
        ],
      }
    case 'fluxo-excessivo':
      return {
        ciclos: [cicloVcv(0.4), cicloVcv(3.4)],
        banda: [0.38, 0.78],
        rotuloBanda: 'pico precoce',
        ajustes: [
          { alvo: 'paw', t: 0.54, sigma: 0.06, amp: 15 },
          { alvo: 'flow', t: 0.51, sigma: 0.05, amp: 0.45 },
          { alvo: 'paw', t: 3.54, sigma: 0.06, amp: 15 },
          { alvo: 'flow', t: 3.51, sigma: 0.05, amp: 0.45 },
        ],
      }
    case 'ciclagem-precoce':
      return {
        ciclos: [cicloVcv(0.4, 0.62, 450), cicloVcv(3.4, 0.62, 450)],
        banda: [0.95, 1.55],
        rotuloBanda: 'esforço continua após ciclar',
        ajustes: [
          { alvo: 'flow', t: 1.18, sigma: 0.12, amp: 0.55 },
          { alvo: 'paw', t: 1.18, sigma: 0.12, amp: -2.5 },
          { alvo: 'vol', t: 1.24, sigma: 0.16, amp: 55 },
          { alvo: 'flow', t: 4.18, sigma: 0.12, amp: 0.55 },
          { alvo: 'paw', t: 4.18, sigma: 0.12, amp: -2.5 },
          { alvo: 'vol', t: 4.24, sigma: 0.16, amp: 55 },
        ],
      }
    case 'ciclagem-tardia':
      return {
        ciclos: [cicloPcv(0.4, 1.6), cicloPcv(3.4, 1.6)],
        banda: [1.85, 2.15],
        rotuloBanda: 'pressão sobe no fim',
        ajustes: [
          { alvo: 'paw', t: 1.95, sigma: 0.1, amp: 8.5 },
          { alvo: 'flow', t: 1.93, sigma: 0.12, amp: 0.3 },
          { alvo: 'paw', t: 4.95, sigma: 0.1, amp: 8.5 },
          { alvo: 'flow', t: 4.93, sigma: 0.12, amp: 0.3 },
        ],
      }
  }
}

function contribuicao(t: number, c: Ciclo) {
  const u = (t - c.inicio) / c.ti
  if (u < 0) return { f: 0, v: 0, p: 0 }

  if (u <= 1) {
    if (c.tipo === 'vcv') {
      const p =
        u < 0.12
          ? PEEP + (c.pico - PEEP) * (u / 0.12)
          : u < 0.42
            ? c.pico + (c.plato - c.pico) * ((u - 0.12) / 0.3)
            : c.plato
      return { f: 1, v: c.vt * u, p }
    }
    const subida = Math.min(1, u / 0.07)
    const f = 0.95 * Math.exp(-u * 1.7)
    const v = (c.vt * (1 - Math.exp(-u * 2.6))) / (1 - Math.exp(-2.6))
    return { f, v, p: PEEP + (c.plato - PEEP) * subida }
  }

  const tau = (u - 1) * c.ti
  return {
    f: -0.95 * Math.exp(-tau / 0.5),
    v: c.vt * Math.exp(-tau / 0.38),
    p: PEEP + (c.plato - PEEP) * Math.exp(-tau / 0.14),
  }
}

const dominio = (valores: number[]) => {
  let min = Math.min(...valores)
  let max = Math.max(...valores)
  if (max - min < 1e-6) {
    max += 1
    min -= 1
  }
  const pad = (max - min) * 0.14
  return [min - pad, max + pad] as const
}

const trilhas = [
  { chave: 'paw', titulo: 'Pressão', unidade: 'cmH₂O', cor: 'var(--blue)' },
  { chave: 'flow', titulo: 'Fluxo', unidade: 'L/s', cor: 'var(--primary)' },
  { chave: 'vol', titulo: 'Volume', unidade: 'mL', cor: 'var(--gold)' },
] as const

export function CurveDiagram({ id }: { id: DiagramaId }) {
  const dados = useMemo(() => {
    const cenario = construir(id)
    const ts = Array.from({ length: N }, (_, i) => (i / (N - 1)) * T)
    let paw: number[] = []
    let flow: number[] = []
    let vol: number[] = []

    for (const t of ts) {
      let p = PEEP
      let f = 0
      let v = 0
      for (const c of cenario.ciclos) {
        const r = contribuicao(t, c)
        p = Math.max(p, r.p)
        f += r.f
        v += r.v
        if (c.disparo) {
          const d = (t - c.inicio) / 0.22
          if (d > -1 && d < 0) {
            const sino = Math.exp(-Math.pow(d + 0.5, 2) / 0.045)
            p -= 2.6 * sino
            f -= 0.38 * sino
          }
        }
      }
      paw.push(p)
      flow.push(f)
      vol.push(v)
    }

    if (cenario.ajustes) {
      for (const a of cenario.ajustes) {
        const alvo = a.alvo === 'paw' ? paw : a.alvo === 'flow' ? flow : vol
        for (let i = 0; i < ts.length; i++) {
          const d = ts[i] - a.t
          alvo[i] += a.amp * Math.exp(-(d * d) / (2 * a.sigma * a.sigma))
        }
      }
    }

    return { ts, paw, flow, vol, banda: cenario.banda, rotuloBanda: cenario.rotuloBanda }
  }, [id])

  const W = 340
  const LANE = 62
  const GAP = 22
  const TOP = 26
  const H = TOP + trilhas.length * LANE + (trilhas.length - 1) * GAP + 16
  const X0 = 12
  const X1 = W - 10

  const x = (t: number) => X0 + (t / T) * (X1 - X0)

  const bandas =
    dados.banda &&
    (() => {
      const x0 = x(dados.banda[0])
      const x1 = x(dados.banda[1])
      return { x: x0, w: x1 - x0, centro: (x0 + x1) / 2 }
    })()

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        role="img"
        aria-label={`Curvas esquemáticas de pressão, fluxo e volume — ${id.replace(/-/g, ' ')}`}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {bandas && (
          <rect
            x={bandas.x}
            y={TOP - 4}
            width={bandas.w}
            height={H - TOP - 6}
            rx={6}
            fill="var(--amber)"
            opacity={0.1}
            stroke="var(--amber)"
            strokeOpacity={0.45}
            strokeDasharray="3 4"
          />
        )}

        {trilhas.map((trilha, idx) => {
          const valores = dados[trilha.chave]
          const [min, max] = dominio(valores)
          const top = TOP + idx * (LANE + GAP)
          const y = (valor: number) => top + LANE - ((valor - min) / (max - min)) * LANE
          const pontos = dados.ts
            .map((t, i) => `${x(t).toFixed(1)},${y(valores[i]).toFixed(1)}`)
            .join(' ')

          return (
            <g key={trilha.chave}>
              <text x={X0} y={top - 7} fontSize={8.5} fontWeight={700} fill={trilha.cor} letterSpacing="0.04em">
                {trilha.titulo.toUpperCase()}
              </text>
              <text x={X0 + 62} y={top - 7} fontSize={7.5} fill="var(--muted)">
                {trilha.unidade}
              </text>

              {[0.25, 0.75].map((fracao) => (
                <line
                  key={fracao}
                  x1={X0}
                  x2={X1}
                  y1={top + LANE * fracao}
                  y2={top + LANE * fracao}
                  stroke="var(--border)"
                  strokeWidth={0.8}
                  strokeDasharray="2 5"
                />
              ))}

              {(trilha.chave === 'flow' || trilha.chave === 'vol') && min < 0 && max > 0 && (
                <line
                  x1={X0}
                  x2={X1}
                  y1={y(0)}
                  y2={y(0)}
                  stroke="var(--border-strong)"
                  strokeWidth={1}
                />
              )}

              <polyline
                points={pontos}
                fill="none"
                stroke={trilha.cor}
                strokeWidth={2}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </g>
          )
        })}

        {bandas && dados.rotuloBanda && (
          <text
            x={bandas.centro}
            y={10}
            fontSize={7.5}
            fontWeight={700}
            fill="var(--amber)"
            textAnchor="middle"
          >
            {dados.rotuloBanda}
          </text>
        )}

        {[0, 1, 2, 3, 4, 5, 6].map((segundo) => (
          <text
            key={segundo}
            x={x(segundo)}
            y={H - 2}
            fontSize={7}
            fill="var(--muted)"
            textAnchor={segundo === 0 ? 'start' : segundo === 6 ? 'end' : 'middle'}
          >
            {segundo}s
          </text>
        ))}
      </svg>
      <div className="diagrama-legenda" aria-hidden="true">
        <span>
          <i style={{ background: 'var(--blue)' }} /> Pressão
        </span>
        <span>
          <i style={{ background: 'var(--primary)' }} /> Fluxo
        </span>
        <span>
          <i style={{ background: 'var(--gold)' }} /> Volume
        </span>
      </div>
    </div>
  )
}
