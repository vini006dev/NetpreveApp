import { Tabs } from "expo-router";
import { Navbar } from "@/components/Navbar";

export default function Layout() {
  return (
    <Tabs
      tabBar={(props) => (
        <Navbar state={props.state} navigation={props.navigation} />
      )}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="teste" />
      <Tabs.Screen name="velocidade" />
      <Tabs.Screen name="configuracoes" />
    </Tabs>
  );
}
