import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Stethoscope, Heart, Briefcase, Calendar, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Volunteer() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = [
    { id: 'edu', title: 'Éducation', icon: GraduationCap, description: 'Enseignement, soutien scolaire, alphabétisation.' },
    { id: 'health', title: 'Santé', icon: Stethoscope, description: 'Médecins, infirmiers, psychologues, sensibilisation.' },
    { id: 'social', title: 'Social', icon: Heart, description: 'Éducateurs, travailleurs sociaux, médiation.' },
    { id: 'admin', title: 'Admin & Com', icon: Briefcase, description: 'Gestion, communication, levée de fonds.' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-xl border border-ubuntu-green/10"
        >
          <div className="w-20 h-20 bg-ubuntu-green/10 rounded-full flex items-center justify-center text-ubuntu-green mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-4xl font-ubuntu-serif font-bold mb-4">Bienvenue dans l'équipe !</h2>
          <p className="text-ubuntu-ink/60 text-lg mb-8">
            Votre candidature a été transmise aux associations partenaires. Un responsable vous contactera très prochainement pour discuter de votre engagement.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="ubuntu-button-primary"
          >
            Retour au programme
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
        <div>
          <span className="inline-block px-4 py-1 rounded-full bg-ubuntu-green/10 text-ubuntu-green font-bold text-sm mb-6 uppercase tracking-widest">
            Engagement Solidaire
          </span>
          <h1 className="text-5xl md:text-7xl font-ubuntu-serif font-bold mb-8 leading-tight">
            Donnez de votre temps, <br />
            <span className="text-ubuntu-orange italic">changez des vies.</span>
          </h1>
          <p className="text-ubuntu-ink/60 text-lg mb-10 leading-relaxed">
            Le bénévolat est le moteur de notre action. Que vous ayez quelques heures par semaine ou un mois par an, vos compétences et votre énergie sont essentielles pour soutenir les enfants en difficulté.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {roles.map((role) => (
              <div key={role.id} className="p-6 ubuntu-card bg-white/50">
                <div className="w-10 h-10 bg-ubuntu-orange/10 rounded-xl flex items-center justify-center text-ubuntu-orange mb-4">
                  <role.icon size={20} />
                </div>
                <h3 className="font-bold mb-2">{role.title}</h3>
                <p className="text-xs text-ubuntu-ink/50 leading-relaxed">{role.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-ubuntu-ink/5">
          <h2 className="text-3xl font-ubuntu-serif font-bold mb-8">Devenir Bénévole</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-ubuntu-ink/50 uppercase tracking-widest ml-2">Nom complet</label>
                <input type="text" className="ubuntu-input" placeholder="Ex: Jean Dupont" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-ubuntu-ink/50 uppercase tracking-widest ml-2">Email</label>
                <input type="email" className="ubuntu-input" placeholder="Ex: jean@email.com" required />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-ubuntu-ink/50 uppercase tracking-widest ml-2">Ville / Pays</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-ubuntu-ink/30" size={18} />
                  <input type="text" className="ubuntu-input pl-12" placeholder="Ex: Brazzaville" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-ubuntu-ink/50 uppercase tracking-widest ml-2">Disponibilité</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-ubuntu-ink/30" size={18} />
                  <select className="ubuntu-input pl-12 appearance-none" required>
                    <option value="">Sélectionnez</option>
                    <option value="weekend">Week-ends</option>
                    <option value="soir">En soirée</option>
                    <option value="plein">Temps plein</option>
                    <option value="ponctuel">Ponctuel</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-ubuntu-ink/50 uppercase tracking-widest ml-2">Domaine de compétence</label>
              <select className="ubuntu-input appearance-none" required>
                <option value="">Sélectionnez votre domaine</option>
                {roles.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-ubuntu-ink/50 uppercase tracking-widest ml-2">Pourquoi voulez-vous nous rejoindre ?</label>
              <textarea className="ubuntu-input min-h-[120px] resize-none" placeholder="Partagez vos motivations..."></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full ubuntu-button-primary py-4 flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Envoyer ma candidature <Send size={18} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { name: "Sarah", role: "Médecin Bénévole", text: "Une expérience humaine incroyable. Voir le sourire d'un enfant qu'on a soigné n'a pas de prix." },
          { name: "Marc", role: "Enseignant", text: "Ubuntu Help m'a permis de transmettre mon savoir à des enfants qui en ont soif. C'est gratifiant." },
          { name: "Awa", role: "Com' Digitale", text: "J'aide les associations à être plus visibles. Chaque partage peut déclencher un don vital." },
        ].map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="p-8 ubuntu-card bg-ubuntu-orange/5 border-ubuntu-orange/10"
          >
            <p className="text-ubuntu-ink/70 italic mb-6">"{t.text}"</p>
            <div className="font-bold text-ubuntu-ink">{t.name}</div>
            <div className="text-xs text-ubuntu-orange uppercase tracking-wider font-bold">{t.role}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
