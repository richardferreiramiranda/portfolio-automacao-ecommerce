# Portfólio de Automação para E-commerce

Coleção de ferramentas práticas para operações de e-commerce, com foco em Mercado Livre, análise de dados, estoque, precificação e produtividade.

> Este é um portfólio independente e não possui vínculo oficial com o Mercado Livre. Integrações devem respeitar os termos da plataforma e utilizar APIs oficiais.

## Objetivo

Reunir projetos pequenos e bem documentados que resolvam problemas reais de vendedores e equipes de operação. Cada projeto deve ter instruções de uso, exemplos e testes sempre que possível.

## Projetos disponíveis

| Projeto | Descrição | Tecnologia | Status |
| --- | --- | --- | --- |
| [Calculadora de lucratividade](projetos/01-calculadora-lucratividade/) | Calcula taxas, custos e lucro estimado de uma venda | Python | Funcional |
| [Calculadora web](https://richardferreiramiranda.github.io/portfolio-automacao-ecommerce/) | Interface responsiva com link compartilhável | HTML, CSS e JavaScript | Funcional |

## Versão web

A calculadora também funciona diretamente no navegador, sem instalação e sem cadastro:

**[Abrir a Calculadora de Lucro](https://richardferreiramiranda.github.io/portfolio-automacao-ecommerce/)**

Os valores são processados somente no navegador. O botão de compartilhamento inclui a simulação no endereço da página para que outra pessoa possa abrir o mesmo cenário.

## Próximos projetos

- Monitor de estoque baixo
- Comparador de preços e margens
- Conversor e validador de planilhas de anúncios
- Organizador de imagens por SKU
- Gerador de títulos e descrições
- Painel de vendas e lucratividade
- Auditor de anúncios com dados incompletos
- Sincronizador de estoque por API oficial
- Relatório de reputação e atendimento
- Controle de custos de frete e publicidade

Veja a lista completa e a ordem sugerida em [ROADMAP.md](ROADMAP.md).

## Como usar

Cada pasta dentro de `projetos/` é independente. Entre na pasta do projeto desejado e siga o respectivo README.

Para executar os testes do primeiro projeto:

```bash
python -m unittest discover -s projetos/01-calculadora-lucratividade/tests -v
```

Para executar os testes da versão web com Node.js:

```bash
node --test tests/web.test.js
```

## Princípios do repositório

- Nunca armazenar senhas, tokens ou credenciais no código.
- Preferir a API oficial e respeitar limites e regras da plataforma.
- Separar dados de exemplo de dados reais de clientes.
- Documentar instalação, configuração e limitações.
- Incluir testes para regras financeiras e transformações de dados.

## Aviso

Os cálculos e exemplos são estimativas. Taxas, regras e endpoints podem mudar; confirme sempre os valores atuais na documentação oficial e na sua conta antes de tomar decisões financeiras.

## Contribuição

Consulte [CONTRIBUTING.md](CONTRIBUTING.md) para o padrão dos novos projetos.

