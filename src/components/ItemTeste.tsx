import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Badge } from "./Badge";
import { cores } from "@/constants/theme";
import { num } from "@/utils/formatar";

type Props = {
  quando: string;
  download: number;
  upload: number;
  ping: number;
  qualidade: "excelente" | "boa";
};

export function ItemTeste({ quando, download, upload, ping, qualidade }: Props) {
  return (
    <View style={{ gap: 10 }}>
      <View style={styles.topo}>
        <Text style={styles.quando}>{quando}</Text>
        <Badge
          texto={qualidade === "excelente" ? "Excelente" : "Boa"}
          variante={qualidade}
        />
      </View>
      <View style={styles.valores}>
        <View style={styles.dl}>
          <Ionicons name="arrow-down" size={13} color={cores.texto} />
          <Text style={styles.dlTexto}>{num(download)} Mbps</Text>
        </View>
        <View style={styles.ul}>
          <Ionicons name="arrow-up" size={13} color={cores.textoSuave} />
          <Text style={styles.ulTexto}>{num(upload)} Mbps</Text>
        </View>
        <Text style={styles.ping}>{num(ping, 0)} ms</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topo:    { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  quando:  { color: cores.texto, fontSize: 13, fontWeight: "600" },
  valores: { flexDirection: "row", alignItems: "center" },
  dl:      { flex: 1.3, flexDirection: "row", alignItems: "center", gap: 4 },
  dlTexto: { color: cores.texto, fontSize: 15, fontWeight: "700" },
  ul:      { flex: 1.2, flexDirection: "row", alignItems: "center", gap: 4 },
  ulTexto: { color: cores.textoSuave, fontSize: 13 },
  ping:    { color: cores.textoSuave, fontSize: 13, minWidth: 48, textAlign: "right" },
});
