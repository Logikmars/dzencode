"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import './PageTransition.scss';

interface Props {
    children: React.ReactNode;
}

const ENTER_DELAY = 24;

const PageTransition: React.FC<Props> = ({ children }) => {
    const pathname = usePathname();
    const previousPathRef = React.useRef(pathname);
    const [transitionStage, setTransitionStage] = React.useState<'idle' | 'enter'>('idle');

    React.useEffect(() => {
        let timeoutId: number | null = null;

        if (pathname !== previousPathRef.current) {
            setTransitionStage('idle');
            timeoutId = window.setTimeout(() => {
                setTransitionStage('enter');
            }, ENTER_DELAY);
            previousPathRef.current = pathname;
        } else {
            setTransitionStage('enter');
        }

        return () => {
            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
        };
    }, [pathname]);

    return (
        <div className='layout_content PageTransition'>
            <div
                key={pathname}
                className={`PageTransition_view ${transitionStage === 'enter' ? 'PageTransition_view_enter' : ''}`}
            >
                {children}
            </div>
        </div>
    );
};

export default PageTransition;
