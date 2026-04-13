import logo from "@/assets/prometheus-logo.png";
import LevelCard from "@/components/LevelCard";
import levels from "@/data/levels";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--glow)/0.08),transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center">
          <img src={logo} alt="Prometheus" className="mx-auto h-28 w-28 mb-6" />
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Prometheus
          </h1>
          <p className="mt-3 text-lg text-muted-foreground max-w-xl mx-auto">
            Free Python classes for students — from zero to building real projects.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-8">Learning Path</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {levels.map((l) => (
            <LevelCard key={l.level} {...l} />
          ))}
        </div>
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Prometheus. Empowering students through code.
      </footer>
    </div>
  );
};

export default Index;
