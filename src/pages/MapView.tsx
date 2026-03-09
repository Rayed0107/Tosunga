import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Info, AlertTriangle, Heart, Navigation } from 'lucide-react';

export default function MapView() {
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const points = [
    { id: 1, x: '45%', y: '65%', type: 'association', name: 'Espoir Bacongo', city: 'Brazzaville', info: '120 enfants aidés' },
    { id: 2, x: '48%', y: '68%', type: 'project', name: 'Refuge Talangaï', city: 'Brazzaville', info: 'Construction en cours' },
    { id: 3, x: '52%', y: '62%', type: 'emergency', name: 'Alerte Rue', city: 'Kinshasa', info: 'Signalement récent' },
    { id: 4, x: '40%', y: '55%', type: 'association', name: 'Avenir Radieux', city: 'Pointe-Noire', info: 'Santé & Eau' },
    { id: 5, x: '35%', y: '40%', type: 'project', name: 'Kits Dignité', city: 'Abidjan', info: 'Distribution active' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-ubuntu-serif font-bold mb-4">Carte de la Solidarité</h1>
        <p className="text-ubuntu-ink/60 text-lg">
          Visualisez l'impact de nos actions et les besoins urgents à travers le continent.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[700px]">
        {/* Map Container */}
        <div className="lg:col-span-2 bg-ubuntu-green/5 rounded-[3rem] border border-ubuntu-ink/5 relative overflow-hidden flex items-center justify-center p-12">
          {/* Simple SVG Africa Map (Simplified) */}
          <svg viewBox="0 0 800 800" className="w-full h-full text-ubuntu-green/10 fill-current">
            <path d="M300,100 C400,50 600,100 700,300 C750,500 600,700 450,750 C350,780 250,700 200,600 C150,500 100,300 150,200 C200,100 250,120 300,100 Z" />
            {/* Markers */}
            {points.map((point) => (
              <g key={point.id} onClick={() => setSelectedPoint(point)} className="cursor-pointer group">
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="8"
                  className={`${
                    point.type === 'emergency' ? 'fill-red-500' : 
                    point.type === 'project' ? 'fill-ubuntu-orange' : 'fill-ubuntu-green'
                  } animate-pulse`}
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="20"
                  className="fill-transparent stroke-current opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </g>
            ))}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-ubuntu-ink/5 space-y-3">
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-3 h-3 rounded-full bg-ubuntu-green" /> Associations
            </div>
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-3 h-3 rounded-full bg-ubuntu-orange" /> Projets actifs
            </div>
            <div className="flex items-center gap-3 text-sm font-bold">
              <div className="w-3 h-3 rounded-full bg-red-500" /> Urgences
            </div>
          </div>

          <div className="absolute top-8 right-8 text-ubuntu-ink/30 flex flex-col items-center">
            <Navigation size={32} className="mb-2" />
            <span className="text-xs font-bold uppercase tracking-widest">Nord</span>
          </div>
        </div>

        {/* Info Panel */}
        <div className="bg-white rounded-[3rem] border border-ubuntu-ink/5 p-8 overflow-y-auto">
          {selectedPoint ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              key={selectedPoint.id}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                selectedPoint.type === 'emergency' ? 'bg-red-50 text-red-500' : 
                selectedPoint.type === 'project' ? 'bg-ubuntu-orange/10 text-ubuntu-orange' : 'bg-ubuntu-green/10 text-ubuntu-green'
              }`}>
                {selectedPoint.type === 'emergency' ? <AlertTriangle size={32} /> : 
                 selectedPoint.type === 'project' ? <Heart size={32} /> : <MapPin size={32} />}
              </div>
              <h2 className="text-3xl font-ubuntu-serif font-bold mb-2">{selectedPoint.name}</h2>
              <div className="flex items-center gap-2 text-ubuntu-ink/50 font-medium mb-6">
                <MapPin size={16} /> {selectedPoint.city}
              </div>
              
              <div className="bg-ubuntu-cream/50 p-6 rounded-2xl mb-8">
                <div className="text-xs font-bold uppercase tracking-widest text-ubuntu-ink/40 mb-2">Informations</div>
                <p className="text-ubuntu-ink/70">{selectedPoint.info}</p>
              </div>

              <div className="space-y-4">
                <button className="w-full ubuntu-button-primary">
                  {selectedPoint.type === 'emergency' ? 'Intervenir' : 'Voir les détails'}
                </button>
                <button className="w-full py-3 text-ubuntu-ink/50 font-bold text-sm hover:text-ubuntu-ink transition-colors">
                  Partager la position
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-ubuntu-ink/30">
              <Info size={48} className="mb-4" />
              <p className="font-medium">Sélectionnez un point sur la carte pour voir les détails.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
