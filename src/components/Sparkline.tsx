import { useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import Svg, { Polyline, Polygon, Defs, LinearGradient, Stop } from "react-native-svg";
import { cores } from "@/constants/theme";

type Props = {
  dados: number[];
  largura?: number;
  altura?: number;
};

export function Sparkline({ dados, largura, altura = 28 }: Props) {
  const [medida, setMedida] = useState(0);
  const w = largura ?? medida;

  const onLayout = (e: LayoutChangeEvent) => setMedida(e.nativeEvent.layout.width);

  const min   = Math.min(...dados);
  const max   = Math.max(...dados);
  const faixa = max - min || 1;

  const pontos = dados
    .map((v, i) => {
      const px = (i / (dados.length - 1)) * w;
      const py = altura - 2 - ((v - min) / faixa) * (altura - 4);
      return `${px},${py}`;
    })
    .join(" ");

  // Área de gradiente
  const area =
    `${0},${altura} ` + pontos + ` ${w},${altura}`;

  return (
    <View
      onLayout={largura ? undefined : onLayout}
      style={{ width: largura ?? "100%", height: altura }}
    >
      {w > 0 && (
        <Svg width={w} height={altura}>
          <Defs>
            <LinearGradient id="spGrad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0"   stopColor={cores.ciano} stopOpacity={0.2} />
              <Stop offset="1"   stopColor={cores.ciano} stopOpacity={0}   />
            </LinearGradient>
          </Defs>
          <Polygon points={area} fill="url(#spGrad)" />
          <Polyline
            points={pontos}
            fill="none"
            stroke={cores.ciano}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </Svg>
      )}
    </View>
  );
}
