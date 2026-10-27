import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/constants/theme";

type Props = { rotulo: string; selecionado: boolean; onPress: () => void };

/** Linha de escolha única (rádio), como no protótipo P03. */
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
        <Text style={[styles.rotulo, selecionado && { fontWeight: "700" }]}>{rotulo}</Text>
        {selecionado && <Text style={styles.estado}>Selecionado</Text>}
      </View>
      <Ionicons
        name={selecionado ? "checkmark-circle" : "ellipse-outline"}
        size={26}
        color={selecionado ? cores.ciano : cores.textoSuave}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  linha: {
    minHeight: 56,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.bordaControle,
    backgroundColor: cores.vidro,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  selecionada: { borderWidth: 2, borderColor: cores.ciano, backgroundColor: cores.cianoSuave },
  rotulo: { color: cores.texto, fontSize: 16 },
  estado: { color: cores.ciano, fontSize: 13, marginTop: 2 },
});
