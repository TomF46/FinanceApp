export function checkIncomeIsValid(income) {
  const { dividends, assetSales, maintenanceGrant, sponsorship, rewards } =
    income;
  const errors = {};
  if (!dividends || dividends < 0)
    errors.dividends = 'Dividends entry is invalid';
  if (!assetSales || assetSales < 0)
    errors.assetSales = 'Asset sales entry is invalid';
  if (!maintenanceGrant || maintenanceGrant < 0)
    errors.maintenanceGrant = 'Maintenance grant entry is invalid';
  if (!sponsorship || sponsorship < 0)
    errors.sponsorship = 'Sponsorship entry is invalid';
  if (!rewards || rewards < 0) errors.rewards = 'Rewards entry is invalid';
  return errors;
}

export function checkExpensesIsValid(expenses) {
  const {
    rent,
    payroll,
    utilities,
    equipment,
    travel,
    training,
    maintenance,
    employeeBonus,
    employeeExpenses,
  } = expenses;
  const errors = {};
  if (!rent || rent < 0) errors.rent = 'Rent entry is invalid';
  if (!payroll || payroll < 0) errors.payroll = 'Payroll entry is invalid';
  if (!utilities || utilities < 0)
    errors.utilities = 'Utilities entry is invalid';
  if (!equipment || equipment < 0)
    errors.equipment = 'Equipment entry is invalid';
  if (!travel || travel < 0) errors.travel = 'Travel entry is invalid';
  if (!training || training < 0) errors.training = 'Training entry is invalid';
  if (!maintenance || maintenance < 0)
    errors.maintenance = 'Maintenance entry is invalid';
  if (!employeeBonus || employeeBonus < 0)
    errors.employeeBonus = 'Employee bonus entry is invalid';
  if (!employeeExpenses || employeeExpenses < 0)
    errors.employeeExpenses = 'Employee expenses entry is invalid';
  return errors;
}

export function checkSalesIsValid(sales) {
  let errors = [];
  sales.forEach((sales) => {
    if (!sales || sales.quantity < 0)
      errors.push(`Quantity for ${sale.productName} is invalid.`);
  });
  return errors;
}

export function isValidMoney(value) {
  let $decimals = 0;
  if (value % 1 != 0) $decimals = value.toString().split('.')[1].length;

  return $decimals <= 2;
}

export function mapSales(sales) {
  let productSales = [];
  sales.forEach((sale) => {
    let product = {
      id: sale.productId,
      name: sale.productName,
      cost: sale.productCost,
      price: sale.productPrice,
      quantity: sale.quantity,
    };
    productSales.push(product);
  });
  return productSales;
}

export function stripRecordsIdsForRestart(income, expenses) {
  delete income.id;
  delete expenses.id;

  return {
    income: income,
    expenses: expenses,
  };
}

export function mapProductsForApplication(products) {
  let productsForSale = [];

  products.forEach((product) => {
    product.quantity = null;
    productsForSale.push(product);
  });

  return productsForSale;
}

export function mapCreatePayload(application, income, expenses, sales) {
  return {
    applicationId: application.id,
    income: income,
    expenses: expenses,
    sales: sales,
  };
}
