// src/components/ServiceList.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { db } from './firebase'; // Correct import statement
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const querySnapshot = await getDocs(collection(db, 'services'));
      setServices(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'services', id));
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <FlatList
      data={services}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.serviceItem}>
          <Text>{item.name}</Text>
          <Button title="Delete" onPress={() => handleDelete(item.id)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  serviceItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1 },
});

export default ServiceList;
