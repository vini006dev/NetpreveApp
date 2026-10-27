import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Tela } from "@/components/Tela";
import { Topbar } from "@/components/Topbar";
import { Badge } from "@/components/Badge";
import { ResumoVelocidade } from "@/components/ResumoVelocidade";
import { MetricasRapidas } from "@/components/MetricasRapidas";
import { ListaCard } from "@/components/ListaCard";
import { LinhaInfo } from "@/components/LinhaInfo";
import { Botao } from "@/components/Botao";
import { Nota } from "@/components/Nota";
import { cores } from "@/constants/theme";

export default function Resultado() {
  const router = useRouter();

  // TODO: dados virão da API
  return (
    <Tela>
      <Topbar eyebrow="PULSO · MEDIÇÃO CONCLUÍDA" titulo="Resultado do teste" icone="share-social-outline" />

      <View style={styles.linha}>
        <Text style={styles.data}>09 out. 2026 · 09:41 · Casa_5G</Text>
        <Badge texto="Excelente" />
      </View>

      <ResumoVelocidade
        download={312.8}
        upload={104.6}
        variacao={16.5}
        historico={[180, 220, 210, 250, 240, 280, 270, 312]}
      />

      <MetricasRapidas ping={12} jitter={3} perda={0} nota="Perda de pacotes: 0%. Baixa latência e pouca variação." />

      <ListaCard titulo="Sua internet na prática">
        <LinhaInfo icone="tv-outline" titulo="Streaming" texto="4K sem interrupções" direita={<Badge texto="Excelente" />} />
        <LinhaInfo icone="game-controller-outline" titulo="Jogos online" texto="Resposta rápida · ping de 12 ms" direita={<Badge texto="Excelente" />} />
        <LinhaInfo icone="videocam-outline" titulo="Videochamadas" texto="Áudio e vídeo estáveis" direita={<Badge texto="Excelente" />} />
      </ListaCard>

      <Nota>Vivo Fibra · Wi-Fi 5 GHz · Servidor São Paulo</Nota>

      <Botao titulo="Ver diagnóstico" icone="shield-checkmark-outline" onPress={() => router.push("/diagnostico")} />
    </Tela>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  data: { color: cores.textoSuave, fontSize: 13 },
});
