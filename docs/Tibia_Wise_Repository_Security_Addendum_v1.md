# Tibia Wise — Repository & Security Architecture Addendum v1.0

## Objetivo

Este documento complementa a especificação do frontend e registra a decisão de manter o **frontend público** e o **backend privado**, protegendo o código que representa o coração e o diferencial competitivo do Tibia Wise.

## 1. Repositórios

```text
GitHub
├── tibia-wise-frontend   ← PUBLIC
└── tibia-wise-backend    ← PRIVATE
```

### Frontend público

Pode conter:
- React;
- TypeScript;
- páginas;
- componentes;
- Design System;
- layouts;
- estilos;
- i18n;
- API Client;
- tipos necessários para consumo da API;
- testes;
- documentação do frontend.

### Backend privado

Deve conter:
- NestJS;
- Prisma;
- PostgreSQL;
- autenticação;
- autorização;
- regras de negócio;
- processamento de Hunts;
- cálculos;
- estatísticas;
- recomendações;
- serviços internos;
- administração;
- integrações sensíveis;
- configurações privadas;
- secrets.

## 2. O que pode ser público

É aceitável que alguém veja:
- estrutura das páginas;
- componentes React;
- Design System;
- chamadas à API;
- endpoints consumidos;
- tipos usados pela interface;
- como os dados são apresentados.

Isso não revela necessariamente como o sistema chega aos resultados.

## 3. O que deve permanecer privado

Principalmente:
- regras de negócio;
- processamento e normalização das Hunts;
- metodologia de estatísticas;
- algoritmo de recomendações;
- regras internas de Premium;
- estrutura interna do banco;
- serviços administrativos;
- dados internos;
- secrets.

## 4. O diferencial deve ficar no backend

Arquitetura:

```text
Hunt
 ↓
Validação
 ↓
Normalização
 ↓
Processamento
 ↓
Cálculos
 ↓
Análise
 ↓
Recommendation Engine
 ↓
Public DTO
 ↓
API
 ↓
Frontend
```

O frontend recebe o resultado necessário para apresentar ao usuário, sem conhecer a metodologia interna.

## 5. Não colocar lógica proprietária no frontend

Evitar arquivos como:

```text
features/recommendations/utils/recommendationAlgorithm.ts
```

contendo regras importantes.

Se existir uma fórmula ou metodologia proprietária, ela deve permanecer no backend:

```text
RecommendationEngine
```

O frontend deve consumir o resultado.

## 6. Minificação não protege segredo

Não considerar:
- minificação;
- bundle;
- obfuscation;
- código compilado;

como mecanismos de proteção de propriedade intelectual.

Tudo que roda no navegador pode ser analisado.

**Lógica proprietária deve ficar no servidor.**

## 7. API como caixa-preta

```text
Frontend
   │
   │ Request
   ▼
Backend
   ├── Authentication
   ├── Authorization
   ├── Validation
   ├── Business Rules
   ├── Hunt Processing
   ├── Statistics
   └── Recommendation Engine
   │
   ▼
Public DTO
   │
   ▼
Frontend
```

O frontend não deve reproduzir o processamento interno.

## 8. DTOs públicos

Separar:

```text
Database Model
      ↓
Business Logic
      ↓
Public API DTO
      ↓
Frontend
```

Não retornar modelos internos do banco diretamente.

O DTO deve expor somente o necessário.

## 9. Tipos do frontend

Os tipos do frontend representam o contrato consumido pela interface e não precisam ser iguais aos modelos do banco.

```text
Database Model
      ≠
API DTO
      ≠
UI View Model
```

## 10. Secrets

Nunca colocar no frontend:
- `DATABASE_URL`;
- JWT secret;
- private API keys;
- payment secrets;
- SMTP passwords;
- admin tokens;
- credenciais.

Variáveis como `VITE_API_URL` podem ser públicas porque não são segredos.

## 11. Segurança

Backend privado não substitui segurança da aplicação.

O backend deve proteger:
- autenticação;
- autorização;
- IDOR;
- validação;
- rate limiting;
- dados privados;
- sessões;
- endpoints administrativos.

Esconder um botão no frontend não é segurança.

## 12. Hunts privadas

Mesmo que alguém descubra o ID de uma Hunt privada, o backend deve bloquear o acesso.

```text
GET /hunts/:id
       ↓
Backend verifica visibilidade/permissão
       ↓
   ┌───┴───┐
   │       │
  SIM     NÃO
   │       │
   ▼       ▼
retorna   bloqueia
```

## 13. Recomendações

Recomendações continuam sendo autenticadas.

```text
Usuário
 ↓
/recommendations
 ↓
API
 ↓
Recommendation Engine
 ↓
resultado
```

O algoritmo permanece privado.

## 14. Premium

O backend é a autoridade sobre:
- status Premium;
- limites;
- acesso a funcionalidades;
- recursos avançados;
- permissões.

O frontend usa o estado recebido para adaptar a interface, mas nunca deve ser a autoridade de segurança.

## 15. Open source como portfólio

O frontend público pode demonstrar:
- React;
- TypeScript;
- arquitetura;
- UX/UI;
- Design System;
- responsividade;
- acessibilidade;
- testes;
- SEO;
- integração com API.

Isso permite apresentar o projeto profissionalmente sem expor o coração do produto.

## 16. README público

O README do frontend pode explicar:
- o que é o Tibia Wise;
- objetivo do frontend;
- stack;
- arquitetura;
- instalação;
- `.env.example`;
- testes;
- contribuição, se aplicável.

Não deve explicar:
- algoritmos proprietários;
- regras internas do backend;
- estrutura completa do banco;
- secrets;
- lógica proprietária de recomendações.

## 17. Contrato entre repositórios

Os repositórios devem evoluir de forma independente:

```text
Frontend
   │
   │ API Contract
   ▼
Backend
```

O frontend não deve importar código do backend.

Evitar:

```text
frontend → Prisma
frontend → NestJS services
frontend → database models
```

A comunicação ocorre por API.

## 18. OpenAPI

Idealmente:

```text
Backend
   ↓
OpenAPI / API Contract
   ↓
Frontend Types
```

Isso reduz divergências sem precisar tornar o backend público.

## 19. Regra para agentes de código

### Ao trabalhar no frontend

Assumir que o código será público.

Não adicionar:
- secrets;
- credenciais;
- tokens reais;
- dados reais sensíveis;
- algoritmos proprietários;
- dumps do banco;
- endpoints administrativos;
- lógica interna desnecessária.

### Ao trabalhar no backend

Assumir que o repositório é privado, mas que **qualquer resposta da API pode ser observada pelo cliente**.

Portanto, privacidade do Git não substitui segurança da API.

## 20. Checklist antes de tornar o frontend público

### Código
- [ ] Não existem secrets.
- [ ] Não existem credenciais.
- [ ] Não existem tokens reais.
- [ ] Não existem dumps do banco.
- [ ] Não existem dados reais de usuários.
- [ ] Não existem algoritmos proprietários.
- [ ] Não existem regras internas desnecessárias.

### Configuração
- [ ] `.env` está no `.gitignore`.
- [ ] `.env.example` não contém secrets.
- [ ] Variáveis públicas estão identificadas.
- [ ] Build de produção não inclui informações sensíveis.

### API
- [ ] Endpoints protegidos possuem autenticação.
- [ ] Autorização é validada no backend.
- [ ] Dados privados não são retornados.
- [ ] DTOs não expõem modelos internos.
- [ ] Proteções de rate limiting existem quando necessárias.

## 21. Decisão arquitetural final

```text
                    INTERNET
                       │
                       ▼
          ┌────────────────────────┐
          │  FRONTEND — PUBLIC     │
          │                        │
          │  React                 │
          │  TypeScript            │
          │  Design System         │
          │  UI / UX               │
          │  API Client            │
          └───────────┬────────────┘
                      │
                    HTTPS
                      │
                      ▼
          ┌────────────────────────┐
          │  BACKEND — PRIVATE     │
          │                        │
          │  NestJS                │
          │  Auth                  │
          │  Authorization         │
          │  Business Rules        │
          │  Hunt Processing       │
          │  Statistics            │
          │  Recommendation Engine │
          │  Prisma                │
          │  PostgreSQL             │
          └────────────────────────┘
```

> **Princípio definitivo: o frontend pode ser público. O conhecimento proprietário não.**

O usuário pode descobrir como o Tibia Wise parece e funciona pela interface. O código público não deve revelar como o sistema calcula internamente, processa Hunts, gera recomendações ou estrutura seus serviços privados.

Essa decisão passa a fazer parte oficial da arquitetura do Tibia Wise.
