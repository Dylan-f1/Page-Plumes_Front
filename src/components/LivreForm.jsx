import { useState, useEffect } from 'react';

const emptyForm = { titre: '', auteur: '', prix: '', stock: '' };

export default function LivreForm({ onSubmit, onCancel, initial }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initial) {
      setForm({
        titre: initial.titre,
        auteur: initial.auteur,
        prix: initial.prix,
        stock: initial.stock
      });
    } else {
      setForm(emptyForm);
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      titre: form.titre,
      auteur: form.auteur,
      prix: parseFloat(form.prix),
      stock: parseInt(form.stock)
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initial ? 'Modifier le livre' : 'Ajouter un livre'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Titre</label>
          <input name="titre" value={form.titre} onChange={handleChange} required />

          <label>Auteur</label>
          <input name="auteur" value={form.auteur} onChange={handleChange} required />

          <label>Prix (€)</label>
          <input name="prix" type="number" step="0.01" min="0" value={form.prix} onChange={handleChange} required />

          <label>Stock</label>
          <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />

          <div className="modal-actions">
            <button type="submit" className="btn-primary">
              {initial ? 'Enregistrer' : 'Ajouter'}
            </button>
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
