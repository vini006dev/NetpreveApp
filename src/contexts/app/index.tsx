import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Tela } from "@/components/Tela";
import { Topbar } from "@/components/Topbar";
import { Segmentado } from "@/components/Segmentado";
import { StatusWifi } from "@/components/StatusWifi";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/Badge";
import { Gauge } from "@/components/Gauge";
import { Botao } from "@/components/Botao";
import { Nota } from "@/components/Nota";
import { Destaque } from "@/components/Destaque";
import { Carregando } from "@/components/Carregando";
import { ErroCard } from "@/components/ErroCard";
import { usePrevisao } from "@/contexts/PrevisaoContext";
import { cores } from "@/constants/theme";
import { glossario } from "@/constants/glossario";
import { num, formatarDataHora } from "@/utils/formatar";
import { corQualidade, rotuloQualidade, varianteBadge } from "@/utils/qualidade";
import type { CodigoRecomendacao } from "@/api/tipos";

const destaque: Record<CodigoRecomendacao, { icone: "checkmark-circle-outline" | "alert-circle-outline" | "cloud-offline-outline"; titulo: string }> = {
  NORMAL_USE: { icone: "checkmark-circle-outline", titulo: "Pode usar normalmente." },
  REDUCE_NETWORK_USAGE: { icone: "alert-circle-outline", titulo: "Vale economizar a rede." },
  PREPARE_OFFLINE: { icone: "cloud-offline-outline", titulo: "Prepare-se para ficar offline." },
};

export default function Index() {
  const router = useRouter();
  const { modelos, modelId, setModelId, local, previsao, carregando, erro, recarregar } = usePrevisao();
  const indiceModelo = Math.max(0, modelos.findIndex((m) => m.id === modelId));

  return (
    <Tela>
      <Topbar
        eyebrow="PULSO · QUALIDADE DA INTERNET"
        titulo="Sua conexão, em foco."
        icone="refresh-outline"
        rotuloIcone="Atualizar previsão"
        onPressIcone={recarregar}
      />

      <Text style={styles.legenda}>{glossario.modelo.termo}</Text>
      <Segmentado
        rotulo={glossario.modelo.termo}
        opcoes={modelos.map((m) => m.name)}
        selecionado={indiceModelo}
        onChange={(i) => setModelId(modelos[i].id)}
      />

      {carregando && !previsao && <Carregando />}
      {erro && !previsao && <ErroCard erro={erro} onTentar={recarregar} />}

      {previsao && (() => {
        const q = previsao.assessment.quality;
        const score = previsao.assessment.qualityScore;
        return (
          <>
            <GlassCard>
              <View style={styles.topo}>
                <Text style={styles.previsaoPara}>Previsão para {formatarDataHora(previsao.prediction.predictionFor)}</Text>
                <Badge texto={rotuloQualidade[q]} variante={varianteBadge[q]} />
              </View>

              <Gauge
                valor={score}
                max={100}
                casas={0}
                rotulo="QUALIDADE PREVISTA"
                unidade="de 100"
                cor={corQualidade[q]}
                descricao={`Qualidade prevista: ${rotuloQualidade[q]}, ${score} de 100.`}
              />

              {/* Resultado também em texto: não depende de cor nem do gráfico */}
              <Text style={styles.resumo}>
                A qualidade prevista é <Text style={{ fontWeight: "700" }}>{rotuloQualidade[q]}</Text> ({score} de 100).
              </Text>

              <View style={styles.rodape}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rotulo}>{glossario.latencia.termo}</Text>
                  <Text style={styles.valor}>{num(previsao.prediction.predictedAvgRttMs, 0)} <Text style={styles.unidade}>ms</Text></Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rotulo}>{glossario.perda.termo}</Text>
                  <Text style={styles.valor}>{num(previsao.prediction.predictedPacketLossPct)} <Text style={styles.unidade}>%</Text></Text>
                </View>
              </View>
            </GlassCard>

            <Destaque
              icone={destaque[previsao.recommendation.code].icone}
              titulo={destaque[previsao.recommendation.code].titulo}
              texto={previsao.recommendation.message}
            />

            <Botao titulo="Planejar uma atividade" icone="calendar-outline" onPress={() => router.push("/planejar")} />
            <Botao titulo="Entenda esta previsão" icone="help-circle-outline" variante="secundario" onPress={() => router.push("/sobre")} />
            <Botao titulo="Ver próximas previsões" icone="stats-chart-outline" variante="secundario" onPress={() => router.push("/horarios")} />

            <StatusWifi
              icone="location-outline"
              nome="Referência de medição"
              detalhe={`${glossario.probe.termo} a cerca de ${num(previsao.matchedProbe.distanceKm)} km · ${local?.aproximada ? "local aproximado" : "pelo GPS"}`}
            />

            <Nota>{previsao.metadata.disclaimer}</Nota>
          </>
        );
      })()}
    </Tela>
  );
}

const styles = StyleSheet.create({
  legenda: { color: cores.textoSuave, fontSize: 14, marginBottom: -6 },
  topo: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 8 },
  previsaoPara: { color: cores.textoSuave, fontSize: 13, flex: 1 },
  resumo: { color: cores.texto, fontSize: 16, textAlign: "center", marginVertical: 8 },
  rodape: { flexDirection: "row", gap: 16, marginTop: 8 },
  rotulo: { color: cores.textoSuave, fontSize: 14 },
  valor: { color: cores.texto, fontSize: 24, fontWeight: "700", marginTop: 4 },
  unidade: { color: cores.textoSuave, fontSize: 14, fontWeight: "400" },
});
