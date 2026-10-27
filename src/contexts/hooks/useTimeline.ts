import { useEffect, useState } from "react";
import { ApiError } from "@/api/cliente";
import { timelineDaProbe } from "@/api/previsoes";
import type { ItemTimeline } from "@/api/tipos";

export function useTimeline(probeId: number | undefined, modelId: string) {
  const [itens, setItens] = useState<ItemTimeline[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<ApiError | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!probeId) return;
    let cancelado = false;
    setCarregando(true);
    setErro(null);

    timelineDaProbe(probeId, modelId)
      .then((r) => !cancelado && setItens(r.items))
      .catch((e) => !cancelado && setErro(e as ApiError))
      .finally(() => !cancelado && setCarregando(false));

    return () => {
      cancelado = true;
    };
  }, [probeId, modelId, tick]);

  return { itens, carregando, erro, recarregar: () => setTick((t) => t + 1) };
}
