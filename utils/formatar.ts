/** 312.8 -> "312,8" */
export const num = (valor: number, casas = 1) =>
  valor.toFixed(casas).replace(".", ",");
