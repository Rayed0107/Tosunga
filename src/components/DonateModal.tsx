import { motion, AnimatePresence } from 'motion/react';
import { X, CreditCard, Smartphone, ShieldCheck } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTitle?: string;
}

export default function DonateModal({ isOpen, onClose, projectTitle }: DonateModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ubuntu-ink/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden"
          >
            <div className="p-8 md:p-12">
              <button
                onClick={onClose}
                className="absolute top-8 right-8 p-2 text-ubuntu-ink/30 hover:text-ubuntu-ink transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-8">
                <h2 className="text-3xl font-ubuntu-serif font-bold mb-2">Faire un don</h2>
                <p className="text-ubuntu-ink/50">
                  {projectTitle ? `Soutenir le projet : ${projectTitle}` : "Soutenir l'aide humanitaire en Afrique"}
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[10, 20, 50, 100, 200, 500].map((amount) => (
                    <button
                      key={amount}
                      className="py-3 rounded-2xl border-2 border-ubuntu-ink/5 font-bold hover:border-ubuntu-orange hover:text-ubuntu-orange transition-all"
                    >
                      {amount}€
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-ubuntu-ink/50 uppercase tracking-widest ml-2">Montant personnalisé</label>
                  <div className="relative">
                    <input type="number" className="ubuntu-input pr-12" placeholder="Ex: 25" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-ubuntu-ink/30">€</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-bold text-ubuntu-ink/50 uppercase tracking-widest ml-2">Moyen de paiement</div>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-ubuntu-orange bg-ubuntu-orange/5 text-ubuntu-orange font-bold">
                      <Smartphone size={20} /> Mobile Money
                    </button>
                    <button className="flex items-center justify-center gap-3 p-4 rounded-2xl border-2 border-ubuntu-ink/5 text-ubuntu-ink/50 font-bold hover:border-ubuntu-orange hover:text-ubuntu-orange transition-all">
                      <CreditCard size={20} /> Carte Bancaire
                    </button>
                  </div>
                </div>

                <button className="w-full ubuntu-button-primary py-4 text-lg mt-4">
                  Confirmer le don
                </button>

                <div className="flex items-center justify-center gap-2 text-ubuntu-green text-xs font-bold uppercase tracking-wider opacity-60">
                  <ShieldCheck size={16} /> Paiement 100% sécurisé
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
