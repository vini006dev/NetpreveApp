import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "./GlassCard";
import { Badge } from "./Badge";
import { cores } from "@/constants/theme";

type Props = {
  nome: string;
  detalhe: string;
  icone?: keyof typeof Ionicons.glyphMap;
  online?: boolean;
};

export function StatusWifi({ nome, detalhe, icone = "wifi", online = false }: Props) {
  return (
    <GlassCard style={styles.card}>
      <View style={styles.icone}>
        <Ionicons
          accessibilityElementsHidden
          importantForAccessibility="no"
          name={icone}
          size={22}
          color={cores.ciano}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.detalhe}>{detalhe}</Text>
      </View>
      {online && <Badge texto="Online" variante="online" />}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16 },
  icone: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "rgba(0,212,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(0,212,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: cores.ciano,
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  nome: { color: cores.texto, fontSize: 16, fontWeight: "700" },
  detalhe: { color: cores.textoSuave, fontSize: 13, marginTop: 2 },
});
