import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlassCard } from "./GlassCard";
import { Sparkline } from "./Sparkline";
import { cores } from "@/constants/theme";
import { num } from "@/utils/formatar";

type Props = {
  download: number;
  upload: number;
  historico: number[];
  variacao?: number;
};

export function ResumoVelocidade({ download, upload, historico, variacao }: Props) {
  return (
    <GlassCard variante="ciano">
      <View style={styles.rotulo}>
        <Ionicons name="arrow-down" size={14} color={cores.textoSuave} />
        <Text style={styles.rotuloTexto}>Download</Text>
      </View>

      <View style={styles.hero}>
        <Text style={styles.valorGrande}>{num(download)}</Text>
        <Text style={styles.unidade}>Mbps</Text>
        <View style={{ flex: 1, marginLeft: 8, marginBottom: 10 }}>
          <Sparkline dados={historico} altura={30} />
        </View>
      </View>

      <View style={styles.divisor} />

      <View style={styles.rodape}>
        <View>
          <View style={styles.rotulo}>
            <Ionicons name="arrow-up" size={14} color={cores.textoSuave} />
            <Text style={styles.rotuloTexto}>Upload</Text>
          </View>
          <Text style={styles.valorUpload}>
            {num(upload)} <Text style={styles.unidadePequena}>Mbps</Text>
          </Text>
        </View>

        {variacao !== undefined && (
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.rotulo}>
              <Ionicons
                name={variacao >= 0 ? "trending-up" : "trending-down"}
                size={14}
                color={cores.ciano}
              />
              <Text style={styles.variacao}>
                {num(Math.abs(variacao))}% {variacao >= 0 ? "mais rápido" : "mais lento"}
              </Text>
            </View>
            <Text style={styles.comparacao}>vs. teste de ontem</Text>
          </View>
        )}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  rotulo:        { flexDirection: "row", alignItems: "center", gap: 6 },
  rotuloTexto:   { color: cores.textoSuave, fontSize: 13 },
  hero:          { flexDirection: "row", alignItems: "flex-end", marginTop: 6 },
  valorGrande:   { color: cores.texto, fontSize: 54, fontWeight: "700", lineHeight: 62 },
  unidade:       { color: cores.textoSuave, fontSize: 15, marginLeft: 6, marginBottom: 10 },
  divisor:       { height: 1, backgroundColor: "rgba(255,255,255,0.08)", marginVertical: 16 },
  rodape:        { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  valorUpload:   { color: cores.texto, fontSize: 24, fontWeight: "700", marginTop: 4 },
  unidadePequena:{ color: cores.textoSuave, fontSize: 12, fontWeight: "400" },
  variacao:      { color: cores.ciano, fontSize: 14, fontWeight: "700" },
  comparacao:    { color: cores.textoMudo, fontSize: 12, marginTop: 4 },
});
