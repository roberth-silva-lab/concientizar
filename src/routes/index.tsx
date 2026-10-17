import { createFileRoute } from "@tanstack/react-router";
import { SlideDeck } from "@/components/SlideDeck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Outubro Rosa — Prevenção do Câncer de Mama | ESF Simone Flores" },
      { name: "description", content: "Apresentação de conscientização sobre prevenção do câncer de mama: autoexame, mamografia e cuidados." },
      { property: "og:title", content: "Outubro Rosa — Prevenção é o melhor caminho" },
      { property: "og:description", content: "Cuidados e prevenção do câncer de mama. Equipe Saúde da Família Simone Flores." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <SlideDeck />;
}