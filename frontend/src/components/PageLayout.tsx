import type { ReactNode } from "react";


export function PageLayout({ children }: { children: ReactNode }) {

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1">{children}</main>
    </div>
  );
}