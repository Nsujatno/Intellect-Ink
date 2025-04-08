import { useTimeTracker } from "../hooks/useTimeTracker";
import { useLocalSearchParams } from "expo-router";
import { ReactNode, useEffect } from "react";

interface TrackWrapperProps {
  children: ReactNode;
}

export default function TrackWrapper({ children }: TrackWrapperProps) {
  const { item } = useLocalSearchParams();
  const parseItem = JSON.parse(item as string);
  const tracker = useTimeTracker(parseItem.type);

  useEffect(() => {
    tracker.startTiming();

    return () => {
      tracker.stopTiming();
    };
  }, [parseItem.type]);

  return <>{children}</>;
}
