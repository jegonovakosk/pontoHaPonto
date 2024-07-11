export function formatarDataParaBrasileiro(dataString) {
  // Cria um objeto Date a partir da string de data
  const data = new Date(dataString);

  // Extrai os componentes de data (dia, mês, ano)
  const dia = data.getUTCDate();
  const mes = data.getUTCMonth() + 1; // Adiciona +1 porque os meses no JavaScript são baseados em zero (0 = Janeiro)
  const ano = data.getUTCFullYear();

  // Formata a data no padrão brasileiro
  return `${dia.toString().padStart(2, "0")}/${mes
    .toString()
    .padStart(2, "0")}/${ano}`;
}
