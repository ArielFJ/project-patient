import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import CONFIG from 'renderer/config';

// ==============================|| ROUTING RENDER ||============================== //

// eslint-disable-next-line
export default function ThemeRoutes() {
    return useRoutes([MainRoutes], CONFIG.basename);
}
