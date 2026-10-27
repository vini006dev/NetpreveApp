import { useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import Svg, {
  G, Line, Polyline, Polygon, Circle,
  Defs, LinearGradient, Stop,
  Text as SvgText,
} from "react-native-svg";
import { cores } from "@/constants/theme";

type Props = {
  rotulos: string[];
  valores: number[];
  max?: number;
  altura?: number;
  passoRotulo?: number;
  cor?: string;
  descricao?: string;
};

const PAD = { esq: 34, dir: 12, topo: 10, base: 26 };

export function GraficoLinha({
  rotulos,
  valores,
  max = 100,
  altura = 170,
  passoRotulo = 1,
  cor = cores.ciano,
  descricao,
}: Props) {
  const [largura, setLargura] = useState(0);
  const onLayout = (e: LayoutChangeEvent) => setLargura(e.nativeEvent.layout.width);

  const n     = valores.length;
  const areaW = largura - PAD.esq - PAD.dir;
  const areaH = altura  - PAD.topo - PAD.base;
  const x = (i: number) =>
    PAD.esq + 8 + (n > 1 ? (i / (n - 1)) * (areaW - 16) : (areaW - 16) / 2);
  const y = (v: number) => PAD.topo + areaH - (v / max) * areaH;

  const linha = valores.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const area  = `${x(0)},${y(0)} ${linha} ${x(n - 1)},${y(0)}`;

  return (
    <View
      onLayout={onLayout}
      accessible={!!descricao}
      accessibilityRole={descricao ? "image" : undefined}
      accessibilityLabel={descricao}
      style={{ width: "100%", height: altura }}
    >
      {largura > 0 && n > 0 && (
        <Svg width={largura} height={altura}>
          <Defs>
            <LinearGradient id="areaG" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0"   stopColor={cor} stopOpacity={0.3} />
              <Stop offset="1"   stopColor={cor} stopOpacity={0}   />
            </LinearGradient>
          </Defs>

          {/* Grade horizontal */}
          {[0, max / 2, max].map((v) => (
            <G key={v}>
              <Line
                x1={PAD.esq} x2={largura - PAD.dir}
                y1={y(v)}    y2={y(v)}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
              <SvgText
                x={PAD.esq - 8} y={y(v) + 4}
                fill={cores.textoMudo} fontSize={11} textAnchor="end"
              >
                {String(v)}
              </SvgText>
            </G>
          ))}

          {/* Área preenchida */}
          <Polygon points={area} fill="url(#areaG)" />

          {/* Linha */}
          <Polyline
            points={linha}
            fill="none"
            stroke={cor}
            strokeWidth={2.5}
            strokeLinejoin="round"
          />

          {/* Pontos */}
          {n <= 12 && valores.map((v, i) => (
            <Circle key={i} cx={x(i)} cy={y(v)} r={3.5} fill={cor} />
          ))}

          {/* Rótulos eixo X */}
          {rotulos.map((r, i) =>
            i % passoRotulo === 0 ? (
              <SvgText
                key={i}
                x={x(i)} y={altura - 6}
                fill={cores.textoMudo} fontSize={11} textAnchor="middle"
              >
                {r}
              </SvgText>
            ) : null
          )}
        </Svg>
      )}
    </View>
  );
}
