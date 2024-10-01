import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const ServiceForm = ({ navigation, route }) => {
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');

  const handleAddService = async () => {
    if (serviceName.trim() && servicePrice.trim()) {
      try {
        // Add the service to Firestore
        const docRef = await addDoc(collection(db, 'services'), {
          name: serviceName,
          price: parseFloat(servicePrice)
        });
        
        // Call the refresh function passed from HomeScreen
        if (route.params?.refreshServices) {
          route.params.refreshServices();
        }
        
        // Show success message
        Alert.alert('Success', 'Service added successfully!', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } catch (error) {
        Alert.alert('Error', 'Error adding service: ' + error.message);
      }
    } else {
      Alert.alert('Error', 'Both service name and price are required');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Service Name"
        value={serviceName}
        onChangeText={setServiceName}
      />
      <TextInput
        style={styles.input}
        placeholder="Service Price"
        value={servicePrice}
        onChangeText={setServicePrice}
        keyboardType="numeric"
      />
      <Button title="Save Service" onPress={handleAddService} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default ServiceForm;