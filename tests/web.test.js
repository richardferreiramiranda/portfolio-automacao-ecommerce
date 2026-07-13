const assert = require("node:assert/strict");
const test = require("node:test");
const { calcularSimulacao, parseNumero } = require("../assets/app.js");

test("aceita vírgula como separador decimal", () => {
  assert.equal(parseNumero("12,50"), 12.5);
});

test("calcula lucro e margem do cenário de exemplo", () => {
  const resultado = calcularSimulacao({
    precoVenda: 150,
    custoProduto: 70,
    taxaPercentual: 16,
    tarifaFixa: 6,
    frete: 12,
    publicidade: 5,
    impostosPercentual: 4,
  });

  assert.equal(resultado.taxasEImpostos, 36);
  assert.equal(resultado.custosOperacionais, 87);
  assert.equal(resultado.lucro, 27);
  assert.equal(resultado.margem, 18);
});

test("identifica uma venda com margem negativa", () => {
  const resultado = calcularSimulacao({ precoVenda: 100, custoProduto: 110 });
  assert.equal(resultado.lucro, -10);
  assert.equal(resultado.margem, -10);
});

test("rejeita percentuais acima de cem", () => {
  assert.throws(
    () => calcularSimulacao({ precoVenda: 100, custoProduto: 30, taxaPercentual: 101 }),
    /percentuais devem estar entre 0 e 100/
  );
});

