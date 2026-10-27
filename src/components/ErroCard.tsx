import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "./GlassCard";
import { Botao } from "./Botao";
import { ApiError } from "@/api/cliente";
import { cores } from "@/constants/theme";

type Props = { erro: ApiError; onTentar: () => void };

function mensagem(erro: ApiError) {
  if (erro.codigo === "TIMEOUT") return "O servidor demorou demais para responder. Tente de novo.";
  if (erro.codigo === "NETWORK") return "Sem conexão com o servidor. Verifique sua internet.";
  if (erro.status === 404) return "Não encontramos previsão para este modelo ou local.";
  return erro.message;
}

export function ErroCard({ erro, onTentar }: Props) {
  return (
    <GlassCard variante="perigo" style={{ gap: 14 }}>
      <View style={styles.topo}>
        <View style={styles.iconeWrap}>
          <Ionicons
            accessibilityElementsHidden
            importantForAccessibility="no"
            name="cloud-offline-outline"
            size={20}
            color={cores.vermelho}
          />
        </View>
        <Text style={styles.titulo}>Não foi possível carregar</Text>
      </View>
      <Text
        style={styles.texto}
        accessibilityRole="alert"
        accessibilityLiveRegion="assertive"
      >
        {mensagem(erro)}
      </Text>
      <Botao titulo="Tentar de novo" icone="refresh-outline" variante="secundario" onPress={onTentar} />
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  topo: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconeWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(239,68,68,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: { color: cores.texto, fontSize: 15, fontWeight: "700" },
  texto: { color: cores.textoSuave, fontSize: 14, lineHeight: 20 },
});
