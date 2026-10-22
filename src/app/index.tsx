import { LinearGradient } from "expo-linear-gradient";

import { Topbar } from "@/components/Topbar";


export default function Index() {
  return (
    <LinearGradient colors={["#0a1a2f", "#0b2a3f", "#071522"]}style={{ flex: 1 }}>

    <Topbar titulo="NET PREVE - QUALIDADE DA INTERNET" subtitulo="Sua conexão, em foco." icone="settings" />

    </LinearGradient>
  );
}

