import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const itens: {
  rota: string;
  label: string;
  icone: keyof typeof Ionicons.glyphMap;
}[] = [
  { rota: "index", label: "Home", icone: "globe-sharp" },
  { rota: "teste", label: "Test", icone: "bug-outline" },
  { rota: "velocidade", label: "Speed", icone: "speedometer-outline" },
  { rota: "configuracoes", label: "Settings", icone: "settings-outline" },
];

type NavbarProps = {
  state: { index: number };
  navigation: { navigate: (rota: string) => void };
};

export function Navbar({ state, navigation }: NavbarProps) {
  return (
    <View style={styles.Navbar}>
      {itens.map((item, i) => {
        const ativo = state.index === i;
        return (
          <TouchableOpacity
            key={item.rota}
            style={{ alignItems: "center" }}
            onPress={() => navigation.navigate(item.rota)}
          >
            <Ionicons
              name={item.icone}
              size={20}
              color={ativo ? "#ff6600" : "#6e6e6e"}
            />
            <Text style={styles.textoNavbar}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
    Navbar: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff00",
        padding: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#d1e6ff14",
    },

    textoNavbar: {
        color: "#9e8989",
        fontSize: 15,
        fontWeight: 600,
    },
})
;