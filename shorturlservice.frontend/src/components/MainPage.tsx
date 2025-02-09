import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUrls, deleteUrl } from '../api'; // Подключаем API функции

interface ShortUrl {
  id: number;
  originalUrl: string;
  shortenedUrl: string;
  createdAt: string;
  clickCount: number;
}

const MainPage: React.FC = () => {
  const [urls, setUrls] = useState<ShortUrl[]>([]);

  useEffect(() => {
    const fetchUrls = async () => {
      const data = await getAllUrls();
      setUrls(data);
    };
    fetchUrls();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteUrl(id);
      setUrls(urls.filter(url => url.id !== id)); // Удаляем ссылку из состояния
    } catch (error) {
      console.error('Ошибка при удалении ссылки', error);
    }
  };

  return (
    <div>
      <h1>Сокращенные ссылки</h1>
      <Link to="/create" className="action-link">Создать новую ссылку</Link>
      <table>
        <thead>
          <tr>
            <th>Длинный URL</th>
            <th>Сокращенный URL</th>
            <th>Дата создания</th>
            <th>Количество переходов</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(url => (
            <tr key={url.id}>
              <td>{url.originalUrl}</td>
              <td>
                <a href={`https://localhost:7229/api/shorturl/${url.shortenedUrl}`} target="_blank" rel="noopener noreferrer">
                  {url.shortenedUrl}
                </a>
              </td>
              <td>{new Date(url.createdAt).toLocaleString()}</td>
              <td>{url.clickCount}</td>
              <td>
                <Link to={`/edit/${url.id}`} className="action-link">Редактировать</Link>
                {' | '}
                <button onClick={() => handleDelete(url.id)} className="action-link">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainPage;
