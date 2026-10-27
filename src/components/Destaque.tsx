import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "./GlassCard";
import { cores } from "@/constants/theme";

type Props = {
  icone?: keyof typeof Ionicons.glyphMap;
  titulo: string;
  texto: string;
};

/** Mensagem curta em destaque (ex.: "Pode dar o play. Está tudo fluindo."). */
export function Destaque({ icone = "sparkles-outline", titulo, texto }: Props) {
  return (
    <GlassCard>
      <View style={styles.titulo}>
        <Ionicons accessibilityElementsHidden importantForAccessibility="no" name={icone} size={18} color={cores.ciano} />
        <Text style={styles.textoTitulo}>{titulo}</Text>
      </View>
      <Text style={styles.texto}>{texto}</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  titulo: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  textoTitulo: { color: cores.texto, fontSize: 15, fontWeight: "700", flex: 1 },
  texto: { color: cores.textoSuave, fontSize: 13, lineHeight: 19 },
});
