import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/constants/theme";

type Props = {
  rotulo: string; // texto visível, ex.: "19:00"
  rotuloAcessivel?: string; // ex.: "às 19 horas"
  selecionado: boolean;
  onPress: () => void;
};

export function ChipSelecionavel({ rotulo, rotuloAcessivel, selecionado, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityLabel={rotuloAcessivel ?? rotulo}
      accessibilityState={{ checked: selecionado }}
      style={[styles.chip, selecionado && styles.selecionado]}
    >
      {selecionado && <Ionicons accessibilityElementsHidden importantForAccessibility="no" name="checkmark" size={14} color={cores.ciano} />}
      <Text style={[styles.texto, selecionado && { color: cores.texto, fontWeight: "700" }]}>{rotulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    minWidth: 76,
    minHeight: 48,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: cores.bordaControle,
    backgroundColor: cores.vidro,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  selecionado: { borderWidth: 2, borderColor: cores.ciano, backgroundColor: cores.cianoSuave },
  texto: { color: cores.textoSuave, fontSize: 15 },
});
