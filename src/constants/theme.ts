/**
 * Design tokens — Pulso Glassmorphism
 *
 * Paleta escura profunda com camadas de vidro translúcido,
 * acento em ciano brilhante e suporte a glow/shadow nativo.
 */

export const cores = {
  // ── Fundo ──────────────────────────────────────────
  /** Gradiente do fundo principal da tela */
  gradiente: ["#050e1a", "#071524", "#050e1a"] as const,

  // ── Vidro ──────────────────────────────────────────
  /** Superfície de card glass (fundo translúcido branco) */
  vidro:      "rgba(255,255,255,0.07)",
  /** Superfície de card glass mais forte (ícones, botões secundários) */
  vidroForte: "rgba(255,255,255,0.11)",

  // ── Bordas ─────────────────────────────────────────
  /** Borda padrão dos cards glass */
  borda:         "rgba(255,255,255,0.10)",
  /** Borda reforçada (hover, botão secundário) */
  bordaForte:    "rgba(255,255,255,0.16)",
  /** Borda de controles (chips, opções) */
  bordaControle: "rgba(255,255,255,0.10)",
  /** Borda ciano (cards destaque, anel do diagnóstico) */
  cianoBorda:    "rgba(0,212,255,0.28)",

  // ── Ciano (acento principal) ───────────────────────
  ciano:      "#00d4ff",
  cianoSuave: "rgba(0,212,255,0.08)",

  // ── Texto ──────────────────────────────────────────
  texto:           "#e8f4ff",
  textoSuave:      "rgba(232,244,255,0.60)",
  textoMudo:       "rgba(232,244,255,0.32)",
  textoSobreCiano: "#050e1a",

  // ── Semânticas ─────────────────────────────────────
  ambar:       "#f59e0b",
  ambarSuave:  "rgba(245,158,11,0.12)",
  vermelho:    "#ef4444",
  vermelhoSuave: "rgba(239,68,68,0.12)",
  roxo:        "#a259ff",

  // ── Navbar ─────────────────────────────────────────
  fundoNavbar: "rgba(5,14,26,0.75)",
} as const;

export const raios = {
  card:     20,
  botao:    16,
  pequeno:  12,
  chip:     13,
} as const;
