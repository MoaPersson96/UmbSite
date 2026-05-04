import { useLoaderData } from "@tanstack/react-router";
import { PageLayout } from "../components/PageLayout";
import { Hero } from "../components/hero/Hero";
import { TextBlock } from "../components/text/TextBlock";

export function ContactPage() {
  const blocks = useLoaderData();

  const hero = blocks.find(b => b.type === "heroBlock");
  const textBlocks = blocks.filter(b => b.type === "textBlock");

  return (
    <PageLayout>
      {hero && <Hero {...hero.props} />}

      {textBlocks.map((b, i) => (
        <TextBlock key={i} {...b.props} />
      ))}
    </PageLayout>
  );
}