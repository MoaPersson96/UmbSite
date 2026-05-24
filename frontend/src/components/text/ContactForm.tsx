import { ArrowRight } from "lucide-react";

interface ContactSectionProps {
  label?: string;
  heading: string;
  body?: string;

  nameLabel?: string;
  emailLabel?: string;
  subjectLabel?: string;
  messageLabel?: string;

  buttonLabel?: string;

  action?: string;
  method?: "post" | "get";
}

export function ContactSection({
  label = "Kontaktformulär",
  heading,
  body,

  nameLabel = "Namn",
  emailLabel = "E-post",
  subjectLabel = "Ärende",
  messageLabel = "Meddelande",

  buttonLabel = "Skicka meddelande",

  action = "/umbraco/surface/contact/submit",
  method = "post",
}: ContactSectionProps) {
  return (
    <section className="mx-auto mt-24 max-w-[1400px] px-4 md:mt-32 md:px-6">
      <div className="bg-black px-6 py-10 text-white md:px-14 md:py-16">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12">

          {/* LEFT */}
          <div className="md:col-span-4">
            {label && (
              <div className="mb-6 text-[11px] font-bold uppercase tracking-[0.28em] text-white/60">
                {label}
              </div>
            )}

            <h2 className="max-w-[8ch] text-[52px] font-black leading-[0.9] tracking-[-0.05em] md:text-[72px]">
              {heading}
            </h2>

            {body && (
              <p className="mt-10 max-w-[28ch] text-lg leading-[1.7] text-white/80">
                {body}
              </p>
            )}
          </div>

          {/* RIGHT */}
          <div className="md:col-span-7 md:col-start-6">
            <form
              action={action}
              method={method}
              className="flex flex-col"
            >

              {/* NAME + EMAIL */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[11px] font-bold uppercase tracking-[0.28em] text-white/70"
                  >
                    {nameLabel}
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full border-0 border-b border-white/30 bg-transparent px-0 py-3 text-lg text-white outline-none placeholder:text-white/30 focus:border-white"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] font-bold uppercase tracking-[0.28em] text-white/70"
                  >
                    {emailLabel}
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full border-0 border-b border-white/30 bg-transparent px-0 py-3 text-lg text-white outline-none placeholder:text-white/30 focus:border-white"
                  />
                </div>
              </div>

              {/* SUBJECT */}
              <div className="mt-5">
                <label
                  htmlFor="subject"
                  className="block text-[11px] font-bold uppercase tracking-[0.28em] text-white/70"
                >
                  {subjectLabel}
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="w-full border-0 border-b border-white/30 bg-transparent px-0 py-3 text-lg text-white outline-none placeholder:text-white/30 focus:border-white"
                />
              </div>

              {/* MESSAGE */}
              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="block text-[11px] font-bold uppercase tracking-[0.28em] text-white/70"
                >
                  {messageLabel}
                </label>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="w-full resize-none border-0 border-b border-white/30 bg-transparent px-0 py-3 pr-10 text-lg text-white outline-none placeholder:text-white/30 focus:border-white"
                  />

                  {/* Tre streck nere till höger */}
                  <div className="pointer-events-none absolute bottom-[10px] right-[2px] opacity-60">
                    <span className="absolute bottom-[1px] right-[1px] block h-px w-[8px] rotate-[-45deg] bg-white origin-right" />
                    <span className="absolute bottom-[3px] right-[3px] block h-px w-[12px] rotate-[-45deg] bg-white origin-right" />
                    <span className="absolute bottom-[6px] right-[6px] block h-px w-[15px] rotate-[-45deg] bg-white origin-right" />
                  </div>
                </div>
              </div>

              {/* BUTTON */}
              <div className="mt-7">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-4 bg-white px-8 py-5 text-base font-bold text-black transition-all hover:gap-6"
                >
                  {buttonLabel}

                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}