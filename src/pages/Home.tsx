import { motion } from 'motion/react';
import { ArrowRight, Heart, Shield, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const stats = [
    { label: 'Enfants aidés', value: '12,400+', icon: Heart },
    { label: 'Associations', value: '150+', icon: Users },
    { label: 'Dons collectés', value: '850k€', icon: Zap },
    { label: 'Projets actifs', value: '45', icon: Shield },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "Refuge Talangaï",
      description: "Construction d'un centre d'accueil pour 50 enfants des rues à Brazzaville.",
      target: 15000,
      collected: 8450,
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
      category: "Infrastructure"
    },
    {
      id: 2,
      title: "Éducation pour tous",
      description: "Fournitures scolaires et bourses d'études pour les orphelins de Bacongo.",
      target: 5000,
      collected: 3200,
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=800",
      category: "Éducation"
    },
    {
      id: 3,
      title: "Santé Mobile",
      description: "Clinique mobile pour apporter des soins médicaux dans les zones reculées.",
      target: 25000,
      collected: 12000,
      image: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&q=80&w=800",
      category: "Santé"
    }
  ];

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=2000"
            alt="Enfants en Afrique"
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ubuntu-ink/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block px-4 py-1 rounded-full bg-ubuntu-orange/20 border border-ubuntu-orange/30 text-ubuntu-orange font-medium text-sm mb-6 backdrop-blur-sm">
              Solidarité & Espoir
            </span>
            <h1 className="text-6xl md:text-8xl font-ubuntu-serif font-bold leading-[0.9] mb-8">
              Chaque enfant mérite un <span className="italic text-ubuntu-orange">avenir.</span>
            </h1>
            <p className="text-xl text-white/70 mb-10 leading-relaxed">
              TOSUNGA connecte les cœurs généreux aux associations locales pour transformer la vie des enfants démunis en Afrique.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/projets" className="ubuntu-button-primary flex items-center gap-2">
                Soutenir un projet <ArrowRight size={18} />
              </Link>
              <Link to="/signaler" className="bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all">
                Signaler une urgence
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 ubuntu-card"
            >
              <div className="w-12 h-12 bg-ubuntu-orange/10 rounded-2xl flex items-center justify-center text-ubuntu-orange mx-auto mb-4">
                <stat.icon size={24} />
              </div>
              <div className="text-3xl font-bold text-ubuntu-ink mb-1">{stat.value}</div>
              <div className="text-sm text-ubuntu-ink/50 uppercase tracking-wider font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Projets Urgents</h2>
            <p className="text-ubuntu-ink/60 max-w-lg">
              Découvrez les initiatives qui ont besoin de votre soutien immédiat pour faire la différence.
            </p>
          </div>
          <Link to="/projets" className="hidden md:flex items-center gap-2 text-ubuntu-orange font-bold hover:underline">
            Voir tous les projets <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="ubuntu-card group"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-ubuntu-ink text-xs font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-ubuntu-ink/60 text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm font-bold">
                    <span>{Math.round((project.collected / project.target) * 100)}% collecté</span>
                    <span className="text-ubuntu-orange">{project.collected}€ / {project.target}€</span>
                  </div>
                  <div className="h-2 bg-ubuntu-ink/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(project.collected / project.target) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="h-full bg-ubuntu-orange"
                    />
                  </div>
                  <button className="w-full ubuntu-button-secondary py-3 mt-4">
                    Soutenir ce projet
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ubuntu-ink rounded-[3rem] p-12 md:p-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-ubuntu-orange/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-ubuntu-serif font-bold mb-8 leading-tight">
              Vous voulez agir concrètement ? <br />
              <span className="text-ubuntu-orange italic">Devenez bénévole.</span>
            </h2>
            <p className="text-white/70 text-lg mb-10">
              Que vous soyez médecin, enseignant, ou simplement prêt à donner de votre temps, votre aide est précieuse pour nos associations partenaires.
            </p>
            <Link to="/benevolat" className="ubuntu-button-primary inline-block">
              Rejoindre le programme
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
