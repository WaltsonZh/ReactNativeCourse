import { View, StyleSheet, Text } from 'react-native'
import GlobalStyle from '../utils/GlobalStyle'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

export default function Map(prop) {
  const { route } = prop

  const { city, lat, lng } = route.params

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, styles.text]}>{city}</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    margin: 10,
  },
  map: {
    width: '100%',
    height: '100%',
  },
})
