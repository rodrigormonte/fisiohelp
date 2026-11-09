# Fisiohelp

PWA de apoio à decisão para fisioterapeutas intensivistas e cardiorrespiratórios: calculadoras de ventilação mecânica e fichas de curvas/assincronias.

- **8 calculadoras:** peso predito (PBW), volume corrente alvo (6–10 mL/kg, com destaque para 6–8 na SARA), volume minuto, relação P/F com classificação de Berlim, driving pressure, complacência estática, resistência de vias aéreas e relação I:E.
- **11 fichas de curvas:** VCV, PCV e PSV de referência + as oito assincronias do Tema 6 da AMIB. Desenhos esquemáticos originais em SVG, com a sugestão de ajuste escondida atrás do botão “Ver sugestão”.
- **Sem backend, sem login, sem dados de paciente.** Favoritos e tema ficam apenas no `localStorage` do aparelho.
- **Offline:** depois da primeira visita, o service worker mantém o app em cache.

## Rodar localmente

Requisitos: Bun (ou Node 20+ com npm).

```bash
bun install
bun run dev
```

O Vite mostra o endereço local (normalmente `http://localhost:5173`).

## Build de produção

```bash
bun run build
bun run preview
```

O build gera a pasta `dist/`, que é um site estático. Para publicar, basta subir o conteúdo de `dist/` em qualquer hospedagem estática (Netlify, Cloudflare Pages, GitHub Pages). O `base: './'` já permite servir em subpasta.

### GitHub Pages

O workflow em `.github/workflows/deploy.yml` publica o app a cada push na branch `main`. Antes do primeiro deploy, no GitHub, abra **Settings → Pages** e escolha **GitHub Actions** como fonte. O endereço fica no formato `https://<usuario>.github.io/<repositorio>/`.

## Segurança

O Fisiohelp é estático de propósito: sem backend, sem login, sem API, sem analytics e sem dados de paciente. As decisões e a matriz de requisitos estão em [`docs/seguranca.md`](docs/seguranca.md).

- Campos numéricos passam por validação estrita (`src/lib/validacao.ts`): sem hexadecimal, notação científica, `Infinity`, `NaN` ou expressões; limite de 12 caracteres e faixa mínima/máxima por campo.
- Tema e favoritos são validados ao serem lidos do `localStorage`; conteúdo corrompido cai no padrão.
- Um `ErrorBoundary` evita tela em branco e mostra mensagem genérica, sem stack trace.
- O build de produção injeta uma `Content-Security-Policy` restritiva via `<meta>`.
- Não há `eval`, `Function`, `innerHTML` nem `dangerouslySetInnerHTML`.

Para conferir:

```bash
bun run build
grep -rnE "eval\(|new Function|dangerouslySetInnerHTML|innerHTML" src
bun run preview
```

## Estrutura

```
public/            ícone e ícones PNG do PWA
src/
  components/      diagramas SVG e ícones
  data/            calculadoras e fichas clínicas
  lib/             roteamento por hash e localStorage
  pages/           telas
  App.tsx          navegação inferior, tema e aviso inicial
  styles.css       sistema visual claro/escuro
docs/
  revisao-fichas.md  folha de revisão clínica das 11 fichas
  seguranca.md       matriz de segurança e decisões de arquitetura
  icon-preview.png   prévia do ícone
.github/workflows/
  deploy.yml         publicação automática no GitHub Pages
```

## Conteúdo clínico

Fórmulas e condutas baseadas em **AMIB. Orientações Práticas de Ventilação Mecânica, 2024** ([PDF](https://d1xe7tfg0uwul9.cloudfront.net/amib-portal/wp-content/uploads/2024/09/12100249/Orientacoes-Praticas-de-Ventilacao-Mecanica-Interativo-SET-11-1.pdf)). A classificação de Berlim é citada separadamente (ARDS Definition Task Force, JAMA, 2012).

As imagens são **desenhos esquemáticos originais**, inspirados na descrição das curvas pela AMIB — não são recortes das figuras da diretriz nem capturas de telas de ventiladores.

O conteúdo está pendente de assinatura de revisão clínica. Para registrar a revisão, preencha `REVISAO_NOME` e `REVISAO_DATA` em `src/config.ts`.

## Aviso

Ferramenta de apoio à decisão. Não substitui a avaliação clínica nem o julgamento do profissional. Confira sempre os valores no ventilador e consulte a diretriz vigente.
