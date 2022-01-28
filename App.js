import React, {useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  const buttons = ['AC','DEL','%','/',7,8,9,'*',4,5,6,'-',3,2,1,'+',0,'.','+/-','='];

  function calculator(){
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const operator = splitNumbers[1];
    const lastNumber = parseFloat(splitNumbers[2]);

    switch(operator){
      case '+':
        setCurrentNumber((firstNumber + lastNumber).toString())
        return
      case '-':
        setCurrentNumber((firstNumber - lastNumber).toString())
        return
      case '*':
        setCurrentNumber((firstNumber * lastNumber).toString())
        return
      case '/':
        setCurrentNumber((firstNumber / lastNumber).toString())
        return
    }
  }

  function handleInput(buttonPressed){
    if(
      buttonPressed === '+' | 
      buttonPressed === '-' | 
      buttonPressed === '*' |
      buttonPressed === '/'
      ){
      setCurrentNumber(currentNumber + ' ' + buttonPressed + ' ')
      return
    }
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length -1))
        return
      case 'AC':
        setLastNumber('')
        setCurrentNumber('')
        return
      case '=':
        setLastNumber(currentNumber + ' = ')
        calculator()
        return
      case '+/-':
       return 
    }
    setCurrentNumber(currentNumber + buttonPressed)
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? "#353b49" : "#f5f5f5",
      // alignItems: 'flex-end',
      // justifyContent: 'flex-end',
    },
    resultsHistory: {
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
      width: '100%',
      minHeight: '30%',
    },
    resultText: {
      alignSelf: 'flex-end',
      color: darkMode ? '#f5f5f5' : '#282F38',
      margin: 20,
      fontSize: 40,
    },
    historyText:{
      color: darkMode ? '#b5b7bb' : '#7c7c7c', 
      fontSize: 25,
      marginRight: 20,
      alignSelf: 'flex-end',
      
    },
    themeButton: {
      alignSelf: 'flex-start',
      marginTop: 50,
      marginLeft: 20,
      borderColor: darkMode 
        ? "rgba(245, 245, 245, 0.15)" 
        : "rgba(53, 59, 73, 0.4)",
      borderWidth: 1.2,
      backgroundColor: darkMode ? '#d2701d' : '#b7c0d1',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
      
    },
    buttons: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      height: '100%',
      padding: 8,
      backgroundColor: darkMode ? "#353b49" : "#f5f5f5",
    },
    button: {
      flex: 1,
      borderColor: darkMode 
        ? "rgba(245, 245, 245, 0.15)" 
        : "rgba(53, 59, 73, 0.4)",
      borderWidth: 1.2,
      alignItems: 'center',
      justifyContent: 'center',
      margin: 5,
      minWidth: 80,
      minHeight: 80,
      borderRadius: 24,
      shadowColor: darkMode ? "#1d242f" : "#232935",
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        elevation: 10
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#4c4c4c',
      fontSize: 24,
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton} activeOpacity={0.7}>
          <Entypo 
            name={darkMode ? 'light-up' : 'moon'} 
            size={24} 
            color={darkMode ? '#fff' : '#4c4c4c'}
            onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)}
          />
        </TouchableOpacity>
        <View style={styles.resultsHistory}>
          <Text style={styles.historyText}>{lastNumber}</Text>
          <Text style={styles.resultText}>{currentNumber}</Text>
        </View>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) => 
          button === '=' | 
          button === '+' | 
          button === '-' | 
          button === '*' | 
          button === '/'
          ?
          <TouchableOpacity
            activeOpacity={0.7}
            key={button} 
            style={[styles.button, {backgroundColor: '#d2701d'}]}
            onPress={() => handleInput(button)}
          >
            <Text style={[styles.textButton, {color: 'white', fontSize: 30}]}>{button}</Text>
          </TouchableOpacity>
          :
          <TouchableOpacity
            activeOpacity={0.7}
            key={button} 
            style={[styles.button, 
            {backgroundColor: 
              typeof(button) === 'number' | 
              button === '.' | 
              button === '+/-'  ? darkMode === true ? '#333645' : '#fff': darkMode === true ? '#5d687a' : '#b7c0d1'}
            ]}
            onPress={() => handleInput(button)}>
            <Text style={styles.textButton}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}