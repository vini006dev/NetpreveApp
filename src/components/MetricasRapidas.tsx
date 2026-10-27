import { View, Text, StyleSheet } from "react-native";
import { GlassCard } from "./GlassCard";
import { Metrica } from "./Metrica";
import { cores } from "@/constants/theme";
import { num } from "@/utils/formatar";

type Props = {
  ping: number;
  jitter: number;
  perda: number;
  nota?: string;
};

export function MetricasRapidas({ ping, jitter, perda, nota }: Props) {
  return (
    <GlassCard>
      <View style={styles.linha}>
        <Metrica rotulo="Ping"   valor={num(ping, 0)}   unidade="ms" />
        <Metrica rotulo="Jitter" valor={num(jitter, 0)} unidade="ms" />
        <Metrica rotulo="Perda"  valor={num(perda, 0)}  unidade="%" />
      </View>
      {nota && (
        <>
          <View style={styles.divisor} />
          <Text style={styles.nota}>{nota}</Text>
        </>
      )}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  linha:   { flexDirection: "row" },
  divisor: { height: 1, backgroundColor: "rgba(255,255,255,0.07)", marginVertical: 14 },
  nota:    { color: cores.textoSuave, fontSize: 13, lineHeight: 18 },
});
