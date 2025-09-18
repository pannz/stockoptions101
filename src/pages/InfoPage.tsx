import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, DollarSign, Calendar, TrendingUp, AlertTriangle, Globe, FileText, Calculator, BookOpenCheck } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface SectionProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
}

const Section: React.FC<SectionProps> = ({ title, icon, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="card mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <div className="flex items-center space-x-3">
          {icon}
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        </div>
        {isOpen ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="mt-6 space-y-4">
          {children}
        </div>
      )}
    </div>
  )
}

const InfoPage: React.FC = () => {
  const { t } = useLanguage()

  return (
    <div className="container">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('info.hero.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('info.hero.subtitle')}
          </p>
        </div>

        {/* Stock Options Section */}
        <Section
          title={t('info.sections.options.title')}
          icon={<TrendingUp className="w-6 h-6 text-primary-600" />}
          defaultOpen={true}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.options.what_are.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('info.sections.options.what_are.description')}
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">
                  {t('info.sections.options.what_are.example')}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.options.types.title')}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">{t('info.sections.options.types.iso.title')}</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• {t('info.sections.options.types.iso.features.tax_advantaged')}</li>
                    <li>• {t('info.sections.options.types.iso.features.holding_period')}</li>
                    <li>• {t('info.sections.options.types.iso.features.amt')}</li>
                    <li>• {t('info.sections.options.types.iso.features.employees_only')}</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">{t('info.sections.options.types.nso.title')}</h4>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• {t('info.sections.options.types.nso.features.ordinary_income')}</li>
                    <li>• {t('info.sections.options.types.nso.features.no_holding')}</li>
                    <li>• {t('info.sections.options.types.nso.features.flexible')}</li>
                    <li>• {t('info.sections.options.types.nso.features.less_advantaged')}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  {t('info.sections.options.types.note')}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.options.vesting.title')}</h3>
              <p className="text-gray-700 mb-3">
                {t('info.sections.options.vesting.description')}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{t('info.sections.options.vesting.year1')[0]}</span>
                  <span className="text-gray-600">{t('info.sections.options.vesting.year1')[1]}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 my-2">
                  <div className="bg-primary-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>
                    {t('info.sections.options.vesting.year2')[0]}
                    {t('info.sections.options.vesting.year2')[1] && (
                      <>
                        <br />
                        {t('info.sections.options.vesting.year2')[1]}
                      </>
                    )}
                  </span>
                  <span>
                    {t('info.sections.options.vesting.year3')[0]}
                    {t('info.sections.options.vesting.year3')[1] && (
                      <>
                        <br />
                        {t('info.sections.options.vesting.year3')[1]}
                      </>
                    )}
                  </span>
                  <span>
                    {t('info.sections.options.vesting.year4')[0]}
                    {t('info.sections.options.vesting.year4')[1] && (
                      <>
                        <br />
                        {t('info.sections.options.vesting.year4')[1]}
                      </>
                    )}
                  </span>
                  <span>
                    {t('info.sections.options.vesting.year5')[0]}
                    {t('info.sections.options.vesting.year5')[1] && (
                      <>
                        <br />
                        {t('info.sections.options.vesting.year5')[1]}
                      </>
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800 text-sm">
                  {t('info.sections.options.vesting.note')}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* RSUs Section */}
        <Section
          title={t('info.sections.rsu.title')}
          icon={<DollarSign className="w-6 h-6 text-success-600" />}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.rsu.what_are.title')}</h3>
              <p className="text-gray-700 mb-4">
                {t('info.sections.rsu.what_are.description')}
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-green-800">
                  {t('info.sections.rsu.what_are.key_difference')}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.rsu.vesting_taxation.title')}</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{t('info.sections.rsu.vesting_taxation.vesting_events.title')}</p>
                    <p className="text-gray-600 text-sm">{t('info.sections.rsu.vesting_taxation.vesting_events.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FileText className="w-5 h-5 text-orange-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{t('info.sections.rsu.vesting_taxation.tax_on_vesting.title')}</p>
                    <p className="text-gray-600 text-sm">{t('info.sections.rsu.vesting_taxation.tax_on_vesting.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-medium text-gray-900">{t('info.sections.rsu.vesting_taxation.capital_gains.title')}</p>
                    <p className="text-gray-600 text-sm">{t('info.sections.rsu.vesting_taxation.capital_gains.description')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.rsu.comparison.title')}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left p-3 font-medium">{t('info.sections.rsu.comparison.table.aspect')}</th>
                      <th className="text-left p-3 font-medium">{t('info.sections.rsu.comparison.table.stock_options')}</th>
                      <th className="text-left p-3 font-medium">{t('info.sections.rsu.comparison.table.rsus')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="p-3 font-medium">{t('info.sections.rsu.comparison.table.upfront_cost.aspect')}</td>
                      <td className="p-3">{t('info.sections.rsu.comparison.table.upfront_cost.options')}</td>
                      <td className="p-3">{t('info.sections.rsu.comparison.table.upfront_cost.rsus')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">{t('info.sections.rsu.comparison.table.risk.aspect')}</td>
                      <td className="p-3">{t('info.sections.rsu.comparison.table.risk.options')}</td>
                      <td className="p-3">{t('info.sections.rsu.comparison.table.risk.rsus')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">{t('info.sections.rsu.comparison.table.upside_potential.aspect')}</td>
                      <td className="p-3">{t('info.sections.rsu.comparison.table.upside_potential.options')}</td>
                      <td className="p-3">{t('info.sections.rsu.comparison.table.upside_potential.rsus')}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">{t('info.sections.rsu.comparison.table.tax_timing.aspect')}</td>
                      <td className="p-3">{t('info.sections.rsu.comparison.table.tax_timing.options')}</td>
                      <td className="p-3">{t('info.sections.rsu.comparison.table.tax_timing.rsus')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Section>

        {/* Tax Implications Section */}
        <Section
          title={t('info.sections.tax.title')}
          icon={<Globe className="w-6 h-6 text-warning-600" />}
        >
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <p className="font-semibold text-red-800">{t('info.sections.tax.disclaimer.title')}</p>
                  <p className="text-red-700 text-sm mt-1">
                    {t('info.sections.tax.disclaimer.content')}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.tax.us_tax.title')}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('info.sections.tax.us_tax.options.title')}</h4>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• <strong>ISO:</strong> {t('info.sections.tax.us_tax.options.iso')}</li>
                    <li>• <strong>NSO:</strong> {t('info.sections.tax.us_tax.options.nso')}</li>
                    <li>• {t('info.sections.tax.us_tax.options.capital_gains')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">{t('info.sections.tax.us_tax.rsus.title')}</h4>
                  <ul className="text-gray-700 space-y-1 ml-4">
                    <li>• {t('info.sections.tax.us_tax.rsus.vesting_tax')}</li>
                    <li>• {t('info.sections.tax.us_tax.rsus.sale_tax')}</li>
                    <li>• {t('info.sections.tax.us_tax.rsus.withholding')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.tax.china_tax.title')}</h3>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-yellow-800 mb-3">
                  <strong>{t('info.sections.tax.china_tax.key_points')}</strong>
                </p>
                <ul className="text-yellow-700 space-y-2">
                  <li>• {t('info.sections.tax.china_tax.worldwide_income')}</li>
                  <li>• {t('info.sections.tax.china_tax.tax_treaties')}</li>
                  <li>• {t('info.sections.tax.china_tax.timing_differences')}</li>
                  <li>• {t('info.sections.tax.china_tax.currency_conversion')}</li>
                  <li>• {t('info.sections.tax.china_tax.residency_rules')}</li>
                  <li>• {t('info.sections.tax.china_tax.capital_gains_china')}</li>
                  <li>• {t('info.sections.tax.china_tax.complete_tax_chain')}</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.tax.planning.title')}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">{t('info.sections.tax.planning.timing.title')}</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• {t('info.sections.tax.planning.timing.tax_year')}</li>
                    <li>• {t('info.sections.tax.planning.timing.residency_changes')}</li>
                    <li>• {t('info.sections.tax.planning.timing.income_coordination')}</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">{t('info.sections.tax.planning.documentation.title')}</h4>
                  <ul className="text-purple-700 text-sm space-y-1">
                    <li>• {t('info.sections.tax.planning.documentation.detailed_records')}</li>
                    <li>• {t('info.sections.tax.planning.documentation.exchange_rates')}</li>
                    <li>• {t('info.sections.tax.planning.documentation.agreements')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Exercise & Selling Strategies */}
        <Section
          title={t('info.sections.exercise_sell.title')}
          icon={<Calendar className="w-6 h-6 text-purple-600" />}
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.exercise_sell.exercise_timing.title')}</h3>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">{t('info.sections.exercise_sell.exercise_timing.early_exercise.title')}</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• {t('info.sections.exercise_sell.exercise_timing.early_exercise.ipo_soon')}</li>
                    <li>• {t('info.sections.exercise_sell.exercise_timing.early_exercise.appreciation_expected')}</li>
                    <li>• {t('info.sections.exercise_sell.exercise_timing.early_exercise.holding_period')}</li>
                    <li>• {t('info.sections.exercise_sell.exercise_timing.early_exercise.amt_minimize')}</li>
                  </ul>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">{t('info.sections.exercise_sell.exercise_timing.wait_to_exercise.title')}</h4>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• {t('info.sections.exercise_sell.exercise_timing.wait_to_exercise.uncertain_prospects')}</li>
                    <li>• {t('info.sections.exercise_sell.exercise_timing.wait_to_exercise.liquidity_needs')}</li>
                    <li>• {t('info.sections.exercise_sell.exercise_timing.wait_to_exercise.underwater')}</li>
                    <li>• {t('info.sections.exercise_sell.exercise_timing.wait_to_exercise.expiration_risk')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.exercise_sell.selling_strategies.title')}</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">{t('info.sections.exercise_sell.selling_strategies.immediate_sale.title')}</h4>
                  <p className="text-blue-700 text-sm mb-2">{t('info.sections.exercise_sell.selling_strategies.immediate_sale.description')}</p>
                  <ul className="text-blue-600 text-xs space-y-1">
                    <li>• {t('info.sections.exercise_sell.selling_strategies.immediate_sale.lock_gains')}</li>
                    <li>• {t('info.sections.exercise_sell.selling_strategies.immediate_sale.minimize_risk')}</li>
                    <li>• {t('info.sections.exercise_sell.selling_strategies.immediate_sale.higher_tax')}</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">{t('info.sections.exercise_sell.selling_strategies.hold_strategy.title')}</h4>
                  <p className="text-purple-700 text-sm mb-2">{t('info.sections.exercise_sell.selling_strategies.hold_strategy.description')}</p>
                  <ul className="text-purple-600 text-xs space-y-1">
                    <li>• {t('info.sections.exercise_sell.selling_strategies.hold_strategy.further_appreciation')}</li>
                    <li>• {t('info.sections.exercise_sell.selling_strategies.hold_strategy.decline_risk')}</li>
                    <li>• {t('info.sections.exercise_sell.selling_strategies.hold_strategy.double_tax')}</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">{t('info.sections.exercise_sell.selling_strategies.gradual_sale.title')}</h4>
                  <p className="text-green-700 text-sm mb-2">{t('info.sections.exercise_sell.selling_strategies.gradual_sale.description')}</p>
                  <ul className="text-green-600 text-xs space-y-1">
                    <li>• {t('info.sections.exercise_sell.selling_strategies.gradual_sale.diversify_risk')}</li>
                    <li>• {t('info.sections.exercise_sell.selling_strategies.gradual_sale.dollar_cost_averaging')}</li>
                    <li>• {t('info.sections.exercise_sell.selling_strategies.gradual_sale.spread_tax')}</li>
                    <li>• {t('info.sections.exercise_sell.selling_strategies.gradual_sale.complex_tax_claim')}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('info.sections.exercise_sell.risk_management.title')}</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">
                  <strong>{t('info.sections.exercise_sell.risk_management.diversification_key')}</strong>
                </p>
                <ul className="text-gray-600 space-y-1">
                  <li>• {t('info.sections.exercise_sell.risk_management.total_exposure')}</li>
                  <li>• {t('info.sections.exercise_sell.risk_management.target_percentages')}</li>
                  <li>• {t('info.sections.exercise_sell.risk_management.regular_rebalance')}</li>
                  <li>• {t('info.sections.exercise_sell.risk_management.exit_strategy')}</li>
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* Term Sheet - Show for all languages */}
        <Section
          title={t('info.term_sheet.title')}
          icon={<BookOpenCheck className="w-6 h-6 text-indigo-600" />}
        >
          <div className="space-y-4">
            <p className="text-gray-700 mb-6">
              {t('info.term_sheet.subtitle')}
            </p>

            <div className="grid md:grid-cols-1 gap-4">
              {[
                'iso', 'nso', 'rsu', 'espp', 'amt', 'ipo',
                'fmv', 'ltcg', 'stcg', 'vesting', 'cliff', 'strike_price', 'exercise'
              ].map((termKey) => (
                <div key={termKey} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {t(`info.term_sheet.terms.${termKey}.abbr`)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="text-sm font-medium text-gray-900">
                        {t(`info.term_sheet.terms.${termKey}.full`)}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {t(`info.term_sheet.terms.${termKey}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-primary-50 rounded-lg">
          <h2 className="text-2xl font-bold text-primary-900 mb-4">
            {t('info.cta.title')}
          </h2>
          <p className="text-primary-700 mb-6">
            {t('info.cta.subtitle')}
          </p>
          <Link
            to="/calculator"
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Calculator className="w-4 h-4" />
            <span>{t('info.cta.button')}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InfoPage
