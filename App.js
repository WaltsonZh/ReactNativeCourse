import { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'

export default function App() {
  const [items, setItems] = useState([])
  const [count, setCount] = useState(0)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setItems([{ key: count, item: `Item ${count}` }, ...items])
    setCount((preCount) => preCount + 1)
    setRefreshing(false)
  }

  return (
    <ScrollView horizontal={false} style={styles.body} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#ff00ff']} />}>
      {items.map((item) => {
        return (
          <View key={item.key} style={styles.item}>
            <Text style={styles.text}>{item.item}</Text>
          </View>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  item: {
    backgroundColor: '#4ae1fa',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  text: {
    color: '#000000',
    fontSize: 35,
    fontStyle: 'italic',
    margin: 10,
  },
})
