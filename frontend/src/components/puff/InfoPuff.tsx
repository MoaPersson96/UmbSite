import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";

interface InfoCard {
  icon: "phone" | "mail" | "map-pin";
  title: string;
  value: string;
  extra?: string;
  href?: string;
}

const iconMap = {
  phone: Phone,
  mail: Mail,
  "map-pin": MapPin,
};

export function InfoCards({ items }: { items: InfoCard[] }) {
  return (
    <section className="mx-auto max-w-[1400px] px-6 md:px-10 mt-16 md:mt-24">
      <div className="grid gap-3 md:grid-cols-3">
        {items.map((item) => {
          const Icon = iconMap[item.icon];

          const content = (
            <div className="group flex flex-col items-start justify-center rounded-sm border-2 border-black px-6 py-6 text-center text-black transition-colors hover:bg-black hover:text-white">
              {Icon && <Icon className="mb-3 h-6 w-6" />}

              <div className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-black/70">{item.title}</div>
              <div className="font-sans text-2xl font-bold leading-tight mt-3">{item.value}</div>

              {item.extra && (
                <div className="mt-3 font-sans text-sm opacity-70">{item.extra}</div>
              )}
            </div>
          );

          return item.href ? (
            <Link key={item.title} to={item.href}>
              {content}
            </Link>
          ) : (
            <div key={item.title}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}