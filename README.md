# PortfÃ³lio de AutomaÃ§Ã£o para E-commerce

ColeÃ§Ã£o de ferramentas prÃ¡ticas para operaÃ§Ãµes de e-commerce, com foco em Mercado Livre, anÃ¡lise de dados, estoque, precificaÃ§Ã£o e produtividade.

> Este Ã© um portfÃ³lio independente e nÃ£o possui vÃ­nculo oficial com o Mercado Livre. IntegraÃ§Ãµes devem respeitar os termos da plataforma e utilizar APIs oficiais.

## Objetivo

Reunir projetos pequenos e bem documentados que resolvam problemas reais de vendedores e equipes de operaÃ§Ã£o. Cada projeto deve ter instruÃ§Ãµes de uso, exemplos e testes sempre que possÃ­vel.

## Projetos disponÃ­veis

| Projeto | DescriÃ§Ã£o | Tecnologia | Status |
| --- | --- | --- | --- |
| [Calculadora de lucratividade](projetos/01-calculadora-lucratividade/) | Calcula taxas, custos e lucro estimado de uma venda | Python | Funcional |
| [Calculadora web](https://richardferreiramiranda.github.io/portfolio-automacao-ecommerce/) | Interface responsiva com link compartilhÃ¡vel | HTML, CSS e JavaScript | Funcional |

## VersÃ£o web

A calculadora tambÃ©m funciona diretamente no navegador, sem instalaÃ§Ã£o e sem cadastro:

**[Abrir a Calculadora de Lucro](https://richardferreiramiranda.github.io/portfolio-automacao-ecommerce/)**

Os valores sÃ£o processados somente no navegador. O botÃ£o de compartilhamento inclui a simulaÃ§Ã£o no endereÃ§o da pÃ¡gina para que outra pessoa possa abrir o mesmo cenÃ¡rio.

## PrÃ³ximos projetos

- Monitor de estoque baixo
- Comparador de preÃ§os e margens
- Conversor e validador de planilhas de anÃºncios
- Organizador de imagens por SKU
- Gerador de tÃ­tulos e descriÃ§Ãµes
- Painel de vendas e lucratividade
- Auditor de anÃºncios com dados incompletos
- Sincronizador de estoque por API oficial
- RelatÃ³rio de reputaÃ§Ã£o e atendimento
- Controle de custos de frete e publicidade

Veja a lista completa e a ordem sugerida em [ROADMAP.md](ROADMAP.md).

## Como usar

Cada pasta dentro de `projetos/` Ã© independente. Entre na pasta do projeto desejado e siga o respectivo README.

Para executar os testes do primeiro projeto:

```bash
python -m unittest discover -s projetos/01-calculadora-lucratividade/tests -v
```

Para executar os testes da versÃ£o web com Node.js:

```bash
node --test tests/web.test.js
```

## PrincÃ­pios do repositÃ³rio

- Nunca armazenar senhas, tokens ou credenciais no cÃ³digo.
- Preferir a API oficial e respeitar limites e regras da plataforma.
- Separar dados de exemplo de dados reais de clientes.
- Documentar instalaÃ§Ã£o, configuraÃ§Ã£o e limitaÃ§Ãµes.
- Incluir testes para regras financeiras e transformaÃ§Ãµes de dados.

## Aviso

Os cÃ¡lculos e exemplos sÃ£o estimativas. Taxas, regras e endpoints podem mudar; confirme sempre os valores atuais na documentaÃ§Ã£o oficial e na sua conta antes de tomar decisÃµes financeiras.

## ContribuiÃ§Ã£o

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para o padrÃ£o dos novos projetos.

