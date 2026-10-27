import { useEffect, useState } from "react";
import { verificarAtividade } from "@/api/previsoes";
import type { Atividade, PrevisaoProxima } from "@/api/tipos";

export const ATIVIDADES_EXIBIDAS: Atividade[] = ["VIDEO_CALL", "STREAMING", "FILE_UPLOAD", "MESSAGING"];

/** Consulta /activity/check para cada atividade, no horário da previsão. */
export function useAtividades(previsao: PrevisaoProxima | null) {
  const [resultados, setResultados] = useState<Partial<Record<Atividade, boolean>>>({});
  const [carregando, setCarregando] = useState(false);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    if (!previsao) return;
    let cancelado = false;
    setCarregando(true);
    setFalhou(false);

    Promise.all(
      ATIVIDADES_EXIBIDAS.map((a) =>
        verificarAtividade({
          modelId: previsao.model.id,
          latitude: previsao.requestedLocation.latitude,
          longitude: previsao.requestedLocation.longitude,
          dateTime: previsao.prediction.predictionFor,
          activity: a,
        }).then((r) => [a, r.suitable] as const)
      )
    )
      .then((pares) => !cancelado && setResultados(Object.fromEntries(pares)))
      .catch(() => !cancelado && setFalhou(true))
      .finally(() => !cancelado && setCarregando(false));

    return () => {
      cancelado = true;
    };
  }, [previsao]);

  return { resultados, carregando, falhou };
}
