import { useState, useEffect } from 'react';
import LivreList from './components/LivreList';
import LivreForm from './components/LivreForm';
import { getLivres, createLivre, deleteLivre } from './services/livreService';

export default function App() {
  // Liste des livres récupérés depuis l'API
  const [livres, setLivres] = useState([]);
  // Contrôle l'affichage du formulaire d'ajout
  const [showForm, setShowForm] = useState(false);
  // Message de retour affiché après une action (succès ou erreur)
  const [message, setMessage] = useState(null);

  // Récupère tous les livres depuis l'API au chargement de la page
  const chargerLivres = async () => {
    const res = await getLivres();
    setLivres(res.data);
  };

  useEffect(() => {
    chargerLivres();
  }, []);

  // Affiche un message temporaire (disparaît après 3 secondes)
  const afficherMessage = (texte, type = 'success') => {
    setMessage({ texte, type });
    setTimeout(() => setMessage(null), 3000);
  };

  // Envoie le nouveau livre à l'API puis rafraîchit la liste
  const handleSubmit = async (data) => {
    try {
      await createLivre(data);
      afficherMessage('Livre ajouté avec succès.');
      setShowForm(false);
      chargerLivres();
    } catch (err) {
      afficherMessage("Erreur lors de l'enregistrement.", 'error');
    }
  };

  // Demande confirmation puis envoie la suppression à l'API
  const handleDelete = async (livre) => {
    if (!window.confirm(`Supprimer "${livre.titre}" ?`)) return;
    try {
      await deleteLivre(livre._id);
      afficherMessage('Livre supprimé.');
      chargerLivres();
    } catch (err) {
      // Affiche le message d'erreur renvoyé par l'API (ex: 409 si stock > 0)
      const msg = err.response?.data?.message || 'Erreur lors de la suppression.';
      afficherMessage(msg, 'error');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-stone-100">

      {/* Barre de navigation en haut */}
      <header className="bg-stone-900 text-white px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Page & Plumes</h1>
          <p className="text-sm text-stone-400 mt-0.5">Gestion du catalogue</p>
        </div>
        <button
          className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md font-semibold text-sm transition-colors"
          onClick={() => setShowForm(true)}
        >
          + Ajouter un livre
        </button>
      </header>

      {/* Contenu principal */}
      <main className="max-w-5xl mx-auto px-6 py-8">

        {/* Alerte succès ou erreur */}
        {message && (
          <div className={`px-4 py-3 rounded-md font-medium mb-6 ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {message.texte}
          </div>
        )}

        {/* Grille des livres */}
        <LivreList livres={livres} onDelete={handleDelete} />
      </main>

      {/* Formulaire d'ajout en modal (affiché uniquement si showForm = true) */}
      {showForm && (
        <LivreForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
