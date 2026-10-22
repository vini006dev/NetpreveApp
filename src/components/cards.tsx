import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { Feather } from "@expo/vector-icons";


type CardProps = {
    titulo: string;
    subtitulo: string;
    icone?: keyof typeof Feather.glyphMap;
};

export function Card ({ titulo, subtitulo, icone = "tool" }: CardProps) {
    return (
    

        <TouchableOpacity style={styles.container}>
            <View style={styles.icone}>
                <Feather name= {icone} size= {22} color="#fff"/>
            </View>

            <View>
                <Text style={styles.titulo}>{titulo}</Text>
                <Text style={styles.subtitulo}>{subtitulo}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255, 255, 255, 0)",
        borderWidth: 1,
        borderColor: "#d1e6ff14",
        borderRadius: 24,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },

    icone: {
        width: 52,
        height: 52,
        borderRadius: 20,
        backgroundColor: "#ffffff14",
        alignItems: "center",
        justifyContent: "center",
        
    },

    titulo: {
        fontSize: 16,
        fontWeight: "700",
        color: "#ffffff"
    },

    subtitulo: {
        fontSize: 13,
        color: "rgba(255, 255, 255, 0.6)",
        marginTop: 2,
    }

});
