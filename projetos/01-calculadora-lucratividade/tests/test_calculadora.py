import importlib.util
import sys
import unittest
from decimal import Decimal
from pathlib import Path


MODULO = Path(__file__).resolve().parents[1] / "calculadora.py"
SPEC = importlib.util.spec_from_file_location("calculadora", MODULO)
calculadora = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = calculadora
assert SPEC.loader is not None
SPEC.loader.exec_module(calculadora)


class TestVenda(unittest.TestCase):
    def test_calcula_lucro_e_margem(self):
        venda = calculadora.Venda(
            preco_venda=Decimal("150"),
            custo_produto=Decimal("70"),
            taxa_percentual=Decimal("16"),
            tarifa_fixa=Decimal("6"),
            frete=Decimal("12"),
            publicidade=Decimal("5"),
            impostos_percentual=Decimal("4"),
        )

        resultado = venda.calcular()

        self.assertEqual(resultado["taxa"], Decimal("24.00"))
        self.assertEqual(resultado["impostos"], Decimal("6.00"))
        self.assertEqual(resultado["lucro"], Decimal("27.00"))
        self.assertEqual(resultado["margem"], Decimal("18.00"))

    def test_preco_zero_nao_divide_por_zero(self):
        venda = calculadora.Venda(
            preco_venda=Decimal("0"),
            custo_produto=Decimal("10"),
        )

        resultado = venda.calcular()

        self.assertEqual(resultado["lucro"], Decimal("-10.00"))
        self.assertEqual(resultado["margem"], Decimal("0.00"))


if __name__ == "__main__":
    unittest.main()
