import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createShortUrl, getUrlById, updateUrl } from '../api';

const CreateEditPage: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchUrl = async () => {
        const data = await getUrlById(parseInt(id));
        setOriginalUrl(data.originalUrl);
        setShortenedUrl(data.shortenedUrl);
      };
      fetchUrl();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUrl(parseInt(id!), originalUrl);
      } else {
        await createShortUrl(originalUrl);
      }
      navigate('/');
    } catch (error) {
      console.error('Ошибка при создании/редактировании ссылки:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>{isEditing ? 'Редактировать ссылку' : 'Создать новую ссылку'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Длинный URL</label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">{isEditing ? 'Сохранить изменения' : 'Создать ссылку'}</button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditPage;
