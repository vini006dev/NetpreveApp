import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ApiError } from "@/api/cliente";
import { listarModelos, previsaoProxima } from "@/api/previsoes";
import type { ModelListItem, PrevisaoProxima } from "@/api/tipos";
import { Local, obterLocal } from "@/utils/localizacao";

const MODELOS_PADRAO: ModelListItem[] = ["a", "b", "c", "d"].map((l) => ({
  id: `model-${l}`,
  name: `Modelo ${l.toUpperCase()}`,
  description: "",
  groupName: "",
  algorithm: "",
  version: "",
}));

type Valor = {
  modelos: ModelListItem[];
  modelId: string;
  setModelId: (id: string) => void;
  local: Local | null;
  previsao: PrevisaoProxima | null;
  carregando: boolean;
  erro: ApiError | null;
  recarregar: () => void;
};

const Contexto = createContext<Valor | null>(null);

export function PrevisaoProvider({ children }: { children: ReactNode }) {
  const [modelos, setModelos] = useState<ModelListItem[]>(MODELOS_PADRAO);
  const [modelId, setModelId] = useState("model-a");
  const [local, setLocal] = useState<Local | null>(null);
  const [previsao, setPrevisao] = useState<PrevisaoProxima | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<ApiError | null>(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    obterLocal().then(setLocal);
    listarModelos().then((r) => setModelos(r.items)).catch(() => {});
  }, []);

  useEffect(() => {
    if (!local) return;
    let cancelado = false;
    setCarregando(true);
    setErro(null);

    previsaoProxima(local.latitude, local.longitude, modelId)
      .then((d) => !cancelado && setPrevisao(d))
      .catch((e) => !cancelado && setErro(e as ApiError))
      .finally(() => !cancelado && setCarregando(false));

    return () => {
      cancelado = true;
    };
  }, [local, modelId, tick]);

  return (
    <Contexto.Provider
      value={{ modelos, modelId, setModelId, local, previsao, carregando, erro, recarregar: () => setTick((t) => t + 1) }}
    >
      {children}
    </Contexto.Provider>
  );
}

export function usePrevisao() {
  const v = useContext(Contexto);
  if (!v) throw new Error("usePrevisao precisa estar dentro de <PrevisaoProvider>");
  return v;
}
