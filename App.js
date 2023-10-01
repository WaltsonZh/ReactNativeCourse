import { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl, FlatList, SectionList } from 'react-native'

export default function App() {
  const [items, setItems] = useState([{ title: 'Title 1', data: ['Item 1-1', 'Item 1-2'] }])
  const [count, setCount] = useState(2)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setItems([...items, { title: `Title ${count}`, data: [`Item ${count}-1`, `Item ${count}-2`] }])
    setCount((preCount) => preCount + 1)
    setRefreshing(false)
  }

  return (
    <SectionList
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      keyExtractor={(item, index) => index.toString()}
      sections={items}
      renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
      renderSectionHeader={({ section }) => (
        <View style={styles.title}>
          <Text style={styles.text}>{section.title}</Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  title: {
    borderWidth: 2,
    backgroundColor: '#4ae1fa',
    fontSize: 40,
    fontStyle: 'italic',
  },
  text: {
    color: '#000000',
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
    borderWidth: 1,
  },
})
