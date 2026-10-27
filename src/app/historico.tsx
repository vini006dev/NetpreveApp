import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Tela } from "@/components/Tela";
import { Topbar } from "@/components/Topbar";
import { Segmentado } from "@/components/Segmentado";
import { GlassCard } from "@/components/GlassCard";
import { GraficoLinha } from "@/components/GraficoLinha";
import { SecaoTitulo } from "@/components/SecaoTitulo";
import { ListaCard } from "@/components/ListaCard";
import { ItemTeste } from "@/components/ItemTeste";
import { Nota } from "@/components/Nota";
import { cores } from "@/constants/theme";

// TODO: filtrar pelo período escolhido quando a API estiver pronta
const dias = ["06 out.", "07 out.", "08 out.", "09 out."];
const download = [182, 301, 268, 312];
const upload = [64, 102, 98, 105];

export default function Historico() {
  const [periodo, setPeriodo] = useState(0);

  return (
    <Tela>
      <Topbar eyebrow="PULSO · SUA CONEXÃO NO TEMPO" titulo="Histórico" icone="options-outline" />

      <Segmentado opcoes={["7 dias", "30 dias", "Tudo"]} selecionado={periodo} onChange={setPeriodo} />

      <GlassCard>
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Velocidade ao longo dos dias</Text>
          <Ionicons name="trending-up" size={18} color={cores.ciano} />
        </View>

        <View style={styles.legenda}>
          <Text style={[styles.item, { color: cores.ciano }]}>● Download</Text>
          <Text style={[styles.item, { color: cores.roxo }]}>● Upload</Text>
          <Text style={[styles.item, { color: cores.textoMudo }]}>Mbps</Text>
        </View>

        <GraficoLinha rotulos={dias} download={download} upload={upload} />

        <View style={styles.divisor} />
        <Text style={styles.resumo}>Último download: 16,5% acima de ontem.</Text>
      </GlassCard>

      <SecaoTitulo titulo="Testes recentes" direita="4 testes · Casa_5G" />

      <ListaCard>
        <ItemTeste quando="Hoje · 09:41" download={312.8} upload={104.6} ping={12} qualidade="excelente" />
        <ItemTeste quando="Ontem · 20:15" download={268.4} upload={98.2} ping={16} qualidade="excelente" />
        <ItemTeste quando="07 out. · 09:30" download={301.2} upload={102.1} ping={14} qualidade="excelente" />
        <ItemTeste quando="06 out. · 21:08" download={182.6} upload={64.3} ping={38} qualidade="boa" />
      </ListaCard>

      <Nota>Todas as medições em Wi-Fi 5 GHz · Vivo Fibra</Nota>
    </Tela>
  );
}

const styles = StyleSheet.create({
  cabecalho: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  titulo: { color: cores.texto, fontSize: 16, fontWeight: "700" },
  legenda: { flexDirection: "row", gap: 14, marginTop: 10, marginBottom: 8 },
  item: { fontSize: 12 },
  divisor: { height: 1, backgroundColor: cores.borda, marginVertical: 12 },
  resumo: { color: cores.ciano, fontSize: 13 },
});
