import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Camera, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function Report() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Impossible de récupérer votre position. Veuillez l'activer dans vos paramètres.");
        }
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      type: formData.get('type'),
      description: formData.get('description'),
      lat: location?.lat,
      lng: location?.lng,
      address: formData.get('address'),
    };

    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    } finally {
      setLoading(false);
    }
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
          <h2 className="text-4xl font-ubuntu-serif font-bold mb-4">Signalement Reçu</h2>
          <p className="text-ubuntu-ink/60 text-lg mb-8">
            Merci pour votre vigilance. Les associations les plus proches ont été alertées et interviendront dans les plus brefs délais.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="ubuntu-button-primary"
          >
            Faire un autre signalement
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-50 text-red-600 font-bold text-sm mb-6 border border-red-100">
          <AlertTriangle size={16} />
          URGENCE
        </div>
        <h1 className="text-5xl md:text-6xl font-ubuntu-serif font-bold mb-6">Signaler un enfant en danger</h1>
        <p className="text-ubuntu-ink/60 text-lg max-w-2xl mx-auto">
          Votre signalement peut sauver une vie. Remplissez ce formulaire pour alerter les associations locales immédiatement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-ubuntu-ink/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-ubuntu-ink/70 uppercase tracking-wider ml-2">
              Type de situation
            </label>
            <select name="type" className="ubuntu-input appearance-none bg-no-repeat bg-[right_1.5rem_center]" required>
              <option value="">Sélectionnez une option</option>
              <option value="abandon">Enfant abandonné</option>
              <option value="rue">Enfant vivant dans la rue</option>
              <option value="maltraitance">Maltraitance suspectée</option>
              <option value="sante">Urgence médicale</option>
              <option value="autre">Autre situation critique</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-ubuntu-ink/70 uppercase tracking-wider ml-2">
              Nombre d'enfants concernés
            </label>
            <input name="count" type="number" min="1" className="ubuntu-input" placeholder="Ex: 1" required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-ubuntu-ink/70 uppercase tracking-wider ml-2">
            Description de la situation
          </label>
          <textarea
            name="description"
            className="ubuntu-input min-h-[150px] resize-none"
            placeholder="Décrivez ce que vous voyez, l'état de l'enfant, ses besoins immédiats..."
            required
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="text-sm font-bold text-ubuntu-ink/70 uppercase tracking-wider ml-2">
              Localisation
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="address"
                className="ubuntu-input"
                placeholder="Quartier, rue, point de repère..."
                defaultValue={location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : ''}
                required
              />
              <button
                type="button"
                onClick={handleGetLocation}
                className="p-3 bg-ubuntu-cream rounded-2xl text-ubuntu-orange hover:bg-ubuntu-orange hover:text-white transition-colors"
                title="Utiliser ma position actuelle"
              >
                <MapPin size={24} />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-ubuntu-ink/70 uppercase tracking-wider ml-2">
              Photo (Optionnel)
            </label>
            <div className="relative">
              <input type="file" className="hidden" id="photo-upload" accept="image/*" />
              <label
                htmlFor="photo-upload"
                className="ubuntu-input flex items-center justify-center gap-2 cursor-pointer hover:bg-ubuntu-cream transition-colors border-dashed border-2"
              >
                <Camera size={20} />
                Ajouter une photo
              </label>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full ubuntu-button-primary py-4 text-lg flex items-center justify-center gap-3"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Envoyer le signalement <Send size={20} />
              </>
            )}
          </button>
          <p className="text-center text-ubuntu-ink/40 text-sm mt-4">
            Vos données sont traitées de manière confidentielle et uniquement pour l'intervention humanitaire.
          </p>
        </div>
      </form>
    </div>
  );
}
