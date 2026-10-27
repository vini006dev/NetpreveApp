/** 312.8 -> "312,8" */
export const num = (valor: number, casas = 1) =>
  valor.toFixed(casas).replace(".", ",");

const MESES = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."];
const dois = (n: number) => String(n).padStart(2, "0");

/** ISO UTC -> "23:00" (horário do aparelho) */
export const formatarHora = (iso: string) => {
  const d = new Date(iso);
  return `${dois(d.getHours())}:${dois(d.getMinutes())}`;
};

/** ISO UTC -> "20 ago. · 23:00" */
export const formatarDataHora = (iso: string) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MESES[d.getMonth()]} · ${formatarHora(iso)}`;
};

/** ISO UTC -> "20 ago." */
export const formatarData = (iso: string) => {
  const d = new Date(iso);
  return `${d.getDate()} ${MESES[d.getMonth()]}`;
};
