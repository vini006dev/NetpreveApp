import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Line } from "react-native-svg";
import { cores } from "@/constants/theme";
import { num } from "@/utils/formatar";

type GaugeProps = {
  valor: number;
  max?: number;
  tamanho?: number;
  rotulo?: string; // "DOWNLOAD" | "VELOCIDADE INSTANTÂNEA"
  unidade?: string;
  cor?: string;
  casas?: number;
  descricao?: string; // leitura para TalkBack/VoiceOver
};

const INICIO = 135; // graus (canto inferior esquerdo)
const VARREDURA = 270;
const TICKS = 40;
const rad = (g: number) => (g * Math.PI) / 180;

export function Gauge({
  valor,
  max = 500,
  tamanho = 260,
  rotulo = "DOWNLOAD",
  unidade = "Mbps",
  cor = cores.ciano,
  casas = 1,
  descricao,
}: GaugeProps) {
  const c = tamanho / 2;
  const r = c - 30;
  const pct = Math.min(Math.max(valor / max, 0), 1);

  const ponto = (ang: number, raio: number) => ({
    x: c + raio * Math.cos(rad(ang)),
    y: c + raio * Math.sin(rad(ang)),
  });

  const arco = (varredura: number) => {
    const a = ponto(INICIO, r);
    const b = ponto(INICIO + varredura, r);
    return `M ${a.x} ${a.y} A ${r} ${r} 0 ${varredura > 180 ? 1 : 0} 1 ${b.x} ${b.y}`;
  };

  const base = ponto(INICIO, r);

  return (
    <View
      accessible={!!descricao}
      accessibilityRole={descricao ? "image" : undefined}
      accessibilityLabel={descricao}
      style={{ width: tamanho, height: tamanho * 0.92, alignSelf: "center" }}
    >
      <Svg width={tamanho} height={tamanho}>
        {Array.from({ length: TICKS + 1 }, (_, i) => {
          const ang = INICIO + (VARREDURA / TICKS) * i;
          const longo = i % 5 === 0;
          const a = ponto(ang, r + 12);
          const b = ponto(ang, r + (longo ? 22 : 18));
          return (
            <Line
              key={i}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={i / TICKS <= pct ? cores.cianoBorda : "rgba(255,255,255,0.14)"}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          );
        })}

        <Path d={arco(VARREDURA)} stroke="rgba(255,255,255,0.1)" strokeWidth={6} fill="none" strokeLinecap="round" />
        {pct > 0 && (
          <Path d={arco(VARREDURA * pct)} stroke={cor} strokeWidth={6} fill="none" strokeLinecap="round" />
        )}
      </Svg>

      <View style={[StyleSheet.absoluteFill, styles.centro, { height: tamanho }]}>
        <Text style={[styles.rotulo, { color: cor }]}>{rotulo}</Text>
        <Text style={styles.valor} maxFontSizeMultiplier={1.2}>{num(valor, casas)}</Text>
        <Text style={styles.unidade}>{unidade}</Text>
      </View>

      <Text style={[styles.limite, { left: base.x - 6, top: base.y + 26 }]}>0</Text>
      <Text style={[styles.limite, { right: base.x - 6, top: base.y + 26 }]}>{max}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centro: { alignItems: "center", justifyContent: "center", gap: 4 },
  rotulo: { color: cores.ciano, fontSize: 12, fontWeight: "600", letterSpacing: 1.2 },
  valor: { color: cores.texto, fontSize: 56, fontWeight: "700" },
  unidade: { color: cores.textoSuave, fontSize: 16 },
  limite: { position: "absolute", color: cores.textoMudo, fontSize: 12 },
});
