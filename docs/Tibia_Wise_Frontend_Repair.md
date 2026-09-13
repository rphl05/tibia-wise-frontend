# Tibia Wise — Frontend Repair Guide

## Objetivo

Use este documento como especificação obrigatória para o OpenCode corrigir o frontend atual do Tibia Wise.

O projeto passa em `npm run build`, mas a interface está visualmente quebrada/incompleta. A Home atual aparece praticamente como HTML sem estilização: conteúdo colado à esquerda, botões e links com aparência padrão, cards ausentes, hero sem composição, imagens não aparecendo e chaves de i18n como `nav.myHunts`, `nav.tutorials`, `actions.login` e `actions.register` aparecendo literalmente.

**Build verde não significa frontend concluído.**

## Regra principal

NÃO recriar o projeto do zero.
NÃO apagar a implementação existente.
NÃO trocar React, TypeScript ou Vite.
NÃO substituir i18n por textos hardcoded.
NÃO considerar a tarefa concluída apenas porque `npm run build` passa.

Reutilize tudo que estiver correto.

---

# 1. Primeiro: auditoria, depois código

Antes de alterar a Home, audite:

```text
src/
public/
docs/
e2e/
package.json
vite.config.*
tsconfig*.json
```

Verifique:

- entrypoint;
- CSS global;
- CSS Modules;
- design tokens;
- ThemeProvider;
- i18n/providers;
- layouts;
- rotas;
- componentes;
- assets;
- API client;
- testes.

Classifique:

```text
CORRETO E REUTILIZÁVEL
PRECISA DE AJUSTE
INCOMPLETO
PLACEHOLDER
AUSENTE
QUEBRADO
```

Não reimplemente componentes bons.

---

# 2. Diagnóstico prioritário: CSS

A screenshot indica que o CSS da aplicação não está sendo aplicado corretamente.

Investigue:

1. Qual é o entrypoint?
2. Onde o CSS global deveria ser importado?
3. O CSS realmente está sendo carregado no navegador?
4. Existem imports quebrados?
5. Há conflito entre CSS global e CSS Modules?
6. Existe Tailwind ou outra solução de estilos? Se sim, está configurada?
7. As classes usadas pelos componentes existem?
8. Os design tokens estão disponíveis?
9. O ThemeProvider funciona?
10. Há CSS sendo sobrescrito?

Não crie outro sistema de estilos sem necessidade.

Se o projeto usa CSS global, verifique se ele é importado pelo entrypoint correto. Não copie um caminho arbitrário: descubra a arquitetura real primeiro.

---

# 3. Design System obrigatório

Dark é o tema padrão.

```css
--color-bg-primary: #07111C;
--color-bg-secondary: #0D1B2A;
--color-surface: #101F2F;
--color-surface-highlight: #13263A;
--color-primary: #1688FF;
--color-primary-electric: #00BFFF;
--color-gold: #F5A623;
--color-gold-light: #FFC857;
--color-border: #1E2A3A;
--color-text-primary: #F5F7FA;
--color-text-secondary: #A8B3C2;
--color-text-muted: #6B7785;
--color-success: #39D353;
--color-error: #FF5C5C;
--color-warning: #FFBF20;
--color-accent: #9A6BFF;
```

Gradientes:

```css
linear-gradient(135deg, #1688FF, #00BFFF)
linear-gradient(135deg, #F5A623, #FFC857)
linear-gradient(135deg, #07111C, #0D1B2A)
```

Usar gradientes com moderação.

Tipografia:

```css
Roboto,
system-ui,
-apple-system,
BlinkMacSystemFont,
"Segoe UI",
sans-serif
```

Escala:

```text
H1: 32px / 700
H2: 24px / 700
H3: 20px / 700
H4: 16px / 500–700
Body: 14px / 400
Small: 12px / 400
Métricas: 24–40px
```

---

# 4. Diagnóstico prioritário: i18n

A screenshot mostra:

```text
nav.myHunts
nav.tutorials
actions.login
actions.register
```

Isso é incorreto.

Em PT-BR deve aparecer:

```text
Minhas Hunts
Tutoriais
Entrar
Criar conta
```

Investigue:

- inicialização do i18next;
- provider;
- namespace;
- arquivos JSON;
- idioma inicial;
- nomes das chaves;
- `useTranslation`;
- chamadas `t(...)`.

Não remova i18n para esconder o problema.

Idiomas:

```text
PT-BR
English
```

PT-BR deve ser o idioma inicial.

---

# 5. Diagnóstico prioritário: assets

Verifique os arquivos reais em:

```text
public/
public/assets/
imagens-para-uso/
```

Não invente caminhos.

Quando disponíveis, os assets esperados incluem:

```text
home-hero.webp
premium-hero.webp
auth-illustration.webp
character-knight.webp
character-paladin.webp
character-sorcerer.webp
character-druid.webp
empty-hunts.webp
empty-characters.webp
empty-recommendations.webp
empty-notifications.webp
empty-search.webp
system-403.webp
system-404.webp
system-500.webp
system-503.webp
background-app.webp
background-fantasy.webp
default-avatar.*
```

Verifique no navegador se as imagens retornam HTTP 200 e não 404.

---

# 6. Public Layout

A Home deve usar:

```text
PublicLayout
├── PublicHeader
├── main
└── PublicFooter
```

Não duplicar Header/Footer manualmente em cada página.

Header desktop, aproximadamente 72px:

```text
[LOGO]

Hunts
Statistics
Recommendations
News
Tutorials

[Theme]
[Language]

[Login]
[Create account]
```

Não mostrar links para funcionalidades inexistentes.

---

# 7. Home — prioridade máxima

Rota:

```text
/
```

A Home deve ser uma landing page completa.

## Hero

```text
┌──────────────────────────────────────────────────────────┐
│                                                          │
│  Analise suas hunts como nunca                           │
│                                                          │
│  Transforme seus dados de hunting em insights            │
│  valiosos e tome decisões melhores.                      │
│                                                          │
│  [Começar agora]       [Explorar hunts]                  │
│                                                          │
│                                   [HOME HERO ART]         │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

Usar `home-hero.webp` se existir.

Artwork predominantemente à direita; espaço limpo para texto à esquerda.

## Como funciona

Três cards:

```text
01 — Importar
Importe suas hunting sessions do Tibia.

02 — Analisar
Entenda XP/h, profit/h, loot e desempenho.

03 — Melhorar
Obtenha recomendações personalizadas.
```

Cada card deve ter background, border, radius, padding, ícone, número, título e descrição.

## Stats preview

Exemplo visual:

```text
XP/h
1,250,000

Profit/h
R$ 500

Hunts
12
```

Esses números são demonstração, não dados reais de usuário.

## Demonstração do produto

Mostrar visualmente analytics do Tibia Wise:

- dashboard/mockup;
- métricas;
- gráfico;
- hunts;
- recommendation card.

Não inventar dados reais de usuário.

## CTA final

```text
Pronto para huntar melhor?

Crie sua conta e comece a analisar suas hunts.

[ Criar conta ]
```

## Footer

O footer deve ser apenas a última seção, não dominar a página.

```text
Tibia Wise
Análise de hunting sessions do Tibia.

Produto
- Hunts
- Statistics
- Recommendations
- Premium

Ajuda
- Tutoriais
- FAQ
- Suporte

Legal
- Terms
- Privacy
- Cookies

Language
Theme
Social

© Tibia Wise. Todos os direitos reservados.
```

---

# 8. Responsividade

Testar:

```text
360px
390px
768px
1024px
1280px
1440px
1920px
```

No mobile:

```text
[Hamburger] [Logo] [Avatar/Menu]
```

Hero deve empilhar, cards devem adaptar e footer deve reorganizar.

Não permitir overflow horizontal.

---

# 9. Componentes

Reutilizar/criar componentes consistentes:

```text
Button
Card
Badge
Input
Select
Modal
Toast
Skeleton
EmptyState
ErrorState
Header
Footer
MetricCard
SectionHeader
```

Não criar versões incompatíveis do mesmo componente em cada página.

---

# 10. Estados

Páginas que dependem de dados devem prever:

```text
DEFAULT
LOADING
SUCCESS
EMPTY
ERROR
DISABLED
```

Quando aplicável:

```text
SAVING
PROCESSING
OFFLINE
UNAUTHORIZED
FORBIDDEN
```

Preferir skeleton a apenas `Loading...`.

Diferenciar:

```text
nenhum dado
```

de:

```text
nenhum resultado com estes filtros
```

---

# 11. O que NÃO fazer

Não:

- apagar o projeto;
- recriar tudo;
- trocar stack;
- remover i18n;
- hardcodar traduções;
- inventar assets;
- inventar dados reais;
- considerar `npm run build` como conclusão;
- implementar todas as páginas de uma vez.

Não criar no MVP:

```text
/hunts/new
```

A entrada de Hunt é:

```text
/hunts/import
```

Não criar XP progress, XP remaining ou total XP sem fonte confiável.

Não inventar preços, benefícios ou limites do Premium.

---

# 12. Ordem de correção

```text
1. Diagnóstico
       ↓
2. CSS / Design System
       ↓
3. i18n
       ↓
4. Assets
       ↓
5. PublicLayout
       ↓
6. Header/Footer
       ↓
7. Home
       ↓
8. Responsive
       ↓
9. Runtime/Console
       ↓
10. Build/Testes
```

Não avançar para outras páginas antes de a Home estar realmente funcionando.

---

# 13. Definition of Done da Home

```text
[ ] CSS global carregando
[ ] Design tokens funcionando
[ ] Dark theme funcionando
[ ] Tipografia correta
[ ] i18n funcionando
[ ] Nenhuma chave de tradução visível
[ ] Assets carregando
[ ] Logo correta
[ ] Header completo
[ ] Hero completo
[ ] Hero artwork funcionando
[ ] CTAs estilizados
[ ] Como funciona completo
[ ] Stats preview
[ ] Demonstração visual
[ ] CTA final
[ ] Footer completo
[ ] Desktop correto
[ ] Mobile correto
[ ] Sem overflow
[ ] Sem console errors
[ ] Sem TypeScript errors
[ ] npm run build passa
[ ] Nenhum placeholder visual
```

---

# 14. PROMPT PARA O OPENCODE

Copie o bloco abaixo para o OpenCode depois de colocar este arquivo no projeto como:

```text
docs/TIBIA_WISE_FRONTEND_REPAIR.md
```

```text
Leia integralmente:

docs/TIBIA_WISE_FRONTEND_REPAIR.md

O frontend Tibia Wise atualmente executa:

npm run build

sem erros.

Porém o frontend está visualmente quebrado/incompleto.

A screenshot atual mostra que a Home está praticamente sendo renderizada como HTML sem a estilização esperada.

Problemas visíveis:

- conteúdo colado no canto esquerdo;
- links com aparência padrão do navegador;
- botões sem estilização;
- cards sem aparência de cards;
- hero sem composição visual;
- imagens não aparecendo corretamente;
- footer sem o design esperado;
- ausência de espaçamento/layout;
- chaves do i18n aparecendo literalmente:
  nav.myHunts
  nav.tutorials
  actions.login
  actions.register

Sua tarefa é CORRIGIR o projeto existente.

NÃO recrie o projeto do zero.
NÃO apague a implementação atual.
NÃO troque React, TypeScript ou Vite.
NÃO remova o i18n.
NÃO considere npm run build como prova de que a UI está pronta.

PRIMEIRO faça uma AUDITORIA TÉCNICA.

Verifique:

1. entrypoint;
2. CSS global;
3. CSS Modules;
4. design tokens;
5. ThemeProvider;
6. i18n;
7. providers;
8. PublicLayout;
9. Header;
10. Footer;
11. HomePage;
12. componentes usados pela Home;
13. assets;
14. caminhos dos assets;
15. rotas;
16. console/runtime;
17. responsividade.

Descubra especificamente:

A) Por que o CSS não está sendo aplicado corretamente?

B) Qual arquivo deveria carregar o CSS?

C) Existe algum import de CSS faltando?

D) Existe conflito entre CSS global, CSS Modules ou outra solução de estilos?

E) Por que as chaves do i18n aparecem diretamente na interface?

F) Os arquivos de tradução estão corretos?

G) Por que os assets não aparecem?

H) O PublicLayout está sendo aplicado?

I) Quais componentes existentes podem ser reutilizados?

J) Quais arquivos precisam ser alterados?

NÃO comece reescrevendo a Home antes de descobrir essas causas.

Primeiro apresente:

# DIAGNÓSTICO

Inclua:

- causa raiz;
- arquivos envolvidos;
- componentes reutilizáveis;
- problemas encontrados;
- correções necessárias;
- ordem recomendada.

Depois corrija a infraestrutura visual.

---

DEPOIS corrija a Home seguindo o arquivo de especificação.

A Home deve conter:

1. Header público;
2. Hero;
3. Hero artwork;
4. CTAs;
5. Como funciona com 3 passos;
6. Stats preview;
7. Demonstração visual do produto;
8. CTA final;
9. Footer.

Use o Design System do Tibia Wise.

Dark theme é o padrão.

Cores principais:

#07111C
#0D1B2A
#101F2F
#13263A
#1688FF
#00BFFF
#F5A623
#FFC857
#1E2A3A
#F5F7FA
#A8B3C2
#6B7785

Corrija o i18n.

NÃO substitua i18n por strings hardcoded.

PT-BR deve ser o idioma inicial.

Depois mantenha suporte a English.

Verifique os assets reais antes de criar caminhos.

Teste:

360px
390px
768px
1024px
1280px
1440px
1920px

Verifique:

- console;
- imagens;
- CSS;
- overflow;
- responsividade;
- navegação;
- acessibilidade básica.

Execute:

npm run build

e os testes relevantes existentes.

IMPORTANTE:

Não avance para reconstruir todas as outras páginas.

Primeiro deixe a Home completamente funcional e visualmente coerente.

Ao finalizar apresente:

# IMPLEMENTAÇÃO REALIZADA

- arquivos alterados;
- arquivos criados;
- causa raiz encontrada;
- correções feitas;
- testes executados;
- resultado do npm run build;
- problemas restantes, se houver.

Não diga que a Home está pronta apenas porque o build passou.

A Home só está pronta quando CSS, design system, i18n, assets, layout, conteúdo e responsividade estiverem funcionando.
```

---

# 15. Critério final

O objetivo não é:

```text
npm run build → PASS
```

O objetivo é:

```text
Código
  ↓
Build
  ↓
Runtime
  ↓
CSS
  ↓
Design System
  ↓
i18n
  ↓
Assets
  ↓
Layout
  ↓
UX
  ↓
Responsive
  ↓
Frontend Tibia Wise
```

A Home será a primeira prova de que essa infraestrutura está realmente funcionando.
