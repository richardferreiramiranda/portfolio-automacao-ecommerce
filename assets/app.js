(function () {
  "use strict";

  const CAMPOS = [
    "precoVenda",
    "custoProduto",
    "taxaPercentual",
    "tarifaFixa",
    "frete",
    "publicidade",
    "impostosPercentual",
  ];

  function parseNumero(valor) {
    if (typeof valor === "number") return Number.isFinite(valor) ? valor : 0;
    const numero = Number(String(valor ?? "").trim().replace(",", "."));
    return Number.isFinite(numero) ? numero : 0;
  }

  function arredondar(valor) {
    return Math.round((valor + Number.EPSILON) * 100) / 100;
  }

  function calcularSimulacao(dados) {
    const valores = Object.fromEntries(CAMPOS.map((campo) => [campo, parseNumero(dados[campo])]));
    const percentuais = [valores.taxaPercentual, valores.impostosPercentual];
    const monetarios = [valores.precoVenda, valores.custoProduto, valores.tarifaFixa, valores.frete, valores.publicidade];

    if (valores.precoVenda <= 0) throw new Error("Informe um preço de venda maior que zero.");
    if (monetarios.some((valor) => valor < 0)) throw new Error("Os valores em reais não podem ser negativos.");
    if (percentuais.some((valor) => valor < 0 || valor > 100)) throw new Error("Os percentuais devem estar entre 0 e 100.");

    const taxaMarketplace = arredondar(valores.precoVenda * valores.taxaPercentual / 100);
    const impostos = arredondar(valores.precoVenda * valores.impostosPercentual / 100);
    const taxasEImpostos = arredondar(taxaMarketplace + impostos + valores.tarifaFixa);
    const custosOperacionais = arredondar(valores.custoProduto + valores.frete + valores.publicidade);
    const custoTotal = arredondar(taxasEImpostos + custosOperacionais);
    const lucro = arredondar(valores.precoVenda - custoTotal);
    const margem = arredondar(lucro / valores.precoVenda * 100);

    return { ...valores, taxaMarketplace, impostos, taxasEImpostos, custosOperacionais, custoTotal, lucro, margem };
  }

  function formatarMoeda(valor) {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
  }

  function formatarPercentual(valor) {
    return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(valor) + "%";
  }

  function iniciarInterface() {
    const form = document.querySelector("#calculator-form");
    if (!form) return;

    const erro = document.querySelector("#form-error");
    const vazio = document.querySelector("#empty-result");
    const conteudo = document.querySelector("#result-content");
    const status = document.querySelector("#result-status");
    const card = document.querySelector(".profit-card");
    const medidor = document.querySelector("#margin-meter");
    const feedback = document.querySelector("#share-feedback");
    let ultimaSimulacao = null;

    function dadosDoFormulario() {
      return Object.fromEntries(new FormData(form).entries());
    }

    function atualizarUrl(dados) {
      const url = new URL(window.location.href);
      url.search = "";
      CAMPOS.forEach((campo) => {
        const valor = parseNumero(dados[campo]);
        if (valor !== 0) url.searchParams.set(campo, String(valor));
      });
      window.history.replaceState({}, "", url);
      return url.toString();
    }

    function mostrarResultado(resultado) {
      ultimaSimulacao = resultado;
      vazio.hidden = true;
      conteudo.hidden = false;
      erro.hidden = true;
      const positivo = resultado.lucro >= 0;

      document.querySelector("#lucro-resultado").textContent = formatarMoeda(resultado.lucro);
      document.querySelector("#margem-resultado").textContent = formatarPercentual(resultado.margem);
      document.querySelector("#venda-resultado").textContent = formatarMoeda(resultado.precoVenda);
      document.querySelector("#taxas-resultado").textContent = "− " + formatarMoeda(resultado.taxasEImpostos);
      document.querySelector("#custos-resultado").textContent = "− " + formatarMoeda(resultado.custosOperacionais);
      document.querySelector("#total-resultado").textContent = formatarMoeda(resultado.custoTotal);
      document.querySelector("#mensagem-resultado").textContent = positivo
        ? "Resultado após todos os custos informados"
        : "Seus custos ultrapassam o preço de venda";

      status.textContent = positivo ? "Venda lucrativa" : "Margem negativa";
      status.className = "status " + (positivo ? "positive" : "negative");
      card.classList.toggle("loss", !positivo);
      medidor.classList.toggle("negative", !positivo);
      medidor.style.width = Math.min(Math.abs(resultado.margem), 100) + "%";
      atualizarUrl(resultado);
    }

    function calcular(evento) {
      if (evento) evento.preventDefault();
      feedback.textContent = "";
      try {
        mostrarResultado(calcularSimulacao(dadosDoFormulario()));
      } catch (falha) {
        erro.textContent = falha.message;
        erro.hidden = false;
      }
    }

    form.addEventListener("submit", calcular);
    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        ultimaSimulacao = null;
        vazio.hidden = false;
        conteudo.hidden = true;
        erro.hidden = true;
        status.textContent = "Aguardando dados";
        status.className = "status neutral";
        window.history.replaceState({}, "", window.location.pathname);
      }, 0);
    });

    document.querySelector("#share-button").addEventListener("click", async () => {
      if (!ultimaSimulacao) return;
      const link = atualizarUrl(ultimaSimulacao);
      try {
        await navigator.clipboard.writeText(link);
        feedback.textContent = "Link copiado. Agora é só compartilhar!";
      } catch (_) {
        feedback.textContent = "Copie o endereço exibido na barra do navegador.";
      }
    });

    const parametros = new URLSearchParams(window.location.search);
    let possuiParametros = false;
    CAMPOS.forEach((campo) => {
      if (!parametros.has(campo)) return;
      const input = form.elements.namedItem(campo);
      if (input) input.value = parametros.get(campo);
      possuiParametros = true;
    });
    if (possuiParametros) calcular();
  }

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", iniciarInterface);
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { calcularSimulacao, parseNumero, arredondar };
  }
})();

