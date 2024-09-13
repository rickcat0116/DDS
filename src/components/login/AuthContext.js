import React, { createContext, useState, useContext } from 'react';
import { database } from '../firebase/firebase';
import { ref, get } from 'firebase/database';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    async function login(id, pw) {
        setLoading(true);
        try {
            const userRef = ref(database, `user/${id}`);
            const snapshot = await get(userRef);

            if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData.pw === pw) {
                    setCurrentUser({ id, ...userData });
                    return { success: true, user: { id, ...userData } };
                } else {
                    throw new Error('Incorrect password');
                }
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error("Login error:", error);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    }

    function logout() {
        setCurrentUser(null);
    }

    const value = {
        currentUser,
        login,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}