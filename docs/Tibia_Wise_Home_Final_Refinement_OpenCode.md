# Tibia Wise — Ajuste Final da Home + Nova `home-cta.webp`

## Objetivo

A Home já evoluiu bastante visualmente.

Agora precisamos fazer uma etapa de **refinamento final**, principalmente:

1. corrigir todos os textos que ainda aparecem como chaves i18n;
2. substituir os textos provisórios da Home por textos reais e profissionais;
3. manter a estrutura visual atual que já ficou boa;
4. substituir a artwork utilizada no CTA inferior;
5. utilizar o novo asset:

```text
home-cta.webp
```

A nova imagem deve ser usada **somente no CTA/hero inferior**, enquanto o Hero principal continua utilizando:

```text
home-hero.webp
```

---

# 1. REGRA PRINCIPAL

Não refazer a Home do zero.

A implementação atual já está visualmente próxima do objetivo.

Faça apenas os ajustes necessários para:

- conteúdo;
- i18n;
- CTA inferior;
- refinamento visual;
- responsividade;
- acessibilidade.

Não alterar a arquitetura do projeto.

---

# 2. ASSETS

Confirmar que existe:

```text
public/assets/images/home-hero.webp
public/assets/images/home-cta.webp
public/assets/images/tibia-wise-logo.svg
```

## Uso dos assets

### Hero principal

Continuar utilizando:

```text
/assets/images/home-hero.webp
```

Esse asset representa o universo/identidade visual principal do Tibia Wise.

### CTA inferior

Utilizar:

```text
/assets/images/home-cta.webp
```

Essa é a nova artwork criada especificamente para o CTA final.

Não utilizar `home-hero.webp` no CTA inferior depois desta alteração.

---

# 3. HERO PRINCIPAL

Não modificar desnecessariamente o Hero principal.

Manter a ideia atual:

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  TEXTO                                   ARTWORK              │
│                                                              │
│  SEUS DADOS,                                fantasy           │
│  MELHORES DECISÕES                          artwork           │
│                                                              │
│  Analise suas hunts                                            │
│  como nunca                                                   │
│                                                              │
│  descrição                                                     │
│                                                              │
│  [ Começar agora ] [ Explorar hunts ]                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

Continuar usando:

```text
home-hero.webp
```

como background.

A artwork deve continuar claramente visível.

O overlay escuro deve garantir legibilidade.

Não voltar para a solução de artwork quase invisível.

---

# 4. TEXTOS DA HOME

A prioridade agora é remover completamente os textos do tipo:

```text
home.title
home.titleHighlight
home.subtitle
home.start
home.explore
home.benefit1
home.benefit2
home.benefit3

home.howTitle
home.howTitleHighlight
home.howSubtitle

home.step1Title
home.step1Desc
...

home.dataTitle
home.dataTitleHighlight
...

home.ctaTitle
home.ctaTitleHighlight
...
```

Essas chaves não podem aparecer na interface.

A Home deve mostrar conteúdo real.

---

# 5. HERO — TEXTO FINAL

## Eyebrow

```text
SEUS DADOS, MELHORES DECISÕES
```

## Título

```text
Analise suas hunts
como nunca
```

A parte:

```text
como nunca
```

deve continuar destacada em azul.

## Descrição

```text
Transforme seus dados de hunting em insights valiosos e evolua mais rápido no Tibia.
```

## Botão principal

```text
Começar agora
```

Destino:

```text
/register
```

## Botão secundário

```text
Explorar hunts
```

Destino:

```text
/hunts
```

---

# 6. BENEFÍCIOS DO HERO

Utilizar:

```text
Dados reais
Decisões mais inteligentes
Jogue melhor
```

Podem continuar acompanhados de ícones.

Não transformar esses benefícios em cards grandes.

Eles devem continuar discretos.

---

# 7. SEÇÃO "COMO FUNCIONA"

A seção atual está visualmente boa.

Não fazer redesign completo.

Ajustar apenas os textos e garantir que o fluxo continue parecendo um infográfico.

## Eyebrow

```text
COMO FUNCIONA
```

## Título

```text
Do hunting aos insights
```

## Subtítulo

```text
Transforme suas hunting sessions em informações que ajudam você a evoluir.
```

---

# 8. PASSO 01

Número:

```text
01
```

Título:

```text
Importar
```

Descrição:

```text
Importe suas hunting sessions do Tibia.
```

Ícone:

Upload/importação.

---

# 9. PASSO 02

Número:

```text
02
```

Título:

```text
Analisar
```

Descrição:

```text
Entenda XP/h, profit/h, loot, supplies e desempenho.
```

Ícone:

Analytics/gráfico.

---

# 10. PASSO 03

Número:

```text
03
```

Título:

```text
Melhorar
```

Descrição:

```text
Use seus dados para tomar decisões mais inteligentes.
```

Ícone:

Evolução/performance.

---

# 11. SEÇÃO DE ANALYTICS

A composição atual dessa seção deve ser preservada.

Ela deve continuar mostrando:

```text
texto explicativo
+
métricas
+
preview de Hunting Place
```

A ideia é funcionar como um **infográfico do produto**.

---

# 12. ANALYTICS — TEXTO

## Eyebrow

```text
DADOS QUE FAZEM A DIFERENÇA
```

## Título

```text
Transforme dados
em decisões
```

Destacar:

```text
em decisões
```

em azul.

## Descrição

```text
Acompanhe seu desempenho, compare suas hunts e descubra oportunidades para evoluir.
```

## Demonstração

```text
EXEMPLO DE ANÁLISE
```

---

# 13. MÉTRICAS DEMONSTRATIVAS

Manter três cards.

## XP/h

```text
XP/H
1.250.000
▲ +12% esta semana
```

## Profit/h

```text
PROFIT/H
R$ 500
▲ +8% esta semana
```

## Hunts

```text
HUNTS
12
▲ +20% esta semana
```

Esses valores são demonstrativos.

Eles não representam dados reais de usuários.

Não chamar API.

Não criar lógica de backend para esses valores.

---

# 14. INDICAÇÃO DE DADOS DEMONSTRATIVOS

Deixar visualmente claro que os números são uma demonstração.

Pode utilizar:

```text
Exemplo de análise
```

ou:

```text
Dados demonstrativos
```

Preferencialmente próximo do bloco de métricas, sem poluir a interface.

---

# 15. PREVIEW DE HUNTING PLACE

Manter o bloco visual.

## Título

```text
Descubra onde seu personagem rende mais
```

## Descrição

```text
Compare locais de hunting e encontre novas oportunidades de acordo com seu desempenho.
```

## Link

```text
Explorar hunting places →
```

Destino:

```text
/hunts
```

ou a rota de hunting places existente no projeto, caso já exista uma rota específica.

Não criar uma nova rota apenas para essa seção.

---

# 16. CTA FINAL — NOVA IMAGEM

Essa é a principal mudança visual desta etapa.

O CTA final deve utilizar:

```text
/assets/images/home-cta.webp
```

Não utilizar mais:

```text
home-hero.webp
```

---

# 17. CTA FINAL — COMPOSIÇÃO

A nova imagem deve funcionar como background da seção.

Conceito:

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  TEXTO                                     AVENTURA           │
│                                                              │
│  PRONTO PARA O                              personagens       │
│  PRÓXIMO NÍVEL?                             cenário           │
│                                                              │
│  Comece agora                                                │
│  e jogue melhor.                                              │
│                                                              │
│  descrição                                                     │
│                                                              │
│  ✓ benefício                                                   │
│  ✓ benefício                              artwork              │
│  ✓ benefício                                                   │
│                                                              │
│  [ Criar conta gratuita ]                                     │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

A imagem foi criada para deixar o lado esquerdo mais adequado para texto.

Respeitar essa composição.

---

# 18. CTA — TEXTO FINAL

## Eyebrow

```text
PRONTO PARA O PRÓXIMO NÍVEL?
```

## Título

```text
Comece agora
e jogue melhor.
```

Destacar:

```text
e jogue melhor.
```

em azul.

IMPORTANTE:

Utilizar:

```text
jogue melhor
```

Não utilizar:

```text
hunte melhor
```

---

# 19. CTA — DESCRIÇÃO

```text
Crie sua conta gratuita e transforme seus dados de hunting em decisões mais inteligentes.
```

---

# 20. CTA — BENEFÍCIOS

Utilizar:

```text
Grátis para começar
Importação de hunts
Estatísticas e recomendações
```

Cada item pode utilizar um ícone/check verde.

---

# 21. CTA — BOTÃO

Texto:

```text
Criar conta gratuita
```

Destino:

```text
/register
```

O botão deve ter destaque.

---

# 22. CTA — BACKGROUND

Usar:

```css
background-image:
  linear-gradient(...),
  url("/assets/images/home-cta.webp");
```

ou equivalente com pseudo-elemento.

A imagem precisa ficar claramente visível.

## Objetivo

O lado esquerdo precisa continuar escuro o suficiente para:

- eyebrow;
- título;
- descrição;
- benefícios;
- botão

serem perfeitamente legíveis.

O lado direito pode mostrar a artwork com maior intensidade.

---

# 23. NÃO REPETIR O HERO

O CTA deve parecer uma evolução visual do Hero, mas não uma cópia.

Hero:

```text
apresenta o produto
```

CTA:

```text
convida o visitante a começar
```

Portanto:

### Hero

`home-hero.webp`

### CTA

`home-cta.webp`

As duas imagens devem ter funções diferentes.

---

# 24. FOOTER

Manter o Footer existente através do:

```text
PublicLayout
```

Não colocar Footer dentro da Home.

Confirmar que existe apenas um Footer.

---

# 25. FOOTER — TEXTOS

Corrigir qualquer chave literal.

Usar:

## Produto

```text
Hunts
Characters
Statistics
Recommendations
```

## Ajuda

```text
Tutorials
FAQ
Support
```

## Legal

```text
Terms of Use
Privacy Policy
Cookies
```

Os textos precisam respeitar o idioma selecionado.

---

# 26. I18N — PT-BR

Adicionar/corrigir as traduções no:

```text
src/lib/i18n/locales/pt-BR/common.json
```

A Home deve possuir textos naturais em português.

Não fazer tradução literal estranha.

---

# 27. I18N — EN

Adicionar/corrigir as traduções no:

```text
src/lib/i18n/locales/en/common.json
```

A versão inglesa deve ser natural.

Exemplo:

```text
Analise suas hunts como nunca
```

pode ser:

```text
Analyze your hunts like never before
```

Não traduzir simplesmente palavra por palavra quando isso produzir inglês estranho.

---

# 28. REGRA CONTRA CHAVES LITERAIS

Depois da implementação, pesquisar o projeto/interface por:

```text
home.
nav.
actions.
```

Nenhuma dessas chaves deve aparecer como texto visível na Home.

Exemplos proibidos:

```text
home.title
home.subtitle
home.start
nav.myHunts
nav.tutorials
actions.login
actions.register
```

---

# 29. CSS

Continuar utilizando:

```text
src/pages/public/HomePage.css
```

Não criar outro sistema CSS.

Não instalar Tailwind.

Não criar CSS Modules.

Utilizar os tokens existentes.

---

# 30. RESPONSIVIDADE

## Desktop

CTA:

```text
texto à esquerda
artwork à direita
```

Hero:

```text
texto + artwork
```

Analytics:

```text
texto | infográfico
```

## Tablet

Adaptar:

- tamanho da artwork;
- largura dos textos;
- espaçamento;
- métricas.

## Mobile

Hero:

```text
texto
CTAs
benefícios
artwork
```

CTA:

```text
texto
benefícios
botão
artwork
```

A artwork não pode desaparecer.

Não pode haver overflow horizontal.

---

# 31. ACESSIBILIDADE

Garantir:

- `alt` apropriado quando houver `<img>`;
- headings semânticos;
- contraste;
- foco visível;
- teclado;
- botões reais;
- links reais;
- não depender apenas de cor.

Se a imagem for background, não adicionar texto dentro da imagem.

---

# 32. SEO

Preservar o SEO existente.

Não alterar o sistema atual desnecessariamente.

Garantir:

- title;
- description;
- canonical;
- Open Graph, caso já esteja implementado.

---

# 33. O QUE NÃO ALTERAR

Não:

- trocar framework;
- trocar bundler;
- trocar roteador;
- trocar sistema de i18n;
- instalar Tailwind;
- instalar biblioteca visual nova;
- recriar Header;
- recriar Footer;
- recriar PublicLayout;
- criar backend;
- criar API;
- criar sistema real de analytics;
- criar recomendação real para a Home;
- alterar outras páginas sem necessidade.

---

# 34. VALIDAÇÃO VISUAL

Depois da implementação, comparar a Home inteira.

Ordem visual:

```text
HEADER
↓
HERO
↓
COMO FUNCIONA
↓
ANALYTICS / INFOGRÁFICO
↓
HUNTING PLACE PREVIEW
↓
CTA COM home-cta.webp
↓
FOOTER
```

A Home deve parecer uma landing page de produto profissional.

---

# 35. VALIDAÇÃO DO NOVO ASSET

Confirmar:

```text
home-cta.webp
```

Está em:

```text
public/assets/images/
```

Confirmar que:

- carrega corretamente;
- não retorna 404;
- aparece no CTA;
- não aparece no Hero principal;
- está posicionada corretamente;
- não está excessivamente escura;
- não prejudica a leitura do texto.

---

# 36. VALIDAÇÃO DE I18N

Testar:

```text
PT-BR
EN
```

No PT-BR:

- textos naturais;
- nenhuma chave literal.

No EN:

- textos naturais;
- nenhuma chave literal.

---

# 37. VALIDAÇÃO TÉCNICA

Executar:

```bash
npm run build
```

Deve terminar sem:

- erro TypeScript;
- erro de import;
- erro CSS;
- erro de build.

---

# 38. TESTE NO NAVEGADOR

Abrir:

```text
/
```

Verificar:

- Hero;
- Como funciona;
- Analytics;
- Hunting Place preview;
- CTA;
- Footer.

Verificar também o console.

Não considerar concluído apenas porque o build passou.

---

# 39. CHECKLIST

## Conteúdo

- [ ] Nenhuma chave `home.*` visível
- [ ] Nenhuma chave `nav.*` visível
- [ ] Nenhuma chave `actions.*` visível
- [ ] PT-BR correto
- [ ] EN correto

## Hero

- [ ] `home-hero.webp`
- [ ] Artwork visível
- [ ] Overlay correto
- [ ] Texto correto
- [ ] CTAs funcionando
- [ ] Benefícios corretos

## Como funciona

- [ ] Importar
- [ ] Analisar
- [ ] Melhorar
- [ ] Fluxo visual
- [ ] Responsivo

## Analytics

- [ ] Título correto
- [ ] Descrição correta
- [ ] XP/h
- [ ] Profit/h
- [ ] Hunts
- [ ] Dados demonstrativos
- [ ] Hunting Place preview

## CTA

- [ ] `home-cta.webp`
- [ ] Artwork visível
- [ ] Texto correto
- [ ] “jogue melhor”
- [ ] Benefícios
- [ ] Botão Criar conta
- [ ] Responsivo

## Footer

- [ ] Apenas um Footer
- [ ] Traduções corretas
- [ ] Links funcionando

## Técnico

- [ ] Build OK
- [ ] Console sem erros
- [ ] Assets sem 404
- [ ] Desktop OK
- [ ] Tablet OK
- [ ] Mobile OK

---

# 40. RELATÓRIO FINAL

Ao terminar, informe:

## Arquivos alterados

Para cada arquivo:

```text
Arquivo:
Alteração:
Motivo:
```

## Validação

```text
npm run build: PASS/FAIL
Home: PASS/FAIL
Hero: PASS/FAIL
home-cta.webp: PASS/FAIL
i18n PT-BR: PASS/FAIL
i18n EN: PASS/FAIL
Footer único: PASS/FAIL
Assets: PASS/FAIL
Desktop: PASS/FAIL
Tablet: PASS/FAIL
Mobile: PASS/FAIL
Console: PASS/FAIL
```

## Problemas restantes

Se houver:

- informar o problema;
- informar o arquivo;
- explicar a causa;
- informar o que precisa ser feito.

Não esconder problemas.

---

# 41. CRITÉRIO FINAL DE ACEITAÇÃO

A Home final deve transmitir:

> **Tibia Wise é uma plataforma moderna que transforma dados de hunting em decisões melhores.**

A jornada visual deve ser:

```text
Conheça o Tibia Wise
        ↓
Entenda como funciona
        ↓
Veja os dados sendo analisados
        ↓
Entenda o valor das recomendações
        ↓
Crie sua conta
        ↓
Jogue melhor
```

A Home deve parecer:

- profissional;
- moderna;
- especializada em Tibia;
- analítica;
- premium;
- confiável;
- visualmente marcante.

Não deve parecer:

- template genérico;
- HTML cru;
- coleção de cards;
- fansite antigo;
- dashboard sem hierarquia.

**Não refaça o que já está funcionando. Faça o refinamento necessário e concentre esta etapa no conteúdo, i18n e na nova artwork `home-cta.webp`.**
