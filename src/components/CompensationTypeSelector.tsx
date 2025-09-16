import React from 'react'
import { TrendingUp, DollarSign } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

type CompensationType = 'options' | 'rsu'

interface CompensationTypeSelectorProps {
  selectedType: CompensationType
  onTypeChange: (type: CompensationType) => void
}

const CompensationTypeSelector: React.FC<CompensationTypeSelectorProps> = ({
  selectedType,
  onTypeChange
}) => {
  const { t } = useLanguage()

  return (
    <div className="card mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        {t('calc.type_selector.title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => onTypeChange('options')}
          className={`p-4 rounded-lg border-2 transition-colors ${selectedType === 'options'
            ? 'border-primary-500 bg-primary-50 text-primary-700'
            : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary-600" />
          <div className="text-center">
            <h3 className="font-semibold">{t('calc.type_selector.options')}</h3>
            <p className="text-sm text-gray-600 mt-1">{t('calc.type_selector.options_description')}</p>
          </div>
        </button>

        <button
          onClick={() => onTypeChange('rsu')}
          className={`p-4 rounded-lg border-2 transition-colors ${selectedType === 'rsu'
            ? 'border-primary-500 bg-primary-50 text-primary-700'
            : 'border-gray-200 hover:border-gray-300'
            }`}
        >
          <DollarSign className="w-8 h-8 mx-auto mb-2 text-success-600" />
          <div className="text-center">
            <h3 className="font-semibold">{t('calc.type_selector.rsu')}</h3>
            <p className="text-sm text-gray-600 mt-1">{t('calc.type_selector.rsu_description')}</p>
          </div>
        </button>
      </div>
    </div>
  )
}

export default CompensationTypeSelector
