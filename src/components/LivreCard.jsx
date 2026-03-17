export default function LivreCard({ livre, onEdit, onDelete }) {
  return (
    <div className="livre-card">
      <div className="livre-card-header">
        <h3>{livre.titre}</h3>
        <span className={`stock-badge ${livre.stock === 0 ? 'out' : ''}`}>
          {livre.stock === 0 ? 'Rupture' : `Stock : ${livre.stock}`}
        </span>
      </div>
      <p className="auteur">{livre.auteur}</p>
      <p className="prix">{livre.prix.toFixed(2)} €</p>
      <div className="livre-card-actions">
        <button className="btn-edit" onClick={() => onEdit(livre)}>Modifier</button>
        <button className="btn-delete" onClick={() => onDelete(livre)}>Supprimer</button>
      </div>
    </div>
  );
}
