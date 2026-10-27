import { Text, StyleSheet } from "react-native";
import { Tela } from "@/components/Tela";
import { Topbar } from "@/components/Topbar";
import { DiagnosticoHero } from "@/components/DiagnosticoHero";
import { ListaCard } from "@/components/ListaCard";
import { LinhaInfo } from "@/components/LinhaInfo";
import { Badge } from "@/components/Badge";
import { SecaoTitulo } from "@/components/SecaoTitulo";
import { Botao } from "@/components/Botao";
import { Nota } from "@/components/Nota";
import { Carregando } from "@/components/Carregando";
import { ErroCard } from "@/components/ErroCard";
import { usePrevisao } from "@/contexts/PrevisaoContext";
import { ATIVIDADES_EXIBIDAS, useAtividades } from "@/hooks/useAtividades";
import { cores } from "@/constants/theme";
import { formatarDataHora } from "@/utils/formatar";
import { corQualidade, descreverLatencia, descreverPerda, rotuloAtividade } from "@/utils/qualidade";
import type { Atividade, Qualidade } from "@/api/tipos";

const hero: Record<Qualidade, { titulo: string; subtitulo: string; icone: "shield-checkmark-outline" | "alert-circle-outline" | "warning-outline" }> = {
  GOOD: { titulo: "Conexão boa", subtitulo: "Estável e responsiva.", icone: "shield-checkmark-outline" },
  MODERATE: { titulo: "Conexão moderada", subtitulo: "Atenção com vídeo e streaming.", icone: "alert-circle-outline" },
  UNSTABLE: { titulo: "Conexão instável", subtitulo: "Prepare-se para ficar sem rede.", icone: "warning-outline" },
};

const iconeAtividade: Record<string, "videocam-outline" | "tv-outline" | "cloud-upload-outline" | "chatbubble-outline" | "ellipse-outline"> = {
  VIDEO_CALL: "videocam-outline",
  STREAMING: "tv-outline",
  FILE_UPLOAD: "cloud-upload-outline",
  MESSAGING: "chatbubble-outline",
};

export default function Diagnostico() {
  const { previsao, carregando, erro, recarregar } = usePrevisao();
  const { resultados, carregando: carregandoAtividades, falhou } = useAtividades(previsao);

  return (
    <Tela>
      <Topbar eyebrow="PULSO · ENTENDA SUA INTERNET" titulo="Diagnóstico" />

      {carregando && !previsao && <Carregando />}
      {erro && !previsao && <ErroCard erro={erro} onTentar={recarregar} />}

      {previsao && (
        <>
          <Text style={styles.base}>
            Previsão para {formatarDataHora(previsao.prediction.predictionFor)} · Probe {previsao.matchedProbe.probeId}
          </Text>

          <DiagnosticoHero
            titulo={hero[previsao.assessment.quality].titulo}
            subtitulo={hero[previsao.assessment.quality].subtitulo}
            icone={hero[previsao.assessment.quality].icone}
            cor={corQualidade[previsao.assessment.quality]}
            texto={previsao.recommendation.message}
          />

          <ListaCard titulo="O que os números dizem">
            <LinhaInfo icone="flash-outline" texto={descreverLatencia(previsao.prediction.predictedAvgRttMs)} />
            <LinhaInfo icone="pulse-outline" texto={descreverPerda(previsao.prediction.predictedPacketLossPct)} />
          </ListaCard>

          <SecaoTitulo titulo="Dá para fazer agora?" direita={`${ATIVIDADES_EXIBIDAS.length} ATIVIDADES`} direitaDestaque />

          {carregandoAtividades && <Carregando texto="Verificando atividades…" />}
          {falhou && !carregandoAtividades && <Text style={styles.base}>Não foi possível verificar as atividades.</Text>}

          {!carregandoAtividades && !falhou && (
            <ListaCard>
              {ATIVIDADES_EXIBIDAS.filter((a) => resultados[a] !== undefined).map((a: Atividade) => (
                <LinhaInfo
                  key={a}
                  icone={iconeAtividade[a] ?? "ellipse-outline"}
                  titulo={rotuloAtividade[a]}
                  texto={resultados[a] ? "Deve funcionar bem" : "Pode apresentar problemas"}
                  direita={<Badge texto={resultados[a] ? "Pode" : "Evite"} variante={resultados[a] ? "excelente" : "instavel"} />}
                />
              ))}
            </ListaCard>
          )}

          <Botao titulo="Atualizar previsão" icone="refresh-outline" onPress={recarregar} />
          <Nota>{previsao.metadata.disclaimer}</Nota>
        </>
      )}
    </Tela>
  );
}

const styles = StyleSheet.create({
  base: { color: cores.textoSuave, fontSize: 13 },
});
