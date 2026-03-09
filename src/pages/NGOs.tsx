import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, MapPin, Users, Heart, ExternalLink, Filter } from 'lucide-react';

export default function NGOs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [associations, setAssociations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/associations')
      .then(res => res.json())
      .then(data => {
        setAssociations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching associations:", err);
        setLoading(false);
      });
  }, []);

  const filteredAssociations = associations.filter(assoc => 
    assoc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    assoc.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-ubuntu-orange/30 border-t-ubuntu-orange rounded-full animate-spin mx-auto mb-4" />
        <p className="text-ubuntu-ink/50">Chargement des associations...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-ubuntu-serif font-bold mb-6">Nos Associations Partenaires</h1>
          <p className="text-ubuntu-ink/60 text-lg">
            Découvrez les organisations locales qui travaillent chaque jour sur le terrain pour améliorer la vie des enfants.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ubuntu-ink/30" size={20} />
            <input
              type="text"
              placeholder="Rechercher une association ou une ville..."
              className="ubuntu-input pl-12 w-full sm:w-[350px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-ubuntu-ink/10 rounded-2xl font-bold text-ubuntu-ink hover:bg-ubuntu-cream transition-colors">
            <Filter size={20} /> Filtres
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAssociations.map((assoc, index) => (
          <motion.div
            key={assoc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="ubuntu-card group flex flex-col"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={assoc.image}
                alt={assoc.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ubuntu-ink/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <button className="ubuntu-button-primary w-full flex items-center justify-center gap-2">
                  Voir le profil <ExternalLink size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-8 flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold">{assoc.name}</h3>
                <div className="flex items-center gap-1 text-ubuntu-orange text-sm font-bold">
                  <Heart size={16} fill="currentColor" />
                  Vérifiée
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-ubuntu-ink/50 text-sm mb-4">
                <MapPin size={16} />
                {assoc.location}
              </div>
              
              <p className="text-ubuntu-ink/60 text-sm mb-6 flex-grow">
                {assoc.mission}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {assoc.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-ubuntu-cream rounded-full text-ubuntu-green text-xs font-bold">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="pt-6 border-t border-ubuntu-ink/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-ubuntu-ink/70">
                  <Users size={18} className="text-ubuntu-orange" />
                  <span className="font-bold">{assoc.childrenAided}</span>
                  <span className="text-xs uppercase tracking-wider font-medium opacity-50">Enfants aidés</span>
                </div>
                <button className="text-ubuntu-orange font-bold text-sm hover:underline">
                  Faire un don
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredAssociations.length === 0 && (
        <div className="text-center py-24">
          <div className="text-ubuntu-ink/20 mb-4 flex justify-center">
            <Search size={64} />
          </div>
          <h3 className="text-2xl font-ubuntu-serif font-bold mb-2">Aucune association trouvée</h3>
          <p className="text-ubuntu-ink/50">Essayez de modifier vos critères de recherche.</p>
        </div>
      )}
    </div>
  );
}
