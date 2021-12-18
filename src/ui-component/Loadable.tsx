import React, { LazyExoticComponent, Suspense } from 'react';

// project imports
import Loader from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

const Loadable = (Component: LazyExoticComponent<React.FC>) => (): JSX.Element  => {
    const element = (
        <Suspense fallback={<Loader />}>
            <Component />
        </Suspense>
    );

    return element;
}

export default Loadable;
