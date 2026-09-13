# Tibia Wise — Frontend Reconstruction & Design Compliance Guide

## 1. Objetivo

Este documento deve ser usado pelo OpenCode como **especificação obrigatória para corrigir e completar o frontend atual do Tibia Wise**.

O projeto atual **compila com `npm run build`**, portanto o problema principal não é a compilação. O problema é que a implementação visual e estrutural está **incompleta e/ou diferente do frontend projetado**.

### Regra principal

> **Não recriar o projeto do zero. Não trocar a stack sem necessidade. Não remover funcionalidades existentes que já funcionam.**

O trabalho deve ser feito sobre o código atual, reaproveitando componentes, estilos, rotas e infraestrutura que estejam corretos.

---

# 2. Contexto do produto

O Tibia Wise é uma plataforma de análise de hunts do MMORPG Tibia.

A proposta combina:

- dashboard de analytics;
- análise de Hunting Sessions;
- estatísticas;
- comparação de desempenho;
- recomendações de hunting places;
- personagens;
- hunts públicas;
- notícias;
- tutoriais;
- FAQ;
- suporte;
- conta e configurações;
- plano Premium.

A identidade visual deve combinar:

**Tibia/fantasy + analytics moderno + produto SaaS profissional.**

Não deve parecer:

- um site antigo de fansite;
- um painel administrativo genérico;
- um template Vite;
- uma interface infantil;
- uma interface excessivamente cheia de elementos de fantasia.

A fantasia deve complementar a interface, principalmente através de ilustrações e imagens, enquanto os dados e a navegação continuam modernos e claros.

---

# 3. Problema atual

O frontend atual pode executar:

```bash
npm run build
```

sem erros.

Isso NÃO significa que ele esteja concluído.

O OpenCode deve considerar como problema qualquer situação em que:

- uma página tenha somente um footer;
- existam seções faltando;
- existam placeholders onde deveria haver conteúdo;
- componentes criados não estejam sendo utilizados;
- o layout projetado não esteja aplicado;
- imagens previstas não sejam utilizadas;
- páginas estejam visualmente incompletas;
- rotas existam mas renderizem conteúdo insuficiente;
- desktop funcione mas mobile esteja quebrado;
- dark/light theme não seja consistente;
- componentes tenham aparência de template genérico;
- o conteúdo da página não corresponda à especificação;
- estados de loading/empty/error estejam ausentes;
- navegação pública e autenticada estejam misturadas incorretamente.

---

# 4. Antes de alterar código: auditoria obrigatória

Antes de começar a implementar novas telas, faça uma auditoria do projeto existente.

## 4.1 Verificar estrutura

Analise:

```text
src/
public/
docs/
e2e/
package.json
vite.config.*
tsconfig*.json
```

Identifique:

- páginas;
- layouts;
- componentes;
- hooks;
- contexts/providers;
- rotas;
- estilos;
- assets;
- API client;
- tipos;
- mocks;
- testes;
- configurações de tema;
- i18n.

## 4.2 Identificar código aproveitável

Classifique:

```text
IMPLEMENTADO E REUTILIZÁVEL
IMPLEMENTADO MAS PRECISA DE AJUSTE
PLACEHOLDER
INCOMPLETO
AUSENTE
QUEBRADO
```

Não recrie componentes bons.

## 4.3 Verificar todas as rotas

Para cada rota:

1. abrir a página;
2. verificar o layout correto;
3. verificar conteúdo;
4. verificar console;
5. verificar responsividade;
6. verificar estados;
7. verificar navegação;
8. verificar consistência visual.

---

# 5. Regra de ouro

## Não implementar apenas o que "faz o build passar".

O objetivo é:

```text
Build
  ↓
Runtime
  ↓
Layout
  ↓
Design System
  ↓
Conteúdo
  ↓
Responsividade
  ↓
Estados
  ↓
Acessibilidade
  ↓
Qualidade visual
```

Uma página só pode ser considerada concluída quando todas essas camadas estiverem funcionando.

---

# 6. Design System obrigatório

## 6.1 Dark theme

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

## 6.2 Gradientes

Azul:

```css
linear-gradient(135deg, #1688FF, #00BFFF)
```

Gold:

```css
linear-gradient(135deg, #F5A623, #FFC857)
```

Dark:

```css
linear-gradient(135deg, #07111C, #0D1B2A)
```

Não aplicar gradientes em tudo.

---

# 7. Tipografia

Usar:

```css
font-family:
  Roboto,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
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

# 8. Layout global

## Desktop

```text
Sidebar: 260px
Topbar: 72px
Content padding: aproximadamente 24px
Max width: aproximadamente 1600px
```

## Mobile

A sidebar vira drawer.

Topbar:

```text
[Hamburger] [Logo]              [Avatar]
```

Não utilizar recursos que dependam exclusivamente de hover.

---

# 9. Logo e identidade

Usar a identidade oficial do Tibia Wise já existente.

Arquivos esperados quando disponíveis:

```text
tibia-wise-logo.svg
tibia-wise-logo-dark.svg
tibia-wise-logo-light.svg
tibia-wise-symbol.svg
favicon.svg
```

Não substituir a logo por texto simples.

---

# 10. Assets

Usar os assets existentes no projeto quando disponíveis.

Personagens:

```text
character-knight.webp
character-paladin.webp
character-sorcerer.webp
character-druid.webp
```

Dimensão prevista:

```text
2400 × 700
```

Características:

- personagem principal no lado direito;
- espaço visual limpo no lado esquerdo;
- sem texto incorporado;
- aparência profissional;
- não distorcer.

Outros assets esperados:

```text
home-hero.webp
premium-hero.webp
auth-illustration.webp

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

Não inventar nomes sem verificar `public/`.

---

# 11. Componentes globais

Criar/reutilizar componentes para:

- Button;
- Input;
- Select;
- Checkbox;
- Switch;
- Card;
- Badge;
- Alert;
- Toast;
- Modal/Dialog;
- Dropdown;
- Tabs;
- Breadcrumb;
- Pagination;
- Skeleton;
- EmptyState;
- ErrorState;
- LoadingState;
- Tooltip;
- Chart containers;
- Table;
- Avatar;
- Search;
- Date/period selector.

Não criar versões incompatíveis do mesmo componente em cada página.

---

# 12. Estados obrigatórios

Toda página que depende de dados deve considerar:

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

Preferir skeletons a apenas `Loading...`.

Diferenciar:

```text
nenhum dado ainda
```

de:

```text
nenhum resultado encontrado com estes filtros
```

Erros de componentes não devem derrubar a página inteira quando puderem ser isolados.

---

# 13. HOME — prioridade máxima

A Home atual está incompleta.

Rota:

```text
/
```

Ela deve ser uma landing page completa.

## 13.1 Header público

```text
[Logo]

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

Não apresentar links para funcionalidades inexistentes.

## 13.2 Hero

A primeira dobra precisa comunicar imediatamente o produto.

```text
---------------------------------------------------------
|                                                       |
|  Analyze your hunts.                                  |
|  Hunt smarter.                                        |
|                                                       |
|  Transform your Tibia hunting data into useful        |
|  insights and better decisions.                       |
|                                                       |
|  [Start for free]   [Explore hunts]                   |
|                                                       |
|                         [hero artwork]                |
|                                                       |
---------------------------------------------------------
```

O texto pode ser refinado, mas deve comunicar:

- o que é Tibia Wise;
- qual problema resolve;
- benefício;
- CTA principal;
- CTA secundário;
- visual forte.

Não deixar o hero vazio.

## 13.3 Como funciona

```text
01 Import Hunt
        ↓
02 Analyze
        ↓
03 Improve
```

Cada etapa possui número, ícone, título e descrição.

## 13.4 Recursos

Cards:

### Hunts
Importe e organize suas hunting sessions.

### Statistics
Entenda XP/h, profit/h, loot, supplies e desempenho.

### Recommendations
Use seus dados para descobrir oportunidades de melhoria.

## 13.5 Demonstração visual

Criar uma seção mostrando o produto visualmente:

- screenshot/mockup de dashboard;
- cards de métricas;
- gráfico;
- lista de hunts;
- recomendações.

Dados demonstrativos devem ser claramente de exemplo e não parecer dados reais de usuário.

## 13.6 CTA final

```text
Ready to hunt smarter?

Create your Tibia Wise account and start analyzing your hunts.

[Create account]
```

## 13.7 Footer

O footer deve ser somente a última seção.

Estrutura:

```text
Tibia Wise
Descrição curta

Product
- Hunts
- Statistics
- Recommendations
- Premium

Help
- Tutorials
- FAQ
- Support

Legal
- Terms
- Privacy
- Cookies

Language
Theme

Social
```

---

# 14. Páginas públicas

Rotas:

```text
/
 /hunts
 /hunts/:id
 /news
 /news/:slug
 /tutorials
 /tutorials/:slug
 /faq
 /support
 /premium
 /terms
 /privacy
 /cookies
```

Compartilhar:

```text
PublicLayout
 ├── PublicHeader
 ├── PageContent
 └── PublicFooter
```

Não duplicar header/footer em cada página.

---

# 15. Public Hunts

Rota:

```text
/hunts
```

Mostrar:

- título;
- descrição;
- filtros;
- busca;
- lista/tabela;
- paginação;
- loading/empty/error.

Filtros MVP:

```text
Vocation
World
Hunting Place
Level
Period
```

Desktop: tabela com linhas alternadas:

```text
row A: #0D1B2A
row B: #101F2F
```

Mobile: cards/list items.

---

# 16. Public Hunt

Rota:

```text
/hunts/:id
```

Mostrar:

- informações da hunt;
- character;
- level;
- vocation;
- world;
- hunting place;
- duration;
- XP/h;
- loot;
- supplies;
- profit;
- gráficos quando disponíveis;
- informações públicas permitidas.

Nunca expor informações privadas.

---

# 17. Autenticação

Rotas:

```text
/login
/register
/register/success
/verify-email
/verify-email/success
/forgot-password
/forgot-password/sent
/reset-password
/reset-password/success
```

Layout consistente.

Usar `auth-illustration.webp` quando disponível.

Formulários:

```text
React Hook Form
+
Zod
```

Mensagens próximas ao campo.

---

# 18. Dashboard

Rota:

```text
/dashboard
```

Layout:

```text
AuthenticatedLayout
 ├── Sidebar
 ├── Topbar
 └── Dashboard
```

Header:

```text
Dashboard
[Active Character]
[Period]
```

KPIs:

```text
XP/h
Profit/h
Hunts
Hunt Time
```

Gráfico:

```text
XP/h
Profit/h
Loot
Supplies
```

Resumo:

```text
Average
Best
Worst
```

Depois:

- Recent Hunts;
- Recommendations preview;
- Hunting Places preview.

Períodos:

```text
Today
7 days
30 days
90 days
Custom
```

Não mostrar falsos zeros para fingir que existem dados.

---

# 19. Sidebar autenticada

```text
PRINCIPAL

Dashboard
Minhas Hunts
Importar Hunt
Recomendações


PERSONAGEM

[Active Character Card]


AJUDA E CONTA

Tutoriais
Suporte
Configurações
Premium (somente FREE)
```

Character card:

```text
Name
Level
Vocation
World
Ver personagem
```

Não mostrar XP progress, XP remaining ou total XP sem fonte confiável.

---

# 20. Topbar autenticada

```text
Global Search
+ Nova Hunt
Theme
Language
Notifications
Avatar
```

`+ Nova Hunt`:

```text
/hunts/import
```

Não implementar `/hunts/new` no MVP.

---

# 21. Global Search

Pesquisar:

```text
Hunts
Hunting Places
Characters
Players
News
```

Atalho:

```text
Ctrl + K
```

Não criar pesquisa fake se não houver backend. A UI pode ficar preparada para integração.

---

# 22. Minhas Hunts

Rota:

```text
/my-hunts
```

Mostrar:

- filtro de personagem;
- período;
- busca;
- status;
- lista;
- paginação;
- ações.

Personagem:

```text
Todos os personagens
```

ou personagem específico.

---

# 23. Hunts pública/privada/arquivada

Estados:

```text
PUBLIC
PRIVATE
ARCHIVED
```

Arquivada:

- não é deletada;
- não entra nas estatísticas;
- pode ser restaurada.

Privada:

- somente dono;
- não aparece em páginas públicas.

Se uma hunt pública virar privada, não vazar metadata.

---

# 24. Compartilhar Hunt

Em Hunt pública do usuário:

```text
Compartilhar Hunt
```

Ao clicar:

1. copiar URL;
2. toast:

```text
Link da Hunt copiado!
```

---

# 25. Importar Hunt

Rota:

```text
/hunts/import
```

Fluxo:

```text
IDLE
 ↓
FILE_SELECTED
 ↓
VALIDATING
 ↓
IMPORTING
 ↓
SUCCESS / ERROR
```

Interface:

- seleção de personagem;
- drag and drop;
- seleção de arquivo;
- validação;
- processamento;
- sucesso;
- erro.

Não assumir extensão do arquivo se o backend ainda não definiu.

---

# 26. Characters

Rota:

```text
/characters
```

Usar cards, não tabela.

Card:

```text
Artwork
Name
Level
Vocation
World
Status
View
```

Não mostrar XP progress.

---

# 27. Character detail

Rota:

```text
/characters/:id
```

Hero com artwork da vocation:

```text
Breadcrumb

[Character Hero]
Name
Vocation
Level
World
Last update
Actions

Tabs:
Summary
Statistics
Hunts
```

Personagem predominantemente no lado direito do hero.

---

# 28. Add Character

Rota:

```text
/characters/new
```

Campos:

```text
Character Name
Validation Code
```

Código:

```text
TIBIAWISE...
```

Validade:

```text
12 hours
```

Backend é responsável pela validação real.

---

# 29. Statistics

Rota:

```text
/statistics
```

Filtros:

```text
Character
Period
```

Personagem padrão: Active Character.

Opção:

```text
Todos os personagens
```

KPIs:

```text
XP/h
Profit/h
Loot/h
Supplies/h
Hunts
Time
```

Seções:

- evolução;
- comparação com período anterior;
- XP Analysis;
- Profit Analysis;
- Performance by Hunting Place;
- Character Comparison;
- Hunt Comparison.

O frontend não deve fazer agregações incorretas. O backend fornece os dados agregados.

---

# 30. Recommendations

Rota:

```text
/recommendations
```

Somente autenticado.

Mostrar:

- character;
- período;
- perfil;
- recomendação principal;
- secundárias;
- motivo;
- métricas;
- confidence;
- hunts relacionadas.

Tipos:

```text
Hunting Place
XP
Profit
Performance
Diversification
```

Não inventar recomendações.

---

# 31. News

Rotas:

```text
/news
/news/:slug
```

Lista:

- featured;
- busca;
- categorias;
- cards;
- paginação quando necessário.

Categorias:

```text
Tibia Wise
Updates
Tibia
Guides
Community
```

Artigo:

- título;
- data;
- categoria;
- imagem;
- conteúdo;
- compartilhamento;
- relacionados.

SEO:

- title;
- description;
- canonical;
- Open Graph;
- Article structured data quando apropriado.

---

# 32. Tutorials

Rotas:

```text
/tutorials
/tutorials/:slug
```

Categorias:

```text
Starting
Hunts
Analysis
Recommendations
Account
```

Artigo:

- título;
- imagem;
- conteúdo;
- anterior/próximo;
- relacionados.

---

# 33. FAQ

Rota:

```text
/faq
```

Possui:

- busca;
- categorias;
- accordion;
- estado sem resultados.

Categorias:

```text
Tibia Wise
Account
Hunts
Characters
Premium
```

Usar semântica acessível.

---

# 34. Support

Rota:

```text
/support
```

Mostrar:

- busca;
- links para Tutoriais e FAQ;
- formulário.

Categorias:

```text
Account
Character
Hunt
Import
Premium
Bug
Other
```

Usuário autenticado: email pré-preenchido quando aplicável.

---

# 35. Premium

Rota:

```text
/premium
```

FREE:

```text
Hero
Benefits
Free vs Premium
Pricing
FAQ
CTA
```

Premium:

```text
Premium ativo
Subscription status
```

Não mostrar CTA de upgrade para Premium.

Não inventar preço, limites ou benefícios.

---

# 36. Profile

Rota:

```text
/profile
```

Mostrar:

```text
Display name
Username
Country
Language
Member since
Characters summary
```

Username:

```text
letters
numbers
_
-
minimum 4 characters
```

Unicidade/profanity pelo backend.

---

# 37. Notifications

Rota:

```text
/notifications
```

Tipos:

```text
Hunt
Character
Account
Premium
System
```

Funcionalidades:

- unread/read;
- mark all read;
- navegação para destino.

---

# 38. Settings

Hub:

```text
/settings
```

Subrotas:

```text
/settings/profile
/settings/account
/settings/security
/settings/privacy
/settings/notifications
/settings/preferences
```

Preferences:

```text
Theme
Language
Default Character
```

Theme:

```text
DARK
LIGHT
SYSTEM
```

Default:

```text
DARK
```

Language:

```text
PT_BR
EN_US
```

Default character deve pertencer ao usuário.

---

# 39. Account

Mostrar:

- email;
- subscription;
- manage subscription;
- close account.

FREE:

```text
Conhecer Premium
```

Premium: não mostrar upgrade.

Delete account:

- modal;
- confirmação;
- senha quando exigida;
- loading;
- sucesso;
- erro.

---

# 40. Security

Mostrar:

- alterar senha;
- sessões ativas;
- encerrar outras sessões.

Ações sensíveis precisam de confirmação adequada.

---

# 41. Privacy

Possíveis configurações:

```text
Public profile
Default Hunt visibility
```

Alterar default não altera hunts existentes.

---

# 42. Error pages

Criar:

```text
/403
/404
/500
/503
```

Usar assets correspondentes quando disponíveis.

Cada página:

- mensagem;
- contexto;
- ação principal;
- navegação segura.

Não mostrar stack trace.

---

# 43. Responsive

Breakpoints:

```text
xs < 480
sm 480
md 768
lg 1024
xl 1280
2xl 1440
```

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

Nenhuma página pode exigir zoom horizontal.

---

# 44. Acessibilidade

Obrigatório:

- HTML semântico;
- keyboard navigation;
- visible focus;
- labels;
- ARIA quando necessário;
- contraste;
- não usar somente cor para status;
- alt text;
- buttons reais;
- links reais.

---

# 45. SEO

Páginas públicas:

- title;
- meta description;
- canonical;
- Open Graph;
- URLs amigáveis;
- sitemap;
- robots.txt;
- structured data quando aplicável.

Páginas privadas:

```text
noindex
```

---

# 46. i18n

Idiomas:

```text
PT-BR
English
```

Toda string de interface deve estar preparada para tradução.

Não espalhar textos hardcoded quando i18n já estiver configurado.

---

# 47. API e segurança

O frontend trata o backend como API externa.

Nunca colocar no frontend:

- secrets;
- database credentials;
- recommendation engine;
- regras proprietárias;
- regras críticas de Premium;
- autorização como única camada.

Backend continua sendo autoridade.

Nunca confiar no frontend para:

```text
authorization
ownership
premium status
private hunt access
character ownership
```

Tratar:

```text
401 → Session expired
403 → Forbidden
404 → Not found
409 → Conflict
422 → Validation errors
429 → Rate limit
500 → Server error
503 → Service unavailable
```

---

# 48. Server state e client state

TanStack Query para:

- hunts;
- characters;
- statistics;
- recommendations;
- news;
- tutorials;
- notifications;
- user data.

Estado local/context para:

- modal;
- sidebar;
- filtros temporários;
- UI;
- theme quando apropriado;
- formulários.

---

# 49. Performance

Verificar:

- imagens com dimensões corretas;
- lazy loading quando apropriado;
- code splitting;
- renders desnecessários;
- assets gigantes;
- imports desnecessários.

---

# 50. O que NÃO fazer

## Não reescrever tudo

Não apagar o projeto e criar outro.

## Não trocar stack

Não substituir React, TypeScript, Vite, React Router ou TanStack Query sem necessidade comprovada.

## Não criar dados falsos como reais

Mocks devem ficar isolados e claramente identificados.

## Não criar `/hunts/new`

No MVP a criação manual não existe.

## Não criar XP progress

Sem fonte confiável, não criar:

```text
XP 75%
XP remaining
Total XP
```

## Não inventar Premium

Não inventar preço, benefícios ou limites.

## Não criar páginas vazias

Uma rota renderizar sem erro não significa que esteja pronta.

## Não fazer o footer ocupar a página

Footer é a última seção, não substituto do conteúdo.

## Não colocar segurança no frontend

Frontend não é autoridade.

---

# 51. Ordem de implementação

## Fase 1 — Fundação visual

1. Design tokens
2. Theme
3. Typography
4. Global styles
5. Buttons
6. Inputs
7. Cards
8. Badges
9. Alerts
10. Toast
11. Modal
12. Skeleton
13. Empty/Error states

## Fase 2 — Layouts

1. PublicLayout
2. AuthLayout
3. AuthenticatedLayout
4. PublicHeader
5. AuthenticatedTopbar
6. Sidebar
7. Footer
8. Mobile drawer

## Fase 3 — Home

Implementar completamente `/`.

**Não avançar para dezenas de páginas enquanto a Home continuar incompleta.**

## Fase 4 — Público

```text
/hunts
/hunts/:id
/news
/news/:slug
/tutorials
/tutorials/:slug
/faq
/support
/premium
```

## Fase 5 — Auth

```text
/login
/register
/verify-email
/forgot-password
/reset-password
```

## Fase 6 — App

```text
/dashboard
/my-hunts
/hunts/import
/characters
/characters/new
/characters/:id
/statistics
/recommendations
```

## Fase 7 — Conta

```text
/profile
/notifications
/settings/*
```

## Fase 8 — Sistema

```text
/403
/404
/500
/503
```

## Fase 9 — Qualidade

- responsive;
- accessibility;
- SEO;
- tests;
- loading;
- empty;
- errors;
- visual polish.

---

# 52. Definition of Done

Uma página só está concluída quando:

```text
[ ] Rota funciona
[ ] Layout correto
[ ] Design System aplicado
[ ] Conteúdo completo
[ ] Desktop
[ ] Mobile
[ ] Loading
[ ] Empty
[ ] Error
[ ] Estados de interação
[ ] Navegação
[ ] Acessibilidade
[ ] i18n
[ ] SEO quando pública
[ ] Sem console errors
[ ] Sem TypeScript errors
[ ] Sem overflow
[ ] Sem placeholders
```

---

# 53. Critério visual

Todas as páginas precisam parecer parte do mesmo produto.

Comparar:

```text
Home
Dashboard
Hunts
Characters
Statistics
Recommendations
```

Devem compartilhar:

- cores;
- espaçamentos;
- bordas;
- radius;
- tipografia;
- botões;
- cards;
- headers;
- iconografia;
- estados;
- comportamento responsivo.

Não criar um design diferente para cada tela.

---

# 54. Estratégia de desenvolvimento com OpenCode

O OpenCode deve trabalhar em pequenos blocos.

Não usar uma solicitação gigantesca como:

```text
"Faça todo o frontend"
```

Preferir:

```text
1. Audite a Home atual.
2. Corrija o PublicLayout.
3. Implemente a Home completa.
4. Teste Home desktop/mobile.
5. Corrija problemas.
6. Só então avance para Hunts.
```

Após cada alteração importante:

```bash
npm run build
```

Quando disponíveis:

```bash
npm run test
npm run test:e2e
```

---

# 55. Prompt inicial para o OpenCode

Depois de colocar este arquivo no projeto como:

```text
docs/FRONTEND_RECONSTRUCTION_GUIDE.md
```

use:

```text
Leia integralmente o arquivo docs/FRONTEND_RECONSTRUCTION_GUIDE.md.

O projeto Tibia Wise já existe e atualmente executa npm run build sem erros.

O problema NÃO é a compilação.

O problema é que várias páginas estão incompletas ou visualmente diferentes da especificação do produto.

Sua tarefa inicial NÃO é reescrever o projeto.

Primeiro faça uma auditoria completa do frontend atual.

Analise:

- estrutura do projeto;
- rotas;
- layouts;
- componentes;
- estilos;
- design tokens;
- assets;
- páginas;
- responsividade;
- estados;
- i18n;
- SEO;
- acessibilidade;
- testes.

Identifique o que está:

1. correto e reutilizável;
2. incompleto;
3. placeholder;
4. quebrado;
5. ausente;
6. diferente da especificação.

Depois concentre o trabalho na Home (/).

A Home é prioridade máxima porque atualmente está incompleta, com partes da página e um footer, mas não corresponde à landing page projetada.

Não avance para implementar dezenas de outras páginas antes de deixar a Home estruturalmente completa.

Não troque React, TypeScript ou Vite.

Não apague o projeto.

Reutilize componentes existentes quando forem bons.

Use o Design System descrito no documento.

Depois de cada alteração importante:

- execute npm run build;
- verifique console/runtime;
- verifique desktop;
- verifique mobile.

Ao terminar a auditoria, apresente primeiro:

AUDITORIA
- problemas encontrados;
- componentes reutilizáveis;
- arquivos que precisam ser alterados;
- arquivos novos necessários;
- ordem de implementação.

Somente depois comece a implementação.
```

---

# 56. Regra final

O objetivo não é fazer o frontend apenas:

```text
compilar
```

O objetivo é fazer o Tibia Wise parecer um produto real:

```text
                  TIBIA WISE
                      │
          ┌───────────┴───────────┐
          │                       │
       Produto                 Identidade
          │                       │
     ┌────┴────┐             ┌────┴────┐
     │         │             │         │
 Analytics   UX          Tibia/Fantasy  Modern SaaS
     │         │             │         │
     └────┬────┘             └────┬────┘
          │                       │
          └───────────┬───────────┘
                      │
                FRONTEND FINAL
```

**Prioridade absoluta: fidelidade ao produto + completude + consistência visual + responsividade.**

Não considerar "build verde" como conclusão.
