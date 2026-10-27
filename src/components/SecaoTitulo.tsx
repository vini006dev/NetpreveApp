import { View, Text, StyleSheet } from "react-native";
import { cores } from "@/constants/theme";

type Props = {
  titulo: string;
  direita?: string;
  direitaDestaque?: boolean;
};

export function SecaoTitulo({ titulo, direita, direitaDestaque }: Props) {
  return (
    <View style={styles.linha}>
      <Text style={styles.titulo}>{titulo}</Text>
      {direita && (
        <Text style={[styles.direita, direitaDestaque && { color: cores.ciano }]}>
          {direita}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginTop: 4,
  },
  titulo: { color: cores.texto, fontSize: 17, fontWeight: "700" },
  direita: { color: cores.textoSuave, fontSize: 12, fontWeight: "500" },
});
