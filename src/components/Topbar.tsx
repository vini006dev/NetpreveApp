import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/constants/theme";

type TopbarProps = {
  eyebrow: string;
  titulo: string;
  icone?: keyof typeof Ionicons.glyphMap;
  rotuloIcone?: string;
  onPressIcone?: () => void;
};

export function Topbar({ eyebrow, titulo, icone, rotuloIcone, onPressIcone }: TopbarProps) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.titulo} accessibilityRole="header">
          {titulo}
        </Text>
      </View>

      {icone && (
        <TouchableOpacity
          style={styles.botao}
          onPress={onPressIcone}
          accessibilityRole="button"
          accessibilityLabel={rotuloIcone}
        >
          <Ionicons
            accessibilityElementsHidden
            importantForAccessibility="no"
            name={icone}
            size={22}
            color={cores.texto}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 12 },
  eyebrow: {
    color: cores.ciano,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  titulo: {
    color: cores.texto,
    fontSize: 26,
    fontWeight: "700",
    marginTop: 4,
    lineHeight: 32,
  },
  botao: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
});
