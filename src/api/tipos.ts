// Tipos baseados no OpenAPI da Internet Quality API (v0.2.0)

export type Qualidade = "GOOD" | "MODERATE" | "UNSTABLE";
export type CodigoRecomendacao = "NORMAL_USE" | "REDUCE_NETWORK_USAGE" | "PREPARE_OFFLINE";
export type Atividade =
  | "VIDEO_CALL"
  | "AUDIO_CALL"
  | "STREAMING"
  | "FILE_UPLOAD"
  | "WEB_BROWSING"
  | "MESSAGING";

export interface ModelListItem {
  id: string;
  name: string;
  description: string;
  groupName: string;
  algorithm: string;
  version: string;
}

export interface ModelsResponse {
  items: ModelListItem[];
  total: number;
}

export interface ModelRef {
  id: string;
  name: string;
  version: string;
}

export interface Recomendacao {
  code: CodigoRecomendacao;
  message: string;
}

export interface Avaliacao {
  quality: Qualidade;
  qualityScore: number; // 0 a 100
}

export interface PrevisaoResumo {
  predictionFor: string; // ISO UTC
  predictedAvgRttMs: number;
  predictedPacketLossPct: number;
}

export interface PrevisaoProxima {
  model: ModelRef;
  requestedLocation: { latitude: number; longitude: number };
  matchedProbe: { probeId: number; distanceKm: number };
  prediction: PrevisaoResumo;
  assessment: Avaliacao;
  recommendation: Recomendacao;
  metadata: { disclaimer: string; locationPrivacy: string };
}

export interface ItemTimeline {
  predictionFor: string;
  predictedAvgRttMs: number;
  predictedPacketLossPct: number;
  quality: Qualidade;
  qualityScore: number;
}

export interface TimelineResponse {
  model: ModelRef;
  probeId: number;
  items: ItemTimeline[];
}

export interface VerificacaoAtividade {
  model: ModelRef;
  activity: Atividade;
  suitable: boolean;
  forecast: { quality: Qualidade; predictedAvgRttMs: number; predictedPacketLossPct: number };
  recommendation: Recomendacao;
  metadata: { disclaimer: string; locationPrivacy: string };
}
