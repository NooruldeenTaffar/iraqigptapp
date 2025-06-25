import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      navigation.navigate('Login');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Name</Text>
      <TextInput value={form.name} onChangeText={v => handleChange('name', v)} />
      <Text>Email</Text>
      <TextInput value={form.email} onChangeText={v => handleChange('email', v)} />
      <Text>Password</Text>
      <TextInput secureTextEntry value={form.password} onChangeText={v => handleChange('password', v)} />
      <Text>Phone</Text>
      <TextInput value={form.phone} onChangeText={v => handleChange('phone', v)} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
