import { useEffect, useState } from 'react';
import { Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  name: string;
}

const mockedUser: User = {
  name: "John John"
}

export default function App() {
  const [user, setUser] = useState<User | null>(null)

  const loadData = async () => {
    try {
      const stringUser = await AsyncStorage.getItem('my-app');

      if (stringUser) {
        const userData = JSON.parse(stringUser)
        setUser(userData)
      }
    } catch (e) {
      // saving error
    }
  };

  const login = async () => {
    try {
      const jsonValue = JSON.stringify(mockedUser);
      await AsyncStorage.setItem('my-app', jsonValue);
      setUser(mockedUser)
    } catch (e) {
      // saving error
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('my-app');
      setUser(null)
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    loadData()
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
      {user?.name ? (
        <Text>Usuário logado: {user.name}</Text>
      ) : (
        <Text>Não existe usuário</Text>
      )}

      <Button title='Fazer login' onPress={login} />
      <Button title='Fazer logout' onPress={logout} />
    </View>
  );
}
