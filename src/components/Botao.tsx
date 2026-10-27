import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores, raios } from "@/constants/theme";

type BotaoProps = {
  titulo: string;
  onPress?: () => void;
  icone?: keyof typeof Ionicons.glyphMap;
  variante?: "primario" | "secundario";
  desabilitado?: boolean;
};

export function Botao({ titulo, onPress, icone, variante = "primario", desabilitado }: BotaoProps) {
  const primario = variante === "primario";
  const cor = primario ? cores.textoSobreCiano : cores.texto;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={desabilitado}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityState={{ disabled: !!desabilitado }}
      style={[styles.base, primario ? styles.primario : styles.secundario, desabilitado && { opacity: 0.5 }]}
    >
      {icone && <Ionicons accessibilityElementsHidden importantForAccessibility="no" name={icone} size={20} color={cor} />}
      <Text style={[styles.texto, { color: cor }]}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 56, // cresce junto com a fonte (RNF05)
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: raios.botao,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  primario: {
    backgroundColor: cores.ciano,
    shadowColor: cores.ciano,
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  secundario: { backgroundColor: cores.vidro, borderWidth: 1.5, borderColor: cores.bordaControle },
  texto: { fontSize: 16, fontWeight: "700", textAlign: "center", flexShrink: 1 },
});
