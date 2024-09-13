import React, { useState, useEffect } from 'react';
import { useAuth } from '../login/AuthContext';
import { database } from '../firebase/firebase';
import { ref, set, onValue, onDisconnect, serverTimestamp } from 'firebase/database';
import DraftBoard from '../draft/DraftBoard';
import DraftUtil from '../draft/DraftUtil';
import DraftPick from '../draft/DraftPick';
import DraftTimer from '../draft/DraftTimer';
import AdminControl from '../draft/AdminControl';
import playerData from '../data/player.json';

function DraftRoom() {
    const { currentUser } = useAuth();
    const [isDraftStarted, setIsDraftStarted] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);
    const [draftState, setDraftState] = useState({
        currentPick: 1,
        currentRound: 1,
        timeLeft: 90,
        isPaused: false,
        pauseTimeLeft: 10
    });
    const [availablePlayers, setAvailablePlayers] = useState(playerData.players);

    useEffect(() => {
        if (!currentUser || !currentUser.id) return;

        const userStatusRef = ref(database, `status/${currentUser.id}`);
        const userDraftInfoRef = ref(database, `draftInfo/${currentUser.id}`);
        const draftStateRef = ref(database, 'draftState');

        const setupUserPresence = async () => {
            try {
                await set(userStatusRef, {
                    online: true,
                    lastSeen: serverTimestamp(),
                    inDraftRoom: true,
                    isAdmin: currentUser.id === 'admin'
                });

                if (currentUser.id !== 'admin') {
                    await set(userDraftInfoRef, {
                        order: parseInt(currentUser.id, 10),
                        ready: false,
                        picks: {}
                    });
                }

                onDisconnect(userStatusRef).update({
                    online: false,
                    lastSeen: serverTimestamp(),
                    inDraftRoom: false
                });
            } catch (error) {
                console.error("Error setting up user presence:", error);
            }
        };

        setupUserPresence();

        const activeUsersRef = ref(database, 'status');
        const activeUsersListener = onValue(activeUsersRef, (snapshot) => {
            const users = [];
            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                if (userData.online && userData.inDraftRoom && !userData.isAdmin) {
                    users.push({ id: childSnapshot.key, ...userData });
                }
            });
            setActiveUsers(users);
        });

        const draftStateListener = onValue(draftStateRef, (snapshot) => {
            if (snapshot.exists()) {
                const newDraftState = snapshot.val();
                setDraftState(newDraftState);
                setIsDraftStarted(newDraftState.isStarted || false);
            }
        });

        return () => {
            activeUsersListener();
            draftStateListener();
            set(userStatusRef, {
                online: false,
                lastSeen: serverTimestamp(),
                inDraftRoom: false
            });
        };
    }, [currentUser]);

    const handleStartDraft = async () => {
        const draftStateRef = ref(database, 'draftState');
        try {
            await set(draftStateRef, {
                isStarted: true,
                currentPick: 1,
                currentRound: 1,
                timeLeft: 90,
                isPaused: false,
                pauseTimeLeft: 10
            });
        } catch (error) {
            console.error("Error starting draft:", error);
        }
    };

    const handlePlayerPicked = async (player) => {
        try {
            const pickRef = ref(database, `draftInfo/${currentUser.id}/picks/round${draftState.currentRound}`);
            await set(pickRef, player.id);

            setAvailablePlayers(prevPlayers => prevPlayers.filter(p => p.id !== player.id));

            const nextPick = (draftState.currentPick % 30) + 1;
            const nextRound = nextPick === 1 ? draftState.currentRound + 1 : draftState.currentRound;
            const draftStateRef = ref(database, 'draftState');
            await set(draftStateRef, {
                ...draftState,
                currentPick: nextPick,
                currentRound: nextRound,
                timeLeft: 90,
                isPaused: false
            });
        } catch (error) {
            console.error("Error picking player:", error);
        }
    };

    if (!isDraftStarted && currentUser.id !== 'admin') {
        return <div>드래프트가 시작되기를 기다리고 있습니다. 참가자: {activeUsers.length} / 30</div>;
    }

    return (
        <div>
            <h1>Draft Room</h1>
            {currentUser.id === 'admin' && !isDraftStarted && (
                <AdminControl
                    activeUsers={activeUsers}
                    onStartDraft={handleStartDraft}
                />
            )}
            {isDraftStarted && (
                <>
                    <DraftUtil
                        activeUsers={activeUsers}
                        currentUser={currentUser}
                        draftState={draftState}
                    />
                    <DraftBoard
                        draftState={draftState}
                        players={playerData.players}
                    />
                    <DraftPick
                        currentUser={currentUser}
                        draftState={draftState}
                        availablePlayers={availablePlayers}
                        onPlayerPicked={handlePlayerPicked}
                    />
                    <DraftTimer
                        currentUser={currentUser}
                        draftState={draftState}
                    />
                </>
            )}
        </div>
    );
}

export default DraftRoom;