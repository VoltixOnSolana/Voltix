'use client'
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, BarChart3, Shield, Coins, Twitter, Facebook, LinkedinIcon as LinkedIn, Instagram, User2Icon } from "lucide-react"
import { Button } from "@/utils/HeroUI"
import Image from "next/image"
import { Spacer, Divider, Tabs, Tab, Card, CardBody } from "@heroui/react"
import gio from "./GiovanniGoat.jpeg"



export default function About() {
  const services = [
    { title: "Francisco", description: "Développeur full-stack", icon: User2Icon },
    { title: "Giovanni", description: "Développeur full-stack et chef de projet", icon: User2Icon },
    { title: "Enzo", description: "Développeur back-end", icon: User2Icon },
    { title: "Luca", description: "Développeur front-end", icon: User2Icon },
  ]
  const socialLinks = [
    { name: "Twitter", icon: Twitter, url: "#" },
    { name: "Facebook", icon: Facebook, url: "#" },
    { name: "LinkedIn", icon: LinkedIn, url: "https://www.linkedin.com/pub/dir/Giovanni/Salcuni" },
    { name: "Instagram", icon: Instagram, url: "#" },
  ]

  return (

    <div className="w-full min-h-screen justify-center items-center space-y-4 text-white mb-[50px]">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center mt-[20px]">À propos</h2>
        <div className="grid md:grid-cols-1 gap-8">
          <div className="flex w-full space-x-4">
            <div className="w-1/2">
              <p className="mb-4">
                Voltix est à l'avant-garde de la révolution des crypto-monnaies. Fondée en 2024, notre mission est de rendre les actifs numériques accessibles à tous, tout en repoussant les limites de la technologie blockchain. Nous nous engageons à offrir des solutions sécurisées, transparentes et innovantes, permettant à chaque utilisateur de naviguer facilement dans l'univers complexe des crypto-monnaies. Grâce à une équipe d'experts passionnés, nous développons des technologies de pointe qui sécurisent les transactions tout en favorisant l'inclusion financière.
              </p>
              <p className="mb-4">
                Nous mettons un point d'honneur à adopter une approche transparente et responsable, en respectant les normes réglementaires en vigueur et en assurant une gestion rigoureuse des actifs. Nos solutions permettent à nos clients de gérer leurs investissements en toute sérénité, avec des mécanismes de sécurité avancés. Voltix anticipe les évolutions futures du marché des crypto-monnaies et vise à transformer le secteur financier en offrant des produits fiables et avant-gardistes, contribuant ainsi à un monde où chacun peut profiter des avantages des technologies numériques.
              </p>
            </div>
            <Spacer x={5}/>
            <Divider orientation="vertical" className="my-4 h-[90%]" />
            <Spacer x={5}/>
            <div className="w-1/2">
              <Tabs placement="start" aria-label="Options">
                <Tab key="accessibilite" title="Accessibilité">
                  <Card>
                    <CardBody>
                      Notre objectif est de rendre les crypto-monnaies accessibles à tous, en simplifiant les processus d'achat, de vente et de gestion des actifs numériques, afin que chacun puisse en bénéficier, quelle que soit son expérience avec la technologie.
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="adoption" title="Adoption">
                  <Card>
                    <CardBody>
                      Nous croyons en l'immense potentiel de la blockchain au-delà des crypto-monnaies. Nous travaillons activement à intégrer cette technologie dans des industries telles que la finance, la supply chain et l'énergie pour offrir plus de transparence et d'efficacité.
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="securite" title="Sécurité">
                  <Card>
                    <CardBody>
                      La sécurité des transactions est notre priorité. Nous développons des solutions qui garantissent la protection des actifs tout en étant capables de s'adapter aux évolutions rapides du marché des crypto-monnaies et de la technologie blockchain.
                    </CardBody>
                  </Card>
                </Tab>
                <Tab key="communaute" title="Communauté">
                  <Card>
                    <CardBody>
                      Nous cherchons à rassembler les passionnés de crypto-monnaies du monde entier, en créant une communauté solide et engagée qui partage des connaissances, des idées et des ressources pour faire avancer l'adoption de cette technologie.
                    </CardBody>
                  </Card>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Spacer y={8} />
      <section className="py-16 bg-background">
        <div className="container mx-auto ">
          <div className="flex flex-col md:flex-row items-center gap-8 ">
            <div className="w-full md:w-1/3 ">
              <Image
                src={gio}
                alt="Le boss"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />

            </div>
            <Card className="w-full md:w-2/3 bg-card text-card-foreground">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Message du PDG</h2>
                <p className="mb-4"><i>
                  "Chez Voltix, nous ne nous contentons pas de suivre les tendances – nous les créons. Depuis le premier jour, notre mission a été de repousser les limites, d’innover et d’apporter des solutions qui transforment le quotidien de nos clients.

                  Notre engagement repose sur trois piliers : l’excellence, l’innovation et la confiance. Chaque projet que nous menons est guidé par ces valeurs, avec la volonté d’apporter une réelle valeur ajoutée à ceux qui nous font confiance.

                  Nous croyons en un avenir où la technologie et l'humain avancent ensemble. C’est cette vision qui nous pousse à donner le meilleur de nous-mêmes, chaque jour, pour construire un monde plus performant et accessible.

                  Merci de faire partie de cette aventure.<br></br> L’histoire ne fait que commencer !"

                </i>
                </p>
                <p className="font-semibold">-  Giovanni Salcuni, Fondateur & PDG de Voltix</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-secondary-foreground">Notre équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="bg-card text-card-foreground border-primary">
                <CardHeader>
                  <service.icon className="w-10 h-10 mb-2 text-primary" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Spacer y={8} />
        <Divider className="flex my-4 w-[50%] mx-auto" />
        <Spacer y={8} />
        <div className="container mx-auto text-center ">
          <h2 className="text-2xl font-bold mb-6 text-muted-foreground ">Nos réseaux</h2>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <Button key={index}>
                <a href={social.url} target="_blank" rel="noopener noreferrer">
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}



