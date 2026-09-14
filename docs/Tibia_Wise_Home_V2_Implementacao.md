# Tibia Wise — Implementação da Home V2

## Objetivo

Implementar a nova versão visual da Home (`/`) do Tibia Wise com base na referência visual aprovada.

A Home deve transmitir:

> **“Tibia Wise é uma plataforma moderna de análise de hunts do Tibia.”**

A direção visual combina:
- landing page moderna de produto/SaaS;
- analytics;
- estética dark-fantasy inspirada em Tibia;
- fundo azul-marinho muito escuro;
- azul elétrico para ações e destaques;
- dourado usado com moderação;
- artwork fantasy integrada ao layout;
- tipografia forte;
- cards refinados;
- elementos de infográfico;
- aparência profissional, sem parecer um fansite antigo.

---

# 1. Estado atual confirmado

O inventário da Home foi realizado antes da implementação.

Arquivos principais:

| Arquivo | Responsabilidade |
|---|---|
| `src/pages/public/HomePage.tsx` | Conteúdo da landing page |
| `src/pages/public/HomePage.css` | Estilos específicos da Home |
| `src/layouts/PublicLayout.tsx` | `PublicHeader + main + Footer` |
| `src/layouts/PublicLayout/PublicHeader.tsx` | Header público |
| `src/layouts/PublicLayout/PublicHeader.css` | Estilos do Header |
| `src/layouts/Footer/Footer.tsx` | Footer |
| `src/layouts/Footer/Footer.css` | Estilos do Footer |
| `src/app/router.tsx` | Rota `/` |
| `src/lib/i18n/index.ts` | Configuração do i18n |
| `src/lib/i18n/locales/pt-BR/common.json` | Traduções PT-BR |
| `src/lib/i18n/locales/en/common.json` | Traduções EN |
| `src/styles/tokens.css` | Tokens do design system |
| `src/styles/globals.css` | Estilos globais |
| `public/assets/images/home-hero.webp` | Artwork principal do Hero |
| `public/assets/images/tibia-wise-logo.svg` | Logo |

A arquitetura atual deve ser preservada.

---

# 2. Arquitetura final da Home

```text
PublicLayout
│
├── PublicHeader
│
├── Home
│   ├── Hero
│   ├── Como funciona
│   ├── Dados / Analytics
│   ├── Hunting Places / Recomendações
│   └── CTA final
│
└── Footer
```

**Regra:** a `HomePage.tsx` não deve possuir Footer próprio. O Footer deve ser renderizado exclusivamente pelo `PublicLayout`.

---

# 3. Correção de i18n

Atualmente aparecem chaves literalmente na interface, como:

```text
nav.myHunts
nav.tutorials
actions.login
actions.register
```

Antes de modificar os JSONs:

1. verificar quais chaves já existem;
2. verificar quais chaves são utilizadas pelo Header;
3. verificar quais chaves são utilizadas pelo Footer;
4. alinhar componentes às chaves existentes quando possível;
5. adicionar apenas chaves realmente ausentes.

Não criar chaves duplicadas.

A interface precisa funcionar em:
- PT-BR;
- EN.

Nenhuma chave de tradução pode aparecer literalmente na tela.

---

# 4. Hero

O Hero é a parte visual mais importante.

Estrutura:

```text
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  SEUS DADOS, MELHORES DECISÕES          ARTWORK FANTASY      │
│                                                               │
│  Analise suas hunts                                          │
│  como nunca                                                   │
│                                                               │
│  Transforme seus dados de hunting                             │
│  em insights valiosos e evolua                                │
│  mais rápido no Tibia.                                       │
│                                                               │
│  [ Começar agora ]   [ Explorar hunts ]                       │
│                                                               │
│  Dados reais   •   Decisões mais inteligentes   •   Jogue     │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

Utilizar:

```text
public/assets/images/home-hero.webp
```

A artwork deve:
- ocupar predominantemente o lado direito;
- ser claramente visível;
- integrar-se ao fundo;
- ter presença cinematográfica;
- não ficar quase transparente;
- não aparecer dentro de uma caixa branca;
- não competir com o texto.

É permitido utilizar gradients, overlays, pseudo-elements, masks, sombras e posicionamento absoluto.

O lado esquerdo deve permanecer escuro o suficiente para garantir leitura.

**Não utilizar opacity próxima de `0.15`.**

---

# 5. Hero — conteúdo

Eyebrow:

```text
SEUS DADOS, MELHORES DECISÕES
```

Título:

```text
Analise suas hunts
como nunca
```

A segunda linha pode receber destaque azul.

Descrição:

```text
Transforme seus dados de hunting em insights valiosos e evolua mais rápido no Tibia.
```

CTAs:

```text
Começar agora
Explorar hunts
```

Todos os textos de interface devem utilizar i18n.

---

# 6. Hero — benefícios

Na parte inferior do Hero:

### Dados reais
Ícone relacionado a analytics.

### Decisões mais inteligentes
Ícone de escudo, estratégia ou segurança.

### Jogue melhor
Ícone relacionado a performance.

Esses elementos devem ser compactos e discretos. Não transformar os três benefícios em grandes cards.

---

# 7. Seção “Como funciona”

Título:

```text
Como funciona
```

Descrição:

```text
Em poucos passos, você transforma suas hunts em insights poderosos.
```

Desktop:

```text
01                 02                 03

Importar     →     Analisar      →     Melhorar
```

Cada etapa possui:
- número;
- ícone;
- título;
- descrição.

### 01 — Importar
`Importe suas hunting sessions do Tibia.`

### 02 — Analisar
`Entenda XP/h, profit/h, loot e desempenho.`

### 03 — Melhorar
`Obtenha recomendações personalizadas.`

Visual:
- fundo escuro;
- bordas sutis;
- glow azul discreto;
- números em azul;
- ícones grandes;
- linha/conexão visual entre etapas no desktop.

Mobile:

```text
01
Importar

↓

02
Analisar

↓

03
Melhorar
```

---

# 8. Nova seção — Infográfico de dados

A antiga seção de métricas não deve parecer apenas três cards independentes.

Ela deve parecer um pequeno **infográfico de produto**.

Conceito:

```text
┌─────────────────────────────────────────────────────────────┐
│  DADOS QUE FAZEM A DIFERENÇA                                │
│                                                             │
│  Veja o potencial das suas hunts.                           │
│                                                             │
│  Acompanhe suas estatísticas, compare seus resultados       │
│  e descubra oportunidades.                                  │
│                                                             │
│              ┌──────────┐ ┌──────────┐ ┌────────┐           │
│              │ XP/H     │ │ PROFIT/H │ │ HUNTS  │           │
│              │ 1.250k   │ │ R$ 500   │ │ 12     │           │
│              └──────────┘ └──────────┘ └────────┘           │
│                                                             │
│              ┌──────────────────────────────────────────┐   │
│              │       VISUALIZAÇÃO DE HUNTING PLACE      │   │
│              └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

# 9. Métricas demonstrativas

Mostrar:
- XP/h;
- Profit/h;
- Hunts.

Exemplo:

```text
XP/h       1,250,000
Profit/h   R$ 500
Hunts      12
```

Esses valores podem ser demonstrativos, mas não podem parecer estatísticas reais do Tibia Wise.

Utilizar indicação como:

```text
Exemplo de análise
```

ou:

```text
Dados demonstrativos
```

Não fazer chamada ao backend apenas para preencher esses números se isso ainda não estiver implementado.

Não inventar dados de usuário.

---

# 10. Visualização de Hunting Place

Adicionar dentro do infográfico uma prévia visual do produto.

Objetivo:

> O visitante deve entender que o Tibia Wise analisa dados e ajuda a descobrir onde jogar melhor.

Conceito:

```text
┌──────────────────────────────────────────────┐
│ [ MAPA / VISUAL ]    Descubra novos lugares  │
│                      Recomendações baseadas  │
│                      no seu desempenho,      │
│                      nível e vocação.      → │
└──────────────────────────────────────────────┘
```

Pode utilizar:
- asset de mapa existente;
- mini gráfico;
- barras;
- indicadores;
- ícone de localização;
- card de recomendação.

Não precisa implementar recomendação real. É uma prévia visual do produto.

---

# 11. CTA final

Criar uma seção de conversão visualmente forte.

```text
PRONTO PARA O PRÓXIMO NÍVEL?

Comece agora
e jogue melhor.

Crie sua conta gratuita e faça parte da comunidade
que está levando o Tibia a um novo nível.
```

CTA:

```text
Criar conta gratuita
```

Benefícios:

```text
✓ Grátis para começar
✓ Importação de hunts
✓ Estatísticas e recomendações
```

Idealmente utilizar uma artwork fantasy integrada ao fundo.

Se houver outro asset apropriado no projeto, pode utilizá-lo.

Se não houver:
- reutilizar `home-hero.webp` com composição diferente;
- não gerar nova imagem automaticamente;
- não criar novo sistema de assets.

---

# 12. Footer

Remover definitivamente o Footer interno da `HomePage.tsx`.

Manter somente o Footer do `PublicLayout`.

Estrutura:

```text
Tibia Wise

Produto
- Hunts
- Characters
- Statistics
- Recommendations
- Premium

Ajuda
- Tutoriais
- FAQ
- Suporte

Legal
- Termos de Uso
- Política de Privacidade
- Cookies
```

Corrigir todas as traduções.

---

# 13. Design System

Utilizar os tokens existentes:

```text
src/styles/tokens.css
```

Paleta aprovada:

```text
#07111C  — fundo principal
#0D1B2A  — superfície
#101F2F  — cards
#13263A  — superfície destacada
#1688FF  — azul primário
#00BFFF  — cyan
#F5A623  — dourado
#FFC857  — dourado claro
#1E2A3A  — borda
#F5F7FA  — texto principal
#A8B3C2  — texto secundário
#6B7785  — texto muted
#39D353  — sucesso
#FF5C5C  — erro
#FFBF20  — warning
#9A6BFF  — accent
```

Gradientes:

```text
#1688FF → #00BFFF
#F5A623 → #FFC857
#07111C → #0D1B2A
```

Evitar excesso de glow.

A interface deve continuar parecendo um produto de analytics profissional.

---

# 14. Tipografia

Utilizar a tipografia já definida no projeto:

```text
Roboto,
system-ui,
-apple-system,
BlinkMacSystemFont,
"Segoe UI",
sans-serif
```

Hierarquia:

```text
H1: 32px / 700
H2: 24px / 700
H3: 20px / 700
H4: 16px / 500–700
Body: 14px / 400
Small: 12px / 400
Metrics: 24–40px
```

O Hero pode utilizar uma escala maior visualmente quando necessário, desde que continue coerente com o design system.

---

# 15. Responsividade

## Desktop
Prioridade visual da referência.

Hero:

```text
texto esquerda | artwork direita
```

Como funciona:

```text
01 → 02 → 03
```

Analytics:

```text
texto + métricas + visualização
```

## Tablet
- reduzir proporção da artwork;
- preservar leitura;
- adaptar grid;
- reduzir espaçamentos quando necessário.

## Mobile

Hero:

```text
Título
Descrição
CTAs
Benefícios
Artwork
```

Como funciona:

```text
01
↓

02
↓

03
```

Analytics:

```text
texto
métrica
métrica
métrica
visualização
```

CTA:

```text
texto
benefícios
botão
artwork
```

Nenhuma informação importante pode depender de hover.

---

# 16. Acessibilidade

Garantir:
- HTML semântico;
- alt apropriado para imagens;
- navegação por teclado;
- `:focus-visible`;
- contraste adequado;
- links e botões reais;
- headings em ordem lógica;
- não depender apenas de cor;
- controles acessíveis em mobile.

---

# 17. SEO

Preservar o sistema de SEO existente.

A Home deve manter:
- title;
- description;
- canonical;
- Open Graph quando já suportado.

Não criar um segundo sistema de SEO.

---

# 18. O que NÃO fazer

Não:
- instalar Tailwind;
- instalar outra biblioteca CSS;
- trocar React;
- trocar Vite;
- trocar React Router;
- trocar i18next;
- trocar Recharts;
- trocar React Hook Form;
- reestruturar o projeto;
- substituir PublicLayout;
- substituir PublicHeader;
- substituir Footer;
- criar CSS Modules;
- criar nova arquitetura;
- criar backend;
- criar API;
- criar sistema real de recomendações;
- criar dados falsos apresentados como dados reais.

Trabalhar sobre a arquitetura existente.

---

# 19. Arquivos que provavelmente serão alterados

Priorizar:

```text
src/pages/public/HomePage.tsx
src/pages/public/HomePage.css
src/lib/i18n/locales/pt-BR/common.json
src/lib/i18n/locales/en/common.json
```

Outros arquivos só devem ser alterados se houver necessidade real, por exemplo para corrigir uma chave utilizada pelo Header/Footer.

Não alterar arquivos sem necessidade.

---

# 20. Validação obrigatória

Executar:

```bash
npm run build
```

O build deve terminar sem erros.

Depois iniciar o servidor de desenvolvimento.

Verificar:

```text
/
```

---

# 21. Checklist visual

## Header
- [ ] Logo aparece
- [ ] Navegação aparece
- [ ] Traduções funcionam
- [ ] Entrar funciona
- [ ] Criar conta funciona
- [ ] Tema funciona
- [ ] Idioma funciona

## Hero
- [ ] Artwork visível
- [ ] Artwork predominantemente à direita
- [ ] Texto à esquerda
- [ ] Texto legível
- [ ] CTA principal
- [ ] CTA secundário
- [ ] Três benefícios
- [ ] Aparência cinematográfica

## Como funciona
- [ ] 01 Importar
- [ ] 02 Analisar
- [ ] 03 Melhorar
- [ ] Ícones
- [ ] Linha/conexão visual
- [ ] Layout responsivo

## Infográfico
- [ ] Título
- [ ] Texto explicativo
- [ ] XP/h
- [ ] Profit/h
- [ ] Hunts
- [ ] Indicação de dados demonstrativos
- [ ] Visualização de Hunting Place
- [ ] Aparência de produto real

## CTA final
- [ ] “Comece agora”
- [ ] “e jogue melhor.”
- [ ] Criar conta gratuita
- [ ] Benefícios
- [ ] Artwork/composição visual

## Footer
- [ ] Apenas um Footer
- [ ] Produto
- [ ] Ajuda
- [ ] Legal
- [ ] Traduções corretas

## Geral
- [ ] Nenhuma chave i18n aparece
- [ ] Nenhum `nav.myHunts`
- [ ] Nenhum `nav.tutorials`
- [ ] Nenhum `actions.login`
- [ ] Nenhum `actions.register`
- [ ] Nenhum asset 404
- [ ] Nenhum erro JavaScript
- [ ] Nenhum erro CSS
- [ ] Nenhum erro React
- [ ] Build funcionando
- [ ] Desktop funcionando
- [ ] Tablet funcionando
- [ ] Mobile funcionando

---

# 22. Critério de aceitação

A Home final deve contar uma história clara:

```text
O que é o Tibia Wise?
        ↓
Como funciona?
        ↓
Que tipo de informação ele mostra?
        ↓
Como ele ajuda o jogador?
        ↓
Comece agora.
```

A página deve parecer:
- uma plataforma moderna;
- um produto de analytics;
- uma ferramenta especializada em Tibia;
- profissional;
- visualmente marcante;
- confiável.

Não deve parecer:
- HTML simples;
- template genérico;
- fansite antigo;
- dashboard jogado em uma landing page;
- coleção de cards sem hierarquia.

A referência visual aprovada deve servir como direção de:
- hierarquia;
- composição;
- atmosfera;
- distribuição;
- identidade;
- uso de artwork;
- infográfico;
- contraste.

Não é necessário copiar pixel a pixel.

---

# 23. Relatório final do OpenCode

Ao terminar, informar:

## Alterações realizadas

Listar:
- arquivo;
- alteração;
- motivo.

## Validação

Informar:

```text
npm run build: PASS/FAIL
Home renderizada: PASS/FAIL
CSS carregado: PASS/FAIL
i18n PT-BR: PASS/FAIL
i18n EN: PASS/FAIL
Assets: PASS/FAIL
Footer único: PASS/FAIL
Responsividade: PASS/FAIL
Console sem erros: PASS/FAIL
```

## Problemas restantes

Se existir qualquer problema:
- descrever;
- indicar arquivo;
- indicar causa provável;
- informar se exige segunda etapa.

Não esconder problemas.

Não considerar a tarefa concluída apenas porque o build passou.

O objetivo principal é a **qualidade visual e funcional da Home**.
