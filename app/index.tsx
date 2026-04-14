import Slider from "@react-native-community/slider";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Timer from "./Timer";
import BasicPopup from "./basicPopup";

export default function index() {
  // states
  const [timerSliderVisible, setTimerSliderVisible] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [stopStudySessionPopUp, setStopStudySessionPopup] = useState(false);

  // study button logic

  const handleStudySession = () => {
    setTimerSliderVisible(true);
  };
  const handlePause = () => {};
  const handleStopStudySession = () => {
    // stop the timer
    setTimerRunning(false);
    // display a popup
    setStopStudySessionPopup(true);
    //display the data
  };

  // UI
  return (
    <View>
      <Text>Hello, World!</Text>
      {/* penguin placeholder */}
      <Image
        source={require("../assets/pixelpenguin.png")}
        style={{ marginTop: 200, width: 200, height: 200, alignSelf: "center" }}
      />

      {/* Study button*/}
      <Pressable
        onPress={() => handleStudySession()}
        style={styles.studyButton}
      >
        <Text style={{ color: "#fff" }}>Start Study Session</Text>
      </Pressable>

      {/* Timer pop up (saves user study time)*/}
      <Modal visible={timerSliderVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.title}>Select Study Time</Text>

            <Text style={styles.value}>{time} min</Text>

            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={120}
              step={5}
              value={time}
              thumbTintColor="#007AFF"
              onValueChange={(val) => {
                setTime(val);
              }}
            />

            <Pressable
              style={styles.confirmButton}
              onPress={() => {
                setTimerSliderVisible(false);
                setTimerRunning(true);
              }}
            >
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* Show timer based off of time state*/}
      {timerRunning && !timerSliderVisible && (
        <Timer time={time} onTimeLeftChange={setTimeLeft} />
      )}

      {
        /* Resume here */ timerRunning && !timerSliderVisible && (
          <Pressable style={styles.studyButton} onPress={handlePause}>
            <Text style={styles.buttonText}>Pause</Text>
          </Pressable>
        )
      }
      {timerRunning && !timerSliderVisible && (
        <Pressable style={styles.studyButton} onPress={handleStopStudySession}>
          <Text style={styles.buttonText}>Stop Study Session</Text>
        </Pressable>
      )}
      {stopStudySessionPopUp && (
        <BasicPopup
          text={
            "You studied for " +
            /* time studied:*/ Math.ceil(time - timeLeft) +
            " minutes!"
          }
          buttonText={"Close"}
          visible={stopStudySessionPopUp}
          onClose={() => setStopStudySessionPopup(false)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  studyButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
    alignSelf: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // dark background
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  value: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 16,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
