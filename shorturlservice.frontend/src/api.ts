const API_URL = 'https://localhost:7229/api/shorturl';

export const getAllUrls = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Ошибка при получении данных');
  return response.json();
};

export const createShortUrl = async (originalUrl: string) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(originalUrl),
  });
  if (!response.ok) throw new Error('Ошибка при создании ссылки');
  return response.json();
};

export const getUrlById = async (id: number) => {
  const response = await fetch(`${API_URL}/details/${id}`);
  if (!response.ok) {
    throw new Error('Ошибка при получении данных');
  }
  return response.json();
};
 
export const updateUrl = async (id: number, newUrl: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUrl),
  });
  if (!response.ok) throw new Error('Ошибка при обновлении ссылки');
};

export const deleteUrl = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Ошибка при удалении ссылки');
};
