import { useNavigate } from "react-router-dom";
import { Lock, CheckCircle, ArrowRight, Radio, Calendar } from "lucide-react";
import type { LevelConfig } from "@/data/levels";
import { useClassStatus } from "@/hooks/useClassStatus";

const LevelCard = ({ level, title, description, topics, isAvailable, nextClass }: LevelConfig) => {
  const navigate = useNavigate();
  const { isLive, isUpcoming, formattedTime } = useClassStatus(nextClass);

  const borderClass = isLive
    ? "border-[hsl(142,70%,45%)]/60 bg-card shadow-[0_0_30px_-5px_hsl(142,70%,45%,0.2)]"
    : isAvailable
      ? "border-primary/30 bg-card hover:border-primary/60 hover:shadow-[0_0_30px_-5px_hsl(var(--glow)/0.15)]"
      : "border-border bg-card/50 opacity-60";

  return (
    <div
      className={`group relative rounded-xl border transition-all duration-300 cursor-pointer ${borderClass}`}
      onClick={() => isAvailable && navigate(`/level/${level}`)}
    >
      {/* Level badge */}
      <div className="absolute -top-3 left-6 flex items-center gap-2">
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
          isAvailable
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}>
          {isAvailable ? (
            <><CheckCircle className="h-3 w-3" /> Level {level}</>
          ) : (
            <><Lock className="h-3 w-3" /> Level {level}</>
          )}
        </span>
        {isLive && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[hsl(142,70%,40%)] px-3 py-1 text-xs font-semibold text-primary-foreground animate-pulse">
            <Radio className="h-3 w-3" /> Live Now
          </span>
        )}
      </div>


      <div className="p-6 pt-8">
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {topics.map((topic) => (
            <span key={topic} className="rounded-md bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
              {topic}
            </span>
          ))}
        </div>

        {/* Live → Join Class button */}
        {isLive && nextClass && (
          <a
            href={nextClass.classLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[hsl(142,70%,40%)] px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]"
          >
            <Radio className="h-4 w-4" /> Join Class Now
          </a>
        )}

        {/* Upcoming class time */}
        {!isLive && isUpcoming && isAvailable && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Calendar className="h-3 w-3" />
            <span>{formattedTime}</span>
          </div>
        )}

        {/* View Level link */}
        {isAvailable && !isLive && (
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 active:scale-[0.98]">
            View Level <ArrowRight className="h-4 w-4" />
          </button>
        )}

        {!isAvailable && (
          <div className="text-center text-xs text-muted-foreground py-2">Coming Soon</div>
        )}
      </div>
    </div>
  );
};

export default LevelCard;
