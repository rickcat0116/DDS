import React, { createContext, useState, useContext, useEffect } from 'react';
import { getDatabase, ref, set, get } from 'firebase/database';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const userData = JSON.parse(storedUser);
                // Verify user data with the database
                const db = getDatabase();
                const userRef = ref(db, `user/${userData.id}`);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setUser(userData);
                    // Update online status
                    const statusRef = ref(db, `status/${userData.id}`);
                    await set(statusRef, { online: true });
                } else {
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    const login = async (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        const db = getDatabase();
        const statusRef = ref(db, `status/${userData.id}`);
        await set(statusRef, { online: true });
    };

    const logout = async () => {
        if (user) {
            const db = getDatabase();
            const statusRef = ref(db, `status/${user.id}`);
            await set(statusRef, { online: false });
        }
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateUser = (updatedUserData) => {
        const newUserData = { ...user, ...updatedUserData };
        setUser(newUserData);
        localStorage.setItem('user', JSON.stringify(newUserData));
    };

    if (loading) {
        return <div>Loading...</div>; // Or any loading component
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);