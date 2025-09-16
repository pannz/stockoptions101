// 中国个人所得税税率表 (2024年)
export const chinaTaxBrackets = [
  { min: 0, max: 36000, rate: 0.03, deduction: 0 },
  { min: 36000, max: 144000, rate: 0.10, deduction: 2520 },
  { min: 144000, max: 300000, rate: 0.20, deduction: 16920 },
  { min: 300000, max: 420000, rate: 0.25, deduction: 31920 },
  { min: 420000, max: 660000, rate: 0.30, deduction: 52920 },
  { min: 660000, max: 960000, rate: 0.35, deduction: 85920 },
  { min: 960000, max: Infinity, rate: 0.45, deduction: 181920 }
]

// 计算中国个人所得税
export const calculateChinaTax = (annualIncome: number): { tax: number, rate: number, bracket: any } => {
  // 扣除基本减除费用60000元
  const taxableIncome = Math.max(0, annualIncome - 60000)

  if (taxableIncome === 0) {
    return { tax: 0, rate: 0, bracket: chinaTaxBrackets[0] }
  }

  // 找到对应的税率档次
  const bracket = chinaTaxBrackets.find(b => taxableIncome > b.min && taxableIncome <= b.max) || chinaTaxBrackets[chinaTaxBrackets.length - 1]

  // 计算应纳税额
  const tax = taxableIncome * bracket.rate - bracket.deduction
  const effectiveRate = tax / annualIncome

  return {
    tax: Math.max(0, tax),
    rate: effectiveRate,
    bracket
  }
}

// 计算期权收益的边际税率
export const calculateMarginalTaxRate = (currentIncome: number, additionalIncome: number): number => {
  const currentTax = calculateChinaTax(currentIncome).tax
  const newTax = calculateChinaTax(currentIncome + additionalIncome).tax
  const marginalTax = newTax - currentTax

  return marginalTax / additionalIncome
}

// 阶梯税率计算详情
export interface TaxBracketDetail {
  bracket: typeof chinaTaxBrackets[0]
  taxableInThisBracket: number
  taxInThisBracket: number
  isNewIncome: boolean // 是否是期权收益产生的税负
}

// 获取完整的阶梯计算详情
export const getStepByStepTaxBreakdown = (currentIncome: number, additionalIncome: number) => {
  const currentTaxableIncome = Math.max(0, currentIncome - 60000)
  const newTotalIncome = currentIncome + additionalIncome
  const newTaxableIncome = Math.max(0, newTotalIncome - 60000)

  // 计算当前收入的完整阶梯分布
  const calculateFullBrackets = (taxableIncome: number) => {
    const brackets: TaxBracketDetail[] = []
    let remaining = taxableIncome

    for (const bracket of chinaTaxBrackets) {
      if (remaining <= 0) break

      const bracketSize = bracket.max === Infinity ? remaining : Math.min(bracket.max - bracket.min, remaining)
      const amountInBracket = Math.min(remaining, bracketSize)

      if (amountInBracket > 0) {
        brackets.push({
          bracket,
          taxableInThisBracket: amountInBracket,
          taxInThisBracket: amountInBracket * bracket.rate,
          isNewIncome: false
        })
        remaining -= amountInBracket
      }
    }

    return brackets
  }

  const currentBrackets = calculateFullBrackets(currentTaxableIncome)
  const newBrackets = calculateFullBrackets(newTaxableIncome)

  // 找出期权收益部分的税负
  const additionalTaxBrackets: TaxBracketDetail[] = []

  for (let i = 0; i < newBrackets.length; i++) {
    const newBracket = newBrackets[i]
    const currentBracket = currentBrackets[i]

    if (currentBracket) {
      // 如果这个档次有新增收入
      const additionalInThisBracket = newBracket.taxableInThisBracket - currentBracket.taxableInThisBracket
      if (additionalInThisBracket > 0) {
        additionalTaxBrackets.push({
          bracket: newBracket.bracket,
          taxableInThisBracket: additionalInThisBracket,
          taxInThisBracket: additionalInThisBracket * newBracket.bracket.rate,
          isNewIncome: true
        })
      }
    } else {
      // 完全是新档次
      additionalTaxBrackets.push({
        bracket: newBracket.bracket,
        taxableInThisBracket: newBracket.taxableInThisBracket,
        taxInThisBracket: newBracket.taxInThisBracket,
        isNewIncome: true
      })
    }
  }

  const currentTax = currentBrackets.reduce((sum, b) => sum + b.taxInThisBracket, 0)
  const additionalTax = additionalTaxBrackets.reduce((sum, b) => sum + b.taxInThisBracket, 0)
  const marginalRate = additionalIncome > 0 ? additionalTax / additionalIncome : 0

  return {
    currentIncome,
    additionalIncome,
    currentTaxableIncome,
    newTaxableIncome,
    currentBrackets,
    newBrackets,
    additionalTaxBrackets,
    currentTax,
    additionalTax,
    totalTax: currentTax + additionalTax,
    marginalRate
  }
}

// 计算资本利得税 (中国固定20%)
export const calculateCapitalGainsTax = (capitalGains: number): number => {
  return capitalGains * 0.20
}

export interface OptionsCalculationResult {
  // 基础数据
  grossGainUSD: number
  grossGainCNY: number

  // 行权税务
  exerciseTaxRate: number
  exerciseTaxAmount: number

  // 资本利得税务
  capitalGains: number
  capitalGainsTax: number

  // 总计
  totalTax: number
  netGainCNY: number
  netGainUSD: number
  effectiveTaxRate: number
}

export interface RSUCalculationResult {
  // 基础数据
  vestedValueUSD: number
  vestedValueCNY: number

  // 归属税务
  vestingTaxRate: number
  vestingTaxAmount: number

  // 资本利得税务
  capitalGains: number
  capitalGainsTax: number

  // 总计
  totalTax: number
  netGainCNY: number
  netGainUSD: number
  effectiveTaxRate: number
}

export const calculateOptionsValue = (
  annualSalaryCNY: number,
  shares: number,
  strikePriceUSD: number,
  exercisePriceUSD: number,
  salePriceUSD: number | null,
  exchangeRate: number
): OptionsCalculationResult => {
  // 计算行权收益
  const exerciseGainUSD = Math.max(0, exercisePriceUSD - strikePriceUSD) * shares
  const exerciseGainCNY = exerciseGainUSD * exchangeRate

  // 计算行权税率（边际税率）
  const exerciseTaxRate = calculateMarginalTaxRate(annualSalaryCNY, exerciseGainCNY)
  const exerciseTaxAmount = exerciseGainCNY * exerciseTaxRate

  // 计算资本利得（如果有卖出价）
  let capitalGains = 0
  let capitalGainsTax = 0
  let totalGainUSD = exerciseGainUSD

  if (salePriceUSD && salePriceUSD > exercisePriceUSD) {
    capitalGains = (salePriceUSD - exercisePriceUSD) * shares * exchangeRate
    capitalGainsTax = calculateCapitalGainsTax(capitalGains)
    totalGainUSD = (salePriceUSD - strikePriceUSD) * shares
  }

  const totalGainCNY = totalGainUSD * exchangeRate
  const totalTax = exerciseTaxAmount + capitalGainsTax
  const netGainCNY = totalGainCNY - totalTax
  const netGainUSD = netGainCNY / exchangeRate
  const effectiveTaxRate = totalTax / totalGainCNY

  return {
    grossGainUSD: totalGainUSD,
    grossGainCNY: totalGainCNY,
    exerciseTaxRate,
    exerciseTaxAmount,
    capitalGains,
    capitalGainsTax,
    totalTax,
    netGainCNY,
    netGainUSD,
    effectiveTaxRate
  }
}

export const calculateRSUValue = (
  annualSalaryCNY: number,
  vestedShares: number,
  vestingPriceUSD: number,
  salePriceUSD: number | null,
  exchangeRate: number
): RSUCalculationResult => {
  // 计算归属价值
  const vestedValueUSD = vestedShares * vestingPriceUSD
  const vestedValueCNY = vestedValueUSD * exchangeRate

  // 计算归属税率（边际税率）
  const vestingTaxRate = calculateMarginalTaxRate(annualSalaryCNY, vestedValueCNY)
  const vestingTaxAmount = vestedValueCNY * vestingTaxRate

  // 计算资本利得（如果有卖出价）
  let capitalGains = 0
  let capitalGainsTax = 0
  let totalGainUSD = vestedValueUSD

  if (salePriceUSD && salePriceUSD > vestingPriceUSD) {
    capitalGains = (salePriceUSD - vestingPriceUSD) * vestedShares * exchangeRate
    capitalGainsTax = calculateCapitalGainsTax(capitalGains)
    totalGainUSD = salePriceUSD * vestedShares
  }

  const totalGainCNY = totalGainUSD * exchangeRate
  const totalTax = vestingTaxAmount + capitalGainsTax
  const netGainCNY = totalGainCNY - totalTax
  const netGainUSD = netGainCNY / exchangeRate
  const effectiveTaxRate = totalGainCNY > 0 ? totalTax / totalGainCNY : 0

  return {
    vestedValueUSD,
    vestedValueCNY,
    vestingTaxRate,
    vestingTaxAmount,
    capitalGains,
    capitalGainsTax,
    totalTax,
    netGainCNY,
    netGainUSD,
    effectiveTaxRate
  }
}
