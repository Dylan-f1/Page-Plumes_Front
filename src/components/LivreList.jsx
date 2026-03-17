import LivreCard from './LivreCard';

export default function LivreList({ livres, onEdit, onDelete }) {
  if (livres.length === 0) {
    return <p className="empty-state">Aucun livre dans le catalogue.</p>;
  }

  return (
    <div className="livre-grid">
      {livres.map((livre) => (
        <LivreCard
          key={livre._id}
          livre={livre}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
