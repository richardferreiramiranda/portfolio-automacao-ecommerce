# Calculadora de lucratividade

Ferramenta de linha de comando que estima o resultado de uma venda usando valores configuráveis. Nenhuma taxa específica do Mercado Livre fica fixa no código.

## Requisitos

- Python 3.10 ou superior
- Nenhuma biblioteca externa

## Exemplo

```bash
python calculadora.py --preco-venda 150 --custo-produto 70 --taxa-percentual 16 --tarifa-fixa 6 --frete 12 --publicidade 5 --impostos-percentual 4
```

Saída esperada:

```text
Preço de venda: R$ 150,00
Taxa percentual: R$ 24,00
Tarifa fixa: R$ 6,00
Frete: R$ 12,00
Publicidade: R$ 5,00
Impostos: R$ 6,00
Custo do produto: R$ 70,00
Lucro estimado: R$ 27,00
Margem estimada: 18,00%
```

Os percentuais e custos devem ser conferidos na conta do vendedor. O programa é um simulador e não substitui relatórios oficiais.

## Testes

Na raiz do repositório:

```bash
python -m unittest discover -s projetos/01-calculadora-lucratividade/tests -v
```
