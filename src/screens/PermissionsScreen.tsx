import React from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

export default function PermissionsScreen() {
  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      // permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      // Android
      // I don't work this part because my focus is on iOS
      // All this practice is about React Native + TypeScript
      // Maybe in some future I'll add this part.
    }

    console.log({ permissionStatus });
  };

  return (
    <View style={styles.container}>
      <Text>PermissionsScreen</Text>

      <Button title="Permission" onPress={checkLocationPermission} />
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
