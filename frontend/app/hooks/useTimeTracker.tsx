import { useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function useTimeTracker(category: string) {
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null); // Tracks when timing starts

  // Load saved time when category changes
  useEffect(() => {
    const loadTime = async () => {
      try {
        const savedTime = await AsyncStorage.getItem(category);
        if (savedTime) {
          setTimeSpent(parseInt(savedTime, 10));
        }
      } catch (error) {
        console.error("Failed to load time from AsyncStorage:", error);
      }
    };

    loadTime();
  }, [category]);

  const startTiming = () => {
    startTimeRef.current = Date.now(); // Capture the start time
  };

  // Stop timing and save data
  const stopTiming = async () => {
    if (startTimeRef.current) {
      const elapsed = Date.now() - startTimeRef.current;
      const updatedTime = timeSpent + elapsed;

      setTimeSpent(updatedTime); // Update state
      startTimeRef.current = null; // Clear

      try {
        await AsyncStorage.setItem(category, updatedTime.toString());
      } catch (error) {
        console.error("Failed to save time to AsyncStorage:", error);
      }
    }
  };

  return { timeSpent, startTiming, stopTiming };
}

export default useTimeTracker;