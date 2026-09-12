# Tibia Wise — Frontend Technical UI Specification
## CLI Development Specification v1.0

> **Status:** Approved  
> **Purpose:** Technical specification for implementing the Tibia Wise frontend through a CLI/code-generation workflow.  
> **Source of truth:** `Tibia_Wise_Design_System_v1.md`  
> **Scope:** UI architecture, design tokens, components, layouts, responsive behavior, accessibility, states, routes, SEO requirements and implementation conventions.

---

# 1. Objective

This document converts the Tibia Wise visual Design System into technical implementation rules.

The frontend must be:

- responsive;
- accessible;
- componentized;
- consistent;
- theme-aware;
- ready for API integration;
- prepared for authentication;
- SEO-friendly on public pages;
- usable on desktop, tablet and mobile.

The implementation must avoid hardcoding visual decisions inside individual pages whenever the value can be represented by a design token or reusable component.

---

# 2. Source of truth and priority

When implementing the frontend, follow this priority:

1. Product/business rules defined for Tibia Wise.
2. This technical specification.
3. `Tibia_Wise_Design_System_v1.md`.
4. Individual page specifications created later.
5. Implementation convenience.

A page must not introduce a new color, spacing, radius, button style or typography rule without a documented reason.

---

# 3. Recommended frontend architecture

The architecture should be framework-friendly but organized around reusable components.

Recommended conceptual structure:

```text
src/
├── app/
│   ├── routes/
│   └── layouts/
│
├── components/
│   ├── ui/
│   ├── navigation/
│   ├── forms/
│   ├── data-display/
│   ├── feedback/
│   └── domain/
│
├── features/
│   ├── auth/
│   ├── hunts/
│   ├── characters/
│   ├── statistics/
│   ├── recommendations/
│   ├── rankings/
│   ├── news/
│   └── settings/
│
├── layouts/
│   ├── PublicLayout/
│   └── AppLayout/
│
├── hooks/
├── services/
├── types/
├── utils/
├── constants/
├── styles/
│   ├── tokens/
│   ├── themes/
│   └── globals/
└── assets/
```

The exact framework may be selected separately. The component and token rules in this document remain applicable.

---

# 4. Design tokens

All reusable visual values should be represented as tokens.

## 4.1 Color tokens — Dark

```css
--color-bg-primary: #07111C;
--color-bg-secondary: #0D1B2A;

--color-surface: #101F2F;
--color-surface-highlight: #13263A;

--color-primary: #1688FF;
--color-primary-light: #00BFFF;

--color-gold: #F5A623;
--color-gold-light: #FFC857;

--color-border: #1E2A3A;

--color-text-primary: #F5F7FA;
--color-text-secondary: #A8B3C2;
--color-text-tertiary: #6B7785;

--color-success: #39D353;
--color-error: #FF5C5C;
--color-warning: #FFBF20;
--color-info: #1688FF;
--color-accent: #9A6BFF;
```

## 4.2 Semantic aliases

Components should preferably consume semantic tokens:

```css
--bg-page
--bg-surface
--bg-surface-hover
--text-primary
--text-secondary
--text-muted
--border-default
--action-primary
--action-primary-hover
--status-success
--status-error
--status-warning
--status-info
```

This allows Dark and Light themes to change values without changing component code.

---

# 5. Light theme

The Light Theme must reuse the semantic token names.

Example conceptual mapping:

```css
[data-theme="light"] {
  --bg-page: #F4F7FA;
  --bg-surface: #FFFFFF;
  --bg-surface-hover: #EEF4FA;

  --text-primary: #102033;
  --text-secondary: #526274;
  --text-muted: #788696;

  --border-default: #D9E1EA;

  --action-primary: #1688FF;
  --action-primary-hover: #0B74E0;

  --status-success: #249B3E;
  --status-error: #D94141;
  --status-warning: #B87800;
  --status-info: #1688FF;
}
```

The exact Light Theme values may be refined visually, but semantic names must remain stable.

---

# 6. Theme modes

Supported values:

```text
dark
light
system
```

Default:

```text
dark
```

Behavior:

- `dark`: force Dark Theme.
- `light`: force Light Theme.
- `system`: follow OS/browser preference.

The selected preference should be persisted for authenticated users.

For anonymous users, local storage/cookie may be used.

---

# 7. Typography

Font family:

```css
font-family: "Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

## 7.1 Type scale

```text
Display / Hero: 40–48px
H1:             32px / 700
H2:             24px / 700
H3:             20px / 700
H4:             16px / 500–700

Body:           14px / 400
Small:          12px / 400
Caption:        11–12px / 400

Metric XL:      32–40px / 700
Metric LG:      24–32px / 700
Metric MD:      20–24px / 700
```

Line-height should normally be approximately:

```text
Heading: 1.2
Body:    1.5
Small:   1.4
```

---

# 8. Spacing tokens

Use a 4px base.

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
```

Do not use arbitrary values such as `13px`, `19px`, `27px` unless there is a documented component-specific requirement.

---

# 9. Radius tokens

```css
--radius-sm: 4px;
--radius-md: 6px;
--radius-lg: 8px;
--radius-xl: 12px;
--radius-2xl: 16px;
```

Default:

- Input: `6px`
- Button: `6px`
- Card: `8px`
- Large container: `12px`

---

# 10. Layout dimensions

## 10.1 App Sidebar

```text
Desktop width: 260px
```

The sidebar is fixed/sticky within the application shell.

## 10.2 Topbar

```text
Height: 72px
```

Topbar width:

```text
100% of remaining application viewport
```

It must not have a fixed desktop width.

## 10.3 Content

Recommended:

```text
width: 100%;
max-width: 1600px;
margin-inline: auto;
padding: 24px;
```

The exact maximum may be adjusted according to page density.

---

# 11. Responsive breakpoints

Recommended breakpoints:

```text
xs: < 480px
sm: 480px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1440px
```

The UI must not depend on only one viewport width.

---

# 12. Application shell

Authenticated pages use:

```text
AppLayout
├── Sidebar
├── MainArea
│   ├── Topbar
│   └── PageContent
└── optional MobileNavigation
```

Conceptually:

```text
┌──────────────────┬────────────────────────────────────┐
│                  │ Topbar                             │
│                  ├────────────────────────────────────┤
│     Sidebar      │                                    │
│     260px        │              Content               │
│                  │                                    │
│                  │                                    │
└──────────────────┴────────────────────────────────────┘
```

---

# 13. Public layout

Unauthenticated pages use:

```text
PublicLayout
├── PublicHeader
├── PageContent
└── Footer
```

The authenticated Sidebar must not appear for anonymous users.

---

# 14. Sidebar specification

## Width

```text
260px
```

## Padding

```text
16px
```

## Logo

Recommended:

```text
max-width: 220px;
width: 100%;
height: auto;
```

Never distort aspect ratio.

## Navigation groups

### PRINCIPAL

```text
Dashboard
Minhas Hunts
Importar Hunt
Recomendações
```

### PERSONAGEM

Character context card:

```text
Character name
Level
Vocation
World
```

### AJUDA E CONTA

```text
Tutoriais
Suporte
Configurações
Premium
```

## Active item

Must have:

- visible background;
- primary blue accent;
- readable text;
- icon accent;
- sufficient contrast.

## Hover

Hover should increase surface contrast without causing layout movement.

## Collapsed desktop

Optional future enhancement:

```text
260px → 72px
```

When collapsed:

- icons remain;
- labels become hidden;
- tooltips become mandatory.

---

# 15. Character context card

The sidebar must support users with multiple characters.

The UI must display the currently selected/default character.

Example:

```text
┌─────────────────────────┐
│ PERSONAGEM ATIVO        │
│                         │
│ 🧙 Raphael              │
│ Level 150 Knight        │
│ 🌎 Antica               │
│                         │
│ Ver personagem →        │
└─────────────────────────┘
```

No percentage progress bar should be displayed.

Do not display:

- percentage to next level;
- XP remaining;
- total character XP;

unless the backend later provides reliable data.

---

# 16. Character selector

Users can own multiple characters.

Selector states:

```text
closed
open
hover
selected
keyboard focused
disabled
loading
```

Dropdown item:

```text
Character Name
Level X Vocation
World
```

Action:

```text
+ Adicionar personagem
```

The selected character is the default context for personalized pages.

---

# 17. Topbar specification

Height:

```text
72px
```

Recommended internal horizontal padding:

```text
16–24px
```

## Anonymous user

Elements:

```text
Global Search
Theme Selector
Language Selector
Login
Register
```

## Authenticated user

Elements:

```text
Global Search
+ Nova Hunt
Premium
Theme Selector
Language Selector
Notifications
Avatar / User Menu
```

---

# 18. Global Search

Desktop width:

```text
400–480px
```

Flexible width:

```text
min-width: 240px;
max-width: 480px;
```

Placeholder:

```text
Buscar hunts, lugares, jogadores...
```

Shortcut:

```text
Ctrl + K
```

Possible search domains:

```text
Hunts
Hunting Places
Characters
Players
News
```

Search should support:

```text
idle
focused
loading
results
no-results
error
```

---

# 19. New Hunt button

Authenticated users must see:

```text
+ Nova Hunt
```

Primary CTA.

Clicking opens a choice:

```text
Importar Hunt
Criar manualmente
```

The button must remain accessible on smaller desktop widths.

On mobile it can become:

```text
+
```

with accessible label:

```text
Nova Hunt
```

---

# 20. User menu

Authenticated user menu:

```text
Avatar
Character/User name
Level/Vocation
World

Meu perfil
Meus personagens
Configurações
Notificações
Sair
```

Do not expose private information unnecessarily.

---

# 21. Theme selector

Options:

```text
Dark
Light
System
```

Use iconography:

```text
🌙
☀️
🖥️
```

The selected option must be visually distinguishable and keyboard accessible.

---

# 22. Language selector

Initial supported languages:

```text
PT-BR
EN-US
```

Future languages can be added without changing component architecture.

The UI should display:

```text
🇧🇷 Português
🇺🇸 English
```

The language preference is stored as a user preference when authenticated.

---

# 23. Buttons

## Variants

```text
primary
secondary
ghost
danger
premium
icon
```

## Sizes

```text
sm: 32px
md: 40px
lg: 48px
```

Recommended default:

```text
md
```

## Minimum touch target

Interactive controls should provide approximately:

```text
44px × 44px
```

of usable touch area on mobile.

Visual height may remain smaller if the clickable area is appropriately padded.

## Button states

```text
default
hover
active
focus-visible
disabled
loading
```

## Loading

When loading:

- preserve button width;
- prevent duplicate submission;
- show progress indicator;
- retain accessible label.

Example:

```text
[ ⟳ Importando... ]
```

---

# 24. Input specification

Default height:

```text
40px
```

Large form control:

```text
48px
```

Padding:

```text
12px
```

States:

```text
default
hover
focus
filled
error
success
disabled
readonly
loading
```

Input must always have a programmatically associated label.

Placeholder is not a substitute for a label.

---

# 25. Password input

Requirements:

- password masking;
- show/hide control;
- accessible label;
- validation feedback;
- keyboard support.

Example:

```text
Senha
┌────────────────────────────┐
│ •••••••••••••••        👁   │
└────────────────────────────┘
```

---

# 26. Select

Select must support:

- keyboard navigation;
- selected state;
- disabled state;
- loading state when applicable;
- error state;
- clear action where applicable.

Use native select when custom behavior is unnecessary.

---

# 27. Multi-select

Used for filters such as:

- multiple vocations;
- multiple worlds;
- multiple hunting places.

Selected values should appear as chips/tags.

---

# 28. Checkbox

Use for binary independent options.

Example:

```text
☐ Tornar minha Hunt pública
```

Must have visible focus.

---

# 29. Radio

Use when exactly one option must be selected from a group.

Example:

```text
○ Pública
○ Privada
```

---

# 30. Switch

Use for immediate preference changes.

Examples:

```text
Notificações     [ ON ]
Tema automático  [ OFF ]
```

Do not use switches for actions that require confirmation or submission.

---

# 31. Date picker

Must support:

- keyboard;
- accessible labels;
- locale;
- min/max where necessary;
- mobile-friendly interaction.

Date formatting should respect selected language/locale.

---

# 32. Number input

Must support:

- numeric keyboard on mobile;
- min/max;
- step;
- validation;
- formatted display when appropriate.

---

# 33. Textarea

Used for:

- support;
- descriptions;
- notes;
- longer content.

Should have:

```text
min-height: 120px
```

unless page-specific requirements differ.

---

# 34. Cards

Base card:

```text
background: surface
border: 1px solid border
radius: 8px
padding: 16–24px
```

Variants:

```text
default
highlight
interactive
selected
disabled
```

Interactive cards must have hover/focus behavior.

---

# 35. Stat Card

Structure:

```text
Label
Metric
Trend / Supporting information
Optional icon
```

Example:

```text
XP / HOUR

2.14M

+12.5%
```

Do not use trends unless there is a valid comparison period.

---

# 36. Hunt Card

Recommended fields:

```text
Hunt name
Hunting place
Character
Level
Vocation
World
Duration
XP/hour
Profit/hour
Date
Visibility
```

Only display fields available from the API.

---

# 37. Character Card

Fields:

```text
Name
Level
Vocation
World
Status
```

No level progress percentage.

---

# 38. Recommendation Card

Fields may include:

```text
Hunting place
Estimated XP/hour
Estimated Profit/hour
Compatibility score
Reason
CTA
```

Recommendations are personalized and require authentication.

---

# 39. News Card

Fields:

```text
Image
Category
Title
Summary
Publication date
CTA
```

Image requires appropriate alt text when informative.

---

# 40. Tables

## Base

```text
Header
Rows
Optional actions
Pagination
```

## Alternating rows

Dark Theme:

```text
Row A: #0D1B2A
Row B: #101F2F
```

The difference must remain subtle.

## Hover

Interactive row:

```text
background → surface-highlight
```

## Alignment

General rule:

```text
Text → left
Numbers → right
Dates → center/right depending on density
Actions → right
```

## Mobile

Use one of:

```text
horizontal scroll
responsive column reduction
card transformation
```

Do not allow uncontrolled viewport overflow.

---

# 41. Badge

Variants:

```text
default
info
success
warning
error
premium
private
public
new
popular
```

Badge must communicate a state/category, not replace important information.

---

# 42. Toast

Position:

```text
Desktop: top-right
Mobile: top-center or bottom with safe-area consideration
```

Maximum visible count should be limited.

Types:

```text
success
info
warning
error
```

Toasts should not be the only way to communicate critical validation errors.

---

# 43. Alert

Persistent contextual feedback.

Examples:

```text
Success
Warning
Error
Info
```

Use alerts for information that should remain visible.

---

# 44. Modal

Modal structure:

```text
Overlay
└── Dialog
    ├── Header
    ├── Content
    └── Footer
```

Requirements:

- focus trap;
- ESC closes when allowed;
- click outside closes only when safe;
- return focus to trigger;
- accessible name;
- correct dialog semantics.

---

# 45. Dropdown

Requirements:

- open/close state;
- keyboard navigation;
- active item;
- selected item;
- disabled item;
- click-outside handling;
- escape handling.

---

# 46. Tabs

Tabs must only be used for related views.

States:

```text
default
hover
active
focus
disabled
```

Active tab must be visually obvious.

---

# 47. Breadcrumb

Example:

```text
Home
>
Hunts
>
Minhas Hunts
>
Glooth Bandits
```

Use semantic navigation markup.

Current page should not be an active navigation link when unnecessary.

---

# 48. Pagination

Support:

```text
first
previous
pages
next
last
```

Current page:

- visually highlighted;
- `aria-current="page"`.

Buttons unavailable at boundaries must be disabled.

---

# 49. Loading states

Prefer skeletons for content.

Skeleton should approximate final content dimensions.

Avoid layout shift.

Example:

```text
████████████
████████
████████████████
```

Use spinner for short actions.

---

# 50. Empty states

Required structure:

```text
Illustration / icon
Title
Explanation
Primary CTA
Optional secondary CTA
```

Example:

```text
Você ainda não possui nenhuma Hunt.

Importe sua primeira Hunt para começar.

[ Importar Hunt ]
```

---

# 51. Error states

Required structure:

```text
Icon/illustration
Title
Explanation
Retry CTA
Optional secondary action
```

Do not expose:

- stack trace;
- SQL errors;
- internal exception;
- API secrets;
- infrastructure details.

---

# 52. Permission states

For authenticated resources:

```text
403
```

For a feature such as Recommendations accessed anonymously, prefer a product-oriented CTA:

```text
Suas recomendações estão esperando por você.

Entre na sua conta para receber recomendações
baseadas nas suas Hunts e personagem.

[ Entrar ] [ Criar conta ]
```

---

# 53. Success states

Examples:

```text
Cadastro concluído
E-mail confirmado
Hunt importada
Hunt atualizada
Personagem adicionado
Senha alterada
Configuração salva
```

Every success state should provide a logical next action.

---

# 54. Navigation rules

## Public

Available without authentication:

```text
Home
Public Hunts
Public Hunt Details
News
News Details
FAQ
Tutorials
Premium
Contact
Terms
Privacy
```

## Authenticated

Available after login:

```text
Dashboard
My Hunts
Import Hunt
Characters
Statistics
Recommendations
Settings
Profile
Notifications
```

Recommendations are authenticated-only.

---

# 55. Route conventions

Prefer kebab-case.

Examples:

```text
/
 /login
 /register
 /forgot-password
 /reset-password
 /verify-email

 /dashboard
 /hunts
 /hunts/import
 /hunts/new
 /hunts/:id

 /characters
 /characters/new
 /characters/:id
 /characters/:id/edit

 /statistics
 /recommendations
 /rankings

 /news
 /news/:slug

 /tutorials
 /faq
 /support

 /settings
 /settings/profile
 /settings/account
 /settings/security
 /settings/privacy
 /settings/notifications

 /premium
 /terms
 /privacy
```

---

# 56. Authentication states

The frontend must support:

```text
anonymous
authenticating
authenticated
session-expired
logging-out
```

Protected routes must not rely only on UI hiding.

Backend authorization remains authoritative.

---

# 57. Session expiration

When the session expires:

1. stop protected requests;
2. attempt token refresh if supported;
3. if refresh fails, clear local authenticated state;
4. redirect to login;
5. preserve intended destination when safe.

Avoid silently losing the user's current navigation context.

---

# 58. API integration principle

Components should not directly contain business logic for API communication.

Prefer:

```text
Page
 ↓
Feature hook/service
 ↓
API client
 ↓
Backend
```

Example:

```text
DashboardPage
    ↓
useDashboard()
    ↓
dashboardService.getDashboard()
    ↓
GET /dashboard
```

---

# 59. API loading contract

Every API-backed feature should represent:

```typescript
{
  data,
  isLoading,
  isError,
  error,
  refetch
}
```

Exact implementation depends on the chosen frontend stack.

---

# 60. Domain types

Create domain types rather than passing anonymous objects everywhere.

Example:

```typescript
type Character = {
  id: string;
  name: string;
  level: number;
  vocation: string;
  world: string;
};
```

Example:

```typescript
type Hunt = {
  id: string;
  characterId: string;
  huntingPlace: string;
  startedAt: string;
  durationSeconds: number;
  xpGain: number;
  xpPerHour: number;
  profit: number;
};
```

Exact backend fields must be aligned with the final API contract.

---

# 61. Formatting rules

Centralize formatting functions.

Examples:

```text
formatNumber()
formatCurrency()
formatExperience()
formatDuration()
formatDate()
formatDateTime()
formatPercentage()
```

Do not duplicate number/date formatting logic across components.

---

# 62. Tibia-specific number formatting

Analytics values should be readable.

Examples:

```text
2,140,000
2.14M
485,000
485k
```

The display format should be chosen by context.

Exact numerical data must remain accessible through tooltip/details where abbreviation is used.

---

# 63. Positive/negative metrics

Positive:

```text
+415,150
```

use `success`.

Negative:

```text
-120,000
```

use `error`.

Do not infer positivity from arbitrary color alone.

---

# 64. Charts

Charts must support:

- responsive sizing;
- tooltip;
- accessible summary where possible;
- loading;
- empty;
- error;
- selected period;
- legend where necessary.

Recommended semantic colors:

```text
XP/hour → blue
Profit → green
Supplies → purple
Loot → gold
Damage → red
```

Charts must remain readable in both themes.

---

# 65. Responsive navigation

## Desktop

```text
Sidebar: 260px
Topbar: 72px
```

## Tablet

Sidebar may become compact.

## Mobile

Permanent sidebar is removed.

Top:

```text
☰ Tibia Wise Avatar
```

Bottom navigation may contain the most frequent actions:

```text
Home
Hunts
Import
Recommendations
More
```

The exact mobile navigation can be refined during page implementation.

---

# 66. Mobile interaction

Touch targets should be approximately:

```text
44 × 44px minimum target
```

Avoid hover-dependent functionality.

Any hover-only information must have an alternative for touch/keyboard.

---

# 67. Safe areas

On mobile, account for:

```text
env(safe-area-inset-top)
env(safe-area-inset-bottom)
```

when using fixed top/bottom navigation.

---

# 68. Accessibility requirements

Minimum requirements:

- semantic HTML;
- visible keyboard focus;
- keyboard navigation;
- labels for form fields;
- accessible names for icon-only buttons;
- sufficient contrast;
- logical tab order;
- no color-only communication;
- alt text for informative images;
- decorative images use empty alt;
- modal focus management;
- `aria-current` for active navigation;
- appropriate ARIA only when necessary.

---

# 69. Icon-only controls

Every icon-only button requires an accessible name.

Example:

```html
<button aria-label="Abrir notificações">
  ...
</button>
```

Do not rely on tooltip text alone.

---

# 70. Images

Informative:

```html
<img
  src="..."
  alt="Glooth Bandits"
/>
```

Decorative:

```html
<img
  src="..."
  alt=""
/>
```

Do not use:

```text
alt="imagem"
alt="foto"
alt="image"
```

---

# 71. SEO metadata

Public pages should define:

```text
title
description
canonical
Open Graph
social preview
```

Each indexable page must have a unique title.

Example:

```text
Glooth Bandits Hunt — XP/h, Profit e Análise | Tibia Wise
```

---

# 72. robots.txt

Expected concept:

```text
User-agent: *
Allow: /

Disallow: /dashboard
Disallow: /settings
Disallow: /api
```

Final rules must be validated against the final public/private route architecture.

---

# 73. Sitemap

Public indexable routes should be eligible for sitemap inclusion.

Potential routes:

```text
/
/hunts
/hunts/:id
/news
/news/:slug
/tutorials
/faq
/premium
/terms
/privacy
```

Private routes must not be included.

---

# 74. Canonical URLs

Every indexable page should have a canonical URL.

Avoid duplicate indexable URLs for the same content.

---

# 75. Open Graph

Public pages should define:

```text
og:title
og:description
og:image
og:url
og:type
```

News pages should have article-specific metadata where supported.

---

# 76. Structured data

Use structured data only where semantically appropriate.

Potential uses:

```text
Organization
WebSite
BreadcrumbList
Article
FAQPage
```

Do not add structured data merely to increase markup volume.

---

# 77. Error pages

Required:

```text
403
404
500
503
```

All must preserve Tibia Wise branding.

## 404

CTA:

```text
Voltar
```

or:

```text
Ir para Dashboard
```

depending on authentication state.

## 403

Explain permission problem.

## 500

Explain unexpected system error.

## 503

Explain temporary unavailability and offer retry.

---

# 78. Internationalization

The frontend must not hardcode user-facing strings inside complex components.

Prefer translation keys:

```text
auth.login.title
auth.login.submit
hunts.import.title
dashboard.welcome
errors.notFound.title
```

This is required to support:

```text
PT-BR
EN-US
```

without rewriting components.

---

# 79. Date and number localization

Use locale-aware formatting.

PT-BR example:

```text
02/09/2026
```

English example:

```text
09/02/2026
```

The selected language must control presentation.

The backend should continue returning machine-readable timestamps/data.

---

# 80. Form validation

Validation should occur:

```text
client-side → immediate UX feedback
server-side → authoritative validation
```

Never trust client-side validation as a security boundary.

---

# 81. Form error rules

Errors should:

- identify the field;
- explain the issue;
- remain readable;
- be associated with the field;
- not disappear before the user can understand them.

Example:

```text
Senha

A senha deve possuir pelo menos 8 caracteres.
```

---

# 82. Destructive actions

Deletion must use confirmation where appropriate.

Example:

```text
Excluir Hunt?

Esta ação não pode ser desfeita.

[Cancelar] [Excluir]
```

Use Danger button only for the destructive action.

---

# 83. Permission architecture

Frontend permission checks are for UX.

They are not security controls.

Example:

```text
if (!authenticated) {
  redirect('/login');
}
```

But backend must independently validate:

- user ownership;
- permissions;
- roles;
- access to private Hunts;
- character ownership.

---

# 84. Privacy rules in UI

Private Hunts:

- visible to owner;
- not publicly indexed;
- not displayed in public lists;
- should not leak metadata to anonymous users.

Archived Hunts:

- excluded from active statistics according to product rules;
- remain accessible according to ownership rules.

---

# 85. Recommendation access

Route:

```text
/recommendations
```

requires authentication.

The page uses:

```text
active/default character
+
historical hunt data
+
other recommendation inputs
```

If the user has no usable data, show an Empty State rather than an error.

---

# 86. Empty recommendation state

Example:

```text
Ainda não temos dados suficientes
para criar suas recomendações.

Importe algumas Hunts para que o
Tibia Wise possa conhecer seu perfil.

[ Importar Hunt ]
```

---

# 87. Component naming

Use consistent names.

Examples:

```text
Button
Input
Select
Card
StatCard
HuntCard
CharacterCard
RecommendationCard
NewsCard
DataTable
Breadcrumb
Modal
Toast
Alert
Tabs
Pagination
Skeleton
EmptyState
ErrorState
```

Avoid ambiguous names such as:

```text
Box
Thing
Container2
CardNew
BlueButton
```

---

# 88. Component API principles

Components should expose semantic props.

Prefer:

```tsx
<Button variant="primary" size="md">
```

instead of:

```tsx
<Button blue roundedLarge>
```

Prefer:

```tsx
<Card variant="highlight">
```

instead of:

```tsx
<Card darkBorderBlue>
```

---

# 89. Avoid visual prop explosion

Do not create dozens of one-off visual props.

Bad:

```text
padding
paddingTop
blue
dark
gold
rounded
roundedLarge
special
```

Good:

```text
variant
size
state
```

Tokens should control the visual details.

---

# 90. Component state matrix

Reusable components should document states.

Example:

```text
Button
├── default
├── hover
├── active
├── focus
├── disabled
└── loading

Input
├── default
├── hover
├── focus
├── filled
├── error
├── success
├── disabled
└── readonly
```

---

# 91. Page implementation rule

Every page specification should contain:

```text
Route
Authentication
Purpose
Layout
Components
Data
Actions
Primary CTA
Secondary CTA
Loading
Empty
Error
Success
Permission
Responsive behavior
SEO
Accessibility
```

No production page should be implemented without these decisions.

---

# 92. Recommended development order

```text
1. Tokens
2. Theme provider
3. Global styles
4. Typography
5. App/Public layouts
6. Sidebar
7. Topbar
8. Footer
9. Buttons
10. Form controls
11. Cards
12. Tables
13. Feedback components
14. Navigation components
15. Authentication pages
16. Dashboard
17. Hunts
18. Characters
19. Statistics
20. Recommendations
21. Rankings
22. Public content
23. Settings
24. Error pages
25. SEO
26. Accessibility audit
27. Responsive audit
```

---

# 93. CLI implementation workflow

Recommended workflow for an AI coding CLI:

## Step 1

Read:

```text
Tibia_Wise_Design_System_v1.md
Tibia_Wise_Frontend_Technical_Spec_v1.md
```

## Step 2

Implement tokens and theme infrastructure.

## Step 3

Implement shared layout.

## Step 4

Implement atomic/reusable UI components.

## Step 5

Implement pages using only approved components.

## Step 6

Run visual/functional validation.

## Step 7

Only then introduce page-specific components.

---

# 94. Rule for AI coding agents

An AI coding agent must not:

- invent a new color without approval;
- replace Roboto without approval;
- create a second button system;
- duplicate existing components;
- hardcode responsive behavior independently of tokens;
- expose backend errors directly;
- create fake data as if it were real;
- assume one character per user;
- show level progression percentage;
- make Recommendations public;
- implement authorization only on the frontend.

If a requirement conflicts with this specification, the agent should flag the conflict instead of silently changing the Design System.

---

# 95. Mock data rule

Mock data may be used during frontend development, but it must be clearly separated from production API integration.

Recommended:

```text
mocks/
fixtures/
```

Do not make mock data look like a backend contract without documenting it.

---

# 96. API contract readiness

Components should be able to transition from:

```text
mock data
```

to:

```text
API data
```

without redesigning the UI.

The UI should depend on domain types rather than raw API responses whenever possible.

---

# 97. Performance

General requirements:

- lazy load large page sections when useful;
- optimize images;
- use responsive image sizes;
- avoid unnecessary re-renders;
- paginate large datasets;
- virtualize very large tables if necessary;
- avoid loading all Hunts at once;
- avoid loading chart datasets unnecessarily.

---

# 98. Layout stability

Avoid cumulative layout shift.

Reserve dimensions for:

- images;
- charts;
- skeletons;
- cards;
- navigation.

Loading content should occupy approximately the same space as final content.

---

# 99. Security-related frontend rules

Never place in frontend source:

- JWT signing secrets;
- database credentials;
- private API keys;
- service-role credentials;
- sensitive backend configuration.

Public environment variables must contain only values intended for the client.

---

# 100. Final implementation checklist

Before considering a component complete:

```text
[ ] Uses approved design tokens
[ ] Supports Dark Theme
[ ] Supports Light Theme
[ ] Responsive
[ ] Keyboard accessible
[ ] Focus state implemented
[ ] Loading state where applicable
[ ] Disabled state where applicable
[ ] Error state where applicable
[ ] Empty state where applicable
[ ] Correct semantic HTML
[ ] Accessible labels
[ ] No hardcoded business assumptions
[ ] No duplicated component implementation
```

Before considering a page complete:

```text
[ ] Route defined
[ ] Authentication requirement defined
[ ] Layout defined
[ ] Components reused
[ ] API/data requirements defined
[ ] Loading state
[ ] Empty state
[ ] Error state
[ ] Success state where applicable
[ ] Permission state where applicable
[ ] Responsive behavior
[ ] Breadcrumbs where useful
[ ] Unique title
[ ] Meta description
[ ] Canonical where applicable
[ ] Open Graph where applicable
[ ] Alt text
[ ] Keyboard navigation
[ ] Mobile validation
[ ] Dark validation
[ ] Light validation
```

---

# 101. Current approved decisions

```text
Design:
    Dark Theme default
    Light Theme available
    System theme available
    Roboto
    Tibia Wise logo + owl
    Modern analytics + Tibia fantasy identity

Colors:
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
    #39D353
    #FF5C5C
    #FFBF20
    #9A6BFF

Layout:
    Sidebar: 260px
    Topbar: 72px
    Responsive: Desktop / Tablet / Mobile

Navigation:
    Dashboard
    My Hunts
    Import Hunt
    Recommendations
    Character context
    Tutorials
    Support
    Settings
    Premium

Account:
    Multiple characters
    Default character
    Default language
    Default theme

Restrictions:
    Recommendations require authentication
    No character level progress percentage
    No invented character XP totals

UX:
    Clear CTAs
    Breadcrumbs
    Loading states
    Empty states
    Error states
    Success states
    403 / 404 / 500 / 503

SEO:
    Unique titles
    Unique descriptions
    Alt text
    robots.txt
    sitemap
    canonical
    Open Graph
    structured data where appropriate
```

---

# 102. Next document

This technical Design System should be followed by:

> **Tibia Wise — Frontend Page Specification v1.0**

That document should define each individual page in detail.

Recommended first pages:

```text
1. Public Layout
2. Login
3. Register
4. Registration Success
5. Verify Email
6. Dashboard
7. My Hunts
8. Import Hunt
9. Hunt Details
10. Characters
11. Character Details
12. Statistics
13. Recommendations
```

Each page should then be specified at component, data, interaction and responsive level.

---

## Document status

**Tibia Wise Frontend Technical Specification v1.0**

Status:

**APPROVED FOUNDATION / READY FOR PAGE-LEVEL SPECIFICATION**

This document should be treated as the technical UI contract for frontend implementation unless a newer version explicitly supersedes it.
