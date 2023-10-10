import { store } from './src/redux/store'
import { Provider } from 'react-redux'
import Main from './src/Main'

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
