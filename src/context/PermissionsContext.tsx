import React, { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  openSettings,
} from 'react-native-permissions';

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({ children }: any) => {
  const handleAppStateChange = (state: string) => {
    if (state !== 'active') return;

    checkLocationPermission();
  };

  useEffect(() => {
    handleAppStateChange(AppState.currentState);

    AppState.addEventListener('change', handleAppStateChange);
  }, []);

  const [permissions, setPermissions] = useState(permissionInitState);

  const askLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      // Android
      // I don't work this part because my focus is on iOS
      // All this practice is about React Native + TypeScript
      // Maybe in some future I'll add this part.
    }

    if (permissionStatus! === 'blocked') {
      openSettings();
    }

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus!,
    });
  };
  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      // Android
      // I don't work this part because my focus is on iOS
      // All this practice is about React Native + TypeScript
      // Maybe in some future I'll add this part.
    }

    setPermissions({
      ...permissions,
      locationStatus: permissionStatus!,
    });
  };

  return (
    <PermissionsContext.Provider
      value={{ permissions, askLocationPermission, checkLocationPermission }}>
      {children}
    </PermissionsContext.Provider>
  );
};
