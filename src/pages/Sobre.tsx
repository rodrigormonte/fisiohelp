import {
  AMIB_CITACAO,
  AMIB_URL,
  BERLIM_URL,
  DISCLAIMER,
  REVISAO_DATA,
  REVISAO_NOME,
  VERSAO,
} from '../config'
import { navegar } from '../lib/router'
import {
  AlertIcon,
  BookIcon,
  CalculatorIcon,
  ExternalIcon,
  InfoIcon,
  LungsIcon,
  ShieldIcon,
  UserCheckIcon,
  WaveIcon,
} from '../components/Icons'

export function SobrePage() {
  return (
    <>
      <header className="page-head">
        <span className="eyebrow">
          <InfoIcon size={14} /> Sobre
        </span>
        <h1 className="page-title">Fisiohelp</h1>
        <p className="page-lead">
          Calculadoras e curvas de ventilação mecânica para fisioterapeutas intensivistas e
          cardiorrespiratórios. Versão {VERSAO}, em português do Brasil.
        </p>
      </header>

      <div className="sobre-lista">
        <section className="sobre-card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <LungsIcon size={20} /> O que tem aqui
          </h2>
          <ul>
            <li>
              <b>8 calculadoras:</b> peso predito, volume corrente alvo (6–10 mL/kg, com
              destaque para 6–8 na SARA), volume minuto, relação P/F com classificação de
              Berlim, driving pressure, complacência estática, resistência de vias aéreas e
              relação I:E.
            </li>
            <li>
              <b>11 fichas de curvas:</b> VCV, PCV e PSV de referência, mais as oito
              assincronias do Tema 6 da AMIB — disparo ineficaz, duplo disparo, disparo
              reverso, autodisparo, fluxo insuficiente, fluxo excessivo, ciclagem precoce e
              ciclagem tardia.
            </li>
            <li>
              <b>Interpretação em duas etapas:</b> primeiro você lê a curva; a sugestão de
              ajuste por modo fica atrás do botão “Ver sugestão”.
            </li>
            <li>
              <b>Funciona offline:</b> depois da primeira visita, o app fica em cache no
              aparelho e abre mesmo sem sinal.
            </li>
          </ul>
        </section>

        <section className="sobre-card">
          <h2>Como usar</h2>
          <ul>
            <li>Escolha uma calculadora, digite os valores e toque em Calcular.</li>
            <li>Confira a fórmula, a unidade e a referência mostradas com o resultado.</li>
            <li>
              Nas curvas, observe a deformação antes de abrir a sugestão de ajuste. A decisão
              final é sempre do profissional.
            </li>
          </ul>
        </section>

        <section className="sobre-card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookIcon size={20} /> Fontes
          </h2>
          <ul>
            <li>
              <a href={AMIB_URL} target="_blank" rel="noreferrer">
                {AMIB_CITACAO}
              </a>{' '}
              <ExternalIcon size={12} /> — base das fórmulas e das fichas de assincronia (Tema
              6).
            </li>
            <li>
              <a href={BERLIM_URL} target="_blank" rel="noreferrer">
                Definição de Berlim — ARDS Definition Task Force (JAMA, 2012)
              </a>{' '}
              <ExternalIcon size={12} /> — usada apenas na classificação da relação P/F.
            </li>
            <li>
              ARDSNet (NEJM, 2000) — estratégia de volume corrente de 6 mL/kg de peso predito.
            </li>
          </ul>
        </section>

        <section className="sobre-card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <WaveIcon size={20} /> Sobre as imagens das curvas
          </h2>
          <p>
            Os desenhos são esquemáticos e originais, feitos em SVG para este app, inspirados
            nas descrições do texto da AMIB. Não são cópias das figuras da diretriz e não
            reproduzem telas de marcas de ventiladores. Servem para reconhecer o padrão, não
            para medir valores.
          </p>
        </section>

        <section className="sobre-card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ShieldIcon size={20} /> Privacidade
          </h2>
          <p>
            O app não tem cadastro, login, servidor, banco de dados, anúncios ou analytics.
            Nenhum dado de paciente é solicitado, transmitido ou armazenado. Apenas os
            favoritos e a preferência de tema ficam no <code>localStorage</code> deste
            aparelho.
          </p>
        </section>

        <section className="sobre-card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UserCheckIcon size={20} /> Revisão clínica
          </h2>
          {REVISAO_NOME ? (
            <p>
              Conteúdo revisado por <b>{REVISAO_NOME}</b>
              {REVISAO_DATA ? ` em ${REVISAO_DATA}` : ''}. As sugestões de ajuste são apoio à
              decisão e não substituem a avaliação clínica.
            </p>
          ) : (
            <p>
              O conteúdo foi redigido a partir da AMIB 2024 e está <b>pendente de assinatura
              de revisão clínica</b>. Cada ficha mostra o estado da revisão no rodapé.
            </p>
          )}
        </section>

        <section className="disclaimer-lg">
          <AlertIcon />
          <div>
            <b>Aviso importante</b>
            {DISCLAIMER}
          </div>
        </section>

        <section className="sobre-card">
          <h2>Atalhos</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            <button className="btn btn-ghost" type="button" onClick={() => navegar('/calculadoras')}>
              <CalculatorIcon size={17} /> Calculadoras
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => navegar('/curvas')}>
              <WaveIcon size={17} /> Curvas
            </button>
          </div>
        </section>
      </div>
    </>
  )
}
