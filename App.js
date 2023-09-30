import { useState } from 'react'
import { StyleSheet, Text, View, Button, Linking } from 'react-native'

export default function App() {
  const [name, setName] = useState('Style Text')

  const onClickhandler = () => {
    setName('Style Test is Done!')
  }

  return (
    <View style={styles.body}>
      <View style={styles.container1}>
        <View style={[styles.item, styles.view1]}>
          <Text style={styles.text}>1</Text>
        </View>
        <View style={[styles.item, styles.view2]}>
          <Text style={styles.text}>2</Text>
        </View>
        <View style={[styles.item, styles.view3]}>
          <Text style={styles.text}>3</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={[styles.item, styles.view4]}>
          <Text style={styles.text}>4</Text>
        </View>
        <View style={[styles.item, styles.view5]}>
          <Text style={styles.text}>5</Text>
        </View>
      </View>
      <View style={styles.container3}>
        <View style={[styles.item, styles.view6]}>
          <Text style={styles.text}>6</Text>
        </View>
        <View style={[styles.item, styles.view7]}>
          <Text style={styles.text}>7</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'stretch',
  },
  item: {
    border: '1px solid #000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container1: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  view1: {
    flex: 1,
    backgroundColor: '#00ffff',
    height: '100%',
  },
  view2: {
    flex: 2,
    backgroundColor: '#ff00ff',
    height: '100%',
  },
  view3: {
    flex: 3,
    backgroundColor: '#ffff00',
    height: '100%',
  },
  container2: {
    height: 120,
  },
  view4: {
    flex: 1,
    backgroundColor: '#ff0000',
  },
  view5: {
    flex: 1,
    backgroundColor: '#00ff00',
  },
  container3: {
    flex: 1,
    flexDirection: 'row',
  },
  view6: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  view7: {
    backgroundColor: '#0000ff',
    flex: 1,
  },
  text: {
    color: '#000000',
    fontSize: 35,
    fontStyle: 'italic',
    margin: 10,
    textTransform: 'uppercase',
  },
})
