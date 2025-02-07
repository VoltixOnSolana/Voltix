import React from 'react';
import { paths } from '@/paths';
import { Button } from '@heroui/react';
import { Home, Compass } from 'lucide-react'; // Icône de boussole
import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center space-y-4 text-white'>
            <Compass size={145} className="mb-4" /> {/* Icône de boussole très grande */}
            <h1 className="text-5xl font-bold">Oups...</h1> {/* Texte grand et centré */}
            <p className='text-lg text-center'>
                Il semble que vous êtes perdu.<br></br> La page que vous recherchez n'existe pas, veuillez retourner à l'aceuil.
            </p>
            <Button
                as={Link}
                href={paths.home()}
                color='primary'
                startContent={<Home className="text-xl" />} // Icône maison
            >
                Accueil
            </Button>
        </div>
    );
};

export default Custom404;
