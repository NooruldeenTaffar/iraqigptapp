import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

export default function PropertyListScreen() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => setProperties(res.data));
  }, []);

  return (
    <FlatList
      data={properties}
      keyExtractor={item => item._id}
      renderItem={({ item }) => (
        <View style={{ padding: 16 }}>
          <Text>{item.title}</Text>
          <Text>{item.city} - {item.price} IQD</Text>
        </View>
      )}
    />
  );
}
