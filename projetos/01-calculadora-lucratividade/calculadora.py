"""Calculadora configurável de lucratividade para vendas em marketplaces."""

from __future__ import annotations

import argparse
from dataclasses import dataclass
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP


CENTAVOS = Decimal("0.01")


def decimal_nao_negativo(valor: str) -> Decimal:
    """Converte texto em Decimal e rejeita valores negativos."""
    try:
        numero = Decimal(valor.replace(",", "."))
    except InvalidOperation as exc:
        raise argparse.ArgumentTypeError(f"valor inválido: {valor}") from exc
    if not numero.is_finite() or numero < 0:
        raise argparse.ArgumentTypeError("o valor deve ser um número não negativo")
    return numero


def percentual(valor: str) -> Decimal:
    """Converte e valida um percentual entre zero e cem."""
    numero = decimal_nao_negativo(valor)
    if numero > 100:
        raise argparse.ArgumentTypeError("o percentual deve estar entre 0 e 100")
    return numero


def dinheiro(valor: Decimal) -> Decimal:
    return valor.quantize(CENTAVOS, rounding=ROUND_HALF_UP)


@dataclass(frozen=True)
class Venda:
    preco_venda: Decimal
    custo_produto: Decimal
    taxa_percentual: Decimal = Decimal("0")
    tarifa_fixa: Decimal = Decimal("0")
    frete: Decimal = Decimal("0")
    publicidade: Decimal = Decimal("0")
    impostos_percentual: Decimal = Decimal("0")

    def calcular(self) -> dict[str, Decimal]:
        taxa = dinheiro(self.preco_venda * self.taxa_percentual / 100)
        impostos = dinheiro(self.preco_venda * self.impostos_percentual / 100)
        lucro = dinheiro(
            self.preco_venda
            - self.custo_produto
            - taxa
            - self.tarifa_fixa
            - self.frete
            - self.publicidade
            - impostos
        )
        margem = (
            dinheiro(lucro / self.preco_venda * 100)
            if self.preco_venda
            else Decimal("0.00")
        )
        return {"taxa": taxa, "impostos": impostos, "lucro": lucro, "margem": margem}


def formatar_reais(valor: Decimal) -> str:
    return f"R$ {dinheiro(valor):.2f}".replace(".", ",")


def criar_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--preco-venda", required=True, type=decimal_nao_negativo)
    parser.add_argument("--custo-produto", required=True, type=decimal_nao_negativo)
    parser.add_argument("--taxa-percentual", default=Decimal("0"), type=percentual)
    parser.add_argument("--tarifa-fixa", default=Decimal("0"), type=decimal_nao_negativo)
    parser.add_argument("--frete", default=Decimal("0"), type=decimal_nao_negativo)
    parser.add_argument("--publicidade", default=Decimal("0"), type=decimal_nao_negativo)
    parser.add_argument("--impostos-percentual", default=Decimal("0"), type=percentual)
    return parser


def main() -> None:
    args = criar_parser().parse_args()
    venda = Venda(**vars(args))
    resultado = venda.calcular()

    linhas = (
        ("Preço de venda", venda.preco_venda),
        ("Taxa percentual", resultado["taxa"]),
        ("Tarifa fixa", venda.tarifa_fixa),
        ("Frete", venda.frete),
        ("Publicidade", venda.publicidade),
        ("Impostos", resultado["impostos"]),
        ("Custo do produto", venda.custo_produto),
        ("Lucro estimado", resultado["lucro"]),
    )
    for rotulo, valor in linhas:
        print(f"{rotulo}: {formatar_reais(valor)}")
    print(f"Margem estimada: {resultado['margem']:.2f}%".replace(".", ","))


if __name__ == "__main__":
    main()
