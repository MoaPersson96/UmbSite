
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
            
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4">
              {col.heading}
            </h4>

            <div
              className="text-sm text-muted-foreground space-y-2"
              dangerouslySetInnerHTML={{ __html: col.content.markup }}
            />

          </div>
        ))}

      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-6 text-xs text-muted-foreground flex justify-between">
          <span>© {new Date().getFullYear()} Nordvikens kommun</span>
          <span>Org.nr 212000-0000</span>
        </div>
      </div>
    </footer>
  );
}