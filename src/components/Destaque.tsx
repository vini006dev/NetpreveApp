import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "./GlassCard";
import { cores } from "@/constants/theme";

type Props = {
  icone?: keyof typeof Ionicons.glyphMap;
  titulo: string;
  texto: string;
};

export function Destaque({ icone = "sparkles-outline", titulo, texto }: Props) {
  return (
    <GlassCard variante="ciano">
      <View style={styles.cabecalho}>
        <View style={styles.iconeWrap}>
          <Ionicons
            accessibilityElementsHidden
            importantForAccessibility="no"
            name={icone}
            size={16}
            color={cores.ciano}
          />
        </View>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>
      <Text style={styles.texto}>{texto}</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  cabecalho: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  iconeWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(0,212,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: { color: cores.texto, fontSize: 15, fontWeight: "700", flex: 1 },
  texto: { color: cores.textoSuave, fontSize: 13, lineHeight: 20 },
});
