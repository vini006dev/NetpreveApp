import { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { cores, raios } from "@/constants/theme";

type Variante = "padrao" | "ciano" | "hero" | "perigo";

type GlassCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  variante?: Variante;
};

export function GlassCard({ children, style, variante = "padrao" }: GlassCardProps) {
  return (
    <View style={[styles.card, estilosVariante[variante], style]}>
      {/* Reflexo de luz no topo */}
      <View style={styles.reflexo} pointerEvents="none" />
      {children}
    </View>
  );
}

const estilosVariante: Record<Variante, object> = {
  padrao: {
    backgroundColor: cores.vidro,
    borderColor: cores.borda,
  },
  ciano: {
    backgroundColor: cores.cianoSuave,
    borderColor: cores.cianoBorda,
    shadowColor: cores.ciano,
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  hero: {
    backgroundColor: "rgba(0,212,255,0.05)",
    borderColor: "rgba(0,212,255,0.2)",
    shadowColor: cores.ciano,
    shadowOpacity: 0.15,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  perigo: {
    backgroundColor: "rgba(239,68,68,0.05)",
    borderColor: "rgba(239,68,68,0.2)",
    shadowColor: cores.vermelho,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    elevation: 3,
  },
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: raios.card,
    padding: 20,
    overflow: "hidden",
    position: "relative",
  },
  reflexo: {
    position: "absolute",
    top: 0,
    left: "15%",
    right: "15%",
    height: 1,
    backgroundColor: "rgba(255,255,255,0.22)",
    borderRadius: 1,
  },
});
