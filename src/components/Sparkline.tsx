import { useState } from "react";
import { View, LayoutChangeEvent } from "react-native";
import Svg, { Polyline } from "react-native-svg";
import { cores } from "@/constants/theme";

type Props = {
  dados: number[];
  largura?: number; // se omitido, ocupa 100% do espaço disponível
  altura?: number;
};

export function Sparkline({ dados, largura, altura = 28 }: Props) {
  const [medida, setMedida] = useState(0);
  const w = largura ?? medida;

  const onLayout = (e: LayoutChangeEvent) => setMedida(e.nativeEvent.layout.width);

  const min = Math.min(...dados);
  const max = Math.max(...dados);
  const faixa = max - min || 1;

  const pontos = dados
    .map((v, i) => {
      const x = (i / (dados.length - 1)) * w;
      const y = altura - 2 - ((v - min) / faixa) * (altura - 4);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <View onLayout={largura ? undefined : onLayout} style={{ width: largura ?? "100%", height: altura }}>
      {w > 0 && (
        <Svg width={w} height={altura}>
          <Polyline points={pontos} fill="none" stroke={cores.ciano} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        </Svg>
      )}
    </View>
  );
}
