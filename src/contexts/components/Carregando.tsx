import { useEffect, useState } from "react";
import { ActivityIndicator, Text, StyleSheet } from "react-native";
import { GlassCard } from "./GlassCard";
import { cores } from "@/constants/theme";

/** Mostra um aviso extra se a API demorar (servidor gratuito "dormindo"). */
export function Carregando({ texto = "Buscando previsão…" }: { texto?: string }) {
  const [demorando, setDemorando] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDemorando(true), 6000);
    return () => clearTimeout(t);
  }, []);

  return (
    <GlassCard style={styles.card}>
      <ActivityIndicator color={cores.ciano} size="large" />
      <Text style={styles.texto} accessibilityLiveRegion="polite">{texto}</Text>
      {demorando && (
        <Text style={styles.aviso} accessibilityLiveRegion="polite">
          O servidor estava em repouso e está acordando. Isso pode levar até 1 minuto na primeira vez.
        </Text>
      )}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: "center", gap: 14, paddingVertical: 36 },
  texto: { color: cores.texto, fontSize: 16, fontWeight: "600" },
  aviso: { color: cores.textoSuave, fontSize: 13, lineHeight: 19, textAlign: "center" },
});
