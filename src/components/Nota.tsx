import { Text, StyleSheet } from "react-native";
import { cores } from "@/constants/theme";

export function Nota({ children }: { children: string }) {
  return <Text style={styles.nota}>{children}</Text>;
}

const styles = StyleSheet.create({
  nota: {
    color: cores.textoMudo,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 17,
  },
});
