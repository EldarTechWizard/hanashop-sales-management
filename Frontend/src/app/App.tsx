import '@assets/styles/App.css'
import "@radix-ui/themes/styles.css";
import AppProvider from './provider'
import { AppRouter } from './router'

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App
