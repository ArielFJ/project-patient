import React, { forwardRef, Ref } from 'react';
// third-party
import { motion, useCycle } from 'framer-motion';

type Type = 'slide' | 'scale' | 'rotate';
type Direction = 'up' | 'down' | 'left' | 'right';
type Scale = number | { hover: number, tap: number };

type AnimateButtonProps = {
    children?: React.ReactNode;
    type?: Type;
    direction?: Direction;
    offset?: number;
    scale?: Scale;
}

// ==============================|| ANIMATION BUTTON ||============================== //

const AnimateButton = forwardRef((
    { children, type, direction, offset, scale }: AnimateButtonProps,
    ref: Ref<HTMLDivElement>) => {
    let offset1;
    let offset2;
    switch (direction) {
        case 'up':
        case 'left':
            offset1 = offset;
            offset2 = 0;
            break;
        case 'right':
        case 'down':
        default:
            offset1 = 0;
            offset2 = offset;
            break;
    }

    const [x, cycleX] = useCycle(offset1, offset2);
    const [y, cycleY] = useCycle(offset1, offset2);

    switch (type) {
        case 'rotate':
            return (
                <motion.div
                    ref={ref}
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 2,
                        repeatDelay: 0
                    }}
                >
                    {children}
                </motion.div>
            );
        case 'slide':
            if (direction === 'up' || direction === 'down') {
                return (
                    <motion.div
                        ref={ref}
                        animate={{ y: y !== undefined ? y : '' }}
                        onHoverEnd={() => cycleY()}
                        onHoverStart={() => cycleY()}
                    >
                        {children}
                    </motion.div>
                );
            }
            return (
                <motion.div ref={ref} animate={{ x: x !== undefined ? x : '' }} onHoverEnd={() => cycleX()} onHoverStart={() => cycleX()}>
                    {children}
                </motion.div>
            );

        case 'scale':
        default:
            if (typeof scale === 'number') {
                scale = {
                    hover: scale,
                    tap: scale
                };
            }
            return (
                <motion.div ref={ref} whileHover={{ scale: scale?.hover }} whileTap={{ scale: scale?.tap }}>
                    {children}
                </motion.div>
            );
    }
});


AnimateButton.displayName = 'AnimateButton';
export default AnimateButton;
