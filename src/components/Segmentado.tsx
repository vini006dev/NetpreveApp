import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/constants/theme";

type Props = {
  rotulo: string;
  opcoes: string[];
  selecionado: number;
  onChange: (indice: number) => void;
};

export function Segmentado({ rotulo, opcoes, selecionado, onChange }: Props) {
  return (
    <View accessibilityRole="radiogroup" accessibilityLabel={rotulo} style={styles.linha}>
      {opcoes.map((opcao, i) => {
        const ativo = i === selecionado;
        return (
          <TouchableOpacity
            key={opcao}
            onPress={() => onChange(i)}
            accessibilityRole="radio"
            accessibilityLabel={opcao}
            accessibilityState={{ checked: ativo }}
            style={[styles.pilula, ativo && styles.ativa]}
          >
            {ativo && (
              <Ionicons
                accessibilityElementsHidden
                importantForAccessibility="no"
                name="checkmark"
                size={13}
                color={cores.ciano}
              />
            )}
            <Text style={[styles.texto, ativo && styles.textoAtivo]}>{opcao}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: "row", gap: 8 },
  pilula: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.06)",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  ativa: {
    borderWidth: 2,
    borderColor: cores.ciano,
    backgroundColor: "rgba(0,212,255,0.08)",
    shadowColor: cores.ciano,
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
  },
  texto: { color: cores.textoSuave, fontSize: 14, fontWeight: "500", textAlign: "center", flexShrink: 1 },
  textoAtivo: { color: cores.texto, fontWeight: "700" },
});
