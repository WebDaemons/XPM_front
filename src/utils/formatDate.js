export function formatDate(dateInput, view = 'fullView') {
  const date = new Date(dateInput);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  const shortView = date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });

  const fullView = `${day}.${month}.${year}`;

  const longView = date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });

  switch (view) {
    case 'shortView':
      return shortView;

    case 'longView':
      return longView;

    default:
      return fullView;
  }
}
