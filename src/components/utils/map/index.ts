import { useTheme } from 'styled-components';

export { default as GoogleMap } from './map';

export const MapStyles = () => {
  const labels = 'labels.text.fill';

  const theme = useTheme();

  /* eslint-disable prettier/prettier */
  const styles = [
    {elementType: 'geometry',
      stylers: [{color: theme.colors.black212}]},
    {elementType: 'labels.icon',
      stylers: [{visibility: 'off'}]},
    {elementType: labels,
      stylers: [{color: theme.colors.grey757}]},
    {elementType: 'labels.text.stroke',
      stylers: [{color: theme.colors.black212}]},
    {featureType: 'administrative',
      elementType: 'geometry',
      stylers: [{color: theme.colors.grey757},
    {visibility: 'off'}]},
    {featureType: 'administrative.country',
      elementType: labels,
      stylers: [{color: theme.colors.grey9E9}]},
    {featureType: 'administrative.locality',
      elementType: labels,
      stylers: [{color: theme.colors.greyBDB}]},
    {featureType: 'poi',
      stylers: [{visibility: 'off'}]},
    {featureType: 'poi',
      elementType: labels,
      stylers: [{color: theme.colors.grey757}]},
    {featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: theme.colors.black181}]},
    {featureType: 'poi.park',
      elementType: labels,
      stylers: [{color: theme.colors.grey616}]},
    {featureType: 'poi.park',
      elementType: 'labels.text.stroke',
      stylers: [{color: theme.colors.black1B1}]},
    {featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [{color: theme.colors.grey2C2}]},
    {featureType: 'road',
      elementType: 'labels.icon',
      stylers: [{visibility: 'off'}]},
    {featureType: 'road',
      elementType: labels,
      stylers: [{color: theme.colors.grey8A8}]},
    {featureType: 'road.arterial',
      elementType: 'geometry',
      stylers: [{color: theme.colors.grey373}]},
    {featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: theme.colors.grey3C3}]},
    {featureType: 'road.highway.controlled_access',
      elementType: 'geometry',
      stylers: [{color: theme.colors.grey4E4}]},
    {featureType: 'road.local',
      elementType: labels,
      stylers: [{color: theme.colors.grey616}]},
    {featureType: 'transit',
      stylers: [{visibility: 'off'}]},
    {featureType: 'transit',
      elementType: labels,
      stylers: [{color: theme.colors.grey757}]},
    {featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: theme.colors.black000}]},
    {featureType: 'water',
      elementType: labels,
      stylers: [{color: theme.colors.grey3D3}]}];
  /* eslint-enable prettier/prettier */
  return { styles };
};
