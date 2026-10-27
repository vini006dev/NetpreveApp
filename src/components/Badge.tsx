import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/constants/theme";

type Variante = "excelente" | "boa" | "instavel" | "online";

type BadgeProps = {
  texto: string;
  variante?: Variante;
};

const estilos: Record<
  Variante,
  { cor: string; fundo: string; icone: keyof typeof Ionicons.glyphMap }
> = {
  excelente: { cor: cores.ciano, fundo: cores.cianoSuave, icone: "checkmark" },
  boa: { cor: cores.ambar, fundo: cores.ambarSuave, icone: "checkmark" },
  instavel: { cor: cores.vermelho, fundo: cores.vermelhoSuave, icone: "alert" },
  online: { cor: cores.ciano, fundo: cores.cianoSuave, icone: "radio-button-on" },
};

export function Badge({ texto, variante = "excelente" }: BadgeProps) {
  const e = estilos[variante];
  return (
    <View style={[styles.badge, { backgroundColor: e.fundo }]}>
      <Ionicons accessibilityElementsHidden importantForAccessibility="no" name={e.icone} size={12} color={e.cor} />
      <Text style={[styles.texto, { color: e.cor }]}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  texto: { fontSize: 12, fontWeight: "600" },
});
