import { useState } from 'react';

// Valeurs initiales vides du formulaire
const emptyForm = { titre: '', auteur: '', prix: '', stock: '' };

// Formulaire d'ajout d'un livre — affiché dans une modale
export default function LivreForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  // Met à jour le champ modifié dans l'état du formulaire
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Convertit les types avant d'envoyer à l'API (prix en float, stock en int)
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      titre:  form.titre,
      auteur: form.auteur,
      prix:   parseFloat(form.prix),
      stock:  parseInt(form.stock)
    });
  };

  return (
    // Fond semi-transparent qui bloque le contenu derrière la modale
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      {/* Boite de la modale */}
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-xl font-semibold text-stone-900 mb-5">Ajouter un livre</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          <label className="text-sm font-semibold text-stone-600">Titre</label>
          <input
            name="titre"
            value={form.titre}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-stone-300 rounded-md text-base outline-none focus:border-red-600 transition-colors"
          />

          <label className="text-sm font-semibold text-stone-600">Auteur</label>
          <input
            name="auteur"
            value={form.auteur}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-stone-300 rounded-md text-base outline-none focus:border-red-600 transition-colors"
          />

          <label className="text-sm font-semibold text-stone-600">Prix (€)</label>
          <input
            name="prix"
            type="number"
            step="0.01"
            min="0"
            value={form.prix}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-stone-300 rounded-md text-base outline-none focus:border-red-600 transition-colors"
          />

          <label className="text-sm font-semibold text-stone-600">Stock</label>
          <input
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-stone-300 rounded-md text-base outline-none focus:border-red-600 transition-colors"
          />

          {/* Boutons d'action */}
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 bg-red-700 hover:bg-red-800 text-white py-2 rounded-md font-semibold transition-colors"
            >
              Ajouter
            </button>
            <button
              type="button"
              className="flex-1 bg-stone-200 hover:bg-stone-300 text-stone-700 py-2 rounded-md font-semibold transition-colors"
              onClick={onCancel}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
