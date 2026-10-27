import { requisicao } from "./cliente";
import type {
  Atividade,
  ModelsResponse,
  PrevisaoProxima,
  TimelineResponse,
  VerificacaoAtividade,
} from "./tipos";

export const listarModelos = () => requisicao<ModelsResponse>("/models");

export const previsaoProxima = (lat: number, lon: number, modelId: string) =>
  requisicao<PrevisaoProxima>(
    `/forecasts/nearby?lat=${lat}&lon=${lon}&model_id=${encodeURIComponent(modelId)}`
  );

export const timelineDaProbe = (probeId: number, modelId: string, limit = 24) =>
  requisicao<TimelineResponse>(
    `/forecasts/probes/${probeId}/timeline?model_id=${encodeURIComponent(modelId)}&limit=${limit}`
  );

export const verificarAtividade = (corpo: {
  modelId: string;
  latitude: number;
  longitude: number;
  dateTime: string;
  activity: Atividade;
}) =>
  requisicao<VerificacaoAtividade>("/activity/check", {
    method: "POST",
    body: JSON.stringify(corpo),
  });
