import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { cores } from "@/constants/theme";

type Icone = keyof typeof Ionicons.glyphMap;

const itens: { rota: string; label: string; icone: Icone; iconeAtivo: Icone }[] = [
  { rota: "index", label: "Início", icone: "home-outline", iconeAtivo: "home" },
  { rota: "horarios", label: "Horários", icone: "stats-chart-outline", iconeAtivo: "stats-chart" },
  { rota: "planejar", label: "Planejar", icone: "calendar-outline", iconeAtivo: "calendar" },
  { rota: "diagnostico", label: "Diagnóstico", icone: "shield-checkmark-outline", iconeAtivo: "shield-checkmark" },
];

type NavbarProps = {
  state: { index: number; routes: { name: string }[] };
  navigation: { navigate: (rota: string) => void };
};

export function Navbar({ state, navigation }: NavbarProps) {
  const insets = useSafeAreaInsets();
  const rotaAtual = state.routes[state.index].name;

  return (
    <View accessibilityRole="tablist" style={[styles.navbar, { paddingBottom: insets.bottom + 8 }]}>
      {itens.map((item, i) => {
        const ativo = rotaAtual === item.rota;
        const cor = ativo ? cores.ciano : "#9fb0c2"; // >= 4,5:1 sobre o fundo

        return (
          <TouchableOpacity
            key={item.rota}
            style={styles.item}
            onPress={() => navigation.navigate(item.rota)}
            accessibilityRole="tab"
            accessibilityLabel={`${item.label}, aba ${i + 1} de ${itens.length}`}
            accessibilityState={{ selected: ativo }}
          >
            <Ionicons accessibilityElementsHidden importantForAccessibility="no" name={ativo ? item.iconeAtivo : item.icone} size={22} color={cor} />
            <Text style={[styles.label, { color: cor, fontWeight: ativo ? "700" : "500" }]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    paddingTop: 8,
    backgroundColor: cores.fundoNavbar,
    borderTopWidth: 1,
    borderColor: cores.borda,
  },
  item: { flex: 1, minHeight: 48, alignItems: "center", justifyContent: "center", gap: 4, paddingVertical: 4 },
  label: { fontSize: 12, textAlign: "center" },
});
