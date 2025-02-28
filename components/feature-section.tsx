"use client"
import { motion } from "framer-motion"
import { JSX } from "react"
import { Shield, TrendingUpIcon, CircleDollarSignIcon, ScreenShare, Users2Icon, Wallet2Icon } from "lucide-react"

const FeatureSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Pourquoi nous choisir ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const FeatureCard = ({ feature, index }: { feature: Feature; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
        {feature.icon}
          <h3 className="text-xl font-semibold text-white ml-4">{feature.title}</h3>
        </div>
        <p className="text-gray-400">{feature.description}</p>
      </div>
    </motion.div>
  )
}

const features: Feature[] = [
  {
    title: "Sécurité de Niveau Bancaire",
    description:
      "Nous utilisons des protocoles de sécurité avancés pour protéger vos actifs numériques avec la même rigueur qu'une banque traditionnelle.",
    icon: <Shield className="h-8 w-8 text-blue-600" />,
  },
  {
    title: "Trading en Temps Réel",
    description:
      "Notre plateforme permet des transactions instantanées, vous assurant une exécution rapide et fiable de vos ordres.",
    icon: <TrendingUpIcon className="h-8 w-8 text-green-600" />,
  },
  {
    title: "Support Multi-Devises",
    description:
      "Accédez à un large éventail de crypto-monnaies, incluant Bitcoin, Ethereum et bien d'autres, pour diversifier votre portefeuille.",
    icon: <CircleDollarSignIcon className="h-8 w-8 text-yellow-600" />,
  },
  {
    title: "Interface Intuitive",
    description:
      "Notre interface utilisateur est conçue pour être simple et efficace, que vous soyez débutant ou trader expérimenté.",
    icon: <ScreenShare className="h-8 w-8 text-purple-600" />,
  },
  {
    title: "Assistance 24/7",
    description:
      "Notre équipe de support client est disponible à tout moment pour répondre à vos questions et résoudre vos problèmes.",
    icon: <Users2Icon className="h-8 w-8 text-red-600" />,
  },
  {
    title: "Gestion de Portefeuille",
    description: "Utilisez nos outils avancés pour suivre, analyser et optimiser vos investissements en temps réel.",
    icon: <Wallet2Icon className="h-8 w-8 text-indigo-600" />,
  },
];


export default FeatureSection

