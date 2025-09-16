import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import CompensationTypeSelector from '../components/CompensationTypeSelector'
import OptionsCalculator from '../components/OptionsCalculator'
import RSUCalculator from '../components/RSUCalculator'
import TaxBracketsTable from '../components/TaxBracketsTable'

type CompensationType = 'options' | 'rsu'

const CalculatorPage: React.FC = () => {
  const { t } = useLanguage()
  const [compensationType, setCompensationType] = useState<CompensationType>('options')

  return (
    <div className="container">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {t('calc.hero.title')}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600">
            {t('calc.hero.subtitle')}
          </p>
        </div>

        {/* Type Selector */}
        <CompensationTypeSelector 
          selectedType={compensationType}
          onTypeChange={setCompensationType}
        />

        {/* Calculator Content */}
        {compensationType === 'options' && (
          <div className="space-y-8">
            <OptionsCalculator />
            <TaxBracketsTable />
          </div>
        )}

        {compensationType === 'rsu' && (
          <div className="space-y-8">
            <RSUCalculator />
            <TaxBracketsTable />
          </div>
        )}

        {/* Educational Links */}
        <div className="text-center mt-8 sm:mt-12 p-6 sm:p-8 bg-blue-50 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-4">
            {t('calc.cta.title')}
          </h2>
          <p className="text-blue-700 mb-6">
            {t('calc.cta.subtitle')}
          </p>
          <Link 
            to="/" 
            className="btn-primary inline-flex items-center space-x-2"
          >
            <span>{t('calc.cta.button')}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CalculatorPage
