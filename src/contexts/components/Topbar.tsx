import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/constants/theme";

type TopbarProps = {
  eyebrow: string;
  titulo: string;
  icone?: keyof typeof Ionicons.glyphMap;
  rotuloIcone?: string; // nome acessível do botão (obrigatório se houver ícone)
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
          <Ionicons accessibilityElementsHidden importantForAccessibility="no" name={icone} size={22} color={cores.texto} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", gap: 12 },
  eyebrow: { color: cores.ciano, fontSize: 12, fontWeight: "600", letterSpacing: 0.5 },
  titulo: { color: cores.texto, fontSize: 28, fontWeight: "700", marginTop: 4 },
  botao: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: cores.bordaControle,
    backgroundColor: cores.vidro,
    alignItems: "center",
    justifyContent: "center",
  },
});
