import { createFileRoute } from "@tanstack/react-router";
import { SlideDeck } from "@/components/SlideDeck";

export const Route = createFileRoute("/tv")({
  head: () => ({
    meta: [
      { title: "Outubro Rosa — Modo TV | ESF Simone Flores" },
      { name: "description", content: "Apresentação automática de prevenção do câncer de mama, feita para a tela da TV do posto de saúde." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Outubro Rosa — Modo TV" },
      { property: "og:description", content: "Apresentação automática de prevenção do câncer de mama para a TV do posto." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TvMode,
});

function TvMode() {
  return <SlideDeck tv />;
}