import { View, Text, StyleSheet } from "react-native";
import { Tela } from "@/components/Tela";
import { Topbar } from "@/components/Topbar";
import { GlassCard } from "@/components/GlassCard";
import { GraficoLinha } from "@/components/GraficoLinha";
import { SecaoTitulo } from "@/components/SecaoTitulo";
import { ListaCard } from "@/components/ListaCard";
import { LinhaInfo } from "@/components/LinhaInfo";
import { Badge } from "@/components/Badge";
import { Destaque } from "@/components/Destaque";
import { Carregando } from "@/components/Carregando";
import { ErroCard } from "@/components/ErroCard";
import { Nota } from "@/components/Nota";
import { usePrevisao } from "@/contexts/PrevisaoContext";
import { useTimeline } from "@/hooks/useTimeline";
import { cores } from "@/constants/theme";
import { formatarData, formatarHora } from "@/utils/formatar";
import { agruparJanelas, rotuloQualidade, varianteBadge } from "@/utils/qualidade";

const MEIA_HORA_ATE_PROXIMA = 60 * 60 * 1000;

export default function Horarios() {
  const { previsao, modelId } = usePrevisao();
  const { itens, carregando, erro, recarregar } = useTimeline(previsao?.matchedProbe.probeId, modelId);

  const janelas = agruparJanelas(itens);
  const melhor = itens.length ? itens.reduce((a, b) => (b.qualityScore > a.qualityScore ? b : a)) : null;
  const pior = itens.length ? itens.reduce((a, b) => (b.qualityScore < a.qualityScore ? b : a)) : null;
  const hora = (iso: string) => formatarHora(iso).slice(0, 2) + "h";
  const fimDaJanela = (iso: string) => hora(new Date(new Date(iso).getTime() + MEIA_HORA_ATE_PROXIMA).toISOString());

  return (
    <Tela>
      <Topbar eyebrow="PULSO · SUA CONEXÃO AO LONGO DO DIA" titulo="Horários" icone="refresh-outline" rotuloIcone="Atualizar horários" onPressIcone={recarregar} />

      {(carregando || !previsao) && !erro && <Carregando texto="Carregando horários…" />}
      {erro && <ErroCard erro={erro} onTentar={recarregar} />}

      {!carregando && !erro && previsao && itens.length === 0 && (
        <Destaque icone="calendar-outline" titulo="Sem previsão para este período" texto="Não há horários previstos para esta probe e este modelo." />
      )}

      {!carregando && !erro && itens.length > 0 && (
        <>
          <GlassCard>
            <Text style={styles.titulo}>Qualidade prevista · {formatarData(itens[0].predictionFor)}</Text>
            <Text style={styles.legenda}>Score de 0 a 100 por hora</Text>

            <GraficoLinha
              rotulos={itens.map((i) => hora(i.predictionFor))}
              valores={itens.map((i) => i.qualityScore)}
              passoRotulo={4}
              descricao={melhor && pior ? `Gráfico da qualidade prevista por hora. Melhor horário: ${hora(melhor.predictionFor)}, score ${melhor.qualityScore}. Pior horário: ${hora(pior.predictionFor)}, score ${pior.qualityScore}. Veja os detalhes na lista abaixo.` : undefined}
            />

            {melhor && pior && (
              <>
                <View style={styles.divisor} />
                <Text style={styles.resumo}>
                  Melhor horário: {hora(melhor.predictionFor)} (score {melhor.qualityScore}). Pior: {hora(pior.predictionFor)} (score {pior.qualityScore}).
                </Text>
              </>
            )}
          </GlassCard>

          <SecaoTitulo titulo="Janelas do dia" direita={`${janelas.length} períodos`} />

          <ListaCard>
            {janelas.map((j) => (
              <LinhaInfo
                key={j.inicio}
                icone="time-outline"
                titulo={`${hora(j.inicio)} – ${fimDaJanela(j.fim)}`}
                texto={j.scoreMin === j.scoreMax ? `Score ${j.scoreMax}` : `Score de ${j.scoreMin} a ${j.scoreMax}`}
                direita={<Badge texto={rotuloQualidade[j.quality]} variante={varianteBadge[j.quality]} />}
              />
            ))}
          </ListaCard>

          <Nota>Horários exibidos no fuso do seu aparelho. A previsão é de uma probe de referência, não do seu dispositivo.</Nota>
        </>
      )}
    </Tela>
  );
}

const styles = StyleSheet.create({
  titulo: { color: cores.texto, fontSize: 16, fontWeight: "700" },
  legenda: { color: cores.textoMudo, fontSize: 12, marginTop: 4, marginBottom: 8 },
  divisor: { height: 1, backgroundColor: cores.borda, marginVertical: 12 },
  resumo: { color: cores.ciano, fontSize: 13, lineHeight: 19 },
});
