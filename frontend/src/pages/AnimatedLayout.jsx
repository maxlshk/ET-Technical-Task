import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
    initial: {
        opacity: 0,
        x: '100%',
    },
    in: {
        opacity: 1,
        x: 0,
    },
    out: {
        opacity: 0,
        x: '-100%',
    }
};

const AnimatedLayout = ({ children }) => {
    return (
        <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{ type: 'tween', duration: 0.3 }}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedLayout;
