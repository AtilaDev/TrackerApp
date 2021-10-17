import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export default function useLocation() {
  const [hasLocation, setHasLocation] = useState(false);
  const [intialPosition, setIntialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getCurrentLocation().then(location => {
      setIntialPosition(location);
      setUserLocation(location);
      setHasLocation(true);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        err => reject({ err }),
        {
          enableHighAccuracy: true,
        },
      );
    });
  };

  const followUserLocation = () => {
    Geolocation.watchPosition(
      ({ coords }) => {
        setUserLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
      err => console.log(err),
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
  };

  return {
    hasLocation,
    intialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
  };
}
