import { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { cores } from "@/constants/theme";

type TelaProps = { children: ReactNode };

/** Fundo em gradiente + área rolável com espaço para a Navbar. */
export function Tela({ children }: TelaProps) {
  return (
    <LinearGradient colors={cores.gradiente} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
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
  conteudo: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 130,
    gap: 16,
  },
});
