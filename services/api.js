import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.thedogapi.com/v1/images/search',
});

export const getDoguinhos = async () => {
  try {
    const response = await api.get('?limit=10&api_key=live_zm9ATqbaVifVGZ1T4iMNHsX4uGSMNgj2OYIlAQUk0sTzxNOP2RokYCDH25Nk1OL7');
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar fotos: ", error);
    return [];
  }
};
