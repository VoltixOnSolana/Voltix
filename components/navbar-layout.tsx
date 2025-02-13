"use client"

import React from 'react'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarItem,
    Link,
    Button
} from "@/utils/HeroUI";
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { signOutAction } from "@/app/(auth-pages)/actions/authActions"
import { paths } from '@/paths';

// Définition des propriétés attendues par le composant NavbarLayout
interface NavbarLayoutProps {
    user: User | null; // L'utilisateur peut être un objet User ou null
}

// Composant principal de la barre de navigation
export default function NavbarLayout({ user }: NavbarLayoutProps) {
    const pathname = usePathname(); // Récupère le chemin actuel de la navigation
    const [isMenuOpen, setIsMenuOpen] = React.useState(false); // État pour gérer l'ouverture du menu

    // Fonction pour vérifier si un chemin est actif
    const isActive = (path: string) => {
        return pathname.startsWith(path);
    }

    return (
        <Navbar
            shouldHideOnScroll
            className={"bg-black/30 text-white"}
            onMenuOpenChange={setIsMenuOpen}
            isBordered
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit">Voltix</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {/* Lien vers la page d'accueil */}
                <NavbarItem isActive={isActive(paths.home())}>
                    <Link className="text-white" href={paths.home()}>
                        Accueil
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={isActive(paths.market())}>
                    <Link className="text-white" href={paths.market()}>
                        Market
                    </Link>
                </NavbarItem>
                {/* Lien vers la page à propos */}
                <NavbarItem isActive={isActive(paths.about())}>
                    <Link className="text-white" href={paths.about()}>
                        A propos
                    </Link>
                </NavbarItem>
                {/* Lien vers la page de contact */}
                <NavbarItem isActive={isActive(paths.contact())}>
                    <Link className="text-white" href={paths.contact()}>
                        Contact
                    </Link>
                </NavbarItem>
            </NavbarContent>
            {!user ? (
                <NavbarContent justify="end">
                    {/* Lien pour se connecter si l'utilisateur n'est pas connecté */}
                    <NavbarItem className="hidden lg:flex">
                        <Link className="text-white" href={paths.signIn()}>Connexion</Link>
                    </NavbarItem>
                    {/* Bouton pour s'inscrire */}
                    <NavbarItem>
                        <Button as={Link} color="primary" href={paths.signUp()} variant="solid">
                            Inscription
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            ) : (
                <NavbarContent justify="end">
                    {/* Lien vers le compte utilisateur si l'utilisateur est connecté */}
                    <NavbarItem className="hidden lg:flex">
                        <Link className="text-white" href={paths.userAccount(user.id)}>Mon compte</Link>
                    </NavbarItem>
                    {/* Formulaire pour se déconnecter */}
                    <NavbarItem className="hidden lg:flex">
                        <form action={signOutAction}>
                            <Button
                                type="submit"
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-primary text-primary-foreground hover:bg-red-500 hover:text-primary-foreground/90"
                            >
                                Déconnexion
                            </Button>
                        </form>
                    </NavbarItem>
                </NavbarContent>
            )}
            {/* Menu de navigation pour les petits écrans */}
            <NavbarMenu className="bg-gray-900 text-white">
                <NavbarMenuItem isActive={isActive(paths.home())}>
                    <Link className="text-white w-full" href={paths.home()}>
                        Accueil
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={isActive(paths.market())}>
                    <Link className="text-white w-full" href={paths.market()}>
                        Market
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={isActive(paths.about())}>
                    <Link className="text-white w-full" href={paths.about()}>
                        A propos
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={isActive(paths.contact())}>
                    <Link className="text-white w-full" href={paths.contact()}>
                        Contact
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}