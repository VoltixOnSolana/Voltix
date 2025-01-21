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


export default function NavbarLayout() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
                <NavbarItem isActive={isActive("/")}>
                    <Link className="text-white" href="/">
                        Accueil
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={isActive("/about")}>
                    <Link className="text-white" href="/about">
                        A propos
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={isActive("/contact")}>
                    <Link className="text-white" href="/contact">
                        Contact
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Link className="text-white" href="/sign-in">Connexion</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="/sign-up" variant="solid">
                        Inscription
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu className="bg-gray-900 text-white">
                <NavbarMenuItem isActive={isActive("/")}>
                    <Link className="text-white w-full" href="/">
                        Accueil
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={isActive("/about")}>
                    <Link className="text-white w-full" href="/about">
                        A propos
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem isActive={isActive("/contact")}>
                    <Link className="text-white w-full" href="/contact">
                        Contact
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )
}