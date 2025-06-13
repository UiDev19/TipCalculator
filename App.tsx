import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
  Pressable,
} from 'react-native';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { RadioButton } from 'react-native-paper';

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState<string>('');

  const [tipPercent, setTipPercent] = useState<string>('15');

  const [tipAmount, setTipAmount] = useState<number>(0);

  const [totalAmount, setTotalAmount] = useState<number>(0);

  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    const bill = parseFloat(billAmount);

    const tip = parseFloat(tipPercent);

    if (!isNaN(bill) && !isNaN(tip)) {
      const tipValue = bill * (tip / 100);

      const total = bill + tipValue;

      setTipAmount(tipValue);

      setTotalAmount(total);
    } else {
      setTipAmount(0);

      setTotalAmount(0);
    }
  }, [billAmount, tipPercent]);

  const submitFeedback = () => {
    Alert.alert('Thank you!', `Feedback submitted: ${feedback}`);
  };

  const resetForm = () => {
    setBillAmount('');

    setTipPercent('10');

    setFeedback('');

    setTipAmount(0);

    setTotalAmount(0);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Tip Calculator</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter bill amount"
            keyboardType="numeric"
            value={billAmount}
            onChangeText={setBillAmount}
          />
          <Text style={styles.label}>Select Tip Percentage:</Text>
          <RadioButton.Group onValueChange={setTipPercent} value={tipPercent}>
            <View style={styles.radioGroup}>
              <View style={styles.radioOption}>
                <RadioButton value="10" />
                <Text>10%</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="15" />
                <Text>15%</Text>
              </View>
              <View style={styles.radioOption}>
                <RadioButton value="20" />
                <Text>20%</Text>
              </View>
            </View>
          </RadioButton.Group>
          <Text style={styles.result}>Tip: ${tipAmount.toFixed(2)}</Text>
          <Text style={styles.result}>Total: ${totalAmount.toFixed(2)}</Text>
          <TextInput
            style={styles.input}
            placeholder="Leave your feedback (optional)"
            value={feedback}
            onChangeText={setFeedback}
          />
          <TouchableOpacity style={styles.button} onPress={submitFeedback}>
            <Text style={styles.buttonText}>Submit Feedback</Text>
          </TouchableOpacity>
          <Button title="Reset" onPress={resetForm} color="red" />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',

    padding: 20,

    backgroundColor: '#f5f5f5',
  },

  title: {
    fontSize: 24,

    fontWeight: 'bold',

    textAlign: 'center',

    marginBottom: 20,
  },

  input: {
    borderWidth: 1,

    borderColor: '#ccc',

    borderRadius: 5,

    padding: 10,

    marginBottom: 15,

    backgroundColor: 'white',
  },

  label: {
    marginBottom: 8,

    fontWeight: '500',
  },

  radioGroup: {
    flexDirection: 'row',

    justifyContent: 'space-around',

    marginBottom: 20,
  },

  radioOption: {
    flexDirection: 'row',

    alignItems: 'center',
  },

  result: {
    fontSize: 18,

    marginBottom: 10,
  },

  button: {
    backgroundColor: '#4CAF50',

    padding: 12,

    alignItems: 'center',

    borderRadius: 5,

    marginVertical: 10,
  },

  buttonText: {
    color: 'white',

    fontWeight: 'bold',
  },
});

export default TipCalculator;
