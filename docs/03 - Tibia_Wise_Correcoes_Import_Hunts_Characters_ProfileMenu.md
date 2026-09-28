# Tibia Wise — Correções: Import Hunt, Hunts, Characters e Menu do Perfil

## Objetivo

Corrigir os problemas funcionais identificados nas telas atuais sem refazer o layout aprovado.

Problemas:

1. Seletor de personagem do modal de Importar Hunt está pequeno/cortado.
2. A primeira importação funciona, mas novas importações não.
3. Uma Hunt mostra `NaN`.
4. A página de detalhes da Hunt não funciona corretamente.
5. Character não carrega World/Level corretamente.
6. Links do menu do perfil não funcionam.

---

# 01 — Importar Hunt

## 01.01 — Seletor de personagem

O campo/dropdown está pequeno e o conteúdo fica cortado.

Corrigir o componente para:

- ocupar largura adequada;
- possuir altura adequada;
- não cortar o texto;
- mostrar as opções corretamente;
- funcionar em desktop/mobile;
- respeitar `z-index`;
- possuir scroll se houver muitas opções;
- funcionar por teclado;
- fechar após seleção.

Reutilizar o Select/Dropdown do design system.

Se for dropdown customizado, verificar especialmente:

```text
z-index
overflow
position
max-height
width
```

Não alterar a regra de quais personagens podem ser utilizados sem verificar o backend.

---

## 01.02 — Importação funciona apenas uma vez

**Problema crítico:** uma Hunt foi importada com sucesso, mas novas importações não funcionam.

Investigar antes de alterar:

```text
onSubmit
onClick
React Hook Form
useMutation
mutation.reset()
form.reset()
isPending
isSuccess
isError
disabled
input[type=file]
onChange
query invalidation
```

Possíveis causas a investigar:

- mutation permanece em `success`;
- formulário não é resetado;
- estado de erro/sucesso permanece;
- botão fica disabled;
- input de arquivo não dispara novamente;
- conteúdo anterior permanece;
- modal não reinicializa;
- cache não é atualizado.

### Comportamento obrigatório

Cada importação deve começar novamente no estado inicial:

```text
IDLE
→ VALIDATING
→ IMPORTING
→ SUCCESS / ERROR
```

Depois do sucesso, deve ser possível importar outra Hunt imediatamente.

Ao fechar e reabrir o modal, limpar:

- arquivo anterior;
- conteúdo anterior;
- erro;
- sucesso;
- loading;
- estado da mutation.

Se usar input de arquivo, garantir que selecionar novamente o mesmo arquivo também funcione.

Após sucesso, invalidar/refetch apenas as queries realmente afetadas, como My Hunts/Hunts/Statistics, conforme as query keys existentes.

**Não inventar query keys.**

---

# 02 — Hunt com `NaN`

Existe uma Hunt mostrando:

```text
NaN
```

Isso nunca deve chegar à interface.

## Investigar a origem

Verificar:

```text
API response
DTO
mapper
formatter
HuntCard
HuntList
```

e cálculos envolvendo:

```text
duration
XP
profit
loot
supplies
```

Especialmente divisões por `0`, `null`, `undefined` ou string vazia.

### Não fazer

Não simplesmente transformar:

```text
NaN → 0
```

porque isso pode esconder erro real.

### Comportamento

Se o valor realmente não estiver disponível:

```text
—
```

ou outro estado já padronizado pelo sistema.

Se o backend deveria fornecer o valor, corrigir o mapper/DTO/backend.

Criar/reutilizar formatter centralizado para tratar:

```text
number válido
null
undefined
NaN
Infinity
```

---

# 03 — Página de detalhes da Hunt

Verificar o fluxo completo da Hunt Details.

Rotas esperadas conforme arquitetura existente:

```text
/hunts/:id
/my-hunts/:id
```

Reutilizar as rotas existentes se já houver implementação. Não criar duplicadas.

A página precisa ter estados:

```text
LOADING
SUCCESS
NOT_FOUND
ERROR
FORBIDDEN
PRIVATE
ARCHIVED
```

## Conteúdo

Apresentar somente dados realmente retornados pelo backend:

```text
Hunting Place
Character
Data
Duração
XP/h
Profit/h
Loot
Supplies
```

Não inventar métricas.

## Privacidade

Para Hunt privada, não revelar metadata ao usuário sem permissão.

Para Hunt arquivada, respeitar as regras existentes.

Para Hunt pública, manter o botão de compartilhar se já existir:

```text
Compartilhar Hunt
```

Ao copiar:

```text
Link da Hunt copiado!
```

---

# 04 — Character: World e Level

Na card do personagem, os dados precisam vir corretamente do backend.

Investigar o fluxo:

```text
Backend
→ DTO
→ API client
→ React Query
→ mapper
→ Character type
→ componente
```

Verificar os campos reais existentes, por exemplo:

```text
id
name
level
vocation
world
status
```

Não assumir nomes de propriedades.

Se o backend já fornece World/Level, corrigir o ponto em que estão sendo perdidos.

Se não fornece, informar o endpoint/DTO necessário.

Não inventar valores.

## Status

Character não confirmado deve permanecer no status retornado pelo backend, por exemplo:

```text
PENDING
UNVERIFIED
VERIFYING
```

Nunca transformar automaticamente em:

```text
ACTIVE
VERIFIED
```

---

# 05 — Menu do perfil

O menu contém:

```text
Meu perfil
Meus personagens
Configurações
Notificações
Sair
```

Corrigir todos.

## Meu perfil

Destino:

```text
/profile
```

Verificar a rota real antes de alterar.

## Meus personagens

Destino:

```text
/characters
```

## Configurações

Destino:

```text
/settings
```

## Notificações

Destino:

```text
/notifications
```

## Sair

Não é navegação simples.

Executar o logout real:

```text
1. logout
2. limpar sessão/tokens conforme arquitetura
3. atualizar estado de autenticação
4. limpar dados privados/cache quando necessário
5. redirecionar para /
```

Respeitar a arquitetura atual de access/refresh token.

---

# 06 — Navegação do menu

Usar o padrão de navegação já adotado pelo projeto:

```tsx
<Link />
```

ou:

```tsx
useNavigate()
```

Não usar:

```html
<a href="#">
```

para rotas internas.

Após clicar:

```text
navegar
→ fechar dropdown
→ carregar página
```

No mobile, manter comportamento equivalente.

---

# 07 — i18n

Todos os textos novos/corrigidos devem usar:

```text
src/lib/i18n/locales/pt-BR/common.json
src/lib/i18n/locales/en/common.json
```

Nenhuma chave deve aparecer literalmente na interface.

Proibido mostrar:

```text
hunt.details.title
character.world
profile.logout
```

---

# 08 — Formatação de dados

Reutilizar/criar formatters centralizados para:

```text
XP/h
Profit/h
Loot
Supplies
Duration
Date
Level
```

Tratar corretamente:

```text
null
undefined
NaN
Infinity
0
```

Não converter indiscriminadamente ausência de dados para zero.

---

# 09 — React Query / estado

Revisar mutations e queries relacionadas à importação:

```text
queryKey
mutationKey
invalidateQueries
refetch
reset
staleTime
enabled
```

O problema de “funciona uma vez” deve ser resolvido na origem, não com hacks de UI.

---

# 10 — Segurança

Backend continua sendo autoridade para:

```text
ownership
private/public
character verification
Premium
authorization
hunt access
```

Não confiar em estado local para liberar acesso.

Para Hunt privada sem permissão, não revelar:

- título;
- personagem;
- métricas;
- proprietário;
- outros dados.

---

# 11 — Não fazer

Não:

- refazer o layout inteiro;
- trocar React Router;
- trocar TanStack Query;
- instalar biblioteca nova;
- mascarar `NaN` com `0`;
- inventar dados de Character;
- marcar Character como verificado no frontend;
- criar rotas duplicadas;
- criar endpoints fictícios;
- usar estado local para fingir sucesso da API;
- esconder erros silenciosamente.

---

# 12 — Ordem de implementação

## Etapa 1 — Import Hunt

- [ ] corrigir tamanho do seletor;
- [ ] corrigir overflow/dropdown;
- [ ] investigar segunda importação;
- [ ] resetar mutation/form;
- [ ] corrigir input de arquivo/conteúdo;
- [ ] atualizar queries após sucesso.

## Etapa 2 — Hunt List

- [ ] descobrir origem do `NaN`;
- [ ] corrigir cálculo;
- [ ] corrigir formatter;
- [ ] impedir valores inválidos na UI.

## Etapa 3 — Hunt Details

- [ ] verificar rota;
- [ ] API;
- [ ] DTO;
- [ ] mapper;
- [ ] loading;
- [ ] sucesso;
- [ ] 404;
- [ ] 403;
- [ ] privada;
- [ ] arquivada;
- [ ] compartilhamento.

## Etapa 4 — Characters

- [ ] World;
- [ ] Level;
- [ ] Vocation;
- [ ] status;
- [ ] DTO;
- [ ] mapper;
- [ ] query;
- [ ] card.

## Etapa 5 — Profile Menu

- [ ] Meu perfil;
- [ ] Meus personagens;
- [ ] Configurações;
- [ ] Notificações;
- [ ] Logout;
- [ ] fechar dropdown.

## Etapa 6 — i18n e validação

- [ ] PT-BR;
- [ ] EN;
- [ ] nenhuma chave visível;
- [ ] build;
- [ ] console;
- [ ] desktop;
- [ ] mobile.

---

# 13 — Checklist final

## Import Hunt

- [ ] seletor possui tamanho adequado;
- [ ] dropdown não é cortado;
- [ ] primeira importação funciona;
- [ ] segunda importação funciona;
- [ ] terceira importação funciona;
- [ ] fechar/reabrir modal funciona;
- [ ] novo arquivo funciona;
- [ ] mesmo arquivo novamente funciona;
- [ ] loading funciona;
- [ ] sucesso funciona;
- [ ] erro funciona;
- [ ] queries atualizadas.

## Hunt

- [ ] nenhum `NaN`;
- [ ] valores ausentes tratados;
- [ ] duração correta;
- [ ] XP/h correto;
- [ ] Profit/h correto;
- [ ] detalhes abre;
- [ ] loading;
- [ ] 404;
- [ ] 403;
- [ ] privada;
- [ ] arquivada;
- [ ] pública.

## Character

- [ ] World carregado;
- [ ] Level carregado;
- [ ] Vocation carregada quando disponível;
- [ ] status correto;
- [ ] não verificado não vira verificado.

## Menu

- [ ] Meu perfil funciona;
- [ ] Meus personagens funciona;
- [ ] Configurações funciona;
- [ ] Notificações funciona;
- [ ] Sair funciona;
- [ ] dropdown fecha após navegação.

## Geral

- [ ] PT-BR;
- [ ] EN;
- [ ] nenhuma chave i18n visível;
- [ ] console sem erros;
- [ ] TypeScript sem erros;
- [ ] `npm run build` passa;
- [ ] desktop;
- [ ] mobile.

---

# 14 — Relatório obrigatório do OpenCode

Ao terminar, informar:

```text
## Import Hunt
Problema:
Causa raiz:
Correção:
Arquivos:

## NaN
Campo:
Causa raiz:
Correção:
Arquivos:

## Hunt Details
Problema:
Causa raiz:
Correção:
Arquivos:

## Character
World:
Level:
Vocation:
Status:
Causa raiz:
Arquivos:

## Profile Menu
Meu perfil:
Meus personagens:
Configurações:
Notificações:
Logout:

## Validação
npm run build: PASS/FAIL
Console: PASS/FAIL
TypeScript: PASS/FAIL
Desktop: PASS/FAIL
Mobile: PASS/FAIL
```

Se algo depender do backend:

```text
Bloqueio:
Endpoint:
DTO/campo necessário:
Motivo:
```

Não criar solução fictícia.

---

# Critério final

O usuário deve conseguir:

```text
Importar várias Hunts consecutivamente
        ↓
Visualizar métricas sem valores inválidos
        ↓
Abrir a página da Hunt
        ↓
Visualizar World/Level/Vocation do Character
        ↓
Navegar pelo menu do perfil
        ↓
Fazer logout corretamente
```

Preservar o layout atual e corrigir a origem dos problemas, respeitando backend, i18n, design system e autorização.
