import React, { useState, useEffect } from 'react'
import { DollarSign } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { calculateRSUValue, getStepByStepTaxBreakdown, type RSUCalculationResult } from '../lib/taxCalculator'

const RSUCalculator: React.FC = () => {
  const { t } = useLanguage()

  const [rsuInputs, setRSUInputs] = useState({
    annualSalaryCNY: 500000, // 50万人民币年薪
    vestedShares: 400,
    vestingPriceUSD: 50,
    salePriceUSD: '', // 可选
    exchangeRate: 7.2
  })

  const [rsuResult, setRSUResult] = useState<RSUCalculationResult | null>(null)

  // 计算RSU收益
  useEffect(() => {
    const salePriceUSD = rsuInputs.salePriceUSD ? parseFloat(rsuInputs.salePriceUSD) : null
    const result = calculateRSUValue(
      rsuInputs.annualSalaryCNY,
      rsuInputs.vestedShares,
      rsuInputs.vestingPriceUSD,
      salePriceUSD,
      rsuInputs.exchangeRate
    )
    setRSUResult(result)
  }, [rsuInputs])

  const handleRSUInputChange = (field: string, value: string | number) => {
    setRSUInputs(prev => ({ ...prev, [field]: value }))
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
          <DollarSign className="w-5 h-5 text-success-600" />
          <h2 className="text-xl font-semibold">{t('calc.rsu.title')}</h2>
        </div>
        <p className="text-gray-600 mb-6">{t('calc.rsu.description')}</p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('calc.rsu.inputs.annual_salary')}
              </label>
              <input
                type="number"
                value={rsuInputs.annualSalaryCNY}
                onChange={(e) => handleRSUInputChange('annualSalaryCNY', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="500000"
              />
              <p className="text-xs text-gray-500 mt-1">{t('calc.rsu.inputs.annual_salary_help')}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calc.rsu.inputs.vested_shares')}
                </label>
                <input
                  type="number"
                  value={rsuInputs.vestedShares}
                  onChange={(e) => handleRSUInputChange('vestedShares', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('calc.rsu.inputs.exchange_rate')}
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={rsuInputs.exchangeRate}
                  onChange={(e) => handleRSUInputChange('exchangeRate', parseFloat(e.target.value) || 7.2)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('calc.rsu.inputs.vesting_price')}
              </label>
              <input
                type="number"
                step="0.01"
                value={rsuInputs.vestingPriceUSD}
                onChange={(e) => handleRSUInputChange('vestingPriceUSD', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('calc.rsu.inputs.future_sale_price')}
              </label>
              <input
                type="number"
                step="0.01"
                value={rsuInputs.salePriceUSD}
                onChange={(e) => handleRSUInputChange('salePriceUSD', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder={t('calc.rsu.inputs.future_sale_placeholder')}
              />
              <p className="text-xs text-gray-500 mt-1">{t('calc.rsu.inputs.future_sale_help')}</p>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            {rsuResult && (
              <>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">{t('calc.rsu.results.vested_value_usd')}</h3>
                  <p className="text-2xl font-bold text-blue-900">
                    {formatCurrency(rsuResult.vestedValueUSD, 'USD')}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    {formatCurrency(rsuResult.vestedValueCNY, 'CNY')}
                  </p>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">{t('calc.rsu.results.vesting_tax_rate')}</h3>
                  <p className="text-xl font-bold text-orange-900">
                    {formatPercentage(rsuResult.vestingTaxRate)}
                  </p>
                  <p className="text-sm text-orange-700 mt-1">
                    {t('calc.rsu.labels.vesting_tax_label')}{formatCurrency(rsuResult.vestingTaxAmount, 'CNY')}
                  </p>
                </div>

                {rsuResult.capitalGains > 0 && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-purple-800 mb-2">{t('calc.rsu.results.capital_gains_tax')}</h3>
                    <p className="text-lg font-bold text-purple-900">
                      {formatCurrency(rsuResult.capitalGainsTax, 'CNY')}
                    </p>
                    <p className="text-sm text-purple-700 mt-1">
                      {t('calc.rsu.labels.capital_gains_label')}{formatCurrency(rsuResult.capitalGains, 'CNY')} × 20%
                    </p>
                  </div>
                )}

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">{t('calc.rsu.results.total_tax')}</h3>
                  <p className="text-xl font-bold text-red-900">
                    {formatCurrency(rsuResult.totalTax, 'CNY')}
                  </p>
                  <p className="text-sm text-red-700 mt-1">
                    {t('calc.rsu.labels.effective_rate_label')}{formatPercentage(rsuResult.effectiveTaxRate)}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">{t('calc.rsu.results.net_gain_cny')}</h3>
                  <p className="text-2xl font-bold text-green-900">
                    {formatCurrency(rsuResult.netGainCNY, 'CNY')}
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    {formatCurrency(rsuResult.netGainUSD, 'USD')}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* RSU Detailed Calculation Breakdown */}
      {rsuResult && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            {t('calc.rsu.calculation_breakdown.title')}
          </h3>

          <div className="space-y-6">
            {/* Step 1: Vesting Value */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-blue-800 mb-2">
                {t('calc.rsu.calculation_breakdown.step1.title')}
              </h4>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-blue-700">
                  <strong>{t('calc.rsu.calculation_breakdown.formulas.vesting_value_usd')}</strong>
                </p>
                <p className="text-blue-800 font-mono">
                  = {rsuInputs.vestedShares} × {rsuInputs.vestingPriceUSD}
                </p>
                <p className="text-blue-800 font-mono">
                  = {formatCurrency(rsuResult.vestedValueUSD, 'USD')}
                </p>
                <p className="text-sm text-blue-700 mt-3">
                  <strong>{t('calc.rsu.calculation_breakdown.formulas.vesting_value_cny')}</strong>
                </p>
                <p className="text-blue-800 font-mono">
                  = {formatCurrency(rsuResult.vestedValueUSD, 'USD')} × {rsuInputs.exchangeRate}
                </p>
                <p className="text-blue-800 font-mono">
                  = {formatCurrency(rsuResult.vestedValueCNY, 'CNY')}
                </p>
              </div>
            </div>

            {/* Step 2: Vesting Tax with Step-by-step breakdown */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-orange-800 mb-2">
                {t('calc.rsu.calculation_breakdown.step2.title')}
              </h4>
              <div className="bg-orange-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-orange-700 mb-4">
                  <strong>{t('calc.rsu.calculation_breakdown.tax_breakdown_title')}</strong>
                </p>
                {(() => {
                  const breakdown = getStepByStepTaxBreakdown(rsuInputs.annualSalaryCNY, rsuResult.vestedValueCNY)
                  return (
                    <div className="space-y-4">
                      {/* 基本信息 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="bg-orange-100 p-3 rounded">
                          <p className="text-orange-700 font-medium mb-1">{t('calc.rsu.calculation_breakdown.before_vesting')}</p>
                          <p className="text-orange-800">{t('calc.rsu.calculation_breakdown.annual_income')}{formatCurrency(breakdown.currentIncome, 'CNY')}</p>
                          <p className="text-orange-800">{t('calc.rsu.calculation_breakdown.taxable_income')}{formatCurrency(breakdown.currentTaxableIncome, 'CNY')}</p>
                          <p className="text-orange-800">{t('calc.rsu.calculation_breakdown.tax_amount')}{formatCurrency(breakdown.currentTax, 'CNY')}</p>
                        </div>
                        <div className="bg-orange-100 p-3 rounded">
                          <p className="text-orange-700 font-medium mb-1">{t('calc.rsu.calculation_breakdown.after_vesting')}</p>
                          <p className="text-orange-800">{t('calc.rsu.calculation_breakdown.total_income')}{formatCurrency(breakdown.currentIncome + breakdown.additionalIncome, 'CNY')}</p>
                          <p className="text-orange-800">{t('calc.rsu.calculation_breakdown.taxable_income')}{formatCurrency(breakdown.newTaxableIncome, 'CNY')}</p>
                          <p className="text-orange-800">{t('calc.rsu.calculation_breakdown.tax_amount')}{formatCurrency(breakdown.totalTax, 'CNY')}</p>
                        </div>
                      </div>

                      {/* RSU收益的阶梯分布 */}
                      <div>
                        <p className="text-orange-700 font-medium mb-2">{t('calc.rsu.calculation_breakdown.rsu_income_distribution')}</p>
                        <div className="space-y-2">
                          {breakdown.additionalTaxBrackets.map((detail, index) => (
                            <div key={index} className="flex justify-between items-center bg-white p-2 rounded border">
                              <div className="flex-1">
                                <span className="text-sm text-gray-600">
                                  {detail.bracket.max === Infinity
                                    ? `${detail.bracket.min.toLocaleString()}元以上`
                                    : `${detail.bracket.min.toLocaleString()}-${detail.bracket.max.toLocaleString()}元`
                                  } {t('calc.rsu.calculation_breakdown.tax_bracket')} ({formatPercentage(detail.bracket.rate)})
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
                          <p className="text-orange-700 font-medium">{t('calc.rsu.calculation_breakdown.rsu_tax_summary')}</p>
                          <p className="text-orange-800 font-mono">
                            {t('calc.rsu.calculation_breakdown.total_tax_burden')} = {breakdown.additionalTaxBrackets.map(b => formatCurrency(b.taxInThisBracket, 'CNY')).join(' + ')}
                          </p>
                          <p className="text-orange-800 font-mono">
                            = {formatCurrency(breakdown.additionalTax, 'CNY')}
                          </p>
                          <p className="text-orange-800 font-mono mt-2">
                            {t('calc.rsu.calculation_breakdown.actual_marginal_rate')} = {formatCurrency(breakdown.additionalTax, 'CNY')} ÷ {formatCurrency(breakdown.additionalIncome, 'CNY')} = {formatPercentage(breakdown.marginalRate)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>
            </div>

            {/* Step 3: Capital Gains Tax (if applicable) */}
            {rsuResult.capitalGains > 0 && (
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-800 mb-2">
                  {t('calc.rsu.calculation_breakdown.step3.title')}
                </h4>
                <div className="bg-purple-50 p-4 rounded-lg space-y-2">
                  <p className="text-sm text-purple-700">
                    <strong>{t('calc.rsu.calculation_breakdown.formulas.capital_gains')}</strong>
                  </p>
                  <p className="text-purple-800 font-mono">
                    = ({rsuInputs.salePriceUSD} - {rsuInputs.vestingPriceUSD}) × {rsuInputs.vestedShares} × {rsuInputs.exchangeRate}
                  </p>
                  <p className="text-purple-800 font-mono">
                    = {formatCurrency(rsuResult.capitalGains, 'CNY')}
                  </p>
                  <p className="text-sm text-purple-700 mt-3">
                    <strong>{t('calc.rsu.calculation_breakdown.formulas.capital_gains_tax')}</strong>
                  </p>
                  <p className="text-purple-800 font-mono">
                    = {formatCurrency(rsuResult.capitalGains, 'CNY')} × 20%
                  </p>
                  <p className="text-purple-800 font-mono">
                    = {formatCurrency(rsuResult.capitalGainsTax, 'CNY')}
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Final Calculation */}
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-green-800 mb-2">
                {t('calc.rsu.calculation_breakdown.step4.title')}
              </h4>
              <div className="bg-green-50 p-4 rounded-lg space-y-2">
                <p className="text-sm text-green-700">
                  <strong>{t('calc.rsu.calculation_breakdown.formulas.total_tax')}</strong>
                </p>
                <p className="text-green-800 font-mono">
                  = {formatCurrency(rsuResult.vestingTaxAmount, 'CNY')} + {formatCurrency(rsuResult.capitalGainsTax, 'CNY')}
                </p>
                <p className="text-green-800 font-mono">
                  = {formatCurrency(rsuResult.totalTax, 'CNY')}
                </p>
                <p className="text-sm text-green-700 mt-3">
                  <strong>{t('calc.rsu.calculation_breakdown.formulas.net_gain')}</strong>
                </p>
                <p className="text-green-800 font-mono">
                  = {formatCurrency(rsuResult.vestedValueCNY + rsuResult.capitalGains, 'CNY')} - {formatCurrency(rsuResult.totalTax, 'CNY')}
                </p>
                <p className="text-green-800 font-mono text-lg">
                  = <strong>{formatCurrency(rsuResult.netGainCNY, 'CNY')}</strong>
                </p>
                <p className="text-green-700 text-sm mt-2">
                  {t('calc.rsu.labels.effective_rate_label')}{formatPercentage(rsuResult.effectiveTaxRate)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RSUCalculator
