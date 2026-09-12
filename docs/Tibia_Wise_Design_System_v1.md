# Tibia Wise --- Design System

## Frontend Design System v1.0

> **Status:** Aprovado\
> **Projeto:** Tibia Wise\
> **Objetivo:** Definir a linguagem visual, os componentes, padrões de
> interação, responsividade, acessibilidade e regras de uso do frontend
> do Tibia Wise.

------------------------------------------------------------------------

# 1. Visão geral

O Tibia Wise é uma plataforma de análise de hunting sessions do Tibia. O
frontend deve transmitir três ideias principais:

1.  **Tecnologia e análise** --- o usuário precisa sentir que está
    utilizando uma ferramenta séria de análise de dados.
2.  **Identidade de Tibia** --- a interface deve possuir elementos
    visuais que remetam ao universo fantasy/MMORPG.
3.  **Clareza e usabilidade** --- a identidade temática nunca deve
    prejudicar leitura, navegação ou compreensão dos dados.

A direção visual definida é:

> **Interface moderna de analytics + identidade fantasy inspirada em
> Tibia.**

O sistema utilizará **Dark Theme como tema padrão**, disponibilizando
também **Light Theme**. Ambos devem compartilhar a mesma identidade
visual e o mesmo sistema de componentes.

------------------------------------------------------------------------

# 2. Princípios de design

## 2.1 Clareza antes da decoração

Elementos temáticos devem complementar a interface, não competir com os
dados.

Evitar:

-   excesso de imagens;
-   texturas atrás de textos;
-   efeitos luminosos exagerados;
-   excesso de dourado;
-   elementos decorativos que dificultem a leitura.

Priorizar:

-   hierarquia visual;
-   espaçamento;
-   contraste;
-   agrupamento lógico;
-   consistência.

## 2.2 Dados são protagonistas

O Tibia Wise é principalmente uma ferramenta de análise. Informações
como:

-   XP/h;
-   Profit;
-   Loot;
-   Supplies;
-   Damage;
-   Session Time;
-   Kills;
-   Deaths;

devem possuir destaque visual adequado.

## 2.3 Consistência

O mesmo componente deve possuir o mesmo comportamento em todas as
páginas.

Exemplo:

-   o botão Primary deve ter o mesmo estilo em Cadastro, Dashboard e
    Import Hunt;
-   tabelas devem seguir o mesmo padrão;
-   mensagens de erro devem seguir o mesmo padrão;
-   espaçamentos devem utilizar tokens definidos.

## 2.4 Responsividade desde o início

O frontend será projetado para:

-   Desktop;
-   Tablet;
-   Mobile.

Responsividade não será tratada como adaptação posterior.

------------------------------------------------------------------------

# 3. Identidade visual

## 3.1 Logo

O Tibia Wise utiliza como elemento principal de marca o logo com:

-   lettering "tibia Wise";
-   coruja como mascote;
-   azul;
-   dourado;
-   branco/off-white;
-   estética fantasy.

A coruja é um elemento importante da identidade, mas não deve aparecer
em excesso.

### Uso recomendado

-   Logo completo na Sidebar;
-   Logo reduzido quando necessário em espaços pequenos;
-   Mascote em estados vazios, erros e elementos especiais;
-   Elementos decorativos em banners e áreas promocionais.

### Uso inadequado

Não:

-   distorcer o logo;
-   alterar suas proporções;
-   aplicar filtros que alterem suas cores;
-   utilizar fundos que prejudiquem sua leitura;
-   utilizar o logo como decoração sem necessidade.

------------------------------------------------------------------------

# 4. Paleta de cores

## 4.1 Cores principais

  Token                    Hex         Uso
  ------------------------ ----------- --------------------------------------
  `primary-background`     `#07111C`   Background principal Dark
  `secondary-background`   `#0D1B2A`   Background secundário
  `primary-blue`           `#1688FF`   Ações principais, links e destaques
  `light-blue`             `#00BFFF`   Destaques secundários
  `gold`                   `#F5A623`   Identidade, Premium e destaques
  `light-gold`             `#FFC857`   Destaques suaves e elementos Premium

## 4.2 Cores de superfície

  Token              Hex         Uso
  ------------------ ----------- ----------------------------
  `card`             `#101F2F`   Cards padrão
  `card-highlight`   `#13263A`   Cards destacados
  `border`           `#1E2A3A`   Bordas, divisores e linhas

## 4.3 Cores de texto

  Token              Hex         Uso
  ------------------ ----------- ----------------------------------
  `text-primary`     `#F5F7FA`   Títulos e informações principais
  `text-secondary`   `#A8B3C2`   Textos secundários
  `text-tertiary`    `#6B7785`   Textos auxiliares

## 4.4 Cores semânticas

  Token       Hex         Uso
  ----------- ----------- --------------------------------------------
  `success`   `#39D353`   Sucesso, profit positivo, confirmação
  `error`     `#FF5C5C`   Erros, exclusão, valores negativos
  `warning`   `#FFBF20`   Avisos e atenção
  `info`      `#1688FF`   Informações gerais
  `accent`    `#9A6BFF`   Destaques especiais, gráficos e categorias

------------------------------------------------------------------------

# 5. Gradientes

Gradientes podem ser utilizados em elementos específicos.

## 5.1 Gradiente azul

``` text
#1688FF → #00BFFF
```

Uso:

-   botões especiais;
-   banners;
-   elementos de destaque;
-   gráficos;
-   componentes promocionais.

## 5.2 Gradiente dourado

``` text
#F5A623 → #FFC857
```

Uso:

-   Premium;
-   chamadas especiais;
-   elementos comemorativos;
-   destaques de identidade.

## 5.3 Gradiente de fundo

``` text
#07111C → #0D1B2A
```

Uso:

-   seções;
-   backgrounds;
-   áreas de destaque.

Gradientes não devem ser aplicados indiscriminadamente.

------------------------------------------------------------------------

# 6. Dark Theme

## 6.1 Tema padrão

O Dark Theme será o padrão do Tibia Wise.

Características:

-   fundo azul-marinho muito escuro;
-   cards em azul escuro;
-   bordas discretas;
-   azul para ações;
-   dourado para identidade e Premium;
-   verde para resultados positivos;
-   vermelho para valores negativos e ações destrutivas.

## 6.2 Hierarquia de superfícies

A hierarquia deve seguir aproximadamente:

``` text
Background
  ↓
Secondary Background
  ↓
Card
  ↓
Card Highlight
  ↓
Interactive / Hover
```

Isso cria profundidade sem depender de sombras fortes.

------------------------------------------------------------------------

# 7. Light Theme

O Light Theme deve ser uma alternativa completa, e não apenas uma
inversão das cores.

Princípios:

-   fundo claro;
-   superfícies brancas ou muito claras;
-   texto escuro;
-   azul e dourado preservados como identidade;
-   bordas suaves;
-   sombras discretas.

O usuário poderá escolher:

-   Dark;
-   Light;
-   System.

### Padrão

``` text
Dark
```

### System

Quando selecionado, o sistema acompanha a preferência do sistema
operacional.

------------------------------------------------------------------------

# 8. Tipografia

## 8.1 Fonte

A fonte oficial do Design System será:

> **Roboto**

A Roboto foi escolhida por ser:

-   moderna;
-   legível;
-   disponível no Google Fonts;
-   adequada para dashboards;
-   excelente em números e tabelas;
-   consistente em desktop e mobile.

## 8.2 Hierarquia

  Elemento     Tamanho Peso
  ---------- --------- ------
  H1              32px 700
  H2              24px 700
  H3              20px 700
  H4              16px 500
  Body 1          14px 400
  Body 2          12px 400

Esses valores são a referência inicial e podem possuir pequenas
variações conforme o componente.

## 8.3 Regras

-   H1 deve existir apenas quando fizer sentido semântico.
-   Não utilizar tamanho de fonte para substituir hierarquia semântica.
-   Evitar textos longos em caixa alta.
-   Labels devem ser claros e objetivos.
-   Números de métricas podem possuir tamanho maior que o body.

------------------------------------------------------------------------

# 9. Espaçamento

O sistema deve utilizar uma escala consistente baseada em múltiplos de
4px.

Base:

``` text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
```

### Uso comum

``` text
4px  → pequenos gaps
8px  → ícone/texto
12px → elementos internos
16px → padding padrão
24px → separação de blocos
32px → seções
48px+ → grandes áreas
```

Evitar valores arbitrários quando um token existente resolver a
necessidade.

------------------------------------------------------------------------

# 10. Bordas e radius

A interface utiliza cantos arredondados de forma moderada.

Referência:

``` text
4px  → pequenos controles
6px  → inputs e botões pequenos
8px  → cards e componentes
12px → cards destacados / containers
16px → grandes containers ou elementos promocionais
```

Bordas devem ser discretas.

No Dark Theme:

``` text
#1E2A3A
```

No Light Theme:

utilizar um equivalente visual mais claro.

------------------------------------------------------------------------

# 11. Sombras

O sistema não deve depender de sombras fortes.

Dark Theme:

-   priorizar contraste de superfície;
-   usar sombras apenas para elevação;
-   evitar glow excessivo.

Light Theme:

-   sombras suaves podem ajudar a separar cards do fundo.

------------------------------------------------------------------------

# 12. Botões

## 12.1 Primary

Ação principal.

Exemplos:

-   Entrar;
-   Criar conta;
-   Importar Hunt;
-   Salvar;
-   Confirmar.

Características:

-   azul principal;
-   texto claro;
-   destaque visual alto.

## 12.2 Secondary

Ação importante, porém secundária.

Exemplos:

-   Ver Hunts;
-   Ver detalhes;
-   Explorar.

Características:

-   fundo transparente ou superfície escura;
-   borda azul;
-   texto claro.

## 12.3 Ghost

Ações auxiliares.

Exemplos:

-   Cancelar;
-   Voltar;
-   Fechar.

Sem grande destaque visual.

## 12.4 Danger

Ações destrutivas.

Exemplos:

-   Excluir Hunt;
-   Excluir personagem.

Utiliza `error`.

## 12.5 Premium

Ações relacionadas ao Premium.

Utiliza:

-   dourado;
-   dourado claro;
-   ícone de coroa quando apropriado.

## 12.6 Icon Button

Botão somente com ícone.

Uso:

-   notificações;
-   configurações;
-   ações de tabela;
-   fechar;
-   editar;
-   visualizar.

## 12.7 Estados

Todos os botões precisam suportar:

``` text
Default
Hover
Active
Focus
Disabled
Loading
```

------------------------------------------------------------------------

# 13. Inputs

## Componentes previstos

-   Input;
-   Password Input;
-   Search Input;
-   Select;
-   Multi Select;
-   Checkbox;
-   Radio;
-   Switch;
-   Date Picker;
-   Number Input;
-   Textarea.

## Estados

``` text
Default
Focus
Filled
Error
Success
Disabled
Loading
```

## Mensagens

Mensagens devem ser colocadas próximas ao campo.

Exemplo:

``` text
E-mail

[ usuario@email ]

✓ E-mail válido
```

ou:

``` text
E-mail

[ usuario@ ]

Por favor, informe um e-mail válido.
```

Erros devem explicar o problema e, quando possível, orientar a correção.

------------------------------------------------------------------------

# 14. Search Input

A busca global é um componente importante.

Referência:

``` text
┌─────────────────────────────────────────┐
│ 🔍 Buscar hunts, lugares, jogadores... │
│                                  Ctrl K │
└─────────────────────────────────────────┘
```

No desktop:

-   aproximadamente 400--480px;
-   flexível conforme o espaço disponível.

No mobile:

-   deve reduzir ou abrir uma interface de busca dedicada.

A busca poderá pesquisar:

-   Hunts;
-   Hunting Places;
-   Characters;
-   Players;
-   News.

------------------------------------------------------------------------

# 15. Cards

Cards são um dos principais componentes do sistema.

Tipos:

-   Stat Card;
-   Hunt Card;
-   Character Card;
-   News Card;
-   Recommendation Card;
-   Promotional Card.

Características:

-   superfície contrastante;
-   borda discreta;
-   radius moderado;
-   padding consistente.

------------------------------------------------------------------------

# 16. Stat Cards

Utilizados no Dashboard e Statistics.

Exemplos:

``` text
Total Hunts
127
+8 esta semana
```

``` text
XP / Hour
2.14M
+12.5%
```

``` text
Profit / Hour
485k
+9.3%
```

Não apresentar informações que o sistema não possui de forma confiável.

------------------------------------------------------------------------

# 17. Tabelas

As tabelas são importantes para informações densas.

## 17.1 Estrutura

Exemplo:

``` text
Hunt | Local | Data | XP Gain | XP/Hour | Profit
```

## 17.2 Linhas alternadas

As linhas devem alternar entre dois tons próximos de azul, mantendo o
mesmo tom geral.

Exemplo conceitual:

``` text
Linha 1 → #0D1B2A
Linha 2 → #101F2F
Linha 3 → #0D1B2A
Linha 4 → #101F2F
```

A diferença deve ser sutil.

## 17.3 Hover

Ao passar o mouse:

-   aumentar discretamente o contraste;
-   indicar que a linha é interativa quando aplicável.

## 17.4 Valores

Profit positivo:

``` text
+415,150
```

em `success`.

Valores negativos:

``` text
-112,300
```

em `error`.

## 17.5 Mobile

Tabelas largas não devem simplesmente estourar a tela.

Opções:

-   scroll horizontal controlado;
-   redução de colunas;
-   transformação para cards;
-   priorização de informações.

A decisão deve ser feita por tabela.

------------------------------------------------------------------------

# 18. Badges

Badges indicam estado ou categoria.

Exemplos:

``` text
Novo
Popular
Premium
Sucesso
Privado
Público
```

Cores devem possuir significado consistente.

Não utilizar uma cor arbitrariamente apenas por estética.

------------------------------------------------------------------------

# 19. Alerts

Tipos:

-   Success;
-   Info;
-   Warning;
-   Error.

Exemplo:

``` text
✓ Sua Hunt foi importada com sucesso.
```

``` text
⚠ Verifique os dados antes de confirmar.
```

------------------------------------------------------------------------

# 20. Toasts

Toasts são mensagens rápidas e temporárias.

Exemplos:

``` text
✓ Hunt salva com sucesso.
```

``` text
✓ Dados atualizados.
```

``` text
✕ Não foi possível salvar a Hunt.
```

Devem:

-   não bloquear a interface;
-   possuir contraste adequado;
-   possuir fechamento manual quando necessário;
-   não substituir mensagens de validação importantes.

------------------------------------------------------------------------

# 21. Modal

Modais devem ser utilizados para ações que realmente precisam de
confirmação ou atenção.

Exemplo:

``` text
Excluir Hunt

Tem certeza que deseja excluir esta Hunt?
Esta ação não pode ser desfeita.

[Cancelar] [Excluir]
```

A ação destrutiva utiliza `Danger`.

------------------------------------------------------------------------

# 22. Dropdown

Dropdowns serão usados para:

-   menu do usuário;
-   personagem;
-   idioma;
-   tema;
-   filtros;
-   ações contextuais.

Devem possuir:

-   estado aberto;
-   hover;
-   foco;
-   seleção;
-   fechamento ao clicar fora;
-   suporte a teclado.

------------------------------------------------------------------------

# 23. Personagem padrão

Usuários podem possuir múltiplos personagens.

O frontend não deve assumir que exista apenas um personagem.

O usuário terá um:

> **Personagem padrão**

Esse personagem será utilizado como contexto inicial para áreas
personalizadas.

Exemplo:

``` text
Raphael
Level 150 Knight
Antica
```

## Seletor

``` text
PERSONAGEM ATIVO

Raphael
Level 150 Knight
Antica
▼
```

O usuário poderá trocar o personagem ativo.

## Regra

Trocar o personagem ativo não precisa alterar permanentemente o
personagem padrão.

O personagem padrão é a preferência inicial do usuário.

------------------------------------------------------------------------

# 24. Preferências do usuário

As preferências previstas são:

``` text
default_character_id
default_language
default_theme
```

## default_character_id

FK para o personagem do próprio usuário.

## default_language

Inicialmente:

``` text
PT_BR
EN_US
```

## default_theme

``` text
DARK
LIGHT
SYSTEM
```

O backend deve garantir que o personagem padrão pertença ao usuário.

------------------------------------------------------------------------

# 25. Sidebar

## Dimensões

Referência:

``` text
Largura: 260px
```

A sidebar ocupa toda a altura disponível no desktop.

## Logo

O logo deve ser proporcional à sidebar.

Referência:

``` text
aproximadamente 200–220px de largura
```

mantendo proporção original.

## Navegação

Somente usuários autenticados terão a Sidebar da aplicação.

### PRINCIPAL

``` text
Dashboard
Minhas Hunts
Importar Hunt
Recomendações
```

### PERSONAGEM

Área/card do personagem padrão:

``` text
Raphael
Level 150 Knight
Antica
Ver personagem
```

### AJUDA E CONTA

``` text
Tutoriais
Suporte
Configurações
Premium
```

## Recomendações

A página de Recomendações é exclusiva para usuários logados.

------------------------------------------------------------------------

# 26. Topbar

## Altura

Referência:

``` text
72px
```

## Usuário deslogado

Deve conter:

-   busca global;
-   seletor de tema;
-   idioma;
-   Entrar;
-   Criar conta.

Exemplo:

``` text
[ Busca global ]        [ Tema ] [ Idioma ] [ Entrar ] [ Criar conta ]
```

## Usuário logado

Deve conter:

-   busca global;
-   botão `+ Nova Hunt`;
-   Premium;
-   seletor de tema;
-   idioma;
-   notificações;
-   avatar;
-   menu do usuário.

Exemplo:

``` text
[ Busca ] [ + Nova Hunt ] [ Premium ] [ Tema ] [ Idioma ] [ 🔔 ] [ Avatar ▼ ]
```

------------------------------------------------------------------------

# 27. Nova Hunt

O botão:

> **+ Nova Hunt**

é um dos CTAs principais da aplicação.

Ao clicar, pode apresentar:

``` text
Como deseja criar sua Hunt?

Importar Hunt
Importe os dados do Hunt Analyser

Criar manualmente
Preencha os dados da Hunt
```

O fluxo de importação será posteriormente especificado em sua própria
página.

------------------------------------------------------------------------

# 28. Menu do usuário

Exemplo:

``` text
Raphael
Level 150 Knight
Antica

Meu perfil
Meus personagens
Configurações
Notificações
Sair
```

O menu deve ser compacto e fácil de navegar.

------------------------------------------------------------------------

# 29. Footer

O footer deve ser simples e consistente.

Pode conter:

### Produto

-   Hunts;
-   Characters;
-   Statistics;
-   Rankings;
-   Recommendations.

### Ajuda

-   Tutoriais;
-   FAQ;
-   Suporte.

### Legal

-   Termos de Uso;
-   Política de Privacidade;
-   Cookies.

### Outros

-   idioma;
-   redes sociais;
-   copyright.

------------------------------------------------------------------------

# 30. Breadcrumbs

Breadcrumbs serão usados principalmente em páginas profundas.

Exemplo:

``` text
Home > Hunts > Minhas Hunts > Glooth Bandits
```

Não é obrigatório utilizar breadcrumb em páginas onde não agrega valor.

------------------------------------------------------------------------

# 31. Paginação

Tabelas e listas longas utilizarão paginação quando necessário.

Exemplo:

``` text
«  ‹  1  2  3  4  5  ›  »
```

Deve possuir:

-   página ativa;
-   hover;
-   disabled;
-   acessibilidade por teclado.

------------------------------------------------------------------------

# 32. Tabs

Tabs serão utilizadas para separar conteúdos relacionados.

Exemplos:

``` text
Todas | Públicas | Privadas | Arquivadas
```

ou:

``` text
Overview | Hunts | Statistics
```

Não utilizar tabs quando os conteúdos forem fluxos ou páginas
conceitualmente diferentes.

------------------------------------------------------------------------

# 33. Loading

Todo conteúdo que depende de dados externos precisa possuir estado de
carregamento.

Preferência:

> **Skeleton**

em vez de uma tela inteira com spinner.

Exemplo:

``` text
████████████
████████
██████████████
```

Para ações individuais, spinner pode ser utilizado dentro do botão:

``` text
[ ⟳ Importando... ]
```

------------------------------------------------------------------------

# 34. Empty State

Quando não houver dados, a interface deve explicar o que aconteceu e
indicar o próximo passo.

Exemplo:

``` text
Você ainda não possui nenhuma Hunt.

Importe sua primeira Hunt para começar
a acompanhar seu desempenho.

[ Importar Hunt ]
```

A coruja pode aparecer como elemento visual.

------------------------------------------------------------------------

# 35. Error State

Exemplo:

``` text
Não foi possível carregar suas Hunts.

Tente novamente em alguns instantes.

[ Tentar novamente ]
```

Erros devem ser compreensíveis para usuários comuns.

Evitar expor:

-   stack traces;
-   mensagens internas;
-   IDs técnicos;
-   detalhes de banco de dados.

------------------------------------------------------------------------

# 36. Success State

Exemplo:

``` text
✓ Hunt importada com sucesso!

Sua Hunt já está disponível nas suas estatísticas.

[ Ver Hunt ]
```

------------------------------------------------------------------------

# 37. Error Pages

O sistema terá páginas específicas para:

## 403

Acesso não autorizado.

## 404

Recurso/página não encontrado.

## 500

Erro interno inesperado.

## 503

Serviço temporariamente indisponível.

As páginas devem preservar:

-   identidade Tibia Wise;
-   navegação básica;
-   mensagem clara;
-   CTA adequado.

------------------------------------------------------------------------

# 38. Help Center

A área de ajuda será dividida em:

``` text
Tutoriais
FAQ
Suporte
```

## Tutoriais

Conteúdo inicialmente básico:

### Primeiros passos

-   Criar conta;
-   Adicionar personagem;
-   Validar personagem;
-   Importar primeira Hunt;
-   Visualizar Hunt;
-   Interpretar dados.

### Análise de Hunts

-   XP/h;
-   Profit;
-   Supplies;
-   Comparação;
-   Recomendações.

### Recursos

-   Hunts públicas e privadas;
-   Statistics;
-   Rankings;
-   Recommendations;
-   Premium.

------------------------------------------------------------------------

# 39. FAQ

FAQ será uma página pública.

Categorias iniciais:

-   Tibia Wise;
-   Conta;
-   Hunts;
-   Characters;
-   Premium.

Perguntas devem utilizar componentes de accordion quando apropriado.

------------------------------------------------------------------------

# 40. Recomendações

A página de Recommendations é exclusiva para usuários autenticados.

As recomendações podem considerar:

-   personagem;
-   level;
-   vocation;
-   histórico de Hunts;
-   XP/h;
-   profit;
-   locais frequentados;
-   outros dados relevantes.

O personagem ativo será utilizado como contexto padrão.

Para visitante deslogado, em vez de simplesmente exibir um erro 403,
pode ser mostrado um estado orientativo:

``` text
Suas recomendações estão esperando por você.

Entre na sua conta para receber recomendações
baseadas nas suas Hunts e personagem.

[ Entrar ] [ Criar conta ]
```

------------------------------------------------------------------------

# 41. Responsividade

## Breakpoints de referência

Os valores podem ser ajustados durante implementação, mas a arquitetura
inicial considera:

``` text
Mobile: 360–767px
Tablet: 768–1023px
Desktop: 1024px+
Desktop amplo: 1440px+
```

## Desktop

Sidebar:

``` text
260px
```

Conteúdo:

``` text
flexível
```

Topbar:

``` text
72px
```

## Tablet

A sidebar pode ser compactada ou transformada em navegação recolhida.

Cards devem reduzir a quantidade de colunas.

## Mobile

A sidebar permanente será removida.

Estrutura aproximada:

``` text
┌──────────────────────────────┐
│ ☰  Tibia Wise       Avatar   │
├──────────────────────────────┤
│                              │
│          Conteúdo            │
│                              │
├──────────────────────────────┤
│ Home Hunts Import More       │
└──────────────────────────────┘
```

Pode existir uma navegação inferior para as ações principais.

O menu completo poderá ser aberto como drawer.

------------------------------------------------------------------------

# 42. Mobile --- regras de conteúdo

No mobile:

-   priorizar informações mais importantes;
-   reduzir colunas de tabelas;
-   transformar tabelas em cards quando necessário;
-   evitar texto excessivo;
-   manter CTAs acessíveis;
-   não reduzir fonte excessivamente;
-   manter áreas de toque confortáveis.

------------------------------------------------------------------------

# 43. Acessibilidade

Acessibilidade é requisito do Design System.

## Contraste

Textos devem possuir contraste suficiente contra seus backgrounds.

## Teclado

Elementos interativos precisam ser acessíveis via teclado.

## Focus

Todo componente interativo precisa possuir estado de foco visível.

## Semântica

Utilizar HTML semântico:

``` text
header
nav
main
section
article
footer
button
form
label
```

Não utilizar `div` como botão quando um `button` resolver.

## ARIA

Utilizar ARIA somente quando necessário e de maneira correta.

------------------------------------------------------------------------

# 44. Imagens e textos alternativos

Imagens informativas precisam possuir `alt` descritivo.

Exemplo:

``` html
<img
  src="glooth-bandits.webp"
  alt="Glooth Bandits"
/>
```

Elementos puramente decorativos podem utilizar:

``` html
alt=""
```

Não usar textos genéricos como:

``` text
imagem
foto
picture
```

------------------------------------------------------------------------

# 45. SEO

Todas as páginas públicas devem ser planejadas com SEO desde o início.

## Title

Cada página deve possuir título único.

Exemplo:

``` text
Glooth Bandits Hunt — XP/h, Profit e Análise | Tibia Wise
```

## Meta description

Cada página relevante deve possuir descrição própria.

Exemplo:

``` text
Veja os dados completos desta hunt em Glooth Bandits,
incluindo XP/h, loot, profit, supplies e duração.
```

## URLs

Preferir URLs amigáveis.

Exemplo:

``` text
/hunts/glooth-bandits
```

ou:

``` text
/hunts/18291/glooth-bandits
```

Evitar:

``` text
/hunt?id=18291
```

## Outros requisitos

Planejar:

-   canonical;
-   sitemap.xml;
-   robots.txt;
-   Open Graph;
-   social cards;
-   structured data quando aplicável;
-   headings semânticos.

------------------------------------------------------------------------

# 46. robots.txt

O projeto deverá possuir `robots.txt`.

Áreas privadas devem ser bloqueadas para indexação quando apropriado.

Exemplos de áreas potencialmente privadas:

``` text
/dashboard
/settings
/api
```

O conteúdo definitivo deverá ser revisado junto com a arquitetura de
rotas e estratégia de SEO.

------------------------------------------------------------------------

# 47. CTAs

CTAs devem ser claros e orientados à ação.

### Primários

-   Começar agora;
-   Criar conta;
-   Importar Hunt;
-   Salvar;
-   Entrar.

### Secundários

-   Explorar Hunts;
-   Ver detalhes;
-   Ver personagem;
-   Conhecer Premium.

### Destrutivos

-   Excluir;
-   Remover.

Evitar:

-   excesso de CTAs na mesma área;
-   textos vagos como "Clique aqui";
-   vários botões Primary competindo pela atenção.

------------------------------------------------------------------------

# 48. Microcopy

A linguagem do Tibia Wise deve ser:

-   clara;
-   objetiva;
-   amigável;
-   profissional;
-   levemente temática.

Evitar exagerar em termos fantasy.

Exemplo adequado:

> "Sua Hunt foi importada com sucesso."

Em vez de:

> "Sua jornada épica foi registrada nas crônicas do reino!"

A personalidade deve aparecer principalmente na identidade visual e em
pontos especiais.

------------------------------------------------------------------------

# 49. Ícones

Ícones devem seguir uma linguagem visual consistente.

Devem:

-   possuir peso visual semelhante;
-   ter tamanhos consistentes;
-   acompanhar o significado do texto;
-   não substituir texto importante quando isso prejudicar compreensão.

Ícones de identidade podem utilizar azul/dourado.

Ícones semânticos devem respeitar suas cores semânticas.

------------------------------------------------------------------------

# 50. Gráficos

Gráficos devem utilizar a paleta do Tibia Wise.

Exemplos:

``` text
XP / Hour → Azul
Profit → Verde
Supplies → Roxo
Loot → Dourado
Damage → Vermelho
```

Os gráficos devem priorizar:

-   leitura;
-   tooltips;
-   unidades;
-   períodos;
-   filtros;
-   comparação.

Evitar gráficos excessivamente decorativos.

------------------------------------------------------------------------

# 51. Arquitetura visual do Dashboard

O Dashboard será o principal exemplo da linguagem do sistema.

Estrutura aproximada:

``` text
Sidebar
│
├── Topbar
│
└── Dashboard
    │
    ├── Welcome
    ├── Stat Cards
    ├── XP / Hour Chart
    ├── Last Hunt Analysis
    ├── Latest Hunts
    ├── News
    ├── Recommendations
    └── Premium CTA
```

A composição deve priorizar as informações mais relevantes para o
usuário.

------------------------------------------------------------------------

# 52. Conteúdo temático

Elementos inspirados no Tibia podem aparecer em:

-   banners;
-   cabeçalhos;
-   empty states;
-   error pages;
-   cards especiais;
-   Premium;
-   ilustrações;
-   mascote;
-   áreas de onboarding.

Evitar usar artwork grande em todos os blocos.

A interface precisa continuar parecendo uma plataforma de analytics.

------------------------------------------------------------------------

# 53. Tokens de implementação

A implementação deverá preferencialmente transformar as decisões deste
documento em tokens.

Exemplo conceitual:

``` css
--color-primary-background: #07111C;
--color-secondary-background: #0D1B2A;
--color-primary-blue: #1688FF;
--color-light-blue: #00BFFF;
--color-gold: #F5A623;
--color-light-gold: #FFC857;

--color-card: #101F2F;
--color-card-highlight: #13263A;
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

Os valores acima são a referência oficial do Design System v1.

------------------------------------------------------------------------

# 54. Regras de consistência

Antes de criar um novo componente, verificar:

1.  Já existe um componente equivalente?
2.  Existe um token de cor adequado?
3.  Existe um espaçamento definido?
4.  O componente precisa funcionar no Dark e Light?
5.  Possui estado de hover?
6.  Possui estado de focus?
7.  Possui estado disabled quando aplicável?
8.  Possui estado loading quando aplicável?
9.  Funciona no mobile?
10. É acessível?

------------------------------------------------------------------------

# 55. Estados obrigatórios

Componentes que trabalham com dados devem considerar:

``` text
Loading
Loaded
Empty
Error
Success
Disabled
Permission denied
```

Nem todos os componentes precisarão de todos os estados.

------------------------------------------------------------------------

# 56. Navegação geral

## Usuário deslogado

A Topbar oferece:

``` text
Busca
Tema
Idioma
Entrar
Criar conta
```

Não haverá Sidebar da aplicação.

## Usuário logado

Sidebar:

``` text
Dashboard
Minhas Hunts
Importar Hunt
Recomendações

Personagem padrão

Tutoriais
Suporte
Configurações
Premium
```

Topbar:

``` text
Busca
Nova Hunt
Premium
Tema
Idioma
Notificações
Avatar / Menu
```

------------------------------------------------------------------------

# 57. Regras de autenticação visual

Páginas autenticadas devem:

-   exigir sessão válida;
-   mostrar loading durante restauração de sessão;
-   tratar sessão expirada;
-   redirecionar adequadamente;
-   não expor informações privadas.

O frontend nunca deve depender somente de esconder elementos para
garantir autorização. A autorização real será responsabilidade do
backend.

------------------------------------------------------------------------

# 58. Relação com o backend

O Design System não define a implementação da API, mas o frontend deverá
ser projetado pensando em dados reais.

Exemplo:

Dashboard pode consumir:

``` text
totalHunts
averageXpHour
averageProfitHour
bestiaryProgress
totalPlayTime
recentHunts
latestNews
recommendations
```

Não criar elementos visuais que dependam de dados que o backend não
fornece ou que não possam ser calculados de maneira confiável.

------------------------------------------------------------------------

# 59. Regra importante sobre experiência do personagem

O Tibia Wise não deve apresentar:

``` text
90% para o próximo level
XP total do personagem
XP restante
```

a menos que exista uma fonte confiável para esses dados.

Por isso, o card do personagem deverá priorizar:

``` text
Nome
Level
Vocation
World
```

------------------------------------------------------------------------

# 60. Checklist do Design System v1

## Identidade

-   [x] Logo definido
-   [x] Paleta definida
-   [x] Dark Theme
-   [x] Light Theme
-   [x] Roboto
-   [x] Estética fantasy + analytics

## Layout

-   [x] Sidebar 260px
-   [x] Topbar 72px
-   [x] Desktop
-   [x] Tablet
-   [x] Mobile
-   [x] Footer
-   [x] Breadcrumbs

## Componentes

-   [x] Buttons
-   [x] Inputs
-   [x] Select
-   [x] Search
-   [x] Cards
-   [x] Stat Cards
-   [x] Tables
-   [x] Badges
-   [x] Alerts
-   [x] Toasts
-   [x] Modal
-   [x] Dropdown
-   [x] Tabs
-   [x] Pagination
-   [x] Loading
-   [x] Empty State
-   [x] Error State
-   [x] Success State
-   [x] Charts

## Conta

-   [x] Múltiplos personagens
-   [x] Personagem padrão
-   [x] Idioma padrão
-   [x] Tema padrão
-   [x] Menu do usuário

## Conteúdo

-   [x] Tutoriais
-   [x] FAQ
-   [x] Suporte
-   [x] Premium
-   [x] Recomendações autenticadas

## SEO

-   [x] Titles únicos
-   [x] Meta descriptions
-   [x] Alt text
-   [x] Breadcrumbs
-   [x] robots.txt planejado
-   [x] Sitemap planejado
-   [x] Canonical planejado
-   [x] Open Graph planejado
-   [x] Structured data planejado

## Acessibilidade

-   [x] Contraste
-   [x] Focus
-   [x] Keyboard navigation
-   [x] Semantic HTML
-   [x] ARIA quando necessário
-   [x] Text alternatives

------------------------------------------------------------------------

# 61. Próxima fase

Com o Design System v1 aprovado, o próximo trabalho será a **Arquitetura
de Páginas do Frontend**.

Para cada página serão definidos:

``` text
URL
Objetivo
Público
Autenticação
Layout
Componentes
Dados necessários
Ações
CTAs
Estados
Breadcrumbs
SEO
Responsividade
```

A ordem recomendada é:

``` text
1. Layout Global
2. Autenticação
3. Dashboard
4. Minhas Hunts
5. Importar Hunt
6. Detalhes da Hunt
7. Characters
8. Statistics
9. Recommendations
10. Rankings
11. Home
12. Hunts Públicas
13. News
14. Tutoriais
15. FAQ
16. Premium
17. Settings
18. Páginas de erro
19. SEO e revisão final
```

------------------------------------------------------------------------

# 62. Status

**Design System v1.0 --- APROVADO**

Este documento representa a base visual e comportamental definida para o
frontend do Tibia Wise.

Qualquer alteração futura importante deve ser registrada como uma nova
versão do Design System, evitando que decisões diferentes sejam tomadas
de maneira inconsistente durante o desenvolvimento.
