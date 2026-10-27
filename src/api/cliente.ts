export const BASE_URL = "https://internet-quality-api.onrender.com/api/v1";

// O plano gratuito do Render "dorme": a 1ª chamada pode levar 30–60 s.
const TIMEOUT_MS = 70_000;

export class ApiError extends Error {
  constructor(
    public status: number, // 0 = falha de rede / timeout
    public codigo: string | undefined,
    mensagem: string
  ) {
    super(mensagem);
  }
}

export async function requisicao<T>(caminho: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const resposta = await fetch(BASE_URL + caminho, {
      ...init,
      signal: controller.signal,
      headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    });

    if (!resposta.ok) {
      let codigo: string | undefined;
      let mensagem = `Erro ${resposta.status}`;
      try {
        const corpo = await resposta.json();
        codigo = corpo?.error?.code;
        mensagem = corpo?.error?.message ?? mensagem;
      } catch {
        // corpo vazio ou não-JSON
      }
      throw new ApiError(resposta.status, codigo, mensagem);
    }

    return (await resposta.json()) as T;
  } catch (e) {
    if (e instanceof ApiError) throw e;
    if ((e as Error).name === "AbortError") {
      throw new ApiError(0, "TIMEOUT", "O servidor demorou demais para responder.");
    }
    throw new ApiError(0, "NETWORK", "Não foi possível conectar ao servidor.");
  } finally {
    clearTimeout(timer);
  }
}
