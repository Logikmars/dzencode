"use client";

import React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import './Link.scss';

interface Props {
    text: string;
    href: string;
}

const Link: React.FC<Props> = ({ text, href }) => {
    const pathname = usePathname();

    const isActive = href === '/'
        ? pathname === href
        : pathname === href || pathname.startsWith(`${href}/`);

    return (
        <NextLink
            href={href}
            className={`Link ${isActive ? 'Link_active Link_activeVisible' : ''}`}
        >
            {text}
        </NextLink>
    );
};

export default Link;
