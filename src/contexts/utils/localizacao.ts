import * as Location from "expo-location";

export type Local = { latitude: number; longitude: number; aproximada: boolean };

// São Paulo — usado se o usuário negar a permissão de localização
export const LOCAL_PADRAO: Local = { latitude: -23.55, longitude: -46.63, aproximada: true };

export async function obterLocal(): Promise<Local> {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return LOCAL_PADRAO;

    const p = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    return { latitude: p.coords.latitude, longitude: p.coords.longitude, aproximada: false };
  } catch {
    return LOCAL_PADRAO;
  }
}
