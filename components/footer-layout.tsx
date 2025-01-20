import Link from 'next/link'
import React from 'react'

export default function FooterLayout() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="border-t border-gray-700 py-4 mx-10">
                <div className="flex flex-row gap-4 justify-between">
                    <p className="text-sm text-gray-400">
                        © 2025 Voltix. Tous droits réservés.
                    </p>
                    <div className="flex flex-row gap-4 justify-center">
                        <Link href="https://github.com">GitHub</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

