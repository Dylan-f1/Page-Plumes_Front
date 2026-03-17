import axios from 'axios';

const API = '/livres';

export const getLivres = () => axios.get(API);
export const getLivreById = (id) => axios.get(`${API}/${id}`);
export const createLivre = (data) => axios.post(API, data);
export const updateLivre = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteLivre = (id) => axios.delete(`${API}/${id}`);
