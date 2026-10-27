import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "./GlassCard";
import { cores } from "@/constants/theme";

type Props = {
  titulo: string; // "Conexão excelente"
  subtitulo: string; // "Rápida, estável e responsiva."
  texto: string;
  icone?: keyof typeof Ionicons.glyphMap;
  cor?: string;
};

export function DiagnosticoHero({ titulo, subtitulo, texto, icone = "shield-checkmark-outline", cor = cores.ciano }: Props) {
  return (
    <GlassCard>
      <View style={styles.topo}>
        <View style={[styles.anel, { borderColor: cor, backgroundColor: cor + "24" }]}>
          <Ionicons accessibilityElementsHidden importantForAccessibility="no" name={icone} size={30} color={cor} />
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
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 1,
    borderColor: cores.cianoBorda,
    backgroundColor: cores.cianoSuave,
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: { color: cores.texto, fontSize: 24, fontWeight: "700" },
  subtitulo: { color: cores.ciano, fontSize: 13, marginTop: 4 },
  texto: { color: cores.textoSuave, fontSize: 15, lineHeight: 22 },
});
