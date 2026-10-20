import { View, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/cards";

export default function Index() {
  return (
    <LinearGradient
      colors={["#0a1a2f", "#0b2a3f", "#071522"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 32, gap: 14 }}>
          <Card titulo="Qualidade" subtitulo="ver qualidade" />
          <Card titulo="Rede" subtitulo="ver rede" />
          <Card titulo="Relatorio" subtitulo="gerar relatorio" />
        </ScrollView>

        <View style={styles.divNavbar}>
          <Navbar />
        </View>
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