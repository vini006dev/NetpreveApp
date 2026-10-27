import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/constants/theme";

type Props = {
  rotulo: string; // nome do grupo, lido pelo leitor de tela
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
            {/* o estado "selecionado" também aparece por ícone e negrito, não só por cor */}
            {ativo && <Ionicons accessibilityElementsHidden importantForAccessibility="no" name="checkmark" size={14} color={cores.ciano} />}
            <Text style={[styles.texto, ativo && { color: cores.texto, fontWeight: "700" }]}>{opcao}</Text>
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
    minHeight: 48,
    paddingHorizontal: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.bordaControle,
    backgroundColor: cores.vidro,
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  ativa: { borderWidth: 2, borderColor: cores.ciano, backgroundColor: cores.cianoSuave },
  texto: { color: cores.textoSuave, fontSize: 14, fontWeight: "500", textAlign: "center", flexShrink: 1 },
});
