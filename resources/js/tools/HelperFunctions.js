export function getMoneyTextColorClass(value) {
  if (value == 0) return '';
  if (value < 0) return 'text-money-negative';
  return 'text-money-positive';
}

export function downloadCSVStream(stream, fileName) {
  const url = window.URL.createObjectURL(new Blob([stream]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function getPriorityTextClass(priority) {
  switch (Number(priority)) {
    case 0:
      return 'text-priority-low';
    case 1:
      return 'text-priority-medium';
    case 2:
      return 'text-priority-high';
    case 3:
      return 'text-priority-severe';
    default:
      return '';
  }
}
