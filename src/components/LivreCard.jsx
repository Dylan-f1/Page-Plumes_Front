// Affiche les informations d'un livre sous forme de carte
export default function LivreCard({ livre, onDelete }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm flex flex-col gap-2">

      {/* En-tête : titre + badge de stock */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold text-base leading-snug text-stone-900">
          {livre.titre}
        </h3>
        {/* Badge vert si stock disponible, rouge si rupture */}
        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${
          livre.stock === 0
            ? 'bg-red-100 text-red-800'
            : 'bg-green-100 text-green-800'
        }`}>
          {livre.stock === 0 ? 'Rupture' : `Stock : ${livre.stock}`}
        </span>
      </div>

      {/* Auteur */}
      <p className="text-sm text-stone-500">{livre.auteur}</p>

      {/* Prix */}
      <p className="text-lg font-bold text-stone-900">{livre.prix.toFixed(2)} €</p>

      {/* Bouton de suppression */}
      <div className="mt-auto pt-3">
        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-semibold py-1.5 rounded-md transition-colors"
          onClick={() => onDelete(livre)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
