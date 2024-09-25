import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getDatabase, ref, set } from 'firebase/database';
import { useAuth } from './AuthContext';

const OnlineStatusTracker = () => {
    const location = useLocation();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const db = getDatabase();
            const statusRef = ref(db, `status/${user.id}`);

            const updateOnlineStatus = async () => {
                const isInDraftRoom = location.pathname === '/dashboard/draft';
                await set(statusRef, { online: isInDraftRoom });
            };

            updateOnlineStatus();
        }
    }, [location, user]);

    return null;
};

export default OnlineStatusTracker;