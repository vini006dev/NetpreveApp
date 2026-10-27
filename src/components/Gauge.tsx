import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Line, Defs, LinearGradient, Stop } from "react-native-svg";
import { cores } from "@/constants/theme";
import { num } from "@/utils/formatar";

type GaugeProps = {
  valor: number;
  max?: number;
  tamanho?: number;
  rotulo?: string;
  unidade?: string;
  cor?: string;
  casas?: number;
  descricao?: string;
};

const INICIO   = 135;
const VARREDURA = 270;
const TICKS    = 40;
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
  const c   = tamanho / 2;
  const r   = c - 30;
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
        <Defs>
          <LinearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#00b4d8" stopOpacity={1} />
            <Stop offset="100%" stopColor={cor} stopOpacity={1} />
          </LinearGradient>
        </Defs>

        {/* Ticks */}
        {Array.from({ length: TICKS + 1 }, (_, i) => {
          const ang   = INICIO + (VARREDURA / TICKS) * i;
          const longo = i % 5 === 0;
          const ativo = i / TICKS <= pct;
          const a = ponto(ang, r + 12);
          const b = ponto(ang, r + (longo ? 22 : 17));
          return (
            <Line
              key={i}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={ativo ? cor + "80" : "rgba(255,255,255,0.1)"}
              strokeWidth={longo ? 2 : 1.2}
              strokeLinecap="round"
            />
          );
        })}

        {/* Trilho base */}
        <Path
          d={arco(VARREDURA)}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={7}
          fill="none"
          strokeLinecap="round"
        />

        {/* Arco preenchido com gradiente + glow */}
        {pct > 0 && (
          <Path
            d={arco(VARREDURA * pct)}
            stroke="url(#gaugeGrad)"
            strokeWidth={7}
            fill="none"
            strokeLinecap="round"
          />
        )}
      </Svg>

      {/* Centro com valores */}
      <View style={[StyleSheet.absoluteFill, styles.centro, { height: tamanho }]}>
        <Text style={[styles.rotulo, { color: cor }]}>{rotulo}</Text>
        <Text style={styles.valor} maxFontSizeMultiplier={1.2}>
          {num(valor, casas)}
        </Text>
        <Text style={styles.unidade}>{unidade}</Text>
      </View>

      {/* Limites */}
      <Text style={[styles.limite, { left: base.x - 6, top: base.y + 26 }]}>0</Text>
      <Text style={[styles.limite, { right: base.x - 6, top: base.y + 26 }]}>{max}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  centro:  { alignItems: "center", justifyContent: "center", gap: 2 },
  rotulo:  { fontSize: 11, fontWeight: "600", letterSpacing: 1.2, textTransform: "uppercase" },
  valor:   { color: cores.texto, fontSize: 52, fontWeight: "700" },
  unidade: { color: cores.textoSuave, fontSize: 15 },
  limite:  { position: "absolute", color: cores.textoMudo, fontSize: 11 },
});
