import React from 'react'
import { AlertCircle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { chinaTaxBrackets } from '../lib/taxCalculator'

const TaxBracketsTable: React.FC = () => {
  const { t } = useLanguage()

  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(0)}%`
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {t('calc.options.tax_brackets.title')}
      </h3>
      <p className="text-gray-600 mb-4">{t('calc.options.tax_brackets.description')}</p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 font-medium">{t('calc.options.tax_brackets.table.headers.taxable_income')}</th>
              <th className="text-left p-3 font-medium">{t('calc.options.tax_brackets.table.headers.tax_rate')}</th>
              <th className="text-left p-3 font-medium">{t('calc.options.tax_brackets.table.headers.quick_deduction')}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {chinaTaxBrackets.map((bracket, index) => (
              <tr key={index}>
                <td className="p-3">
                  {bracket.max === Infinity
                    ? `${bracket.min.toLocaleString()} ${t('calc.options.tax_brackets.table.income_range_above')}`
                    : `${bracket.min.toLocaleString()} - ${bracket.max.toLocaleString()}`
                  }
                </td>
                <td className="p-3 font-medium">{formatPercentage(bracket.rate)}</td>
                <td className="p-3">{bracket.deduction.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">{t('calc.options.tax_brackets.explanation.title')}</p>
            <p>• {t('calc.options.tax_brackets.explanation.taxable_income_formula')}</p>
            <p>• {t('calc.options.tax_brackets.explanation.marginal_rate_explanation')}</p>
            <p>• {t('calc.options.tax_brackets.explanation.capital_gains_rate')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaxBracketsTable
