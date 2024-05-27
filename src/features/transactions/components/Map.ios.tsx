import React from 'react';
import MapView, { MapViewProps } from 'react-native-maps';

export const Map = ({ children, ...rest }: MapViewProps) => (
  <MapView {...rest}>
    {children}
  </MapView>
);