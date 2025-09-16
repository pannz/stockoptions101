import React, { useState, useEffect } from 'react'
import { TrendingUp } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { calculateOptionsValue, getStepByStepTaxBreakdown, type OptionsCalculationResult } from '../lib/taxCalculator'

const OptionsCalculator: React.FC = () => {
  const { t } = useLanguage()

  const [optionsInputs, setOptionsInputs] = useState({
    annualSalaryCNY: 500000, // 50万人民币年薪
    shares: 1000,
    strikePriceUSD: 10,
    exercisePriceUSD: 50,
    salePriceUSD: '', // 可选
    exchangeRate: 7.2
  })

  const [optionsResult, setOptionsResult] = useState<OptionsCalculationResult | null>(null)

  // 计算期权收益
  useEffect(() => {
    const salePriceUSD = optionsInputs.salePriceUSD ? parseFloat(optionsInputs.salePriceUSD) : null
    const result = calculateOptionsValue(
      optionsInputs.annualSalaryCNY,
      optionsInputs.shares,
      optionsInputs.strikePriceUSD,
      optionsInputs.exercisePriceUSD,
      salePriceUSD,
      optionsInputs.exchangeRate
    )
    setOptionsResult(result)
  }, [optionsInputs])

  const handleInputChange = (field: string, value: string | number) => {
    setOptionsInputs(prev => ({ ...prev, [field]: value }))
  }

  const formatCurrency = (amount: number, currency: 'USD' | 'CNY') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatPercentage = (rate: number) => {
    return `${(rate * 100).toFixed(2)}%`
  }

  return (
    <div className="space-y-8">
      <div className="card">
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <h2 className="text-xl font-semibold">{t('calc.options.title')}</h2>
        </div>
        <p className="text-gray-600 mb-6">{t('calc.options.description')}</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('calc.options.inputs.annual_salary')}
              </label>
              <input
                type="number"
                value={optionsInputs.annualSalaryCNY}
                onChange={(e) => handleInputChange('annualSalaryCNY', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="500000"
              />
              <p className="text-xs text-gray-500 mt-1">{t('calc.options.inputs.annual_salary_help')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calc.options.inputs.shares')}
                </label>
                <input
                  type="number"
                  value={optionsInputs.shares}
                  onChange={(e) => handleInputChange('shares', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calc.options.inputs.exchange_rate')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={optionsInputs.exchangeRate}
                  onChange={(e) => handleInputChange('exchangeRate', parseFloat(e.target.value) || 7.2)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calc.options.inputs.strike_price')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={optionsInputs.strikePriceUSD}
                  onChange={(e) => handleInputChange('strikePriceUSD', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calc.options.inputs.exercise_price')}
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={optionsInputs.exercisePriceUSD}
                  onChange={(e) => handleInputChange('exercisePriceUSD', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('calc.options.inputs.future_sale_price')}
              </label>
              <input
                type="number"
                step="0.01"
                value={optionsInputs.salePriceUSD}
                onChange={(e) => handleInputChange('salePriceUSD', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={t('calc.options.inputs.future_sale_placeholder')}
              />
              <p className="text-xs text-gray-500 mt-1">{t('calc.options.inputs.future_sale_help')}</p>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {optionsResult && (
              <>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">{t('calc.options.results.gross_gain_usd')}</h3>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatCurrency(optionsResult.grossGainUSD, 'USD')}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    {formatCurrency(optionsResult.grossGainCNY, 'CNY')}
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">{t('calc.options.results.exercise_tax_rate')}</h3>
                  <p className="text-xl font-bold text-orange-900">
                    {formatPercentage(optionsResult.exerciseTaxRate)}
                  </p>
                  <p className="text-sm text-orange-700 mt-1">
                    {t('calc.options.labels.exercise_tax_label')}{formatCurrency(optionsResult.exerciseTaxAmount, 'CNY')}
                  </p>
                </div>

                {optionsResult.capitalGains > 0 && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">{t('calc.options.results.capital_gains_tax')}</h3>
                    <p className="text-lg font-bold text-purple-900">
                      {formatCurrency(optionsResult.capitalGainsTax, 'CNY')}
                    </p>
                    <p className="text-sm text-purple-700 mt-1">
                      {t('calc.options.labels.capital_gains_label')}{formatCurrency(optionsResult.capitalGains, 'CNY')} × 20%
                    </p>
                  </div>
                )}

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">{t('calc.options.results.total_tax')}</h3>
                  <p className="text-xl font-bold text-red-900">
                    {formatCurrency(optionsResult.totalTax, 'CNY')}
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    {t('calc.options.labels.effective_rate_label')}{formatPercentage(optionsResult.effectiveTaxRate)}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">{t('calc.options.results.net_gain_cny')}</h3>
                  <p className="text-2xl font-bold text-green-900">
                    {formatCurrency(optionsResult.netGainCNY, 'CNY')}
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    {formatCurrency(optionsResult.netGainUSD, 'USD')}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Detailed Calculation Breakdown */}
      {optionsResult && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('calc.options.calculation_breakdown.title')}
          </h3>

          <div className="space-y-6">
            {/* Step 1: Exercise Gain */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                {t('calc.options.calculation_breakdown.step1.title')}
              </h4>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-blue-700">
                  <strong>{t('calc.options.calculation_breakdown.formulas.exercise_gain_usd')}</strong>
                </p>
                <p className="text-blue-800 font-mono">
                  = ({optionsInputs.exercisePriceUSD} - {optionsInputs.strikePriceUSD}) × {optionsInputs.shares}
                </p>
                <p className="text-blue-800 font-mono">
                  = {formatCurrency(optionsResult.grossGainUSD, 'USD')}
                </p>
                <p className="text-sm text-blue-700 mt-3">
                  <strong>{t('calc.options.calculation_breakdown.formulas.exercise_gain_cny')}</strong>
                </p>
                <p className="text-blue-800 font-mono">
                  = {formatCurrency(optionsResult.grossGainUSD, 'USD')} × {optionsInputs.exchangeRate}
                </p>
                <p className="text-blue-800 font-mono">
                  = {formatCurrency(optionsResult.grossGainCNY, 'CNY')}
                </p>
              </div>
            </div>

            {/* Step 2: Exercise Tax */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-orange-800 mb-2">
                {t('calc.options.calculation_breakdown.step2.title')}
              </h4>
              <div className="bg-orange-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-orange-700 mb-4">
                  <strong>{t('calc.options.calculation_breakdown.tax_breakdown_title')}</strong>
                </p>
                {(() => {
                  const breakdown = getStepByStepTaxBreakdown(optionsInputs.annualSalaryCNY, optionsResult.grossGainCNY)
                  return (
                    <div className="space-y-4">
                      {/* 基本信息 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="bg-orange-100 p-3 rounded">
                          <p className="text-orange-700 font-medium mb-1">{t('calc.options.calculation_breakdown.before_exercise')}</p>
                          <p className="text-orange-800">{t('calc.options.calculation_breakdown.annual_income')}{formatCurrency(breakdown.currentIncome, 'CNY')}</p>
                          <p className="text-orange-800">{t('calc.options.calculation_breakdown.taxable_income')}{formatCurrency(breakdown.currentTaxableIncome, 'CNY')}</p>
                          <p className="text-orange-800">{t('calc.options.calculation_breakdown.tax_amount')}{formatCurrency(breakdown.currentTax, 'CNY')}</p>
                        </div>
                        <div className="bg-orange-100 p-3 rounded">
                          <p className="text-orange-700 font-medium mb-1">{t('calc.options.calculation_breakdown.after_exercise')}</p>
                          <p className="text-orange-800">{t('calc.options.calculation_breakdown.total_income')}{formatCurrency(breakdown.currentIncome + breakdown.additionalIncome, 'CNY')}</p>
                          <p className="text-orange-800">{t('calc.options.calculation_breakdown.taxable_income')}{formatCurrency(breakdown.newTaxableIncome, 'CNY')}</p>
                          <p className="text-orange-800">{t('calc.options.calculation_breakdown.tax_amount')}{formatCurrency(breakdown.totalTax, 'CNY')}</p>
                        </div>
                      </div>

                      {/* 期权收益的阶梯分布 */}
                      <div>
                        <p className="text-orange-700 font-medium mb-2">{t('calc.options.calculation_breakdown.option_income_distribution')}</p>
                        <div className="space-y-2">
                          {breakdown.additionalTaxBrackets.map((detail, index) => (
                            <div key={index} className="flex justify-between items-center bg-white p-2 rounded border">
                              <div className="flex-1">
                                <span className="text-sm text-gray-600">
                                  {detail.bracket.max === Infinity
                                    ? `${detail.bracket.min.toLocaleString()}元以上`
                                    : `${detail.bracket.min.toLocaleString()}-${detail.bracket.max.toLocaleString()}元`
                                  } {t('calc.options.calculation_breakdown.tax_bracket')} ({formatPercentage(detail.bracket.rate)})
                                </span>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-800">
                                  {formatCurrency(detail.taxableInThisBracket, 'CNY')} × {formatPercentage(detail.bracket.rate)}
                                </p>
                                <p className="text-sm font-medium text-orange-800">
                                  = {formatCurrency(detail.taxInThisBracket, 'CNY')}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* 汇总 */}
                      <div className="border-t border-orange-200 pt-3">
                        <div className="bg-orange-100 p-3 rounded">
                          <p className="text-orange-700 font-medium">{t('calc.options.calculation_breakdown.option_tax_summary')}</p>
                          <p className="text-orange-800 font-mono">
                            {t('calc.options.calculation_breakdown.total_tax_burden')} = {breakdown.additionalTaxBrackets.map(b => formatCurrency(b.taxInThisBracket, 'CNY')).join(' + ')}
                          </p>
                          <p className="text-orange-800 font-mono">
                            = {formatCurrency(breakdown.additionalTax, 'CNY')}
                          </p>
                          <p className="text-orange-800 font-mono mt-2">
                            {t('calc.options.calculation_breakdown.actual_marginal_rate')} = {formatCurrency(breakdown.additionalTax, 'CNY')} ÷ {formatCurrency(breakdown.additionalIncome, 'CNY')} = {formatPercentage(breakdown.marginalRate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })()}
                <p className="text-sm text-orange-700 mt-3">
                  <strong>{t('calc.options.calculation_breakdown.formulas.exercise_tax')}</strong>
                </p>
                <p className="text-orange-800 font-mono">
                  = {formatCurrency(optionsResult.grossGainCNY, 'CNY')} × {formatPercentage(optionsResult.exerciseTaxRate)}
                </p>
                <p className="text-orange-800 font-mono">
                  = {formatCurrency(optionsResult.exerciseTaxAmount, 'CNY')}
                </p>
              </div>
            </div>

            {/* Step 3: Capital Gains Tax (if applicable) */}
            {optionsResult.capitalGains > 0 && (
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-800 mb-2">
                  {t('calc.options.calculation_breakdown.step3.title')}
                </h4>
                <div className="bg-purple-50 p-4 rounded-lg space-y-2">
                  <p className="text-sm text-purple-700">
                    <strong>{t('calc.options.calculation_breakdown.formulas.capital_gains')}</strong>
                  </p>
                  <p className="text-purple-800 font-mono">
                    = ({optionsInputs.salePriceUSD} - {optionsInputs.exercisePriceUSD}) × {optionsInputs.shares} × {optionsInputs.exchangeRate}
                  </p>
                  <p className="text-purple-800 font-mono">
                    = {formatCurrency(optionsResult.capitalGains, 'CNY')}
                  </p>
                  <p className="text-sm text-purple-700 mt-3">
                    <strong>{t('calc.options.calculation_breakdown.formulas.capital_gains_tax')}</strong>
                  </p>
                  <p className="text-purple-800 font-mono">
                    = {formatCurrency(optionsResult.capitalGains, 'CNY')} × 20%
                  </p>
                  <p className="text-purple-800 font-mono">
                    = {formatCurrency(optionsResult.capitalGainsTax, 'CNY')}
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Final Calculation */}
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-green-800 mb-2">
                {t('calc.options.calculation_breakdown.step4.title')}
              </h4>
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-green-700">
                  <strong>{t('calc.options.calculation_breakdown.formulas.total_tax')}</strong>
                </p>
                <p className="text-green-800 font-mono">
                  = {formatCurrency(optionsResult.exerciseTaxAmount, 'CNY')} + {formatCurrency(optionsResult.capitalGainsTax, 'CNY')}
                </p>
                <p className="text-green-800 font-mono">
                  = {formatCurrency(optionsResult.totalTax, 'CNY')}
                </p>
                <p className="text-sm text-green-700 mt-3">
                  <strong>{t('calc.options.calculation_breakdown.formulas.net_gain')}</strong>
                </p>
                <p className="text-green-800 font-mono">
                  = {formatCurrency(optionsResult.grossGainCNY, 'CNY')} - {formatCurrency(optionsResult.totalTax, 'CNY')}
                </p>
                <p className="text-green-800 font-mono text-lg">
                  = <strong>{formatCurrency(optionsResult.netGainCNY, 'CNY')}</strong>
                </p>
                <p className="text-green-700 text-sm mt-2">
                  实际税率：{formatPercentage(optionsResult.effectiveTaxRate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OptionsCalculator
