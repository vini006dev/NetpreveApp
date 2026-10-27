import { ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/constants/theme";

type LinhaInfoProps = {
  icone: keyof typeof Ionicons.glyphMap;
  titulo?: string;
  texto: string;
  direita?: ReactNode;
};

export function LinhaInfo({ icone, titulo, texto, direita }: LinhaInfoProps) {
  return (
    <View accessible style={styles.linha}>
      <View style={styles.icone}>
        <Ionicons
          accessibilityElementsHidden
          importantForAccessibility="no"
          name={icone}
          size={17}
          color={cores.ciano}
        />
      </View>

      <View style={{ flex: 1 }}>
        {titulo && <Text style={styles.titulo}>{titulo}</Text>}
        <Text style={styles.texto}>{texto}</Text>
      </View>

      {direita}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: "row", alignItems: "center", gap: 14 },
  icone: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(0,212,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(0,212,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: { color: cores.texto, fontSize: 14, fontWeight: "700", marginBottom: 2 },
  texto: { color: cores.textoSuave, fontSize: 13, lineHeight: 18 },
});
