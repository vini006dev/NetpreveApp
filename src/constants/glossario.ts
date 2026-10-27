// Glossário do projeto: use SEMPRE estes termos nas telas.
export const glossario = {
  latencia: {
    termo: "Tempo de resposta (latência)",
    explicacao:
      "É o tempo que os dados levam para ir e voltar pela rede. Valores mais altos podem deixar chamadas e páginas mais lentas.",
  },
  perda: {
    termo: "Dados perdidos (perda de pacotes)",
    explicacao:
      "É a proporção estimada de dados que podem não chegar ao destino. Valores mais altos podem causar cortes ou falhas.",
  },
  probe: {
    termo: "Ponto de medição (probe)",
    explicacao:
      "É um aparelho da rede RIPE Atlas usado como referência geográfica. A previsão é dele e não do seu celular.",
  },
  modelo: {
    termo: "Modelo de previsão",
    explicacao:
      "É o método usado para calcular a previsão. Modelos diferentes podem dar resultados diferentes para o mesmo horário.",
  },
} as const;

export const significadoQualidade = {
  GOOD: "Boa: a conexão deve funcionar bem para quase tudo.",
  MODERATE: "Moderada: pode haver oscilações. Chamadas de vídeo e streaming podem sofrer.",
  UNSTABLE: "Instável: há risco de falhas. Deixe o que for importante preparado antes.",
} as const;
