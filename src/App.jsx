import { useState, useEffect } from 'react';
import LivreList from './components/LivreList';
import LivreForm from './components/LivreForm';
import { getLivres, createLivre, updateLivre, deleteLivre } from './services/livreService';
import './App.css';

export default function App() {
  const [livres, setLivres] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [livreEdite, setLivreEdite] = useState(null);
  const [message, setMessage] = useState(null);

  const chargerLivres = async () => {
    const res = await getLivres();
    setLivres(res.data);
  };

  useEffect(() => {
    chargerLivres();
  }, []);

  const afficherMessage = (texte, type = 'success') => {
    setMessage({ texte, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmit = async (data) => {
    try {
      if (livreEdite) {
        await updateLivre(livreEdite._id, data);
        afficherMessage('Livre modifié avec succès.');
      } else {
        await createLivre(data);
        afficherMessage('Livre ajouté avec succès.');
      }
      setShowForm(false);
      setLivreEdite(null);
      chargerLivres();
    } catch (err) {
      afficherMessage("Erreur lors de l'enregistrement.", 'error');
    }
  };

  const handleEdit = (livre) => {
    setLivreEdite(livre);
    setShowForm(true);
  };

  const handleDelete = async (livre) => {
    if (!window.confirm(`Supprimer "${livre.titre}" ?`)) return;
    try {
      await deleteLivre(livre._id);
      afficherMessage('Livre supprimé.');
      chargerLivres();
    } catch (err) {
      const msg = err.response?.data?.message || 'Erreur lors de la suppression.';
      afficherMessage(msg, 'error');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setLivreEdite(null);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📚 Page &amp; Plumes</h1>
          <p>Gestion du catalogue</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Ajouter un livre
        </button>
      </header>

      <main className="app-main">
        {message && (
          <div className={`alert alert-${message.type}`}>{message.texte}</div>
        )}
        <LivreList livres={livres} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      {showForm && (
        <LivreForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initial={livreEdite}
        />
      )}
    </div>
  );
}
