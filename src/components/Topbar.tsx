import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

type TopbarProps = {
  titulo: string;
  subtitulo: string;
  icone?: keyof typeof Feather.glyphMap;
};

export function Topbar({ titulo, subtitulo, icone = "tool" }: TopbarProps) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.subtitulo}>{subtitulo}</Text>
      </View>

      <View style={styles.icone}>
        <Feather name={icone} size={22} color="#ffffff35" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // ícone sempre na ponta direita
    marginLeft: 3,
  },

  icone: {
    width: 52,
    height: 52,
    borderWidth: 1,
    borderColor: "#d1e6ff14",
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    // sem marginLeft
  },

  titulo: {
    fontSize: 12,
    fontWeight: "700",
    color: "#ff6600",
  },

  subtitulo: {
    fontSize: 20,
    color: "rgb(255, 255, 255)",
    marginTop: 2,
  },
});
