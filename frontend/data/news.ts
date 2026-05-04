// import newsLake from "@/assets/news-lake.jpg";
// import newsYellow from "@/assets/news-yellow.jpg";
// import newsDeer from "@/assets/news-deer.jpg";
// import newsRedhouse from "@/assets/news-redhouse.jpg";
// import type { ArticleBlock } from "@/components/site/ArticleBody";

// export interface NewsPost {
//   slug: string;
//   title: string;
//   date: string;
//   excerpt: string;
//   image: string;
//   /** Rich body blocks (headings, paragraphs, lists, quotes). */
//   body: ArticleBlock[];
// }

// export const news: NewsPost[] = [
//   {
//     slug: "lake-post",
//     title: "Vinterns lugn över Nordvikens älv",
//     date: "Juni 13, 2025",
//     excerpt:
//       "En flygbild över älven som slingrar sig genom den snöklädda skogen — en påminnelse om naturens närhet.",
//     image: newsLake,
//     body: [
//       {
//         type: "p",
//         text: "När vintern lägger sig över Nordviken förvandlas landskapet. Älven, som under sommaren brusar fram mellan stränderna, får en stillsam puls under isen. Det är en tid då naturen visar sig från sin mest meditativa sida.",
//       },
//       { type: "h2", text: "Ett landskap i förändring" },
//       {
//         type: "p",
//         text: "Kommunens naturvårdare följer årligen utvecklingen av älvens isläggning och vattenstånd. Mätningarna ligger till grund för både friluftsliv och beredskap.",
//       },
//       { type: "h3", text: "Det här gör vi just nu" },
//       {
//         type: "ul",
//         items: [
//           "Mäter istjocklek vid tre platser längs älven",
//           "Uppdaterar skoterleder och skidspår löpande",
//           "Samarbetar med markägare om tillgänglighet",
//         ],
//       },
//       { type: "h3", text: "Så hjälper du till" },
//       {
//         type: "ol",
//         items: [
//           "Respektera markerade leder",
//           "Rapportera svaga isar till kommunen",
//           "Ta med skräp hem efter utflykten",
//         ],
//       },
//       {
//         type: "quote",
//         text: "Älven är hjärtat i vår bygd — när den vilar gör vi också det, men med vaket öga.",
//       },
//     ],
//   },
//   {
//     slug: "yellow-post",
//     title: "Kulturhuset öppnar dörrarna igen",
//     date: "Mars 9, 2026",
//     excerpt:
//       "Efter renovering välkomnar det gula kulturhuset åter besökare med utställningar och konserter.",
//     image: newsYellow,
//     body: [
//       {
//         type: "p",
//         text: "Efter ett års renovering slår Nordvikens kulturhus åter upp portarna. Den karaktäristiska gula fasaden har fått nytt liv och invändigt väntar moderna utställningssalar.",
//       },
//       { type: "h2", text: "Program för våren" },
//       {
//         type: "ul",
//         items: [
//           "Konstutställning: Nordliga horisonter",
//           "Konsertserie varje fredag kl 19:00",
//           "Familjelördagar med verkstad",
//         ],
//       },
//       {
//         type: "quote",
//         text: "Kulturen ska vara nära, vardaglig och öppen för alla — det har varit ledstjärnan i renoveringen.",
//       },
//     ],
//   },
//   {
//     slug: "deer-post",
//     title: "Renarna återvänder till skogarna",
//     date: "Januari 29, 2025",
//     excerpt:
//       "Den årliga vandringen är i full gång. Här är vad du behöver veta om mötet mellan renar och bilister.",
//     image: newsDeer,
//     body: [
//       {
//         type: "p",
//         text: "Som varje år rör sig renhjordarna genom kommunens skogar. Vandringen sker längs traditionella stråk och korsar flera vägar i området.",
//       },
//       { type: "h3", text: "Kör säkert" },
//       {
//         type: "ol",
//         items: [
//           "Sänk farten vid varningsskyltar",
//           "Använd helljus när möjligt",
//           "Stanna lugnt om en ren syns vid vägkanten",
//         ],
//       },
//     ],
//   },
//   {
//     slug: "redhouse-post",
//     title: "Bevarandet av de röda husen",
//     date: "April 20, 2025",
//     excerpt:
//       "Kommunens program för att bevara den traditionella träbebyggelsen får ny finansiering.",
//     image: newsRedhouse,
//     body: [
//       {
//         type: "p",
//         text: "De röda trähusen är en del av Nordvikens identitet. Nu får bevarandeprogrammet förstärkt budget för att stötta fastighetsägare med renovering enligt traditionella metoder.",
//       },
//       { type: "h2", text: "Vad ingår i stödet" },
//       {
//         type: "ul",
//         items: [
//           "Rådgivning om material och färgsättning",
//           "Bidrag för byte av fönster och paneler",
//           "Kurser i traditionellt timmerarbete",
//         ],
//       },
//     ],
//   },
// ];

// export function getNewsBySlug(slug: string) {
//   return news.find((n) => n.slug === slug);
// }