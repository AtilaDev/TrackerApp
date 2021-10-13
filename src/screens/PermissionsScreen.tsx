import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { PermissionsContext } from '../context/PermissionsContext';

export default function PermissionsScreen() {
  const { permissions, askLocationPermission } = useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text>PermissionsScreen</Text>

      <Button title="Permission" onPress={askLocationPermission} />

      <Text>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
