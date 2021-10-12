import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/navigation/Navigator';
import { PermissionsProvider } from './src/context/PermissionsContext';

const AppState = ({ children }: any) => (
  <PermissionsProvider>{children}</PermissionsProvider>
);

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <Navigator />
      </AppState>
    </NavigationContainer>
  );
}
