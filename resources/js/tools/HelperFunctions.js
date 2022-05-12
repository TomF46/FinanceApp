export function getMoneyTextColorClass(value) {
    if (value == 0) return '';
    if (value < 0) return 'text-money-negative';
    return 'text-money-positive';
}