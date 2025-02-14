import React from "react";
import { useId } from "react";

export default function FeaturesSection() {
    return (
        <div className="py-10 lg:py-20 p-4">
            <h2 className="text-4xl font-bold text-center mb-10">Pourquoi nous choisir ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-10 max-w-7xl mx-auto">
                {grid.map((feature) => (
                    <div
                        key={feature.title}
                        className="relative bg-gradient-to-b dark:from-neutral-800 from-gray-700 dark:to-neutral-900 to-gray-800 p-6 rounded-3xl overflow-hidden"
                    >
                        <Grid size={20} />
                        <p className="text-base font-bold text-gray-300 relative z-20">
                            {feature.title}
                        </p>
                        <p className="text-gray-400 mt-4 text-base font-normal relative z-20">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

const grid = [
    {
        title: "Sécurité de Niveau Bancaire",
        description:
            "Notre plateforme utilise des protocoles de sécurité de niveau bancaire pour protéger vos actifs numériques.",
    },
    {
        title: "Trading en Temps Réel",
        description:
            "Effectuez des transactions instantanées avec notre système de trading en temps réel, conçu pour une exécution rapide et fiable.",
    },
    {
        title: "Support Multi-Devises",
        description:
            "Échangez une large gamme de crypto-monnaies avec notre support multi-devises, incluant Bitcoin, Ethereum, et plus.",
    },
    {
        title: "Interface Intuitive",
        description:
            "Profitez d'une interface utilisateur intuitive qui simplifie le processus de trading pour les débutants et les experts.",
    },
    // {
    //     title: "Outils d'Analyse Avancés",
    //     description:
    //         "Utilisez nos outils d'analyse avancés pour suivre les tendances du marché et prendre des décisions éclairées.",
    // },
    {
        title: "Assistance 24/7",
        description:
            "Notre équipe d'assistance est disponible 24/7 pour répondre à toutes vos questions et résoudre vos problèmes.",
    },
    // {
    //     title: "API pour Développeurs",
    //     description:
    //         "Intégrez facilement notre plateforme avec vos applications grâce à notre API robuste et bien documentée.",
    // },
    {
        title: "Gestion de Portefeuille",
        description:
            "Gérez vos actifs numériques avec notre outil de gestion de portefeuille, offrant une vue d'ensemble de vos investissements.",
    },
];

export const Grid = ({
    pattern,
    size,
}: {
    pattern?: number[][];
    size?: number;
}) => {
    const p = pattern ?? [
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
        [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    ];
    return (
        <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
            <div className="absolute inset-0 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
                <GridPattern
                    width={size ?? 20}
                    height={size ?? 20}
                    x="-12"
                    y="4"
                    squares={p}
                    className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-primary/40 fill-primary/50"
                />
            </div>
        </div>
    );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
    const patternId = useId();

    return (
        <svg aria-hidden="true" {...props}>
            <defs>
                <pattern
                    id={patternId}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    x={x}
                    y={y}
                >
                    <path d={`M.5 ${height}V.5H${width}`} fill="none" />
                </pattern>
            </defs>
            <rect
                width="100%"
                height="100%"
                strokeWidth={0}
                fill={`url(#${patternId})`}
            />
            {squares && (
                <svg x={x} y={y} className="overflow-visible">
                    {squares.map(([x, y]: any, index: number) => (
                        <rect
                            strokeWidth="0"
                            key={`${x}-${y}-${index}`}
                            width={width + 1}
                            height={height + 1}
                            x={x * width}
                            y={y * height}
                        />
                    ))}
                </svg>
            )}
        </svg>
    );
}
