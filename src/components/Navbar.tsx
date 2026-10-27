import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import { cores } from "@/constants/theme";

type Icone = keyof typeof Ionicons.glyphMap;

const itens: { rota: string; label: string; icone: Icone; iconeAtivo: Icone }[] = [
  { rota: "index",       label: "Início",      icone: "home-outline",             iconeAtivo: "home" },
  { rota: "horarios",    label: "Horários",    icone: "stats-chart-outline",      iconeAtivo: "stats-chart" },
  { rota: "planejar",    label: "Planejar",    icone: "calendar-outline",         iconeAtivo: "calendar" },
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
    <BlurView
      intensity={80}
      tint="dark"
      style={[styles.navbar, { paddingBottom: insets.bottom + 8 }]}
    >
      <View style={styles.bordaTopo} />
      {itens.map((item, i) => {
        const ativo = rotaAtual === item.rota;
        const cor = ativo ? cores.ciano : "#7a8fa0";

        return (
          <TouchableOpacity
            key={item.rota}
            style={styles.item}
            onPress={() => navigation.navigate(item.rota)}
            accessibilityRole="tab"
            accessibilityLabel={`${item.label}, aba ${i + 1} de ${itens.length}`}
            accessibilityState={{ selected: ativo }}
          >
            <Ionicons
              accessibilityElementsHidden
              importantForAccessibility="no"
              name={ativo ? item.iconeAtivo : item.icone}
              size={22}
              color={cor}
            />
            <Text style={[styles.label, { color: cor, fontWeight: ativo ? "700" : "500" }]}>
              {item.label}
            </Text>
            {ativo && <View style={styles.dot} />}
          </TouchableOpacity>
        );
      })}
    </BlurView>
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
    backgroundColor: "rgba(5,14,26,0.7)",
    overflow: "hidden",
  },
  bordaTopo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  item: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    paddingVertical: 4,
  },
  label: { fontSize: 11, textAlign: "center" },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: cores.ciano,
    shadowColor: cores.ciano,
    shadowOpacity: 1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 0 },
    marginTop: -2,
  },
});
