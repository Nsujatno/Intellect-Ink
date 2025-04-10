import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useTimeTracker(category: string) {
  const [startTime, setStartTime] = useState<number | null>(null);

  const storeTimeSpent = async (timeToAdd: number) => {
    try {
      // get existing time and add new time
      const savedTime = await AsyncStorage.getItem(category);
      const currentTime = savedTime ? parseInt(savedTime, 10) : 0;
      const newTotalTime = currentTime + timeToAdd;
      
      await AsyncStorage.setItem(category, newTotalTime.toString());
    } catch (error) {
      console.error("Failed to save time:", error);
    }
  };

  const startTiming = () => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const stopTiming = async () => {
    if (startTime) {
      const timeSpentMs = Date.now() - startTime;
      await storeTimeSpent(timeSpentMs); // store in milliseconds
      setStartTime(null);
    }
  };

  useEffect(() => {
    return () => {
      if (startTime) {
        stopTiming();
      }
    };
  }, [startTime]); // rerun if startTime changes

  return { startTiming, stopTiming };
}

export default useTimeTracker;