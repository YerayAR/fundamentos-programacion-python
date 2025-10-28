import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Sidebar } from "@/components/Sidebar";
import { getAllModules } from "@/lib/content";

export default async function SiteLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const modules = await getAllModules();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
      <Header />
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-8 px-4 py-8 md:px-6">
        <Sidebar modules={modules} />
        <main id="contenido-principal" className="flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
