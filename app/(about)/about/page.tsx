"use client";

import { UserCard } from "@/components/user-card";
import {
  Twitter,
  Facebook,
  LinkedinIcon as LinkedIn,
  Instagram,
  MessageCircleQuestion,
  ShieldCheckIcon,
  Users2Icon,
  EyeIcon,
  TrendingUpIcon,
} from "lucide-react";
import {
  Spacer,
  Divider,
  Card,
  User,
  Button,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/paths";
import logoVoltix from "@/app/favicon.jpeg";
import enzo from "./images/enzo.png";
import francisco from "./images/francisco.png";
import giovanni from "./images/giovanni.png";
import luca from "./images/luca.png";
import { motion} from "framer-motion";

const teamMembers = [
  {
    name: "Francisco",
    job: "Développeur full-stack",
    email: "jose.alvss@eduge.ch",
    picture: francisco,
  },
  {
    name: "Giovanni",
    job: "Développeur full-stack et chef de projet",
    email: "giovanni.slcn@eduge.ch",
    picture: giovanni,
  },
  {
    name: "Enzo",
    job: "Développeur full-stack",
    email: "enzo.brsc@eduge.ch",
    picture: enzo,
  },
  {
    name: "Luca",
    job: "Développeur full-stack",
    email: "luca.orsn@eduge.ch",
    picture: luca,
  },
];
const socialLinks = [
  { name: "Twitter", icon: Twitter, url: "#" },
  { name: "Facebook", icon: Facebook, url: "#" },
  {
    name: "LinkedIn",
    icon: LinkedIn,
    url: "https://www.linkedin.com/pub/dir/Giovanni/Salcuni",
  },
  { name: "Instagram", icon: Instagram, url: "#" },
];

export default function AboutPage() {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-lg text-foreground",
    trigger: "px-2 py-0 rounded-lg h-14 flex items-center",
    content: "text-medium px-2",
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32 p-5">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
      >
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl text-foreground/80 dark:text-[#EAEAEA]">
            À propos de Voltix
          </h1>
          <p className="max-w-[600px] text-foreground/80 dark:text-[#A1A1A1] md:text-xl">
            Nous révolutionnons l'échange de crypto-monnaies en offrant une
            plateforme sécurisée, rapide et accessible à tous.
          </p>
          <Link href={paths.contact()}>
            <Button
              size="lg"
              color="primary"
              variant="solid"
              className="text-white transition-transform transform hover:scale-105"
            >
              Nous Contacter <MessageCircleQuestion className="w-5 h-5" />
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src={logoVoltix}
            alt="À propos de Voltix"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </motion.div>

      <Spacer y={12} />
      <Divider className="w-[50%] mx-auto" />
      <Spacer y={12} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
      >
        <Accordion
          variant="light"
          className="w-[65%] justify-center mx-auto text-foreground"
          itemClasses={itemClasses}
          motionProps={{
            variants: {
              enter: {
                y: 0,
                opacity: 1,
                height: "auto",
                overflowY: "unset",
                transition: {
                  height: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    duration: 1,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 1,
                  },
                },
              },
              exit: {
                y: -10,
                opacity: 0,
                height: 0,
                overflowY: "hidden",
                transition: {
                  height: {
                    easings: "ease",
                    duration: 0.25,
                  },
                  opacity: {
                    easings: "ease",
                    duration: 0.3,
                  },
                },
              },
            },
          }}
        >
          <AccordionItem
            key="1"
            aria-label="accessibilite"
            title="Accessibilité"
            subtitle="Faciliter l'accès aux crypto-monnaies pour tous"
            startContent={<EyeIcon className="text-green-500" />}
            className="text-foreground"
          >
            Notre objectif est de rendre les crypto-monnaies accessibles à tous,
            en simplifiant les processus d'achat, de vente et de gestion des
            actifs numériques, afin que chacun puisse en bénéficier, quelle que
            soit son expérience avec la technologie.
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="innovation"
            title="Innovation"
            subtitle="Exploiter le potentiel de la blockchain au-delà des cryptos"
            startContent={<TrendingUpIcon className="text-green-500" />}
            className="text-foreground"
          >
            Nous croyons en l'immense potentiel de la blockchain au-delà des
            crypto-monnaies. Nous travaillons activement à intégrer cette
            technologie dans des industries telles que la finance, la supply chain
            et l'énergie pour offrir plus de transparence et d'efficacité.
          </AccordionItem>
          <AccordionItem
            key="3"
            aria-label="securite"
            title="Sécurité"
            subtitle="Protéger les transactions et les actifs numériques"
            startContent={<ShieldCheckIcon className="text-green-500" />}
            className="text-foreground"
          >
            La sécurité des transactions est notre priorité. Nous développons des
            solutions qui garantissent la protection des actifs tout en étant
            capables de s'adapter aux évolutions rapides du marché des
            crypto-monnaies et de la technologie blockchain.
          </AccordionItem>
          <AccordionItem
            key="4"
            aria-label="communaute"
            title="Communauté"
            subtitle="Créer un réseau de passionnés et d'experts"
            startContent={<Users2Icon className="text-green-500" />}
            className="text-foreground"
          >
            Nous cherchons à rassembler les passionnés de crypto-monnaies du monde
            entier, en créant une communauté solide et engagée qui partage des
            connaissances, des idées et des ressources pour faire avancer
            l'adoption de cette technologie.
          </AccordionItem>
        </Accordion>
      </motion.div>

      <Spacer y={12} />
      <Divider className="w-[50%] mx-auto" />
      <Spacer y={12} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="flex flex-col items-center space-y-4"
      >
        <div className="w-full md:w-2/3 flex items-center space-x-4">
          <User
            avatarProps={{
              src: giovanni.src,
              alt: "Salcuni Giovanni",
              className: "w-16 h-16",
            }}
            description="Fondateur & PDG de Voltix"
            name="Salcuni Giovanni"
            className="flex items-center space-x-4"
          />
        </div>

        <Card className="w-full md:w-2/3 bg-[#1E1E1E] shadow-lg rounded-lg border border-[#262626] text-white">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Message du PDG</h2>
            <p className="mb-4">
              <i>
                "Chez Voltix, nous ne nous contentons pas de suivre les
                tendances – nous les créons. Depuis le premier jour, notre
                mission a été de repousser les limites, d'innover et d'apporter
                des solutions qui transforment le quotidien de nos clients.
                Notre engagement repose sur trois piliers : l'excellence,
                l'innovation et la confiance. Chaque projet que nous menons est
                guidé par ces valeurs, avec la volonté d'apporter une réelle
                valeur ajoutée à ceux qui nous font confiance. Nous croyons en
                un avenir où la technologie et l'humain avancent ensemble. C'est
                cette vision qui nous pousse à donner le meilleur de nous-mêmes,
                chaque jour, pour construire un monde plus performant et
                accessible. Merci de faire partie de cette aventure.
                <br /> L'histoire ne fait que commencer !"
              </i>
            </p>
            <p className="font-semibold">
              - Giovanni Salcuni, Fondateur & PDG de Voltix
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <Spacer y={12} />
      <Divider className="w-[50%] mx-auto" />
      <Spacer y={12} />

      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-foreground dark:text-[#EAEAEA]"
      >
        Notre Équipe
      </motion.h2>
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerChildren}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {teamMembers.map((member) => (
          <motion.div
            key={member.name}
            variants={fadeInUp}
          >
            <UserCard
              name={member.name}
              job={member.job}
              email={member.email}
              userPicture={member.picture}
              className="bg-gray-900 text-white"
            />
          </motion.div>
        ))}
      </motion.div>

      <Spacer y={8} />
      <Divider className="w-[50%] mx-auto" />
      <Spacer y={8} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        className="container mx-auto text-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-muted-foreground">
          Nos réseaux
        </h2>
        <div className="flex justify-center space-x-4">
          {socialLinks.map((social, index) => (
            <Button key={index}>
              <Link href={social.url} target="_blank" rel="noopener noreferrer">
                <social.icon className="w-5 h-5" />
                <span className="sr-only">{social.name}</span>
              </Link>
            </Button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
