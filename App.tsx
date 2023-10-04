import { Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';

import { mmkvStorage } from './src/services/storage/mmkvStorage';
import { asyncStorage } from './src/services/storage/asyncStorage';
import { initializeStorage, storageService } from './src/services/storage/storageService';

interface User {
  name: string;
}

const mockedUser: User = {
  name: "John John"
}

initializeStorage(mmkvStorage)

export default function App() {
  const [user, setUser] = useState<User | null>(null)

  const loadData = async () => {
    try {
      const userData = await storageService.getItem<User>('my-app');

      if (userData) {
        setUser(userData)
      }
    } catch (e) {
      // handle error
    }
  };

  const login = async () => {
    try {
      await storageService.setItem('my-app', mockedUser);
      setUser(mockedUser)
    } catch (e) {
      // handle error
    }
  };

  const logout = async () => {
    try {
      await storageService.removeItem('my-app');
      setUser(null)
    } catch (e) {
      // handle error
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
