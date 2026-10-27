import { View, Text, StyleSheet } from "react-native";
import { cores } from "@/constants/theme";

type Variante = "excelente" | "boa" | "instavel" | "online";

type BadgeProps = {
  texto: string;
  variante?: Variante;
};

const estilos: Record<Variante, { cor: string; fundo: string; dotGlow?: string }> = {
  excelente: { cor: cores.ciano,    fundo: "rgba(0,212,255,0.12)",   dotGlow: cores.ciano },
  boa:       { cor: cores.ambar,    fundo: "rgba(245,158,11,0.12)" },
  instavel:  { cor: cores.vermelho, fundo: "rgba(239,68,68,0.12)" },
  online:    { cor: cores.ciano,    fundo: "rgba(0,212,255,0.1)",    dotGlow: cores.ciano },
};

export function Badge({ texto, variante = "excelente" }: BadgeProps) {
  const e = estilos[variante];
  return (
    <View style={[styles.badge, { backgroundColor: e.fundo, borderColor: e.cor + "30" }]}>
      <View
        style={[
          styles.dot,
          { backgroundColor: e.cor },
          e.dotGlow && {
            shadowColor: e.dotGlow,
            shadowOpacity: 1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 0 },
          },
        ]}
      />
      <Text style={[styles.texto, { color: e.cor }]}>{texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  texto: { fontSize: 12, fontWeight: "600" },
});
