import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

interface TimerProps {
  time: number; // time in minutes
  onTimeLeftChange: (minutesLeft: number) => void;
}

export default function Timer({ time, onTimeLeftChange }: TimerProps) {
  const [secondsLeft, setSecondsLeft] = useState(time * 60);

  useEffect(() => {
    setSecondsLeft(time * 60);
  }, [time]);

  useEffect(() => {
    onTimeLeftChange(Math.ceil(secondsLeft / 60));
  }, [secondsLeft]);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

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
