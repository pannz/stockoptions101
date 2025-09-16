import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calculator, BookOpen, TrendingUp, Globe, Menu, X } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation()
  const { language, setLanguage, t } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                {t('header.title')}
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${isActive('/')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{t('nav.guide')}</span>
              </Link>

              <Link
                to="/calculator"
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-colors ${isActive('/calculator')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <Calculator className="w-4 h-4" />
                <span>{t('nav.calculator')}</span>
              </Link>

              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                title={t('nav.language_toggle_title')}
              >
                <Globe className="w-4 h-4" />
                <span>{language === 'en' ? '中文' : 'EN'}</span>
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label={t('nav.toggle_menu')}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="space-y-2">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  <BookOpen className="w-5 h-5" />
                  <span>{t('nav.guide')}</span>
                </Link>

                <Link
                  to="/calculator"
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors ${isActive('/calculator')
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                >
                  <Calculator className="w-5 h-5" />
                  <span>{t('nav.calculator')}</span>
                </Link>

                {/* Language Toggle - Mobile */}
                <button
                  onClick={() => {
                    setLanguage(language === 'en' ? 'zh' : 'en')
                    closeMobileMenu()
                  }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors w-full text-left"
                >
                  <Globe className="w-5 h-5" />
                  <span>{language === 'en' ? t('nav.switch_to_chinese') : t('nav.switch_to_english')}</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="py-4 sm:py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-8 sm:mt-16">
        <div className="container py-6 sm:py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2 text-sm sm:text-base">
              {t('footer.subtitle')}
            </p>
            <p className="text-xs sm:text-sm">
              {t('footer.disclaimer')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
