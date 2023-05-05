import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Stopwatch(props) {
  const [isRunning, setIsRunning] = React.useState(false);
  
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (props.currentTime !== undefined) {
      setTimeElapsed(props.currentTime);
    }
  }, [props.currentTime]);

  function handleStart() {
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);
  }

  function handleStop() {
    setIsRunning(false);
    clearInterval(timerRef.current);
    if (props.onStop) {
      props.onStop(timeElapsed);
    }
  }

  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // if (timeElapsed === 120) {
  //   handleStop();
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{formatTime(timeElapsed)}</Text>
      {isRunning ? (
        <TouchableOpacity style={styles.button} onPress={handleStop}>
          <Text style={styles.buttonText}>Stop</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start Round</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Stopwatch;