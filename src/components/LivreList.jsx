import LivreCard from './LivreCard';

// Affiche la grille de toutes les cartes livres
export default function LivreList({ livres, onDelete }) {
  // Message affiché si le catalogue est vide
  if (livres.length === 0) {
    return (
      <p className="text-center text-stone-400 mt-16 text-lg">
        Aucun livre dans le catalogue.
      </p>
    );
  }

  return (
    // Grille responsive : 1 colonne sur mobile, 2 sur tablette, 3 sur desktop
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {livres.map((livre) => (
        <LivreCard
          key={livre._id}
          livre={livre}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
