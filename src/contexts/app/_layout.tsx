import { Tabs } from "expo-router";
import { Navbar } from "@/components/Navbar";
import { PrevisaoProvider } from "@/contexts/PrevisaoContext";

export default function Layout() {
  return (
    <PrevisaoProvider>
      <Tabs
        tabBar={(props) => <Navbar state={props.state} navigation={props.navigation} />}
        screenOptions={{ headerShown: false }}
      >
        <Tabs.Screen name="index" />
        <Tabs.Screen name="horarios" />
        <Tabs.Screen name="planejar" />
        <Tabs.Screen name="diagnostico" />
        {/* Tela de apoio (P2): fora da barra de abas */}
        <Tabs.Screen name="sobre" options={{ href: null }} />
      </Tabs>
    </PrevisaoProvider>
  );
}
