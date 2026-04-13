import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Github, MessageCircle, Radio, Calendar, BookOpen } from "lucide-react";
import levels from "@/data/levels";
import { useClassStatus } from "@/hooks/useClassStatus";
import logo from "@/assets/prometheus-logo.png";

const LevelPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const level = levels.find((l) => l.level === Number(id));

  if (!level) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Level not found</h1>
          <Link to="/" className="text-primary underline">Back to portal</Link>
        </div>
      </div>
    );
  }

  const { isLive, isUpcoming, formattedTime } = useClassStatus(level.nextClass);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-4 flex items-center gap-4">
          <button onClick={() => navigate("/")} className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <img src={logo} alt="Prometheus" className="h-8 w-8" />
          <span className="font-bold text-foreground">Prometheus</span>
        </div>
      </nav>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        {/* Resource links */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={level.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 group/gh flex items-center gap-4 rounded-xl border border-[hsl(0,0%,20%)] bg-[hsl(0,0%,8%)] p-5 transition-all hover:border-[hsl(0,0%,35%)] hover:bg-[hsl(0,0%,11%)] hover:shadow-[0_0_20px_-5px_hsl(0,0%,30%,0.3)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(0,0%,15%)] transition-colors group-hover/gh:bg-[hsl(0,0%,20%)]">
              <Github className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <p className="font-bold text-foreground">GitHub Repository</p>
              <p className="text-xs text-muted-foreground">Code examples, exercises & solutions</p>
            </div>
            <ArrowLeft className="ml-auto h-4 w-4 rotate-180 text-muted-foreground opacity-0 transition-all group-hover/gh:opacity-100 group-hover/gh:translate-x-1" />
          </a>
          <a
            href={level.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 group/wa flex items-center gap-4 rounded-xl border border-[hsl(142,70%,45%)]/25 bg-[hsl(142,70%,40%,0.06)] p-5 transition-all hover:border-[hsl(142,70%,45%)]/50 hover:bg-[hsl(142,70%,40%,0.12)] hover:shadow-[0_0_20px_-5px_hsl(142,70%,45%,0.2)]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[hsl(142,70%,40%,0.15)] transition-colors group-hover/wa:bg-[hsl(142,70%,40%,0.25)]">
              <MessageCircle className="h-6 w-6 text-[hsl(142,70%,45%)]" />
            </div>
            <div>
              <p className="font-bold text-foreground">WhatsApp Group</p>
              <p className="text-xs text-muted-foreground">Get help & stay updated</p>
            </div>
            <ArrowLeft className="ml-auto h-4 w-4 rotate-180 text-muted-foreground opacity-0 transition-all group-hover/wa:opacity-100 group-hover/wa:translate-x-1" />
          </a>
        </div>

        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              isLive ? "bg-[hsl(142,70%,40%)] text-primary-foreground animate-pulse" : "bg-primary text-primary-foreground"
            }`}>
              {isLive ? <><Radio className="h-3 w-3" /> Live Now</> : <>Level {level.level}</>}
            </span>
          </div>
          <h1 className="text-3xl font-black text-foreground sm:text-4xl">{level.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">{level.description}</p>
        </div>

        {/* Live / upcoming class banner */}
        {isLive && level.nextClass && (
          <div className="rounded-xl border border-[hsl(142,70%,45%)]/40 bg-[hsl(142,70%,40%,0.08)] p-5">
            <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Radio className="h-4 w-4 text-[hsl(142,70%,45%)]" /> Class is happening now!
            </p>
            <a
              href={level.nextClass.classLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[hsl(142,70%,40%)] px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
            >
              <Radio className="h-4 w-4" /> Join Class Now
            </a>
          </div>
        )}

        {!isLive && isUpcoming && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary shrink-0" />
            <p className="text-sm text-foreground">
              Next class: <span className="font-semibold">{formattedTime}</span>
            </p>
          </div>
        )}

        {/* Topics */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" /> What You'll Learn
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {level.topicDetails.map((t) => (
              <div key={t.name} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold text-foreground mb-1">{t.name}</h3>
                <p className="text-sm text-muted-foreground">{t.description}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Prometheus. Empowering students through code.
      </footer>
    </div>
  );
};

export default LevelPage;
