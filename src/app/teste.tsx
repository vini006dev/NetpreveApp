import { LinearGradient } from "expo-linear-gradient";
import { View, StyleSheet, ScrollView, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/cards";
import { Topbar } from "@/components/Topbar";

export default function Velocidade() {
  return (
    <LinearGradient
      colors={["#0a1a2f", "#0b2a3f", "#071522"]}
      style={{ flex: 1 }}
    >

    <Topbar titulo="NET PREVE - QUALIDADE DA INTERNET" subtitulo="Wifi test" icone="settings" />

      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 32, gap: 14 }}>
          <Card titulo="Qualidade" subtitulo="ver qualidade" icone="wifi" />
          <Card titulo="Rede" subtitulo="ver rede" />
          <Card titulo="Relatorio" subtitulo="gerar relatorio" />
        </ScrollView>
      </SafeAreaView>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  ilustration: {
    width: "100%",
    height: 330,
    resizeMode: "contain",
    marginTop: 62,

  },

  title: {
    fontSize: 32,
    fontWeight: 900,
  },

  subtitle: {
    fontSize: 28,
  },

  form: {
    marginTop: 24,
    gap: 12,


  },

  divNavbar: {
  paddingHorizontal: 16,
  paddingBottom: 16,   
  }


});