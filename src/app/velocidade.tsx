import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Velocidade() {
  return (
    <LinearGradient
      colors={["#0a1a2f", "#0b2a3f", "#071522"]}
      style={{ flex: 1 }}
    >

    
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#fff" }}>Mudar essa area para ficar tipo uma dashboard com varios graficos e inf</Text>
    </View>

    </LinearGradient>
  );
}