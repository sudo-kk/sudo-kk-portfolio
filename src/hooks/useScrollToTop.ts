import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
    const location = useLocation();
    
    useEffect(() => {
        // Immediate scroll to top for both HTML and body elements
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Also use window.scrollTo as backup
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, [location.pathname]);
};

export default useScrollToTop;
