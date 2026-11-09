import { calculadoras } from '../data/calculadoras'
import { fichas } from '../data/fichas'
import { navegar } from '../lib/router'
import {
  CalculatorIcon,
  ChevronRightIcon,
  StarIcon,
  WaveIcon,
} from '../components/Icons'

type Props = {
  favoritos: string[]
  alternarFavorito: (chave: string) => void
}

export function FavoritosPage({ favoritos, alternarFavorito }: Props) {
  const calcFavoritas = calculadoras.filter((calc) => favoritos.includes(`calc:${calc.id}`))
  const fichasFavoritas = fichas.filter((ficha) => favoritos.includes(`ficha:${ficha.id}`))
  const vazio = calcFavoritas.length === 0 && fichasFavoritas.length === 0

  return (
    <>
      <header className="page-head">
        <span className="eyebrow">
          <StarIcon size={14} /> Favoritos
        </span>
        <h1 className="page-title">Seu acesso rápido</h1>
        <p className="page-lead">
          O que você marcar com a estrela fica aqui. Os favoritos são guardados apenas neste
          aparelho, no armazenamento local do navegador.
        </p>
      </header>

      {vazio ? (
        <div className="card" style={{ padding: 28, textAlign: 'center' }}>
          <span
            className="card-icon"
            style={{ margin: '0 auto 12px', width: 52, height: 52, borderRadius: 15 }}
          >
            <StarIcon size={24} />
          </span>
          <h2 style={{ fontSize: '1.05rem' }}>Nenhum favorito ainda</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: 6 }}>
            Toque na estrela de uma calculadora ou de uma ficha de curva para guardar aqui.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 8,
              justifyContent: 'center',
              marginTop: 18,
              flexWrap: 'wrap',
            }}
          >
            <button className="btn btn-primary" type="button" onClick={() => navegar('/calculadoras')}>
              <CalculatorIcon size={17} /> Calculadoras
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => navegar('/curvas')}>
              <WaveIcon size={17} /> Curvas
            </button>
          </div>
        </div>
      ) : (
        <>
          {calcFavoritas.length > 0 && (
            <section>
              <h2 className="section-title">
                <span>Calculadoras</span>
                <span>{calcFavoritas.length}</span>
              </h2>
              <div className="grid-cards">
                {calcFavoritas.map((calc) => (
                  <article className="card-row" key={calc.id}>
                    <button
                      type="button"
                      className="card-link"
                      onClick={() => navegar(`/calculadoras/${calc.id}`)}
                    >
                      <span className="card-icon">
                        <CalculatorIcon />
                      </span>
                      <span className="card-body">
                        <span className="card-title" style={{ display: 'block' }}>
                          {calc.nome}
                        </span>
                        <span className="card-desc" style={{ display: 'block' }}>
                          {calc.descricao}
                        </span>
                      </span>
                      <ChevronRightIcon className="card-chevron" />
                    </button>
                    <button
                      type="button"
                      className="fav-btn"
                      data-ativo="true"
                      aria-label={`Remover ${calc.nome} dos favoritos`}
                      aria-pressed="true"
                      onClick={() => alternarFavorito(`calc:${calc.id}`)}
                    >
                      <StarIcon size={19} preenchido />
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          {fichasFavoritas.length > 0 && (
            <section>
              <h2 className="section-title">
                <span>Curvas &amp; assincronias</span>
                <span>{fichasFavoritas.length}</span>
              </h2>
              <div className="grid-cards">
                {fichasFavoritas.map((ficha) => (
                  <article className="card-row" key={ficha.id}>
                    <button
                      type="button"
                      className="card-link"
                      onClick={() => navegar(`/curvas/${ficha.id}`)}
                    >
                      <span className="card-icon">
                        <WaveIcon />
                      </span>
                      <span className="card-body">
                        <span className="card-title" style={{ display: 'block' }}>
                          {ficha.nome}
                        </span>
                        <span className="card-desc" style={{ display: 'block' }}>
                          {ficha.resumo}
                        </span>
                      </span>
                      <ChevronRightIcon className="card-chevron" />
                    </button>
                    <button
                      type="button"
                      className="fav-btn"
                      data-ativo="true"
                      aria-label={`Remover ${ficha.nome} dos favoritos`}
                      aria-pressed="true"
                      onClick={() => alternarFavorito(`ficha:${ficha.id}`)}
                    >
                      <StarIcon size={19} preenchido />
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}
