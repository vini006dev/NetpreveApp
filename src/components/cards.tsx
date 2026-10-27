import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { cores, raios } from "@/constants/theme";

type CardProps = {
  titulo: string;
  subtitulo: string;
  icone?: keyof typeof Feather.glyphMap;
};

export function Card({ titulo, subtitulo, icone = "tool" }: CardProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.82}>
      <View style={styles.icone}>
        <Feather name={icone} size={22} color={cores.ciano} />
      </View>
      <View>
        <Text style={styles.titulo}>{titulo}</Text>
        <Text style={styles.subtitulo}>{subtitulo}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: cores.vidro,
    borderWidth: 1,
    borderColor: cores.borda,
    borderRadius: raios.card,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  icone: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(0,212,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(0,212,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },
  titulo: {
    fontSize: 15,
    fontWeight: "700",
    color: cores.texto,
  },
  subtitulo: {
    fontSize: 13,
    color: cores.textoSuave,
    marginTop: 2,
  },
});
