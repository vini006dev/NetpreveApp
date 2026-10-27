import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "./GlassCard";
import { Badge } from "./Badge";
import { cores, raios } from "@/constants/theme";

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
        <Ionicons accessibilityElementsHidden importantForAccessibility="no" name={icone} size={24} color={cores.ciano} />
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
    width: 52,
    height: 52,
    borderRadius: raios.botao,
    backgroundColor: cores.vidroForte,
    alignItems: "center",
    justifyContent: "center",
  },
  nome: { color: cores.texto, fontSize: 17, fontWeight: "700" },
  detalhe: { color: cores.textoSuave, fontSize: 13, marginTop: 2 },
});
