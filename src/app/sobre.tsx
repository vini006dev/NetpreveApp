import { Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Tela } from "@/components/Tela";
import { Topbar } from "@/components/Topbar";
import { GlassCard } from "@/components/GlassCard";
import { Botao } from "@/components/Botao";
import { usePrevisao } from "@/contexts/PrevisaoContext";
import { cores } from "@/constants/theme";
import { glossario, significadoQualidade } from "@/constants/glossario";

const SEM_DADOS_DISCLAIMER =
  "A previsão está associada ao ponto de medição selecionado como referência geográfica e não representa uma medição direta do seu aparelho.";
const SEM_DADOS_PRIVACIDADE =
  "As coordenadas públicas dos pontos de medição recebem proteção de privacidade e não devem ser tratadas como a sua localização exata.";

function Bloco({ titulo, texto }: { titulo: string; texto: string }) {
  return (
    <GlassCard style={{ gap: 8 }}>
      <Text style={styles.titulo} accessibilityRole="header">{titulo}</Text>
      <Text style={styles.texto}>{texto}</Text>
    </GlassCard>
  );
}

/** Protótipo P2 — "Sobre esta previsão" */
export default function Sobre() {
  const router = useRouter();
  const { previsao } = usePrevisao();

  const fechar = () => (router.canGoBack() ? router.back() : router.replace("/"));

  return (
    <Tela>
      <Topbar eyebrow="PULSO · ENTENDA SUA PREVISÃO" titulo="Sobre esta previsão" />

      <Bloco titulo="O que esta previsão representa" texto={previsao?.metadata.disclaimer ?? SEM_DADOS_DISCLAIMER} />
      <Bloco titulo="Privacidade da localização" texto={previsao?.metadata.locationPrivacy ?? SEM_DADOS_PRIVACIDADE} />

      <GlassCard style={{ gap: 12 }}>
        <Text style={styles.titulo} accessibilityRole="header">O que isso significa?</Text>
        {[glossario.latencia, glossario.perda, glossario.probe, glossario.modelo].map((g) => (
          <Text key={g.termo} style={styles.texto}>
            <Text style={{ fontWeight: "700", color: cores.texto }}>{g.termo}. </Text>
            {g.explicacao}
          </Text>
        ))}
      </GlassCard>

      <GlassCard style={{ gap: 12 }}>
        <Text style={styles.titulo} accessibilityRole="header">Como lemos a qualidade</Text>
        {Object.values(significadoQualidade).map((t) => (
          <Text key={t} style={styles.texto}>{t}</Text>
        ))}
      </GlassCard>

      <Botao titulo="Fechar" onPress={fechar} />
    </Tela>
  );
}

const styles = StyleSheet.create({
  titulo: { color: cores.texto, fontSize: 18, fontWeight: "700" },
  texto: { color: cores.textoSuave, fontSize: 15, lineHeight: 22 },
});
