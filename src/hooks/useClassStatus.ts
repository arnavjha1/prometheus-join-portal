import { useMemo } from "react";

interface NextClass {
  startTime: string;
  durationMinutes: number;
  classLink: string;
}

export function useClassStatus(nextClass: NextClass | null) {
  return useMemo(() => {
    if (!nextClass) return { isLive: false, isUpcoming: false, formattedTime: "" };

    const now = new Date();
    const start = new Date(nextClass.startTime);
    const end = new Date(start.getTime() + nextClass.durationMinutes * 60_000);
    // Show "Join Class" button 15 minutes before start and throughout duration
    const earlyStart = new Date(start.getTime() - 15 * 60_000);

    const isLive = now >= earlyStart && now <= end;
    const isUpcoming = now < start;

    const formattedTime = start.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

    return { isLive, isUpcoming, formattedTime };
  }, [nextClass]);
}
