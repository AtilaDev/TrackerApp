import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

interface Props {
  markers: Marker[];
}

export default function Map({ markers }: Props) {
  const { hasLocation, intialPosition } = useLocation();

  if (!hasLocation) return <LoadingScreen />;

  return (
    <>
      <MapView
        style={{ flex: 1 }}
        // provider={PROVIDER_GOOGLE}
        showsUserLocation
        initialRegion={{
          latitude: intialPosition.latitude,
          longitude: intialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
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
        iconName="star-outline"
        onPress={() => console.log('Fab pressed')}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
    </>
  );
}
