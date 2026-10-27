import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/constants/theme";

type Props = { rotulo: string; selecionado: boolean; onPress: () => void };

export function OpcaoSelecionavel({ rotulo, selecionado, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityLabel={rotulo}
      accessibilityState={{ checked: selecionado }}
      style={[styles.linha, selecionado && styles.selecionada]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.rotulo, selecionado && styles.rotuloAtivo]}>{rotulo}</Text>
        {selecionado && <Text style={styles.estado}>Selecionado</Text>}
      </View>
      <Ionicons
        name={selecionado ? "checkmark-circle" : "ellipse-outline"}
        size={26}
        color={selecionado ? cores.ciano : "rgba(255,255,255,0.3)"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linha: {
    minHeight: 52,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.06)",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selecionada: {
    borderWidth: 2,
    borderColor: cores.ciano,
    backgroundColor: "rgba(0,212,255,0.08)",
    shadowColor: cores.ciano,
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  rotulo: { color: cores.texto, fontSize: 16 },
  rotuloAtivo: { fontWeight: "700" },
  estado: { color: cores.ciano, fontSize: 12, marginTop: 2 },
});
