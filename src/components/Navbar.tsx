import {Text, View, StyleSheet} from "react-native";
import { Ionicons } from '@expo/vector-icons';

export function Navbar() {
    return (
        <View style={styles.Navbar}>
        <View style={{alignItems: "center"}}>
        <Ionicons name="globe-sharp" size={20} color="orange" ></Ionicons>
        <Text style={styles.textoNavbar}>Home</Text>
        </View>

        <View style={{alignItems: "center"}}>
        <Ionicons name="bug-outline" size={20} color="#6e6e6e" ></Ionicons>
        <Text style={styles.textoNavbar}>Test</Text>
        </View>

        <View style={{alignItems: "center"}}>
        <Ionicons name="speedometer-outline" size={20} color="#6e6e6e" ></Ionicons>
        <Text style={styles.textoNavbar}>Speed</Text>
        </View>

        <View style={{alignItems: "center"}}>
        <Ionicons name="settings-outline" size={20} color="#6e6e6e" ></Ionicons>
        <Text style={styles.textoNavbar}>Settings</Text>
        </View>

        </View>
    );
}

const styles = StyleSheet.create({
    Navbar: {
        position: "absolute",
        bottom: 0,
        left: 20,
        right: 20,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#bfbfbf",
        padding: 15,
        borderRadius: 20,
    },

    textoNavbar: {
        color: "#9e8989",
        fontSize: 15,
        fontWeight: 600,
    },
})
;