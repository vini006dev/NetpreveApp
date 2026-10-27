import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Tela } from "@/components/Tela";
import { Topbar } from "@/components/Topbar";
import { GlassCard } from "@/components/GlassCard";
import { Gauge } from "@/components/Gauge";
import { Sparkline } from "@/components/Sparkline";
import { ProgressoTeste } from "@/components/ProgressoTeste";
import { MetricasRapidas } from "@/components/MetricasRapidas";
import { Botao } from "@/components/Botao";
import { cores } from "@/constants/theme";

export default function Medindo() {
  const router = useRouter();
  const [segundos, setSegundos] = useState(0);
  const [progresso, setProgresso] = useState(0);
  const [amostras, setAmostras] = useState<number[]>([280, 290, 285]);

  // TODO: substituir esta simulação pelo teste real / API
  useEffect(() => {
    const id = setInterval(() => {
      setSegundos((s) => s + 1);
      setProgresso((p) => Math.min(p + 0.034, 1));
      setAmostras((a) => [...a.slice(-39), 298 + Math.sin(a.length) * 14 + Math.random() * 6]);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (progresso >= 1) router.replace("/resultado");
  }, [progresso]);

  const etapa = progresso < 0.3 ? 0 : progresso < 0.8 ? 1 : 2;
  const valor = amostras[amostras.length - 1];
  const tempo = `00:${String(segundos).padStart(2, "0")}`;

  return (
    <Tela>
      <Topbar eyebrow="PULSO · TESTE EM ANDAMENTO" titulo="Medindo sua internet" icone="close-outline" onPressIcone={() => router.replace("/")} />

      <View style={styles.info}>
        <Ionicons name="wifi" size={14} color={cores.ciano} />
        <Text style={styles.infoTexto}>Casa_5G · Servidor São Paulo</Text>
        <Text style={styles.tempo}>{tempo}</Text>
      </View>

      <GlassCard>
        <View style={styles.cabecalho}>
          <Text style={styles.medindo}>Medindo download</Text>
          <Text style={styles.aoVivo}>● AO VIVO</Text>
        </View>

        <Gauge valor={valor} rotulo="VELOCIDADE INSTANTÂNEA" tamanho={250} />
        <Sparkline dados={amostras} altura={40} />

        <View style={{ marginTop: 16 }}>
          <ProgressoTeste etapa={etapa} progresso={progresso} />
        </View>
      </GlassCard>

      <MetricasRapidas ping={12} jitter={3} perda={0} />

      <View style={styles.aviso}>
        <Ionicons name="information-circle-outline" size={18} color={cores.textoSuave} />
        <Text style={styles.avisoTexto}>Mantenha o app aberto e evite downloads para uma medição mais precisa.</Text>
      </View>

      <Botao titulo="Cancelar teste" icone="close-outline" variante="secundario" onPress={() => router.replace("/")} />
    </Tela>
  );
}

const styles = StyleSheet.create({
  info: { flexDirection: "row", alignItems: "center", gap: 8 },
  infoTexto: { color: cores.textoSuave, fontSize: 13, flex: 1 },
  tempo: { color: cores.textoSuave, fontSize: 13 },
  cabecalho: { flexDirection: "row", justifyContent: "space-between" },
  medindo: { color: cores.texto, fontSize: 13, fontWeight: "600" },
  aoVivo: { color: cores.ciano, fontSize: 11, fontWeight: "600" },
  aviso: { flexDirection: "row", gap: 10, alignItems: "flex-start" },
  avisoTexto: { color: cores.textoSuave, fontSize: 13, lineHeight: 18, flex: 1 },
});
