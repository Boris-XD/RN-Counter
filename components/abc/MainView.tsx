import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Pressable } from 'react-native';

const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
const colors = ['#FF6347', '#FFD700', '#90EE90', '#87CEEB', '#FFA07A', '#E6E6FA', '#AFEEEE', '#FAFAD2', '#B0E0E6'];

const shuffleArray = (array: Array<number>) => {
  return array.sort(() => Math.random() - 0.5);
};

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

var shuffledNumbers = shuffleArray(numbers);  

export default function MainView() {
  
  const [timer, setTimer] = useState(20); // Iniciar en 30 segundos
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(1);
  const [colors, setColors] = useState(getRandomColor());

  useEffect(() => {
    let interval:any;

    if (isRunning && count <= 20) {
      interval = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            alert('¡Tiempo terminado!');
            return 100;  // Reiniciar a 30 segundos
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    if (count > 20) {
      alert('¡Bravo!');
      setIsRunning(false);  // Detener el timer
    }

    return () => clearInterval(interval);  // Limpiar intervalos
  }, [isRunning, count]); 

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.timerText}>{timer}</Text>
      <TouchableOpacity onPress={handleStartStop} style={styles.button}>
        <Text style={styles.buttonTextStart}>
          {isRunning ? 'Pausar' : 'Iniciar'}
        </Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => { setCount(1); setTimer(50); }}
      >
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Restart</Text>
      </Pressable>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{count - 1}</Text>
      <View style={styles.grid}>
        {shuffledNumbers.map((num) => (
          <Pressable
            key={num}
            style={[styles.buttonWrapper, { backgroundColor: getRandomColor() }]}
            onPress={() => num == (count)? setCount(count + 1): alert('Mal !')}
          >
            <Text style={styles.buttonText}>{`${num}`}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: '20%',
    margin: 5,
    padding: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'blue',
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  buttonTextStart: {
    color: 'blue',
    fontSize: 10,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  timerText: {
    fontSize: 80,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
});

function rgb(arg0: number, arg1: number, arg2: number): any {
  throw new Error('Function not implemented.');
}
