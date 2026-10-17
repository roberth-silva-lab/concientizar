export type Slide =
  | { kind: "image" }
  | { kind: "text"; kicker: string; title: string; items?: string[]; text?: string; emoji: string };

export const slides: Slide[] = [
  { kind: "image" },
  {
    kind: "text", emoji: "🎀", kicker: "Outubro Rosa",
    title: "O que é o câncer de mama?",
    text: "É o tipo de câncer mais comum entre as mulheres. Quando descoberto cedo, as chances de cura são muito maiores.",
  },
  {
    kind: "text", emoji: "🤲", kicker: "Autoexame",
    title: "Conheça o seu corpo",
    items: ["Observe as mamas em frente ao espelho", "Apalpe com a ponta dos dedos, em movimentos circulares", "Faça uma vez por mês, após a menstruação", "O autoexame não substitui a consulta"],
  },
  {
    kind: "text", emoji: "⚠️", kicker: "Fique atenta",
    title: "Sinais de alerta",
    items: ["Caroço (nódulo) na mama ou na axila", "Pele da mama avermelhada ou com aspecto de casca de laranja", "Alteração ou saída de líquido no mamilo", "Mudança no tamanho ou formato da mama"],
  },
  {
    kind: "text", emoji: "🩺", kicker: "Exames",
    title: "Mamografia salva vidas",
    items: ["Mulheres de 50 a 69 anos: mamografia a cada 2 anos", "Exame clínico das mamas na consulta de rotina", "Histórico na família? Converse com a equipe"],
  },
  {
    kind: "text", emoji: "🥗", kicker: "Prevenção",
    title: "Hábitos que protegem",
    items: ["Pratique atividade física", "Alimentação saudável e peso adequado", "Evite bebidas alcoólicas e o cigarro", "Amamentar também protege"],
  },
  {
    kind: "text", emoji: "💗", kicker: "Procure a sua unidade",
    title: "Cuidar de você é prevenir o amanhã!",
    text: "Agende sua consulta com a Equipe Saúde da Família Simone Flores. Juntos por uma saúde melhor!",
  },
];