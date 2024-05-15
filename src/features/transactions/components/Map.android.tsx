import React from 'react';
import MapView, { PROVIDER_GOOGLE, MapViewProps } from 'react-native-maps';

export const Map = ({ children, ...rest }: MapViewProps) => (
  <MapView provider={PROVIDER_GOOGLE} {...rest}>
    {children}
  </MapView>
);