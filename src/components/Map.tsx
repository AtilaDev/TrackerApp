import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

interface Props {
  markers: Marker[];
}

export default function Map({ markers }: Props) {
  const [showPolylines, setShowPolylines] = useState<boolean>(true);

  const {
    hasLocation,
    intialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();
  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>();

  useEffect(() => {
    followUserLocation();
    return () => {
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
        {showPolylines && (
          <Polyline
            coordinates={routeLines}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}

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

      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolylines(value => !value)}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
        }}
      />
    </>
  );
}
