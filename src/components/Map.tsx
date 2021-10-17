import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

interface Props {
  markers: Marker[];
}

export default function Map({ markers }: Props) {
  const {
    hasLocation,
    intialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>();

  useEffect(() => {
    followUserLocation();
    return () => {
      // TODO: Implement follow cancel
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    // If following === false no follow the user
    if (!following.current) return;

    mapViewRef.current?.animateCamera({
      center: userLocation,
    });
  }, [userLocation]);

  const centerPosition = async () => {
    const location = await getCurrentLocation();

    following.current = true;

    mapViewRef.current?.animateCamera({
      center: location,
    });
  };

  if (!hasLocation) return <LoadingScreen />;

  return (
    <>
      <MapView
        // I set "el!" because at this point I'm sure that MapView was created successfully
        ref={el => (mapViewRef.current = el!)}
        style={{ flex: 1 }}
        // provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: intialPosition.latitude,
          longitude: intialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => (following.current = false)}>
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title="Title"
          description="Description"
        /> */}
      </MapView>

      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
}
