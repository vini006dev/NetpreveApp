import { View, Text, StyleSheet } from "react-native";
import { cores } from "@/constants/theme";

type MetricaProps = { rotulo: string; valor: string; unidade: string };

export function Metrica({ rotulo, valor, unidade }: MetricaProps) {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.rotulo}>{rotulo}</Text>
      <Text style={styles.valor}>
        {valor} <Text style={styles.unidade}>{unidade}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rotulo: { color: cores.textoSuave, fontSize: 13, marginBottom: 4 },
  valor:  { color: cores.texto, fontSize: 26, fontWeight: "700" },
  unidade: { color: cores.textoSuave, fontSize: 11, fontWeight: "400" },
});
