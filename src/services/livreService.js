import axios from 'axios';

// L'URL de l'API est définie dans les fichiers .env selon l'environnement (dev ou production)
const API = `${import.meta.env.VITE_API_URL}/livres`;

export const getLivres    = ()         => axios.get(API);
export const getLivreById = (id)       => axios.get(`${API}/${id}`);
export const createLivre  = (data)     => axios.post(API, data);
export const deleteLivre  = (id)       => axios.delete(`${API}/${id}`);
