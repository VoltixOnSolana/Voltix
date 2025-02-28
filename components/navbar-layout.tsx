"use client"
import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    NavbarItem,
    Link,
    Button,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    Switch,
} from "@/utils/HeroUI";
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { signOutAction } from "@/app/(auth-pages)/actions/authActions";
import { paths } from '@/paths';
import { SearchBar } from './search-bar';
import { ChevronDownIcon, CreditCard, DollarSign, LogOut, UserIcon, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface NavbarLayoutProps {
    user: User | null;
}

export default function NavbarLayout({ user }: NavbarLayoutProps) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { theme, setTheme } = useTheme();

    const isActive = (path: string) => {
        return pathname.startsWith(path);
    }

    // Get user initials from email
    const getUserInitials = (email: string) => {
        return email
            .split('@')[0]
            .split('.')
            .map(part => part[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const handleThemeChange = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

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
                    <Link href={paths.home()} className="text-white text-2xl">
                        <p className="font-bold text-inherit">Voltix</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={isActive(paths.home())}>
                    <Link className="text-white" href={paths.home()}>
                        Accueil
                    </Link>
                </NavbarItem>

                {/* Grouped Market and About in a dropdown */}
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white"
                                endContent={<ChevronDownIcon className="text-white" />}
                                radius="sm"
                                variant="light"
                            >
                                Découvrir
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu aria-label="Navigation">
                        <DropdownItem
                            key="market"
                            href={paths.market()}
                            className={isActive(paths.market()) ? "text-primary" : "text-foreground"}
                        >
                            Market
                        </DropdownItem>
                        <DropdownItem
                            key="about"
                            href={paths.about()}
                            className={isActive(paths.about()) ? "text-primary" : "text-foreground"}
                        >
                            À propos
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <NavbarItem isActive={isActive(paths.contact())}>
                    <Link className="text-white" href={paths.contact()}>
                        Contact
                    </Link>
                </NavbarItem>
            </NavbarContent>

            {!user ? (
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link className="text-white" href={paths.signIn()}>Connexion</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href={paths.signUp()} variant="solid">
                            Inscription
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            ) : (
                <NavbarContent justify="end">
                    <NavbarItem className="w-46">
                        <SearchBar />
                    </NavbarItem>
                    <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                            <Avatar
                                as="button"
                                className="transition-transform"
                                color="primary"
                                name={getUserInitials(user.email || '')}
                                size="sm"
                            />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Profile Actions"
                            itemClasses={{
                                base: "gap-4",
                            }}
                        >
                            <DropdownItem
                                key="theme"
                                className="h-14 gap-2"
                                closeOnSelect={false}
                            >
                                <div className="flex items-center justify-between w-full text-foreground">
                                    <div className="flex gap-2 items-center">
                                        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                                        <span>Thème sombre</span>
                                    </div>
                                    <Switch
                                        isSelected={theme === 'dark'}
                                        onValueChange={handleThemeChange}
                                        size="sm"
                                    />
                                </div>
                            </DropdownItem>
                            <DropdownItem
                                key="account"
                                description="Voir vos informations de compte"
                                className="text-foreground"
                                startContent={<UserIcon />}
                                href={paths.userAccount(user.id)}
                            >
                                Mon compte
                            </DropdownItem>
                            <DropdownItem
                                key="deposit"
                                description="Déposer des fonds sur votre compte"
                                className="text-foreground"
                                startContent={<DollarSign />}
                                href={paths.userDeposit(user.id)}
                            >
                                Déposer
                            </DropdownItem>
                            <DropdownItem
                                key="billing"
                                description="Voir vos factures"
                                className="text-foreground"
                                startContent={<CreditCard />}
                                href={paths.userBilling(user.id)}
                            >
                                Facturation
                            </DropdownItem>
                            <DropdownItem
                                key="logout"
                                description="Déconnexion de votre compte"
                                className="text-foreground"
                                startContent={<LogOut />}
                            >
                                <form action={signOutAction}>
                                    <button type="submit" className="w-full text-left">
                                        Déconnexion
                                    </button>
                                </form>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </NavbarContent>
            )}

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
    );
}