# Tibia Wise Frontend — Status & Roadmap

## ✅ Concluído

### Foundation
- [x] Projeto Vite + React 19 + TypeScript
- [x] Design Tokens (cores, espaçamento, radius, tipografia, sombras)
- [x] Dark / Light / System theme (persistido no localStorage)
- [x] i18n (pt-BR / en) com react-i18next + detecção de idioma
- [x] API Client centralizado (fetch + JWT Bearer + refresh automático)
- [x] TanStack Query (cache, retry, stale-time)
- [x] React Router v7 (lazy loading, guards RequireAuth/RequireGuest)
- [x] Error Boundary global
- [x] Estrutura de pastas por features (app, components, features, layouts, lib, pages, styles, types)
- [x] robots.txt, favicons, assets de imagens copiados para public/

### Design System (components/ui, components/feedback, components/navigation, components/overlays, components/data-display)
- [x] Button (primary, secondary, ghost, danger, premium, icon; sizes sm/md/lg; loading)
- [x] IconButton
- [x] Input, PasswordInput (show/hide), Textarea, Select, Checkbox, Switch
- [x] Card, StatCard, Badge (variant: default/info/success/warning/error/premium/accent)
- [x] Table (wrapper responsivo, Th/Td/Tr, ordenação visual)
- [x] Tabs, Pagination, Breadcrumb
- [x] Toast (provider global + useToast hook; success/error/warning/info; auto-dismiss)
- [x] Alert (success/info/warning/error)
- [x] Skeleton (shimmer, circle variant)
- [x] EmptyState, ErrorState
- [x] Modal (focus trap, Esc, click outside, portal, retorno de foco)
- [x] Dropdown (trigger render prop, itens com ícone/danger, fechamento click outside/Esc)

### Layouts
- [x] AppLayout (Sidebar 260px fixa + Topbar 72px fixa + conteúdo)
- [x] Sidebar (logo, navegação principal, character context card, ajuda/conta, tema selector, user menu dropdown)
- [x] Topbar (menu hamburger mobile, busca global Ctrl+K, nova hunt, tema selector dropdown, idioma dropdown, notificações, premium badge, user avatar dropdown)
- [x] MobileNav (bottom nav fixa: Dashboard, Hunts, Import, Recommendations)
- [x] PublicLayout (PublicHeader com logo + links públicos + login/register, Footer com 3 colunas + copyright)
- [x] SystemLayout (para páginas de erro 403/404/500/503)
- [x] Responsividade: drawer sidebar no tablet/mobile, topbar adaptada, bottom nav mobile

### Auth (features/auth)
- [x] Login (identifier + password, remember me, forgot password link, RHF + Zod)
- [x] Register (email, username, display_name, password, confirm, country_code, birth_date, terms links)
- [x] Forgot Password (email, success state)
- [x] Reset Password (token from URL, password + confirm, success state)
- [x] Verify Email (token 6 dígitos, reenviar com cooldown, success state)
- [x] RegisterSuccess (exibe e-mail, link para verify-email)
- [x] Schemas Zod com mensagens i18n
- [x] Error mapping (INVALID_CREDENTIALS, EMAIL_NOT_VERIFIED, EMAIL_ALREADY_IN_USE, USERNAME_ALREADY_IN_USE, CAPTCHA_REQUIRED, etc.)

### Characters (features/characters)
- [x] CharactersListPage (grid com CharacterCard, skeleton, empty state, botão adicionar)
- [x] CharacterDetailsPage (avatar vocação, level/vocation/world, skills grid, badges, link editar)
- [x] CharacterFormPage (create/edit: name, level, magic_level, 7 skills, is_private; RHF + Zod; carrega dados na edição)
- [x] CharacterCard (nome, badges private/status, details grid, dropdown actions: ver/editar/refresh/delete)
- [x] CharacterSelector (dropdown no header/sidebar, lista personagens, check ativo, link adicionar)
- [x] TanStack Query (list, get, create, update, delete, refresh, verify, generate-verification)
- [x] i18n keys completas

### Hunts (features/hunts)
- [x] ImportHuntPage (wizard 2 passos: select character → conteúdo + opções; CharacterSelector, Textarea raw content, selects, checkboxes, preview)
- [x] MyHuntsPage (grid HuntCard, skeleton, empty state, botão importar)
- [x] HuntDetailsPage (header com badges, stats cards duration/xp/h/profit/h/balance, loot/supplies/creatures tables)
- [x] HuntCard (nome, badges, stats duration/xp/h/profit, dropdown ver/deletar, link para detalhes)
- [x] TanStack Query (list public, myHunts, get, myHuntDetail, import, update, archive, delete)
- [x] i18n keys completas

---

## 🔄 Em Andamento / Próximos

### Analytics (Dashboard, Statistics, Recommendations)
- [x] DashboardPage (welcome, StatCards, XP/h chart, última hunt, últimas hunts, news preview, recommendations preview)
- [x] StatisticsPage (KPIs, evolution chart, period comparison, XP/profit analysis, hunting place performance)
- [x] RecommendationsPage (cards com hunting place, XP/h estimado, profit estimado, compatibilidade, razão, CTA)
- [x] Charts (Recharts com cores semânticas: XP=azul, Profit=verde, Supplies=roxo, Loot=dourado, Damage=vermelho)

### Content (News, Tutorials, FAQ, Support)
- [x] NewsListPage + NewsDetailsPage (SEO, OG tags, structured data Article)
- [x] TutorialsPage (categorias: primeiros passos, análise, recursos)
- [x] FAQPage (accordion, busca, categorias)
- [x] SupportPage (form + categorias, FAQ search)

### Account (Profile, Notifications, Settings, Premium)
- [x] ProfilePage (avatar, display_name, email, username, country, birth_date, characters summary)
- [ ] NotificationsPage (lista com paginação, mark read/unread, mark all read)
- [ ] SettingsPage (tabs: Profile, Account, Security, Privacy, Preferences)
  - Preferences: default_character_id, default_language, default_theme
- [ ] PremiumPage (hero, benefits, plan comparison, FAQ, subscription status)

### Rankings
- [ ] RankingsPage (tabs: XP/h, Profit/h, Total XP, Total Profit; filtros vocação/mundo/período; paginação)

### Quality & Polish
- [ ] Error Pages (403, 404, 500, 503 com branding + CTAs)
- [ ] SEO (sitemap.xml, canonical, OG tags, structured data: Organization, WebSite, BreadcrumbList, Article, FAQPage)
- [ ] Accessibility audit (contraste, foco visível, navegação teclado, ARIA, alt texts, semântica HTML)
- [ ] Performance (lazy loading, image optimization, bundle analysis, virtualização tabelas grandes)
- [ ] Testes (Vitest + RTL unit/component, Playwright E2E: register→login→add character→import hunt→dashboard)

---

## 📦 Estrutura Atual

```
src/
├── app/
│   ├── App.tsx, router.tsx, ErrorBoundary.tsx
│   ├── guards/ (RequireAuth, RequireGuest)
│   └── providers/ (AppProviders, ThemeProvider)
├── components/
│   ├── ui/ (Button, IconButton, Input, PasswordInput, Textarea, Select, Checkbox, Switch, Card, StatCard, Badge)
│   ├── feedback/ (Toast, Alert, Skeleton, EmptyState, ErrorState)
│   ├── navigation/ (Tabs, Pagination, Breadcrumb)
│   ├── data-display/ (Table)
│   └── overlays/ (Modal, Dropdown)
├── config/ (env.ts, routes.ts)
├── features/
│   ├── auth/ (api, components, schemas, AuthProvider)
│   ├── characters/ (api, components, schemas)
│   └── hunts/ (api, components, schemas)
├── layouts/
│   ├── AppLayout (Sidebar, Topbar, MobileNav, AppLayout.css)
│   ├── PublicLayout (PublicHeader, Footer, PublicHeader.css, Footer.css)
│   └── SystemLayout
├── lib/
│   ├── api/ (client.ts, errors.ts)
│   ├── i18n/ (index.ts, locales/pt-BR, locales/en)
│   ├── query/ (queryClient.ts)
│   ├── storage/ (tokenStorage.ts)
│   └── utils/ (format.ts)
├── pages/
│   ├── public/ (HomePage)
│   ├── auth/ (Login, Register, ForgotPassword, ResetPassword, VerifyEmail, RegisterSuccess)
│   ├── app/ (Dashboard, CharactersList, CharacterDetails, CharacterForm, ImportHunt, MyHunts, HuntDetails)
│   └── system/ (NotFoundPage)
├── styles/ (tokens.css, globals.css)
├── types/ (api.ts)
└── main.tsx
```

---

## 📝 Próximo Commit Sugerido

**Analytics: DashboardPage** — usar Recharts para XP/h chart, StatCards (total hunts, avg XP/h, avg profit/h, bestiary progress), last hunt summary, latest hunts table, news preview, recommendations preview.