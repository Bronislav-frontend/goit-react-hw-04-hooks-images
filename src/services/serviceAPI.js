import axios from 'axios';
import { toast } from 'react-toastify';

const getImages = axios.create({
  baseURL: 'https://pixabay.com/api/',
  timeout: 1000,

  params: {
    key: '24062603-26c27bb668dda6ecae2734f01',
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

export async function fetchImages(name, page) {
  try {
    const { data } = await getImages('', { params: { q: name, page } });
    return data;
  } catch (error) {
    toast.error(
      `Изображений по запросу ${name} не найдено, попробуйте другой запрос`,
    );
  }
}
