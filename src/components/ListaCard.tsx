import { Children, ReactNode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GlassCard } from "./GlassCard";
import { cores } from "@/constants/theme";

type Props = { titulo?: string; children: ReactNode };

/** Card com título opcional e divisores entre os itens. */
export function ListaCard({ titulo, children }: Props) {
  const itens = Children.toArray(children);

  return (
    <GlassCard style={{ paddingVertical: 8 }}>
      {titulo && <Text style={styles.titulo}>{titulo}</Text>}
      {itens.map((item, i) => (
        <View key={i} style={[styles.item, i > 0 && styles.divisor]}>
          {item}
        </View>
      ))}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  titulo: { color: cores.texto, fontSize: 16, fontWeight: "700", paddingTop: 12, paddingBottom: 4 },
  item: { paddingVertical: 14 },
  divisor: { borderTopWidth: 1, borderColor: cores.borda },
});
