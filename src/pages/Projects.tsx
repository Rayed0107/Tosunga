import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Target, Clock, Users, ArrowRight, Filter, Search } from 'lucide-react';

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.association_name && p.association_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-ubuntu-orange/30 border-t-ubuntu-orange rounded-full animate-spin mx-auto mb-4" />
        <p className="text-ubuntu-ink/50">Chargement des projets...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-ubuntu-serif font-bold mb-6">Projets Solidaires</h1>
          <p className="text-ubuntu-ink/60 text-lg">
            Chaque don, petit ou grand, nous rapproche de notre objectif. Soutenez une cause qui vous tient à cœur.
          </p>
        </div>
        
        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ubuntu-ink/30" size={20} />
            <input
              type="text"
              placeholder="Rechercher un projet..."
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="ubuntu-card flex flex-col md:flex-row h-full"
          >
            <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-ubuntu-ink text-xs font-bold uppercase tracking-wider">
                  {project.category}
                </span>
              </div>
            </div>
            
            <div className="md:w-3/5 p-8 flex flex-col">
              <div className="mb-4">
                <div className="text-ubuntu-orange text-xs font-bold uppercase tracking-widest mb-1">
                  {project.association_name}
                </div>
                <h3 className="text-2xl font-bold">{project.title}</h3>
              </div>
              
              <p className="text-ubuntu-ink/60 text-sm mb-8 flex-grow line-clamp-3">
                {project.description}
              </p>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{Math.round((project.collected_amount / project.target_amount) * 100)}% collecté</span>
                    <span className="text-ubuntu-orange">{project.collected_amount}€ / {project.target_amount}€</span>
                  </div>
                  <div className="h-2 bg-ubuntu-ink/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(project.collected_amount / project.target_amount) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-ubuntu-orange"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-ubuntu-ink/5">
                  <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-ubuntu-ink/50 text-xs font-bold uppercase tracking-wider">
                      <Clock size={16} className="text-ubuntu-green" />
                      {project.daysLeft} jours
                    </div>
                    <div className="flex items-center gap-2 text-ubuntu-ink/50 text-xs font-bold uppercase tracking-wider">
                      <Users size={16} className="text-ubuntu-green" />
                      {project.donors} donateurs
                    </div>
                  </div>
                  <button className="ubuntu-button-primary py-2 px-6 text-sm">
                    Donner
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Transparency Note */}
      <div className="mt-24 bg-ubuntu-ink/5 rounded-[3rem] p-12 border border-ubuntu-ink/10 flex flex-col md:flex-row items-center gap-12">
        <div className="w-24 h-24 bg-ubuntu-orange/10 rounded-full flex items-center justify-center text-ubuntu-orange flex-shrink-0">
          <Target size={48} />
        </div>
        <div>
          <h3 className="text-3xl font-ubuntu-serif font-bold mb-4">La transparence est notre priorité</h3>
          <p className="text-ubuntu-ink/60 leading-relaxed">
            Chaque euro collecté sur Ubuntu Help est tracé. Nous exigeons de nos associations partenaires des rapports financiers détaillés et des photos des actions réalisées pour chaque projet financé. Vous recevez un rapport d'impact directement dans votre boîte mail une fois le projet terminé.
          </p>
        </div>
      </div>
    </div>
  );
}
