import { Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Layout from './components/Layout'
import InfoPage from './pages/InfoPage'
import CalculatorPage from './pages/CalculatorPage'

function App() {
  return (
    <LanguageProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<InfoPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
        </Routes>
      </Layout>
    </LanguageProvider>
  )
}

export default App
