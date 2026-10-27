import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Tela } from "@/components/Tela";
import { Topbar } from "@/components/Topbar";
import { SecaoTitulo } from "@/components/SecaoTitulo";
import { OpcaoSelecionavel } from "@/components/OpcaoSelecionavel";
import { ChipSelecionavel } from "@/components/ChipSelecionavel";
import { Segmentado } from "@/components/Segmentado";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/Badge";
import { Botao } from "@/components/Botao";
import { Carregando } from "@/components/Carregando";
import { ErroCard } from "@/components/ErroCard";
import { Nota } from "@/components/Nota";
import { usePrevisao } from "@/contexts/PrevisaoContext";
import { useTimeline } from "@/hooks/useTimeline";
import { verificarAtividade } from "@/api/previsoes";
import { ApiError } from "@/api/cliente";
import type { Atividade, VerificacaoAtividade } from "@/api/tipos";
import { cores } from "@/constants/theme";
import { formatarData, formatarHora } from "@/utils/formatar";
import { rotuloQualidade, varianteBadge } from "@/utils/qualidade";

const ATIVIDADES: { id: Atividade; rotulo: string }[] = [
  { id: "VIDEO_CALL", rotulo: "Chamada de vídeo" },
  { id: "AUDIO_CALL", rotulo: "Chamada de áudio" },
  { id: "STREAMING", rotulo: "Assistir streaming" },
  { id: "FILE_UPLOAD", rotulo: "Enviar arquivo" },
  { id: "WEB_BROWSING", rotulo: "Navegar na web" },
  { id: "MESSAGING", rotulo: "Enviar mensagens" },
];

const PERIODOS = [
  { rotulo: "Madrugada", de: 0, ate: 5 },
  { rotulo: "Manhã", de: 6, ate: 11 },
  { rotulo: "Tarde", de: 12, ate: 17 },
  { rotulo: "Noite", de: 18, ate: 23 },
];

/** Protótipo P03 — escolher atividade e horário (RQ03 e RQ04) */
export default function Planejar() {
  const { previsao, modelId, carregando: carregandoPrevisao, erro: erroPrevisao, recarregar } = usePrevisao();
  const { itens, carregando, erro } = useTimeline(previsao?.matchedProbe.probeId, modelId);

  const [atividade, setAtividade] = useState<Atividade>("VIDEO_CALL");
  const [periodoEscolhido, setPeriodoEscolhido] = useState<number | null>(null);
  const [horaEscolhida, setHoraEscolhida] = useState<string | null>(null);
  const [resultado, setResultado] = useState<VerificacaoAtividade | null>(null);
  const [verificando, setVerificando] = useState(false);
  const [erroVerificacao, setErroVerificacao] = useState<ApiError | null>(null);

  const doPeriodo = (i: number) =>
    itens.filter((it) => {
      const h = new Date(it.predictionFor).getHours();
      return h >= PERIODOS[i].de && h <= PERIODOS[i].ate;
    });

  const primeiroComHorarios = PERIODOS.findIndex((_, i) => doPeriodo(i).length > 0);
  const periodo = periodoEscolhido ?? (primeiroComHorarios >= 0 ? primeiroComHorarios : 0);
  const horarios = doPeriodo(periodo);
  const selecionada = horarios.find((h) => h.predictionFor === horaEscolhida) ?? horarios[0];

  // ao mudar a escolha, o resultado anterior deixa de valer
  useEffect(() => {
    setResultado(null);
    setErroVerificacao(null);
  }, [atividade, selecionada?.predictionFor]);

  async function verificar() {
    if (!previsao || !selecionada) return;
    setVerificando(true);
    setErroVerificacao(null);
    setResultado(null);
    try {
      setResultado(
        await verificarAtividade({
          modelId,
          latitude: previsao.requestedLocation.latitude,
          longitude: previsao.requestedLocation.longitude,
          dateTime: selecionada.predictionFor,
          activity: atividade,
        })
      );
    } catch (e) {
      setErroVerificacao(e as ApiError);
    } finally {
      setVerificando(false);
    }
  }

  const nomeAtividade = ATIVIDADES.find((a) => a.id === atividade)?.rotulo ?? "";

  return (
    <Tela>
      <Topbar eyebrow="PULSO · PLANEJE SEU DIA" titulo="O que você pretende fazer?" />

      {(carregandoPrevisao || carregando) && !erro && !erroPrevisao && <Carregando texto="Carregando horários…" />}
      {erroPrevisao && !previsao && <ErroCard erro={erroPrevisao} onTentar={recarregar} />}
      {erro && <ErroCard erro={erro} onTentar={recarregar} />}

      {previsao && !carregando && !erro && (
        <>
          <View accessibilityRole="radiogroup" accessibilityLabel="Atividade" style={{ gap: 10 }}>
            {ATIVIDADES.map((a) => (
              <OpcaoSelecionavel key={a.id} rotulo={a.rotulo} selecionado={a.id === atividade} onPress={() => setAtividade(a.id)} />
            ))}
          </View>

          <SecaoTitulo titulo="Quando?" direita={itens.length ? formatarData(itens[0].predictionFor) : undefined} />

          {itens.length === 0 ? (
            <Text style={styles.texto}>Não há horários previstos para este modelo e local.</Text>
          ) : (
            <>
              <Segmentado
                rotulo="Período do dia"
                opcoes={PERIODOS.map((p) => p.rotulo)}
                selecionado={periodo}
                onChange={(i) => {
                  setPeriodoEscolhido(i);
                  setHoraEscolhida(null);
                }}
              />

              {horarios.length === 0 ? (
                <Text style={styles.texto}>Sem previsão neste período. Escolha outro período.</Text>
              ) : (
                <View accessibilityRole="radiogroup" accessibilityLabel="Horário" style={styles.chips}>
                  {horarios.map((h) => (
                    <ChipSelecionavel
                      key={h.predictionFor}
                      rotulo={formatarHora(h.predictionFor)}
                      rotuloAcessivel={`às ${formatarHora(h.predictionFor).slice(0, 2)} horas`}
                      selecionado={h.predictionFor === selecionada?.predictionFor}
                      onPress={() => setHoraEscolhida(h.predictionFor)}
                    />
                  ))}
                </View>
              )}

              <Botao
                titulo={verificando ? "Verificando…" : "Verificar atividade"}
                icone="search-outline"
                onPress={verificar}
                desabilitado={verificando || !selecionada}
              />
            </>
          )}

          {erroVerificacao && <ErroCard erro={erroVerificacao} onTentar={verificar} />}

          {resultado && selecionada && (
            <GlassCard style={{ gap: 10 }}>
              <View accessibilityLiveRegion="polite" style={{ gap: 10 }}>
                <Badge texto={rotuloQualidade[resultado.forecast.quality]} variante={varianteBadge[resultado.forecast.quality]} />
                <Text style={styles.resultadoTitulo} accessibilityRole="header">
                  {resultado.suitable ? "Deve funcionar bem" : "Pode apresentar dificuldades"}
                </Text>
                <Text style={styles.texto}>{resultado.recommendation.message}</Text>
                <Text style={styles.detalhe}>Atividade: {nomeAtividade}</Text>
                <Text style={styles.detalhe}>Horário: {formatarHora(selecionada.predictionFor)} · {formatarData(selecionada.predictionFor)}</Text>
              </View>
            </GlassCard>
          )}

          <Nota>A previsão é de um ponto de medição de referência, e não do seu aparelho. Horários no fuso do seu celular.</Nota>
        </>
      )}
    </Tela>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  texto: { color: cores.textoSuave, fontSize: 15, lineHeight: 22 },
  resultadoTitulo: { color: cores.texto, fontSize: 18, fontWeight: "700" },
  detalhe: { color: cores.textoSuave, fontSize: 14 },
});
