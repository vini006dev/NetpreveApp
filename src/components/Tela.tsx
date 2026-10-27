import { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { cores } from "@/constants/theme";

type TelaProps = { children: ReactNode };

/** Fundo glassmorphism: gradiente escuro + orbs de luz ambiente + área rolável com espaço para a Navbar. */
export function Tela({ children }: TelaProps) {
  return (
    <LinearGradient colors={cores.gradiente} style={styles.flex}>
      {/* Orb azul — topo esquerdo */}
      <View style={[styles.orb, styles.orbAzul]} pointerEvents="none" />
      {/* Orb roxo — fundo direito */}
      <View style={[styles.orb, styles.orbRoxo]} pointerEvents="none" />
      {/* Orb ciano sutil — centro */}
      <View style={[styles.orb, styles.orbCiano]} pointerEvents="none" />

      <SafeAreaView style={styles.flex} edges={["top"]}>
        <ScrollView
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  orb: {
    position: "absolute",
    borderRadius: 9999,
  },
  orbAzul: {
    width: 500,
    height: 500,
    top: -180,
    left: -120,
    backgroundColor: "rgba(0,100,255,0.12)",
    // Simula blur com opacidade gradual — RN não tem filter nativo
    shadowColor: "rgba(0,100,255,1)",
    shadowOpacity: 0.25,
    shadowRadius: 120,
    shadowOffset: { width: 0, height: 0 },
  },
  orbRoxo: {
    width: 400,
    height: 400,
    bottom: 80,
    right: -160,
    backgroundColor: "rgba(120,0,255,0.08)",
    shadowColor: "rgba(120,0,255,1)",
    shadowOpacity: 0.2,
    shadowRadius: 100,
    shadowOffset: { width: 0, height: 0 },
  },
  orbCiano: {
    width: 260,
    height: 260,
    top: "35%",
    left: "25%",
    backgroundColor: "rgba(0,212,255,0.04)",
    shadowColor: cores.ciano,
    shadowOpacity: 0.1,
    shadowRadius: 80,
    shadowOffset: { width: 0, height: 0 },
  },
  conteudo: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 130,
    gap: 16,
  },
});
