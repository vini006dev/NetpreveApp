import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "@/constants/theme";

const ETAPAS = ["Latência", "Download", "Upload"];

type Props = {
  etapa: 0 | 1 | 2; // etapa atual
  progresso: number; // 0 a 1
};

export function ProgressoTeste({ etapa, progresso }: Props) {
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.linha}>
        <Text style={styles.suave}>Etapa {etapa + 1} de {ETAPAS.length}</Text>
        <Text style={styles.pct}>{Math.round(progresso * 100)}%</Text>
      </View>

      <View style={styles.trilho}>
        <View style={[styles.barra, { width: `${progresso * 100}%` }]} />
      </View>

      <View style={styles.linha}>
        {ETAPAS.map((nome, i) => {
          const feita = i < etapa;
          const atual = i === etapa;
          return (
            <View key={nome} style={styles.etapa}>
              {feita && <Ionicons name="checkmark" size={13} color={cores.ciano} />}
              {atual && <Ionicons name="arrow-down" size={13} color={cores.texto} />}
              {!feita && !atual && <Ionicons name="arrow-up" size={13} color={cores.textoMudo} />}
              <Text
                style={{
                  fontSize: 13,
                  color: feita ? cores.ciano : atual ? cores.texto : cores.textoMudo,
                }}
              >
                {nome}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  suave: { color: cores.textoSuave, fontSize: 13 },
  pct: { color: cores.ciano, fontSize: 14, fontWeight: "700" },
  trilho: { height: 5, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.1)", overflow: "hidden" },
  barra: { height: 5, borderRadius: 3, backgroundColor: cores.ciano },
  etapa: { flexDirection: "row", alignItems: "center", gap: 4 },
});
