import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "./GlassCard";
import { cores } from "@/constants/theme";

type Props = {
  titulo: string;
  subtitulo: string;
  texto: string;
  icone?: keyof typeof Ionicons.glyphMap;
  cor?: string;
};

export function DiagnosticoHero({
  titulo,
  subtitulo,
  texto,
  icone = "shield-checkmark-outline",
  cor = cores.ciano,
}: Props) {
  return (
    <GlassCard variante="hero">
      <View style={styles.topo}>
        <View
          style={[
            styles.anel,
            {
              borderColor: cor + "50",
              backgroundColor: cor + "12",
              shadowColor: cor,
            },
          ]}
        >
          <Ionicons
            accessibilityElementsHidden
            importantForAccessibility="no"
            name={icone}
            size={30}
            color={cor}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={[styles.subtitulo, { color: cor }]}>{subtitulo}</Text>
        </View>
      </View>
      <Text style={styles.texto}>{texto}</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  topo: { flexDirection: "row", alignItems: "center", gap: 18, marginBottom: 16 },
  anel: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  titulo: { color: cores.texto, fontSize: 22, fontWeight: "700" },
  subtitulo: { fontSize: 13, marginTop: 4 },
  texto: { color: cores.textoSuave, fontSize: 14, lineHeight: 22 },
});
