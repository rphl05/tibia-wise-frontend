# Tibia Wise — Prompt de Implementação da Home V3

## Objetivo

Implementar a nova versão visual da Home (`/`) do Tibia Wise utilizando como referência principal o arquivo:

```text
Tibia_Wise_Home_Reference.html
```

Esse arquivo é um **protótipo visual de referência**, não deve ser simplesmente copiado para produção.

A implementação final deve continuar utilizando a arquitetura atual:

- React
- TypeScript
- Vite
- React Router
- CSS existente
- design tokens existentes
- i18next
- componentes/layouts existentes

O objetivo é reproduzir a **composição, hierarquia visual, atmosfera, proporções e experiência** da referência dentro da arquitetura React atual.

---

# 1. REGRA PRINCIPAL

Leia primeiro:

```text
Tibia_Wise_Home_Reference.html
```

Use esse arquivo como **fonte visual principal** para a implementação.

O HTML demonstra:

- composição do Hero;
- posição do texto;
- uso da artwork;
- espaçamento;
- estrutura das seções;
- tratamento das métricas;
- composição do infográfico;
- CTA;
- Footer;
- responsividade.

### Não copie literalmente

Não transformar o HTML de referência em uma página HTML separada.

Não substituir React por HTML.

Não abandonar a arquitetura atual.

A referência serve para orientar o resultado visual.

---

# 2. ANTES DE ALTERAR O CÓDIGO

Primeiro faça uma inspeção completa.

Leia:

```text
src/pages/public/HomePage.tsx
src/pages/public/HomePage.css

src/layouts/PublicLayout.tsx

src/layouts/PublicLayout/PublicHeader.tsx
src/layouts/PublicLayout/PublicHeader.css

src/layouts/Footer/Footer.tsx
src/layouts/Footer/Footer.css

src/styles/tokens.css
src/styles/globals.css

src/lib/i18n/index.ts

src/lib/i18n/locales/pt-BR/common.json
src/lib/i18n/locales/en/common.json

src/app/router.tsx
```

Também verifique:

```text
public/assets/images/
```

e confirme quais assets estão realmente disponíveis.

### Não altere nada durante essa primeira inspeção.

Primeiro entenda:

- como a Home está estruturada;
- como o CSS está sendo carregado;
- como o i18n está funcionando;
- como o Header funciona;
- como o Footer funciona;
- quais tokens já existem;
- quais assets existem;
- quais rotas já estão implementadas.

Depois implemente.

---

# 3. ARQUITETURA ESPERADA

A arquitetura final deve continuar sendo:

```text
PublicLayout
│
├── PublicHeader
│
├── <main>
│   │
│   └── HomePage
│       │
│       ├── Hero
│       ├── Como funciona
│       ├── Analytics / Infográfico
│       └── CTA final
│
└── Footer
```

## Regra crítica do Footer

A `HomePage.tsx` **não deve renderizar Footer próprio**.

O Footer deve existir apenas no:

```text
src/layouts/PublicLayout.tsx
```

Caso exista um `<footer>` dentro da Home, remover.

Isso evita Footer duplicado.

---

# 4. HERO

O Hero deve seguir o conceito visual do:

```text
Tibia_Wise_Home_Reference.html
```

## Mudança visual mais importante

A imagem:

```text
public/assets/images/home-hero.webp
```

deve ser usada como **background de toda a área do Hero**.

Não utilizar a artwork como uma pequena imagem isolada em uma coluna.

Não deixar a imagem quase invisível.

Não utilizar:

```css
opacity: 0.15;
```

A artwork precisa ser claramente perceptível.

---

# 5. HERO — COMPOSIÇÃO

A composição desejada é:

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  TEXTO                                                       │
│                                                              │
│  SEUS DADOS, MELHORES DECISÕES               ARTWORK         │
│                                                              │
│  Analise suas hunts                                         │
│  como nunca                                                  │
│                                                              │
│  Transforme seus dados de hunting                            │
│  em insights valiosos e evolua                               │
│  mais rápido no Tibia.                                      │
│                                                              │
│  [ Começar agora ] [ Explorar hunts ]                        │
│                                                              │
│  Dados reais   Decisões inteligentes   Jogue melhor          │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

A imagem ocupa a área inteira do Hero.

O texto fica por cima.

Utilizar um overlay/gradient escuro, principalmente no lado esquerdo.

Objetivo:

```text
ARTWORK VISÍVEL
+
TEXTO LEGÍVEL
```

O gradient não deve esconder completamente a artwork.

---

# 6. HERO — BACKGROUND

A implementação deve seguir o conceito:

```css
background:
  linear-gradient(
    90deg,
    rgba(..., 0.98) 0%,
    rgba(..., 0.90) 30%,
    rgba(..., 0.55) 55%,
    rgba(..., 0.15) 80%,
    rgba(..., 0.05) 100%
  ),
  url("/assets/images/home-hero.webp") center / cover no-repeat;
```

Os valores devem ser adaptados ao asset real e aos tokens existentes.

Pode utilizar:

- `linear-gradient`;
- pseudo-elements;
- overlays;
- masks;
- `background-position`;
- `background-size: cover`;
- sombras;
- blend/masking quando realmente necessário.

Não exagerar nos efeitos.

---

# 7. HERO — CONTEÚDO

Utilizar:

## Eyebrow

```text
SEUS DADOS, MELHORES DECISÕES
```

## Título

```text
Analise suas hunts
como nunca
```

Destacar:

```text
como nunca
```

em azul.

## Descrição

```text
Transforme seus dados de hunting em insights valiosos e evolua mais rápido no Tibia.
```

## CTAs

```text
Começar agora
Explorar hunts
```

## Benefícios

```text
Dados reais
Decisões mais inteligentes
Jogue melhor
```

Todos esses textos precisam utilizar i18n.

---

# 8. HERO — BOTÕES

O botão principal deve utilizar o estilo primário existente.

Conceito:

```text
[ Começar agora ]
```

Com:

- azul;
- possível gradient azul/cyan;
- texto branco;
- destaque visual.

Botão secundário:

```text
[ Explorar hunts ]
```

Deve ser mais discreto, com:

- fundo transparente/escuro;
- borda;
- texto claro.

Não criar novos componentes de botão se já existir um componente adequado no projeto.

---

# 9. HERO — BENEFÍCIOS

Mostrar três benefícios pequenos:

```text
↗ Dados reais
◇ Decisões mais inteligentes
★ Jogue melhor
```

Na implementação real, utilizar ícones do sistema existente, preferencialmente Lucide.

Esses elementos não devem parecer três cards grandes.

Devem ser:

- compactos;
- discretos;
- alinhados;
- visualmente secundários ao título.

---

# 10. HEADER

Manter o:

```text
PublicHeader
```

existente.

Não recriar o Header inteiro.

Ajustar somente o necessário para aproximá-lo da referência.

O Header deve possuir:

```text
Logo

Hunts
Statistics
Recommendations
News
Tutorials

Entrar
Criar conta
```

Se outras funcionalidades já existirem no Header, preservá-las.

Manter:

- navegação;
- links;
- autenticação;
- tema;
- idioma;
- responsividade.

---

# 11. I18N — PROBLEMA CRÍTICO

Atualmente existem chaves aparecendo literalmente na interface, por exemplo:

```text
nav.myHunts
nav.tutorials
actions.login
actions.register
home.title
home.subtitle
home.start
```

Isso não pode acontecer na versão final.

## Verificar

Antes de adicionar novas chaves:

1. verificar quais chaves já existem;
2. verificar como o Header chama as traduções;
3. verificar como o Footer chama as traduções;
4. verificar como a Home chama as traduções;
5. reutilizar chaves existentes quando fizer sentido;
6. criar apenas as chaves que realmente não existem.

Não criar duplicações desnecessárias.

---

# 12. I18N — IDIOMAS

Garantir funcionamento em:

```text
PT-BR
EN
```

Nenhuma chave pode aparecer literalmente.

Não aceitar:

```text
home.title
home.subtitle
home.cta
nav.myHunts
actions.login
```

como texto final.

Depois da implementação:

- testar PT-BR;
- testar EN;
- trocar o idioma no navegador;
- confirmar que todos os textos mudam corretamente.

---

# 13. SEÇÃO "COMO FUNCIONA"

A seção deve seguir a referência.

Título:

```text
Como funciona
```

Subtítulo:

```text
Em poucos passos, você transforma suas hunts em insights poderosos.
```

Estrutura:

```text
01                 02                 03

Importar     →     Analisar      →     Melhorar
```

---

# 14. PASSO 01

```text
01
Importar
```

Descrição:

```text
Importe suas hunting sessions do Tibia.
```

Utilizar ícone relacionado a:

- upload;
- importação;
- dados.

---

# 15. PASSO 02

```text
02
Analisar
```

Descrição:

```text
Entenda XP/h, profit/h, loot e desempenho.
```

Utilizar ícone relacionado a:

- gráfico;
- analytics;
- estatísticas.

---

# 16. PASSO 03

```text
03
Melhorar
```

Descrição:

```text
Obtenha recomendações personalizadas.
```

Utilizar ícone relacionado a:

- evolução;
- performance;
- recomendação.

---

# 17. VISUAL DA SEÇÃO "COMO FUNCIONA"

Desktop:

```text
01          →          02          →          03
```

Pode utilizar uma linha pontilhada ou conexão visual.

Os elementos devem possuir:

- números azuis;
- ícones;
- bordas sutis;
- fundo escuro;
- espaçamento generoso.

Não transformar a seção em três cards gigantes.

A referência deve parecer mais próxima de um **fluxo/infográfico** do que de três cards comuns.

---

# 18. MOBILE — COMO FUNCIONA

No mobile:

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

Não manter três colunas espremidas.

A linha horizontal pode desaparecer no mobile.

---

# 19. SEÇÃO DE ANALYTICS / INFOGRÁFICO

Essa seção deve ser diferente da versão atual.

Não criar simplesmente:

```text
[ XP/h ] [ Profit/h ] [ Hunts ]
```

Ela precisa parecer uma **prévia visual do produto**.

A referência possui:

```text
texto explicativo
        +
métricas
        +
visualização
```

---

# 20. LADO ESQUERDO DO INFOGRÁFICO

Eyebrow:

```text
DADOS QUE FAZEM A DIFERENÇA
```

Título:

```text
Veja o potencial
das suas hunts.
```

Destacar:

```text
suas hunts.
```

em azul.

Descrição:

```text
Acompanhe suas estatísticas, compare seus resultados e descubra novas oportunidades de evolução.
```

Indicação:

```text
Exemplo de análise
```

ou:

```text
Dados demonstrativos
```

---

# 21. MÉTRICAS

Mostrar três métricas:

```text
XP/h
1.250.000
+12% esta semana
```

```text
Profit/h
R$ 500
+8% esta semana
```

```text
Hunts
12
+20% esta semana
```

Esses valores são **demonstrativos**.

Não devem ser apresentados como dados reais de usuários.

Não criar uma chamada ao backend apenas para alimentar esses valores.

Não inventar dados de usuário.

---

# 22. COMPOSIÇÃO DAS MÉTRICAS

Desktop:

```text
┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│ XP/h         │ │ Profit/h     │ │ Hunts        │
│              │ │              │ │              │
│ 1.250.000    │ │ R$ 500       │ │ 12           │
│ +12%         │ │ +8%          │ │ +20%         │
└──────────────┘ └──────────────┘ └──────────────┘
```

Cards:

- escuros;
- bordas sutis;
- cantos moderados;
- números grandes;
- labels discretas.

---

# 23. PREVIEW DE HUNTING PLACE

Abaixo das métricas deve existir uma visualização de produto.

Conceito:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  VISUAL / MAPA        Descubra novos lugares                │
│                       Recomendações baseadas no              │
│                       seu desempenho, nível e vocação.       │
│                                                             │
│                       Ver recomendações →                    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

O objetivo é mostrar ao visitante que o Tibia Wise pode ajudar a descobrir melhores hunting places.

Pode utilizar:

- mapa;
- gráfico;
- barras;
- indicadores;
- localização;
- composição visual existente.

Não precisa existir recomendação real.

É uma **prévia visual**.

Não apresentar informação fictícia como resultado real.

---

# 24. INFOGRÁFICO — OBJETIVO

Essa seção precisa comunicar:

```text
Tibia Wise coleta seus dados
        ↓
analisa seu desempenho
        ↓
transforma os dados em informação
        ↓
ajuda você a tomar decisões
```

O visitante deve entender o produto visualmente sem precisar ler toda a página.

---

# 25. CTA FINAL

Criar uma seção de conversão forte.

Eyebrow:

```text
PRONTO PARA O PRÓXIMO NÍVEL?
```

Título:

```text
Comece agora
e jogue melhor.
```

Destacar:

```text
e jogue melhor.
```

em azul.

## IMPORTANTE

Utilizar:

```text
jogue melhor
```

Não utilizar:

```text
hunte melhor
```

---

# 26. CTA — DESCRIÇÃO

Utilizar:

```text
Crie sua conta gratuita e faça parte da comunidade que está levando o Tibia a um novo nível.
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

---

# 27. CTA — ARTWORK

Se houver outro asset apropriado no projeto, pode utilizá-lo.

Caso não exista:

utilizar novamente:

```text
/assets/images/home-hero.webp
```

com uma composição/tratamento diferente do Hero.

A arte pode aparecer mais integrada ao fundo.

Não gerar novo asset.

Não criar novo sistema de imagens.

---

# 28. FOOTER

O Footer deve continuar sendo o componente existente.

Não criar Footer específico para a Home.

Estrutura visual:

```text
Tibia Wise

Produto
Hunts
Characters
Statistics
Recommendations
Premium

Ajuda
Tutoriais
FAQ
Suporte

Legal
Termos de Uso
Política de Privacidade
Cookies
```

Corrigir qualquer tradução literal.

Deve existir apenas um Footer.

---

# 29. DESIGN SYSTEM

Utilizar:

```text
src/styles/tokens.css
```

Não criar nova paleta.

Paleta aprovada:

```text
#07111C  fundo principal
#0D1B2A  superfície
#101F2F  cards
#13263A  superfície destacada

#1688FF  azul primário
#00BFFF  cyan

#F5A623  dourado
#FFC857  dourado claro

#1E2A3A  bordas

#F5F7FA  texto principal
#A8B3C2  texto secundário
#6B7785  texto muted

#39D353  sucesso
#FF5C5C  erro
#FFBF20  warning
#9A6BFF  accent
```

Gradientes:

```text
#1688FF → #00BFFF
#F5A623 → #FFC857
#07111C → #0D1B2A
```

Não exagerar no glow.

---

# 30. TIPOGRAFIA

Manter a tipografia já definida:

```text
Roboto,
system-ui,
-apple-system,
BlinkMacSystemFont,
"Segoe UI",
sans-serif
```

Hierarquia aproximada:

```text
H1: 32px+ / 700
H2: 24px+ / 700
H3: 20px / 700
Body: 14–16px
Small: 12px
Metrics: 24–40px
```

O Hero pode utilizar tamanho maior para impacto.

Não adicionar fontes externas sem necessidade.

---

# 31. RESPONSIVIDADE

## Desktop

Priorizar o resultado visual da referência.

Hero:

```text
texto sobre artwork
```

Como funciona:

```text
01 → 02 → 03
```

Analytics:

```text
texto | métricas + preview
```

CTA:

```text
texto + artwork
```

---

# 32. TABLET

Adaptar:

- largura do conteúdo;
- tamanho dos títulos;
- espaçamento;
- posição da artwork;
- largura das métricas;
- tamanho dos cards.

Não deixar elementos se sobrepondo.

---

# 33. MOBILE

Hero:

```text
Título
Descrição
CTAs
Benefícios
Artwork
```

A artwork continua visível.

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
↓
XP/h
↓
Profit/h
↓
Hunts
↓
Hunting Place
```

CTA:

```text
texto
benefícios
botão
artwork
```

Não depender de hover.

Nenhum conteúdo pode ficar cortado horizontalmente.

---

# 34. ACESSIBILIDADE

Garantir:

- HTML semântico;
- alt nas imagens;
- navegação por teclado;
- `:focus-visible`;
- contraste;
- botões reais;
- links reais;
- headings em ordem lógica;
- não depender apenas de cor;
- controles acessíveis no mobile.

---

# 35. SEO

Preservar o SEO atual.

Não criar outro sistema.

Garantir que a Home continue tendo:

- title;
- description;
- canonical;
- Open Graph, caso já exista suporte.

---

# 36. O QUE NÃO FAZER

Não:

- instalar Tailwind;
- instalar outra biblioteca CSS;
- instalar outra biblioteca de componentes;
- trocar React;
- trocar Vite;
- trocar React Router;
- trocar i18next;
- trocar Recharts;
- trocar a arquitetura;
- substituir PublicLayout;
- substituir PublicHeader;
- substituir Footer;
- criar CSS Modules;
- criar uma nova arquitetura;
- criar backend;
- criar API;
- criar sistema real de recomendações;
- criar dados falsos apresentados como reais;
- criar nova página HTML para produção.

Trabalhar sobre a implementação existente.

---

# 37. ARQUIVOS PRIORITÁRIOS

Provavelmente serão alterados:

```text
src/pages/public/HomePage.tsx
src/pages/public/HomePage.css

src/lib/i18n/locales/pt-BR/common.json
src/lib/i18n/locales/en/common.json
```

Outros arquivos só devem ser alterados quando necessário.

Não alterar arquivos sem motivo.

---

# 38. VALIDAÇÃO VISUAL

Depois da implementação:

1. iniciar o dev server;
2. abrir `/`;
3. comparar visualmente com:

```text
Tibia_Wise_Home_Reference.html
```

A comparação deve observar:

- Header;
- largura do conteúdo;
- altura do Hero;
- artwork;
- overlay;
- posição do texto;
- tamanho do H1;
- CTAs;
- benefícios;
- seção Como funciona;
- linha de conexão;
- infográfico;
- métricas;
- Hunting Place preview;
- CTA final;
- Footer.

Não precisa ser pixel-perfect.

Precisa reproduzir a **mesma linguagem visual e composição**.

---

# 39. VALIDAÇÃO DE I18N

Testar:

## PT-BR

Nenhuma chave literal.

## EN

Nenhuma chave literal.

Pesquisar visualmente por:

```text
home.
nav.
actions.
```

Não deve existir nenhuma dessas chaves aparecendo como texto na interface.

---

# 40. VALIDAÇÃO DE ASSETS

Verificar:

```text
/assets/images/home-hero.webp
/assets/images/tibia-wise-logo.svg
```

Confirmar:

- carregamento;
- dimensões;
- ausência de 404;
- artwork visível.

Não aceitar asset quebrado.

---

# 41. VALIDAÇÃO TÉCNICA

Executar:

```bash
npm run build
```

O resultado deve ser:

```text
PASS
```

Sem:

- erro TypeScript;
- erro de import;
- erro de CSS;
- erro de build.

---

# 42. TESTE NO NAVEGADOR

Testar:

```text
/
```

Em:

- desktop;
- tablet;
- mobile.

Verificar também o console do navegador.

Não considerar concluído apenas porque o build passou.

---

# 43. CHECKLIST FINAL

## Header

- [ ] Logo correto
- [ ] Navegação correta
- [ ] Entrar
- [ ] Criar conta
- [ ] Idioma
- [ ] Tema
- [ ] Responsivo

## Hero

- [ ] `home-hero.webp` como background
- [ ] Artwork visível
- [ ] Artwork ocupa a área
- [ ] Overlay escuro
- [ ] Texto legível
- [ ] H1 correto
- [ ] Destaque azul
- [ ] CTA principal
- [ ] CTA secundário
- [ ] Três benefícios

## Como funciona

- [ ] 01 Importar
- [ ] 02 Analisar
- [ ] 03 Melhorar
- [ ] Ícones
- [ ] Linha de conexão
- [ ] Desktop
- [ ] Mobile

## Infográfico

- [ ] Título
- [ ] Descrição
- [ ] XP/h
- [ ] Profit/h
- [ ] Hunts
- [ ] Dados demonstrativos
- [ ] Hunting Place preview
- [ ] Visual de produto

## CTA

- [ ] “Comece agora”
- [ ] “e jogue melhor.”
- [ ] Criar conta gratuita
- [ ] Benefícios
- [ ] Artwork

## Footer

- [ ] Apenas um Footer
- [ ] Produto
- [ ] Ajuda
- [ ] Legal
- [ ] Traduções

## I18N

- [ ] PT-BR
- [ ] EN
- [ ] Nenhuma chave literal
- [ ] Nenhum `home.*`
- [ ] Nenhum `nav.*`
- [ ] Nenhum `actions.*`

## Geral

- [ ] Build OK
- [ ] Console sem erros
- [ ] Assets sem 404
- [ ] Desktop OK
- [ ] Tablet OK
- [ ] Mobile OK

---

# 44. CRITÉRIO DE ACEITAÇÃO

A Home precisa contar visualmente esta história:

```text
O que é o Tibia Wise?
        ↓
Como funciona?
        ↓
Que tipo de dados ele analisa?
        ↓
Como transforma dados em informação?
        ↓
Como pode ajudar o jogador?
        ↓
Comece agora.
```

A Home deve parecer:

- plataforma moderna;
- produto de analytics;
- ferramenta especializada em Tibia;
- profissional;
- visualmente marcante;
- confiável.

Não deve parecer:

- HTML simples;
- template genérico;
- fansite antigo;
- dashboard jogado em uma landing page;
- coleção de cards sem hierarquia.

---

# 45. RELATÓRIO FINAL

Ao terminar, informe:

## Alterações realizadas

Para cada arquivo alterado:

```text
Arquivo:
Alteração:
Motivo:
```

## Validação

```text
npm run build: PASS/FAIL
Home renderizada: PASS/FAIL
Hero: PASS/FAIL
CSS carregado: PASS/FAIL
i18n PT-BR: PASS/FAIL
i18n EN: PASS/FAIL
Assets: PASS/FAIL
Footer único: PASS/FAIL
Desktop: PASS/FAIL
Tablet: PASS/FAIL
Mobile: PASS/FAIL
Console sem erros: PASS/FAIL
```

## Problemas restantes

Se houver qualquer problema:

- informar;
- indicar arquivo;
- explicar causa;
- indicar se precisa de segunda etapa.

Não esconder problemas.

Não considerar a tarefa concluída apenas porque:

```text
npm run build
```

passou.

O critério principal é a **qualidade visual e funcional da Home**, comparada com:

```text
Tibia_Wise_Home_Reference.html
```

---

# 46. INSTRUÇÃO FINAL

Antes de implementar, abra e analise:

```text
Tibia_Wise_Home_Reference.html
```

Depois analise a implementação atual.

Então faça as alterações necessárias.

**Não simplifique a referência.**

**Não remova seções para facilitar a implementação.**

**Não substitua a arquitetura existente.**

**Não crie uma solução genérica.**

A referência HTML deve ser tratada como o **layout visual aprovado da Home**.

A implementação final deve reproduzir esse resultado dentro do projeto React atual.
