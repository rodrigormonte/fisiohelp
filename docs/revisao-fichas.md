# Fisiohelp — folha de revisão das 11 fichas

Este documento é a versão para revisão clínica antes de entrar no app. Para cada ficha, marque:

- ✅ **Aprovado**
- ✏️ **Ajustar** (escreva o que mudar)
- ❌ **Remover**

Base científica: AMIB, *Orientações Práticas de Ventilação Mecânica* (2024), Tema 6 — Assincronia paciente-ventilador. As imagens do app serão **desenhos esquemáticos originais em SVG**, inspirados nas descrições da diretriz, sem copiar as figuras do PDF.

---

## 1. VCV — curva de referência

- **Fase:** referência
- **Modos:** VCV
- **O que a curva mostra:** fluxo inspiratório constante (onda quadrada), volume crescendo de forma linear e pressão subindo até o pico para depois estabilizar no platô. A pressão varia com a resistência e a complacência; o volume e o fluxo são impostos pelo ventilador.
- **Ajuste sugerido:** não se aplica (curva de referência para comparação).
- **Fonte:** AMIB, Tema 5 e Tema 6.

Status: ☐ aprovado ☐ ajustar ☐ remover

Comentários:

---

## 2. PCV — curva de referência

- **Fase:** referência
- **Modos:** PCV
- **O que a curva mostra:** pressão constante no nível ajustado durante a inspiração, fluxo desacelerante e volume dependente da mecânica do paciente. O tempo inspiratório é definido pelo operador.
- **Ajuste sugerido:** não se aplica (curva de referência).
- **Fonte:** AMIB, Tema 5 e Tema 6.

Status: ☐ aprovado ☐ ajustar ☐ remover

Comentários:

---

## 3. PSV — curva de referência

- **Fase:** referência
- **Modos:** PSV
- **O que a curva mostra:** ciclo iniciado pelo paciente, pressão assistida em nível ajustado, fluxo desacelerante e ciclagem pela queda do fluxo inspiratório. O volume corrente é livre e varia com o esforço e a mecânica.
- **Ajuste sugerido:** não se aplica (curva de referência).
- **Fonte:** AMIB, Tema 5 e Tema 6.

Status: ☐ aprovado ☐ ajustar ☐ remover

Comentários:

---

## 4. Disparo ineficaz (B.1)

- **Fase:** disparo
- **Modos:** VCV, PCV, PSV
- **O que a deformação mostra:** o esforço inspiratório do paciente aparece na curva de pressão (deflexão negativa / queda de Pmus) e no fluxo, mas **não gera um ciclo assistido**. O volume não sobe.
- **Causas prováveis:** sensibilidade pouco sensível, fraqueza da musculatura respiratória, depressão do comando neural, hiperinsuflação dinâmica (autoPEEP) e tempo inspiratório mecânico prolongado.
- **Ajuste sugerido por modo:**
  - **VCV:** aumentar a sensibilidade (deixar mais sensível), aumentar o fluxo inspiratório ou diminuir a pausa inspiratória; tratar autoPEEP.
  - **PCV:** aumentar a sensibilidade e reduzir o tempo inspiratório.
  - **PSV:** aumentar a sensibilidade, reduzir o nível de pressão ou aumentar o percentual de ciclagem.
- **Consequência se não corrigir:** aumento do trabalho respiratório, desconforto, disfunção muscular ventilatória e piora clínica.
- **Fonte:** AMIB, Tema 6, B.1.

Status: ☐ aprovado ☐ ajustar ☐ remover

Comentários:

---

## 5. Duplo disparo (B.2)

- **Fase:** disparo / ciclagem
- **Modos:** VCV, PCV, PSV
- **O que a deformação mostra:** dois ciclos consecutivos com exalação incompleta entre eles e **empilhamento de volume**. A Pmus pode estar prolongada e profunda, gerando um segundo disparo.
- **Causas prováveis:** assistência insuficiente, alta demanda ventilatória e tempo inspiratório mecânico menor que o tempo inspiratório neural (ciclagem precoce).
- **Ajuste sugerido por modo:**
  - **VCV:** diminuir o fluxo inspiratório e/ou aumentar o volume corrente dentro dos limites de segurança; adicionar pausa inspiratória; ou mudar para PCV/PSV.
  - **PCV:** aumentar o tempo inspiratório e/ou a pressão controlada, respeitando os limites de volume corrente.
  - **PSV:** aumentar o nível de pressão ou reduzir o percentual de ciclagem.
- **Consequência se não corrigir:** empilhamento de ar, hiperinsuflação, risco de volutrauma/barotrauma e instabilidade hemodinâmica.
- **Fonte:** AMIB, Tema 6, B.2.

Status: ☐ aprovado ☐ ajustar ☐ remover

Comentários:

---

## 6. Disparo reverso (B.3)

- **Fase:** disparo
- **Modos:** modos controlados (VCV/PCV); não ocorre em PSV
- **O que a deformação mostra:** esforço inspiratório que começa **durante a insuflação de um ciclo controlado** e continua na expiração, podendo gerar um novo ciclo. Pode haver pico de fluxo expiratório pouco intenso e queda da pressão inspiratória do meio para o fim da inspiração.
- **Causas prováveis:** sedação profunda ou transição de sedação para ventilação assistida; reflexo desencadeado pela distensão da musculatura diafragmática.
- **Ajuste sugerido:**
  - Reduzir a sedação é a conduta principal, principalmente quando há duplo disparo.
  - Ajustar a frequência respiratória pode ser útil em alguns casos, sem consenso.
  - Em casos intensos, sem possibilidade de reduzir sedação, considerar curarização como última conduta.
- **Consequência se não corrigir:** duplo disparo, hiperinsuflação e piora da interação paciente-ventilador.
- **Fonte:** AMIB, Tema 6, B.3.

Status: ☐ aprovado ☐ ajustar ☐ remover

Comentários:

---

## 7. Autodisparo (B.4)

- **Fase:** disparo
- **Modos:** VCV, PCV, PSV
- **O que a deformação mostra:** o ventilador dispara **sem esforço do paciente**. A frequência respiratória fica maior que a ajustada e os ciclos não são precedidos de sinais de esforço.
- **Causas prováveis:** sensibilidade excessivamente sensível, vazamento no circuito, condensado no circuito, detecção de batimentos cardíacos e grandes variações de pressão torácica.
- **Ajuste sugerido:**
  - Corrigir vazamentos e condensado no circuito.
  - Reduzir progressivamente a sensibilidade (deixar menos sensível) até o autodisparo desaparecer, observando o impacto nos disparos verdadeiros.
- **Consequência se não corrigir:** hiperventilação iatrogênica, alcalose, autoPEEP e desconforto.
- **Fonte:** AMIB, Tema 6, B.4.

Status: ☐ aprovado ☐ ajustar ☐ remover

Comentários:

---

## 8. Fluxo insuficiente (C.1)

- **Fase:** fluxo
- **Modos:** VCV, PCV, PSV
- **O que a deformação mostra:** em **VCV com fluxo quadrado**, aparece uma **concavidade na curva de pressão**. Em **PCV e PSV**, a curva de fluxo pode formar **dois picos** (padrão em “M”) durante a inspiração.
- **Causas prováveis:** aumento da demanda ventilatória (febre, dor, ansiedade, acidose), fluxo inspiratório ajustado baixo ou pressão de suporte insuficiente.
- **Ajuste sugerido por modo:**
  - **VCV:** aumentar o fluxo inspiratório, observando conforto e a curva de pressão; ou mudar para PCV/PSV.
  - **PCV/PSV:** ajustar o tempo de subida (rise time) ou aumentar a pressão controlada/suporte.
  - Tratar as causas de aumento da demanda.
- **Consequência se não corrigir:** desconforto, uso de musculatura acessória e aumento do trabalho respiratório.
- **Fonte:** AMIB, Tema 6, C.1.

Status: ☐ aprovado ☐ ajustar ☐ remover

Comentários:

---

## 9. Fluxo excessivo / overshoot de entrada (C.2)

- **Fase:** fluxo
- **Modos:** VCV, PCV, PSV
- **O que a deformação mostra:** em **VCV**, o pico de pressão é alcançado precocemente. Em **PCV/PSV**, a pressão de vias aéreas **ultrapassa o nível ajustado** (overshoot). A curva de fluxo pode ficar quase perpendicular ao eixo do tempo e surgir uma espícula.
- **Causas prováveis:** fluxo inspiratório acima do desejado, pressões ajustadas elevadas ou tempo de subida muito rápido.
- **Ajuste sugerido por modo:**
  - **VCV:** reduzir o fluxo inspiratório.
  - **PCV/PSV:** reduzir a pressão inspiratória e aumentar o tempo de subida (rise time).
- **Consequência se não corrigir:** desconforto, pressão acima do alvo e risco de lesão pulmonar induzida pela ventilação.
- **Fonte:** AMIB, Tema 6, C.2.

Status: ☐ aprovado ☐ ajustar ☐ remover

Comentários:

---

## 10. Ciclagem precoce (D.1)

- **Fase:** ciclagem
- **Modos:** VCV, PCV, PSV
- **O que a deformação mostra:** o ventilador termina a inspiração **antes** do fim do esforço neural. No início da expiração há oscilação do fluxo expiratório, com queda rápida (podendo tender a zero) e aumento depois que o esforço cessa.
- **Causas prováveis:** tempo inspiratório curto, alta demanda e, em PSV, percentual de ciclagem alto.
- **Ajuste sugerido por modo:**
  - **VCV:** aumentar o tempo inspiratório reduzindo o fluxo.
  - **PCV:** aumentar o tempo inspiratório.
  - **PSV:** reduzir o limiar de ciclagem (geralmente para valores abaixo de 25%) para aumentar o tempo inspiratório.
- **Consequência se não corrigir:** duplo disparo, empilhamento de volume e desconforto.
- **Fonte:** AMIB, Tema 6, D.1.

Status: ☐ aprovado ☐ ajustar ☐ remover

Comentários:

---

## 11. Ciclagem tardia (D.2)

- **Fase:** ciclagem
- **Modos:** VCV, PCV, PSV
- **O que a deformação mostra:** o ventilador termina a inspiração **depois** do desejado pelo paciente. Em PCV/PSV, há elevação da pressão de vias aéreas acima do ajustado ao final da inspiração e mudança na inclinação da curva de fluxo (overshoot de saída).
- **Causas prováveis:** tempo inspiratório longo e, em PSV, percentual de ciclagem baixo.
- **Ajuste sugerido por modo:**
  - **VCV:** reduzir o tempo inspiratório aumentando o fluxo.
  - **PCV:** reduzir o tempo inspiratório.
  - **PSV:** aumentar o limiar de ciclagem (geralmente para valores acima de 50%) para reduzir o tempo inspiratório.
- **Consequência se não corrigir:** desconforto, esforço expiratório contra o ventilador, autoPEEP e piora da sincronia.
- **Fonte:** AMIB, Tema 6, D.2.

Status: ☐ aprovado ☐ ajustar ☐ remover

Comentários:

---

## Observações gerais para revisão

1. As sugestões de ajuste são **apoio**, não prescrição. O app sempre lembrará que a decisão é do profissional.
2. Cada ficha terá a imagem SVG original, o nome da assincronia e a sugestão escondida atrás do botão “Ver sugestão”.
3. A classificação P/F de Berlim será citada separadamente da AMIB.
4. Se alguma conduta precisar de ressalva (ex.: curarização, limites de volume/pressão), escreva no campo de comentários.
