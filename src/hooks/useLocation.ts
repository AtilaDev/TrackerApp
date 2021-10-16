import { useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/appInterfaces';

export default function useLocation() {
  const [hasLocation, setHasLocation] = useState(false);
  const [intialPosition, setIntialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    getCurrentLocation().then(location => {
      setIntialPosition(location);
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

  return {
    hasLocation,
    intialPosition,
    getCurrentLocation,
  };
}
