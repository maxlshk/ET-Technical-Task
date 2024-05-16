import { useOutlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

function RootLayout() {
    const location = useLocation();

    const AnimatedOutlet = () => {
        const element = useOutlet();

        return (
            <AnimatePresence mode="wait" initial={true}>
                {element && React.cloneElement(element, { key: location.pathname })}
            </AnimatePresence>
        );
    };

    return (
        <div className='-z-20 min-h-screen'>
            <div className='flex flex-col'>
                <div className="fixed inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr
            from-purple-400 via-[#2bb3d3] to-[#15a297] opacity-60 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] bg-[length:300%_auto] animate-blobs"
                        style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}>
                    </div>
                </div>
                <main className='flex flex-1 overflow-hidden'>
                    <AnimatedOutlet />
                </main>
                <div className="fixed inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]" aria-hidden="true">
                    <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-400 via-[#2bb3d3] to-purple-400 opacity-60 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] bg-[length:300%_auto] animate-blobs"
                        style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
            </div>
        </div>
    );
}

export default RootLayout;