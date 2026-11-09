# Segurança e arquitetura do Fisiohelp

Este documento registra por que o Fisiohelp é um **site estático/PWA sem backend** e como os
requisitos de segurança foram tratados.

## Escopo

- Front-end React + Vite + TypeScript, empacotado como site estático.
- Sem servidor de aplicação, sem API, sem banco de dados, sem login.
- Sem coleta de dados de paciente, sem analytics e sem cookies.
- Favoritos e tema ficam no `localStorage` do próprio aparelho.
- Imagens de curvas são componentes SVG originais; ícones e PNGs são arquivos estáticos.

## Matriz dos requisitos

### 1. Blindagem da calculadora

**Atende.** Não existe `eval`, `Function`, `exec` ou parser de expressões no código do app.
As fórmulas são funções puras em `src/data/calculadoras.ts`, e os campos são validados em
`src/lib/validacao.ts`:

- apenas inteiros/decimais simples, com vírgula ou ponto;
- rejeição de hexadecimal, notação científica, `Infinity`, `NaN` e strings longas;
- limite de 12 caracteres por campo;
- mínimo e máximo por campo;
- validações cruzadas (ex.: platô > PEEP; pico ≥ platô).

Como não há interpretação de expressões, não há risco de estouro de pilha ou de memória
causado por parser.

### 2. Imagens e path traversal

**Não se aplica ao modelo atual.** As imagens são servidas pelo próprio host estático:

- `public/icon.svg`, `public/pwa-*.png` e `public/maskable-512.png` são referenciados por
  caminhos literais no HTML/JSX;
- as curvas são componentes React (`src/components/CurveDiagram.tsx`), não arquivos
  consultados por URL;
- o `id` de uma ficha vem da rota, mas é usado somente em uma busca contra a lista fixa
  `fichas` (`encontrarFicha`), sem concatenação de caminho.

Se um dia existir uma API de imagens, a regra é: allowlist de IDs/slugs, nunca montar
caminho de arquivo com entrada do usuário e servir apenas de um diretório público delimitado.

### 3. Tratamento de erros

**Atende no front-end.** Não há endpoints de API. O app:

- valida os campos e mostra mensagens genéricas e amigáveis;
- mostra “não encontrada” para rota/ficha inexistente;
- tem um `ErrorBoundary` que exibe uma tela de recuperação em erro inesperado;
- não mostra stack trace, caminho interno, versão de biblioteca nem detalhe de infraestrutura;
- só registra detalhes técnicos no console em modo de desenvolvimento.

Se houver backend no futuro: `try/catch` em todos os endpoints, respostas genéricas e
status HTTP adequados (400, 404, 429, 500), sem detalhes internos.

### 4. Rate limiting

**Não se aplica.** Não há servidor de aplicação nem endpoint para limitar. O site é servido
por CDN/hospedagem estática (GitHub Pages, Netlify ou Cloudflare Pages), que absorve o
tráfego e aplica as proteções da plataforma.

Se um backend for criado, o rate limiting deve ficar no edge/proxy (Cloudflare, por exemplo)
ou em middleware no servidor, por IP e por rota sensível.

## Controles adicionais aplicados

- **CSP:** uma `Content-Security-Policy` é injetada apenas no build de produção
  (`vite.config.ts`), sem atrapalhar o servidor de desenvolvimento. Ela permite apenas
  scripts, estilos, imagens, manifesto e service worker do próprio site.
  `style-src` inclui `'unsafe-inline'` porque o app usa atributos `style` pontuais; não há
  HTML de usuário nem `dangerouslySetInnerHTML`.
- **Sem segredos no front-end:** não há chaves de API, tokens ou credenciais.
- **Links externos:** abrem com `rel="noreferrer"`.
- **Armazenamento local:** tema e favoritos são validados por tipo e formato antes de serem
  usados; valores corrompidos caem no padrão seguro.
- **Dependências:** manter o lockfile versionado e rodar auditoria antes de publicar.
  A auditoria atual (`bun audit`) aponta 3 avisos em dependências **de build** do
  `vite-plugin-pwa`/`workbox-build` (`deepmerge`, `glob`, `minimatch`). Elas não entram no
  bundle enviado ao navegador e a correção disponível exige mudança de faixa ainda não
  suportada pelo plugin; acompanhar as atualizações upstream.
- **Source maps:** o build de produção não publica source maps.

## Limitações conhecidas

- `frame-ancestors` não funciona em CSP via `<meta>`; para bloqueio de iframe é necessário
  um host que permita cabeçalhos HTTP (Netlify/Cloudflare) ou configuração equivalente.
- GitHub Pages não permite cabeçalhos HTTP personalizados; a CSP via meta cobre o restante.
- Rate limiting de verdade só existe com infraestrutura de servidor/edge.

## Verificação rápida

```bash
cd fisio-vm
bun run build
grep -rnE "eval\\(|new Function|dangerouslySetInnerHTML|innerHTML" src || echo "sem execução dinâmica"
bun run preview
```

Depois, testar no navegador: calculadora com `0x10`, `1e3`, `12,5,5` e texto longo deve
recusar; o app deve continuar funcionando offline; o console não deve mostrar violação de
CSP.
