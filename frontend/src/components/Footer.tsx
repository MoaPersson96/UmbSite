type FooterProps = {
  columns: {
    heading: string;
    content: {
      markup: string;
    };
  }[];
};

export function SiteFooter({ columns }: FooterProps) {
  return (
    <footer className="mt-32 border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 grid gap-10 md:grid-cols-4">
        
        {columns.map((col, i) => (
          <div key={i}>
            
            {i === 0 ? (
              // LOGGA
              <div className="flex flex-col leading-[0.85]">
                <span className="font-black font-sans text-2xl tracking-tighter">NORD</span>
                <span className="font-black font-sans text-2xl tracking-tighter">VIKEN</span>
              </div>
            ) : (
              <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4">
                {col.heading}
              </h4>
            )}

            <div
              className="
                mt-4
                text-sm text-gray-500
                [&>ul]:space-y-2
                [&>ul]:list-none
                [&>ul]:p-0
                [&>p]:mb-2
              "
              dangerouslySetInnerHTML={{ __html: col.content.markup }}
            />

          </div>
        ))}

      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-6 text-xs text-gray-500 flex flex-wrap justify-between gap-2">
          <span>© {new Date().getFullYear()} Nordvikens kommun</span>
          <span>Org.nr 212000-0000</span>
        </div>
      </div>
    </footer>
  );
}