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
      activeOpacity={0.82}
      onPress={onPress}
      disabled={desabilitado}
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityState={{ disabled: !!desabilitado }}
      style={[
        styles.base,
        primario ? styles.primario : styles.secundario,
        desabilitado && styles.desabilitado,
      ]}
    >
      {icone && (
        <Ionicons
          accessibilityElementsHidden
          importantForAccessibility="no"
          name={icone}
          size={20}
          color={cor}
        />
      )}
      <Text style={[styles.texto, { color: cor }]}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: raios.botao,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  primario: {
    backgroundColor: cores.ciano,
    shadowColor: cores.ciano,
    shadowOpacity: 0.45,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  secundario: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  desabilitado: { opacity: 0.45 },
  texto: { fontSize: 16, fontWeight: "700", textAlign: "center", flexShrink: 1 },
});
