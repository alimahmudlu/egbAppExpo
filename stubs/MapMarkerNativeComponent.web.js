import React from 'react';
import { View } from 'react-native';

// Bu, react-native-maps-in MapMarkerNativeComponent.js modulunu
// veb üçün əvəz edəcək boş bir komponentdir.
export default function MapMarkerNativeComponent(props) {
    // Əgər Marker-in uşaq elementləri varsa, onları göstərək
    return <View style={props.style}>{props.children}</View>;
}