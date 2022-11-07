import { StyleSheet } from 'react-native';
import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { AuthContextProvider } from './src/context/AuthContext';

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes/';

import { THEME } from './src/styles/theme';

export default function App() {
  const [fontsloaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
        {
          fontsloaded ? <Routes /> : <Loading />
        }
      </AuthContextProvider>
    </NativeBaseProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
