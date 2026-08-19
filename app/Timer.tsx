import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface TimerProps {
  time: number; // time in seconds
  isRunning: boolean;
  onTimeLeftChange: (secondsLeft: number) => void;
}

export default function Timer({ time, isRunning, onTimeLeftChange }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(time);

  useEffect(() => {
    setSecondsLeft(time);
    onTimeLeftChange(time);
  }, [time, onTimeLeftChange]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSecondsLeft((previousSeconds) => {
        if (previousSeconds <= 0) return previousSeconds;

        const nextSeconds = Math.max(previousSeconds - 1, 0);
        onTimeLeftChange(nextSeconds);
        return nextSeconds;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTimeLeftChange]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>
        {hours > 0 ? (
          <>
            {hours.toString().padStart(2, "0")}:
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </>
        ) : (
          <>
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </>
        )}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#007AFF",
  },
});
