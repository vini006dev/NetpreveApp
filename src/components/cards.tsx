import { View, Text, TouchableOpacity, StyleSheet} from "react-native";
import { Feather } from "@expo/vector-icons";

type CardProps = {
    titulo: string;
    subtitulo: string;
};

export function Card ({ titulo, subtitulo }: CardProps) {
    return (
    

        <TouchableOpacity style={styles.container}>
            <View style={styles.icone}>
                <Feather name= "pie-chart" size= {22} color="#ffff"/>
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
        backgroundColor: "rgba(255, 255, 255, 0.08)",
        borderWidth: 1,
        borderColor: "#ffff",
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
        backgroundColor: "#cdb0ff",
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
