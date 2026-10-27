import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/constants/theme";

type Props = {
  rotulo: string;
  rotuloAcessivel?: string;
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
      {selecionado && (
        <Ionicons
          accessibilityElementsHidden
          importantForAccessibility="no"
          name="checkmark"
          size={13}
          color={cores.ciano}
        />
      )}
      <Text style={[styles.texto, selecionado && styles.textoSelecionado]}>{rotulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    minWidth: 76,
    minHeight: 44,
    paddingHorizontal: 12,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.06)",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  selecionado: {
    borderWidth: 2,
    borderColor: cores.ciano,
    backgroundColor: "rgba(0,212,255,0.08)",
    shadowColor: cores.ciano,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  texto: { color: cores.textoSuave, fontSize: 14 },
  textoSelecionado: { color: cores.texto, fontWeight: "700" },
});
