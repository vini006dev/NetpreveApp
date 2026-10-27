import { Text, StyleSheet } from "react-native";
import { cores } from "@/constants/theme";

/** Texto pequeno e centralizado, usado nos rodapés das telas. */
export function Nota({ children }: { children: string }) {
  return <Text style={styles.nota}>{children}</Text>;
}

const styles = StyleSheet.create({
  nota: {
    color: cores.textoMudo,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 17,
  },
});
