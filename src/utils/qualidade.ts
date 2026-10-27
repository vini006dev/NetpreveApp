import { cores } from "@/constants/theme";
import type { Atividade, ItemTimeline, Qualidade } from "@/api/tipos";

export const rotuloQualidade: Record<Qualidade, string> = {
  GOOD: "Boa",
  MODERATE: "Moderada",
  UNSTABLE: "Instável",
};

export const varianteBadge: Record<Qualidade, "excelente" | "boa" | "instavel"> = {
  GOOD: "excelente",
  MODERATE: "boa",
  UNSTABLE: "instavel",
};

export const corQualidade: Record<Qualidade, string> = {
  GOOD: cores.ciano,
  MODERATE: cores.ambar,
  UNSTABLE: cores.vermelho,
};

export const rotuloAtividade: Record<Atividade, string> = {
  VIDEO_CALL: "Videochamadas",
  AUDIO_CALL: "Chamadas de áudio",
  STREAMING: "Streaming",
  FILE_UPLOAD: "Envio de arquivos",
  WEB_BROWSING: "Navegação",
  MESSAGING: "Mensagens",
};

// Textos explicativos (redação do app, usando as faixas de qualidade do protótipo)
export const descreverLatencia = (ms: number) =>
  ms < 60
    ? `Latência de ${Math.round(ms)} ms: respostas rápidas em jogos e chamadas.`
    : ms < 120
    ? `Latência de ${Math.round(ms)} ms: respostas medianas, jogos podem sentir atraso.`
    : `Latência de ${Math.round(ms)} ms: alta, o que atrasa chamadas e jogos.`;

export const descreverPerda = (pct: number) => {
  const p = pct.toFixed(1).replace(".", ",");
  return pct < 1
    ? `Perda de ${p}%: fluxo consistente, quase sem pacotes perdidos.`
    : pct < 5
    ? `Perda de ${p}%: alguma perda, chamadas de vídeo podem falhar.`
    : `Perda de ${p}%: alta, a conexão tende a ficar instável.`;
};

export type Janela = { quality: Qualidade; inicio: string; fim: string; scoreMin: number; scoreMax: number };

/** Agrupa horas consecutivas com a mesma qualidade. */
export function agruparJanelas(itens: ItemTimeline[]): Janela[] {
  const janelas: Janela[] = [];
  for (const it of itens) {
    const ultima = janelas[janelas.length - 1];
    if (ultima && ultima.quality === it.quality) {
      ultima.fim = it.predictionFor;
      ultima.scoreMin = Math.min(ultima.scoreMin, it.qualityScore);
      ultima.scoreMax = Math.max(ultima.scoreMax, it.qualityScore);
    } else {
      janelas.push({
        quality: it.quality,
        inicio: it.predictionFor,
        fim: it.predictionFor,
        scoreMin: it.qualityScore,
        scoreMax: it.qualityScore,
      });
    }
  }
  return janelas;
}
