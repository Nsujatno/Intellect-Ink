import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useTimeTracker(category: string) {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalTime, setTotalTime] = useState(0);

  const storeTimeSpent = async (category: string, timeSpent: number) => {
    try {
      await AsyncStorage.setItem(category, timeSpent.toString());
    } catch (error) {
      // console.error("Failed to save time to AsyncStorage:", error);
    }
  };

  const loadSavedTime = async () => {
    try {
      const savedTime = await AsyncStorage.getItem(category);
      if (savedTime) {
        setTotalTime(parseInt(savedTime, 10));
      }
    } catch (error) {
    }
  };

  useEffect(() => {
    loadSavedTime();
  }, [category]);

  const startTiming = () => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const stopTiming = () => {
    if (startTime) {
      const timeSpent = Math.floor((Date.now() - startTime) / 1000); // seconds
      setTotalTime((prev) => prev + timeSpent);
      setStartTime(null);

      storeTimeSpent(category, totalTime + timeSpent);
    }
  };

  useEffect(() => {
    return () => stopTiming();
  }, []);

  return { startTiming, stopTiming, totalTime };
}

export default useTimeTracker;
