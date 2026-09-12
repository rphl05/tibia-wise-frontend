# Tibia Wise — Frontend Architecture Specification v1.0

## 1. Objetivo

Definir a arquitetura técnica do frontend do Tibia Wise, mantendo:

- separação entre UI, regras de negócio e integração com API;
- componentes reutilizáveis;
- Dark/Light/System;
- PT-BR e English;
- responsividade;
- acessibilidade;
- SEO nas páginas públicas;
- autenticação e autorização;
- estados padronizados de loading, erro, vazio e sucesso;
- integração com o backend NestJS;
- facilidade de manutenção e evolução.

**Regra principal:** o frontend não deve duplicar regras de negócio pertencentes ao backend.

---

## 2. Stack recomendada

### Base
- React
- TypeScript
- Vite
- React Router
- ESLint
- Prettier

### Dados/API
- TanStack Query
- `fetch` ou cliente HTTP centralizado

### Formulários
- React Hook Form
- Zod

### Internacionalização
- i18next
- react-i18next

### Ícones
- Lucide React

### Gráficos
- Recharts ou equivalente

### Testes
- Vitest
- React Testing Library
- Playwright

A escolha final das bibliotecas pode mudar, mas as responsabilidades arquiteturais devem permanecer.

---

## 3. Princípio arquitetural

A aplicação será organizada principalmente por **features/domínios**, e não apenas por tipos de arquivo.

Evitar:

```text
components/
  Button.tsx
  Hunt.tsx
  Character.tsx
  Dashboard.tsx
  News.tsx
```

Preferir:

```text
features/
  hunts/
  characters/
  dashboard/
  statistics/
  recommendations/
```

Componentes realmente compartilhados ficam em `components/`.

> Se um componente pertence conceitualmente a uma única feature, ele deve ficar dentro da feature.

---

## 4. Estrutura geral

```text
src/
├── app/
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers/
│   └── guards/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── illustrations/
│
├── components/
│   ├── ui/
│   ├── forms/
│   ├── feedback/
│   ├── navigation/
│   ├── data-display/
│   └── overlays/
│
├── config/
│   ├── env.ts
│   ├── routes.ts
│   └── constants.ts
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── hunts/
│   ├── characters/
│   ├── statistics/
│   ├── recommendations/
│   ├── news/
│   ├── tutorials/
│   ├── faq/
│   ├── support/
│   ├── premium/
│   ├── profile/
│   ├── notifications/
│   └── settings/
│
├── layouts/
│   ├── PublicLayout.tsx
│   ├── AuthLayout.tsx
│   ├── AppLayout.tsx
│   └── SystemLayout.tsx
│
├── lib/
│   ├── api/
│   ├── analytics/
│   ├── i18n/
│   ├── query/
│   ├── storage/
│   └── utils/
│
├── pages/
│   ├── public/
│   ├── auth/
│   ├── app/
│   └── system/
│
├── styles/
│   ├── tokens.css
│   ├── globals.css
│   └── utilities.css
│
├── types/
│   ├── api.ts
│   ├── auth.ts
│   └── common.ts
│
├── main.tsx
└── ...
```

---

## 5. Responsabilidade das camadas

### `app/`
Configuração global:
- inicialização;
- router;
- providers;
- autenticação;
- tema;
- i18n;
- Query Client;
- Error Boundary;
- guards.

Não colocar lógica específica de Hunts ou Characters aqui.

### `components/`
Design System e componentes reutilizáveis:
- Button;
- Input;
- Select;
- Modal;
- Toast;
- Badge;
- Card;
- Table;
- Pagination;
- Tabs;
- Skeleton;
- EmptyState;
- ErrorState.

Um componente compartilhado não deve depender de uma feature específica.

### `features/`
Lógica e componentes específicos de cada domínio.

Estrutura sugerida:

```text
feature/
├── api/
├── components/
├── hooks/
├── schemas/
├── types/
├── utils/
└── index.ts
```

Nem toda feature precisa ter todos os diretórios.

### `pages/`
Composição da tela, parâmetros de URL e SEO quando aplicável.

Evitar páginas com centenas de linhas de regra de negócio.

### `layouts/`
- PublicLayout
- AuthLayout
- AppLayout
- SystemLayout

### `lib/`
Infraestrutura técnica compartilhada:
- API client;
- Query;
- i18n;
- storage;
- analytics;
- utilidades.

---

## 6. Features do MVP

```text
features/
├── auth
├── dashboard
├── hunts
├── characters
├── statistics
├── recommendations
├── news
├── tutorials
├── faq
├── support
├── premium
├── profile
├── notifications
└── settings
```

---

## 7. Auth

```text
features/auth/
├── api/
├── components/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   ├── ForgotPasswordForm.tsx
│   ├── ResetPasswordForm.tsx
│   └── VerifyEmailState.tsx
├── hooks/
├── schemas/
├── types/
└── index.ts
```

Responsável por:
- login;
- registro;
- confirmação de email;
- recuperação de senha;
- reset de senha;
- estado da sessão.

O backend continua sendo responsável por autenticação e autorização.

---

## 8. Hunts

```text
features/hunts/
├── api/
│   ├── queries.ts
│   ├── mutations.ts
│   └── endpoints.ts
├── components/
│   ├── HuntCard.tsx
│   ├── HuntTable.tsx
│   ├── HuntFilters.tsx
│   ├── HuntDetails.tsx
│   ├── HuntMetrics.tsx
│   ├── HuntVisibilityBadge.tsx
│   ├── HuntShareButton.tsx
│   ├── HuntArchiveButton.tsx
│   └── HuntImportForm.tsx
├── hooks/
├── schemas/
├── types/
└── utils/
```

Abrange:
- Hunts públicas;
- Minhas Hunts;
- Hunt pública;
- detalhes;
- edição;
- importação;
- arquivamento;
- compartilhamento;
- filtros.

### Importação

Fluxo visual:

```text
IDLE
 ↓
FILE_SELECTED
 ↓
VALIDATING
 ↓
IMPORTING
 ↓
SUCCESS
```

Ou:

```text
VALIDATING
 ↓
ERROR
```

O frontend não deve interpretar profundamente o arquivo. O backend é a autoridade sobre formato, validade, duplicidade, personagem e métricas.

---

## 9. Characters

```text
features/characters/
├── api/
├── components/
│   ├── CharacterCard.tsx
│   ├── CharacterSelector.tsx
│   ├── CharacterHero.tsx
│   ├── CharacterTabs.tsx
│   ├── CharacterForm.tsx
│   └── CharacterValidationState.tsx
├── hooks/
├── schemas/
├── types/
└── utils/
```

Responsável por:
- listar personagens;
- adicionar;
- validar;
- visualizar;
- editar;
- selecionar personagem ativo;
- definir personagem padrão.

### Contexto de personagem

**Default Character:** preferência persistente.

**Active Character:** contexto atual da interface.

Exemplo:

```text
Default = Knight A
Active  = Knight A
```

O usuário pode trocar temporariamente:

```text
Active = Paladin B
```

sem necessariamente alterar o Default.

A alteração permanente do personagem padrão ocorre em `/settings/preferences`.

O backend deve validar que o `default_character_id` pertence ao usuário.

---

## 10. Dashboard

```text
features/dashboard/
├── api/
├── components/
│   ├── DashboardHeader.tsx
│   ├── DashboardKpis.tsx
│   ├── PerformanceChart.tsx
│   ├── PerformanceSummary.tsx
│   ├── RecentHunts.tsx
│   ├── RecommendationsPreview.tsx
│   └── HuntingPlacesPreview.tsx
├── hooks/
└── types/
```

O Dashboard recebe métricas agregadas da API.

Não implementar regras estatísticas complexas dentro da UI.

---

## 11. Statistics

```text
features/statistics/
├── api/
├── components/
│   ├── StatisticsHeader.tsx
│   ├── StatisticsKpis.tsx
│   ├── PerformanceEvolutionChart.tsx
│   ├── PeriodComparison.tsx
│   ├── XpAnalysis.tsx
│   ├── ProfitAnalysis.tsx
│   ├── HuntingPlacePerformance.tsx
│   └── HuntComparison.tsx
├── hooks/
└── types/
```

O backend deve fornecer agregações confiáveis.

O frontend não deve recalcular médias complexas quando isso puder produzir resultados diferentes do backend.

Não mostrar XP total, XP restante ou percentual de progresso sem fonte confiável.

---

## 12. Recommendations

```text
features/recommendations/
├── api/
├── components/
│   ├── RecommendationCard.tsx
│   ├── RecommendationList.tsx
│   ├── RecommendationReason.tsx
│   ├── RecommendationMetrics.tsx
│   └── RecommendationProfile.tsx
├── hooks/
└── types/
```

O backend decide:
- recomendação;
- motivo;
- evidências;
- métricas;
- nível de confiança.

O frontend apenas apresenta os dados estruturados.

Recomendações são privadas e exigem autenticação.

---

## 13. News

```text
features/news/
├── api/
├── components/
│   ├── FeaturedNews.tsx
│   ├── NewsCard.tsx
│   ├── NewsGrid.tsx
│   ├── NewsFilters.tsx
│   └── RelatedNews.tsx
├── hooks/
├── types/
└── utils/
```

Conteúdo público e preparado para SEO.

---

## 14. Tutorials

```text
features/tutorials/
├── api/
├── components/
├── hooks/
├── types/
└── utils/
```

Conteúdo público e orientado à aprendizagem do produto.

---

## 15. FAQ

```text
features/faq/
├── api/
├── components/
│   ├── FaqSearch.tsx
│   ├── FaqCategories.tsx
│   └── FaqAccordion.tsx
├── hooks/
└── types/
```

---

## 16. Support

```text
features/support/
├── api/
├── components/
│   ├── SupportSearch.tsx
│   ├── SupportCategories.tsx
│   └── SupportForm.tsx
├── schemas/
└── types/
```

---

## 17. Premium

```text
features/premium/
├── api/
├── components/
│   ├── PremiumHero.tsx
│   ├── Benefits.tsx
│   ├── PlanComparison.tsx
│   ├── PremiumFaq.tsx
│   └── SubscriptionStatus.tsx
├── hooks/
└── types/
```

Regra:

```text
FREE
 └── pode ver upgrade

PREMIUM
 └── não recebe CTA de upgrade
```

Não inventar benefícios ou preços que ainda não estejam definidos no backend/regras do produto.

---

## 18. Profile

```text
features/profile/
├── api/
├── components/
│   ├── ProfileHeader.tsx
│   ├── ProfileForm.tsx
│   └── CharacterSummary.tsx
├── schemas/
└── types/
```

---

## 19. Notifications

```text
features/notifications/
├── api/
├── components/
│   ├── NotificationItem.tsx
│   ├── NotificationList.tsx
│   └── NotificationDropdown.tsx
├── hooks/
└── types/
```

Tipos iniciais:
- Hunt;
- Character;
- Account;
- Premium;
- System.

---

## 20. Settings

```text
features/settings/
├── api/
├── components/
│   ├── SettingsLayout.tsx
│   ├── SettingsNavigation.tsx
│   ├── ProfileSettings.tsx
│   ├── AccountSettings.tsx
│   ├── SecuritySettings.tsx
│   ├── PrivacySettings.tsx
│   ├── NotificationSettings.tsx
│   └── PreferenceSettings.tsx
├── schemas/
└── types/
```

---

## 21. Server State vs Client State

### Server State

Dados da API:

- Hunts;
- Characters;
- News;
- Notifications;
- Statistics;
- Recommendations;
- Subscription;
- Profile.

Gerenciar com **TanStack Query**.

### Client State

Estado puramente da interface:

- sidebar aberto/fechado;
- modal;
- filtros temporários;
- active character;
- estado visual de componentes.

Não usar uma store global para tudo.

---

## 22. API Client

Criar uma camada única:

```text
lib/api/
├── client.ts
├── errors.ts
└── types.ts
```

Fluxo:

```text
Component
   ↓
Feature Hook
   ↓
TanStack Query
   ↓
API Client
   ↓
NestJS API
```

Nenhum componente deve chamar diretamente uma URL da API.

---

## 23. Query Keys

Padronizar:

```text
["hunts"]
["hunts", huntId]
["my-hunts", filters]
["characters"]
["characters", characterId]
["statistics", params]
["recommendations", params]
["notifications"]
```

Após mutations, invalidar as queries relacionadas.

Exemplo:

```text
Archive Hunt
      ↓
mutation
      ↓
success
      ↓
invalidate ["my-hunts"]
```

---

## 24. Autenticação e Guards

Ter pelo menos:

```text
RequireAuth
RequireGuest
```

### RequireAuth

Protege:

```text
/dashboard
/my-hunts
/characters
/statistics
/recommendations
/profile
/notifications
/settings
```

### RequireGuest

Controla:

```text
/login
/register
```

Usuário já autenticado pode ser direcionado para `/dashboard`.

A estratégia final de armazenamento de tokens deve seguir o contrato de segurança do backend. Se o backend utilizar cookies HttpOnly, não copiar tokens para `localStorage`.

---

## 25. Autorização

O frontend pode esconder ou mostrar ações de acordo com o estado conhecido, mas:

> A autorização real sempre pertence ao backend.

Exemplo:

```text
Hunt pública
 └── compartilhar

Hunt privada
 └── sem compartilhar
```

Esconder o botão não é uma medida de segurança.

---

## 26. Formulários

Fluxo:

```text
UI
 ↓
React Hook Form
 ↓
Zod
 ↓
API
 ↓
Backend validation
 ↓
Success / Field Errors
```

Frontend valida UX.

Backend valida segurança e regra de negócio.

Erros do backend devem usar códigos estáveis quando possível:

```text
USERNAME_ALREADY_EXISTS
CHARACTER_NOT_FOUND
INVALID_VALIDATION_CODE
HUNT_ALREADY_IMPORTED
HUNT_NOT_PUBLIC
SESSION_EXPIRED
```

Esses códigos são traduzidos pelo frontend.

---

## 27. Design System

Estrutura:

```text
components/ui/
├── Button/
├── Input/
├── Select/
├── Card/
├── Badge/
├── Table/
├── Modal/
├── Tabs/
├── Tooltip/
├── Dropdown/
├── Skeleton/
└── ...
```

Componentes devem possuir:
- TypeScript props;
- estados;
- acessibilidade;
- variantes;
- suporte aos temas.

---

## 28. Design Tokens

Nunca espalhar cores diretamente no código.

Evitar:

```css
color: #1688FF;
```

Preferir:

```css
color: var(--color-primary);
```

Exemplo:

```css
:root {
  --color-primary: #1688FF;
  --color-background: #07111C;
  --color-surface: #101F2F;
  --color-text-primary: #F5F7FA;
}
```

Dark e Light alteram os tokens sem exigir alterações nos componentes.

---

## 29. Tema

Opções:

```text
Dark
Light
System
```

Implementação conceitual:

```text
data-theme="dark"
data-theme="light"
```

`System` acompanha a preferência do sistema operacional.

Dark é o padrão inicial.

---

## 30. Internacionalização

Estrutura:

```text
lib/i18n/
├── index.ts
└── locales/
    ├── pt-BR/
    │   ├── common.json
    │   ├── auth.json
    │   ├── hunts.json
    │   └── ...
    │
    └── en/
        ├── common.json
        ├── auth.json
        ├── hunts.json
        └── ...
```

Não espalhar textos fixos pelos componentes.

Também internacionalizar:
- datas;
- números;
- moeda;
- pluralização;
- mensagens de erro.

---

## 31. Helpers de formatação

Criar funções centralizadas:

```text
formatDate()
formatNumber()
formatCurrency()
formatDuration()
```

Usar `Intl` e a localidade atual.

---

## 32. URL e filtros

Filtros relevantes podem ser persistidos na URL.

Exemplos:

```text
/hunts?vocation=knight&world=Antica
```

```text
/statistics?character=123&period=30d
```

Benefícios:
- links compartilháveis;
- back/forward do navegador;
- estado reproduzível.

---

## 33. Responsive

A mesma aplicação deve funcionar em:

```text
Mobile
Tablet
Desktop
Wide Desktop
```

Breakpoints de referência:

```text
xs < 480
sm 480
md 768
lg 1024
xl 1280
2xl 1440
```

Desktop:

```text
Sidebar = 260px
Topbar  = 72px
```

Mobile:
- sidebar vira drawer;
- topbar com menu;
- bottom navigation pode ser usada para ações frequentes;
- nenhuma função importante depende exclusivamente de hover.

---

## 34. Acessibilidade

Obrigatório:
- HTML semântico;
- navegação por teclado;
- foco visível;
- labels;
- ARIA quando necessário;
- contraste adequado;
- mensagens de erro associadas aos campos;
- foco controlado em modais;
- `prefers-reduced-motion`;
- alt em imagens informativas;
- `alt=""` em imagens decorativas.

---

## 35. SEO

Páginas públicas devem possuir:

```text
title
description
canonical
Open Graph
social metadata
```

Structured data quando aplicável:

```text
Organization
WebSite
BreadcrumbList
Article
FAQPage
```

Áreas privadas:

```text
noindex
```

---

## 36. Assets

```text
assets/
├── images/
│   ├── branding/
│   ├── news/
│   └── characters/
├── illustrations/
│   ├── empty/
│   ├── errors/
│   └── system/
└── icons/
```

Artes de personagem:

```text
character-knight.webp
character-paladin.webp
character-sorcerer.webp
character-druid.webp
```

A arte é decorativa/contextual. O conteúdo deve continuar utilizável se a imagem falhar.

---

## 37. Loading e Feedback

Componentes compartilhados:

```text
Skeleton
LoadingSpinner
LoadingButton
PageLoading
SectionLoading
ErrorState
EmptyState
SuccessState
OfflineState
```

Preferir loading contextual em vez de um spinner global para toda requisição.

Toasts devem possuir um único provider global:

```text
toast.success()
toast.error()
toast.warning()
toast.info()
```

---

## 38. Error Boundary

Criar:

```text
app/ErrorBoundary.tsx
```

Erros inesperados de componentes devem ser isolados quando possível.

Exemplo:

```text
Componente
   ↓
erro inesperado
   ↓
Error Boundary
   ↓
ErrorState
   ↓
Tentar novamente
```

Em caso realmente grave, utilizar `/500`.

---

## 39. Analytics

Não espalhar código de tracking pelos componentes.

Criar:

```text
lib/analytics/
├── index.ts
└── events.ts
```

Exemplos:

```text
track("hunt_import_started")
track("hunt_import_completed")
track("premium_cta_clicked")
```

---

## 40. Segurança

Nunca colocar no bundle:
- secrets;
- credenciais;
- chaves privadas;
- tokens administrativos.

Variáveis públicas podem conter apenas configurações que possam ser expostas ao navegador.

Exemplo aceitável:

```text
VITE_API_URL
```

Nunca uma secret key.

---

## 41. Ambiente

Ter:

```text
.env
.env.example
```

`.env` com secrets não deve ser versionado.

Exemplo:

```text
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Tibia Wise
```

---

## 42. Mock API

Durante desenvolvimento, permitir simular o backend com **MSW**.

Exemplo:

```text
GET /api/v1/characters
POST /api/v1/hunts/import
GET /api/v1/statistics
```

Isso permite desenvolver o frontend enquanto o backend ainda está em implementação.

Mocks devem ficar claramente separados da implementação real.

---

## 43. Contratos da API

Idealmente:

```text
Backend DTO
      ↓
API Contract
      ↓
Frontend Types
```

Quando possível, usar OpenAPI para gerar tipos.

Nunca inventar campos ou endpoints apenas para fazer a tela funcionar.

---

## 44. Testes

### Unitários
- formatadores;
- schemas;
- utils.

### Componentes
- Buttons;
- Forms;
- Filters;
- Cards;
- estados.

### Integração
- login;
- importação;
- edição;
- filtros;
- mutations.

### E2E

Fluxo principal:

```text
Register
 ↓
Verify email
 ↓
Login
 ↓
Add character
 ↓
Import hunt
 ↓
View hunt
 ↓
Dashboard
 ↓
Statistics
 ↓
Recommendations
```

---

## 45. Regras para agentes de código/CLI

1. Não inventar endpoints.
2. Não inventar campos de API.
3. Não inventar regras de negócio.
4. Não criar páginas fora do mapa definido sem autorização.
5. Não adicionar funcionalidades Post-MVP.
6. Não duplicar componentes existentes.
7. Não colocar lógica de domínio em componentes genéricos.
8. Não colocar secrets no frontend.
9. Não usar dados fake como implementação final.
10. Não ignorar loading/error/empty.
11. Não ignorar mobile.
12. Não ignorar acessibilidade.
13. Não ignorar i18n.
14. Não alterar o Design System sem justificativa.
15. Procurar componentes existentes antes de criar novos.
16. Verificar o contrato da API antes de criar integração.
17. Se uma informação não existir no backend, não inventá-la.
18. Não implementar XP total, XP restante ou percentual de progresso sem fonte confiável.
19. Não implementar criação manual de Hunt no MVP.
20. Recomendações devem ser renderizadas a partir do backend.
21. Premium deve respeitar o estado real da assinatura.
22. Segurança não pode depender apenas de esconder elementos.

---

## 46. Ordem de implementação

### Fase 1 — Foundation

```text
Projeto
↓
TypeScript
↓
Router
↓
Theme
↓
i18n
↓
API client
↓
TanStack Query
↓
Error handling
```

### Fase 2 — Design System

```text
Tokens
↓
Typography
↓
Buttons
↓
Inputs
↓
Cards
↓
Tables
↓
Feedback
↓
Navigation
```

### Fase 3 — Layouts

```text
PublicLayout
AuthLayout
AppLayout
SystemLayout
```

### Fase 4 — Auth

```text
Login
Register
Verify
Recovery
```

### Fase 5 — Core

```text
Characters
↓
Import Hunt
↓
My Hunts
↓
Hunt Details
```

### Fase 6 — Analytics

```text
Dashboard
↓
Statistics
↓
Recommendations
```

### Fase 7 — Content

```text
News
Tutorials
FAQ
Support
```

### Fase 8 — Account

```text
Profile
Notifications
Settings
Premium
```

### Fase 9 — Quality

```text
403
404
500
503
SEO
Accessibility
Performance
Tests
```

---

## 47. Definition of Done

Uma página só está concluída quando:

### Visual
- [ ] Design System aplicado
- [ ] Dark
- [ ] Light
- [ ] Mobile
- [ ] Tablet
- [ ] Desktop

### Estados
- [ ] Loading
- [ ] Empty quando aplicável
- [ ] Error
- [ ] Success quando aplicável
- [ ] Disabled
- [ ] Processing quando aplicável

### Dados
- [ ] API integrada
- [ ] Tipos definidos
- [ ] Erros tratados
- [ ] Cache configurado quando necessário

### UX
- [ ] Feedback das ações
- [ ] Navegação funcionando
- [ ] Breadcrumb quando necessário
- [ ] CTA correto
- [ ] Sem ações duplicadas

### Acessibilidade
- [ ] Teclado
- [ ] Focus
- [ ] Labels
- [ ] Contraste
- [ ] Screen reader básico

### SEO
Somente páginas públicas:
- [ ] title
- [ ] description
- [ ] canonical
- [ ] Open Graph
- [ ] structured data quando aplicável

### Testes
- [ ] Componentes críticos
- [ ] Fluxos críticos
- [ ] E2E dos principais caminhos

---

## 48. Estrutura final resumida

```text
src/
│
├── app/
│   ├── guards/
│   ├── providers/
│   ├── App.tsx
│   └── router.tsx
│
├── components/
│   ├── ui/
│   ├── forms/
│   ├── feedback/
│   ├── navigation/
│   ├── data-display/
│   └── overlays/
│
├── config/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── hunts/
│   ├── characters/
│   ├── statistics/
│   ├── recommendations/
│   ├── news/
│   ├── tutorials/
│   ├── faq/
│   ├── support/
│   ├── premium/
│   ├── profile/
│   ├── notifications/
│   └── settings/
│
├── layouts/
├── lib/
│   ├── api/
│   ├── analytics/
│   ├── i18n/
│   ├── query/
│   ├── storage/
│   └── utils/
├── pages/
│   ├── public/
│   ├── auth/
│   ├── app/
│   └── system/
├── styles/
├── types/
├── assets/
└── main.tsx
```

---

## 49. Decisão arquitetural

```text
                   TIBIA WISE
                       │
              ┌────────┴────────┐
              │                 │
           Frontend          Backend
              │                 │
       UI + UX + State      Business Rules
       Presentation         Security
       Navigation           Validation
       API integration      Data
              │                 │
              └─────── API ─────┘
```

### Frontend

Responsável por:

- apresentação;
- experiência do usuário;
- navegação;
- estado da interface;
- integração com API;
- responsividade;
- acessibilidade;
- SEO público.

### Backend

Responsável por:

- autenticação;
- autorização;
- regras de negócio;
- validação definitiva;
- processamento das Hunts;
- estatísticas;
- recomendações;
- persistência;
- segurança.

**Essa separação deve ser preservada durante toda a implementação.**
