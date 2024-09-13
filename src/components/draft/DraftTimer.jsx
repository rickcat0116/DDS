import React, { useEffect, useState } from 'react';
import { database } from '../firebase/firebase';
import { ref, set } from 'firebase/database';

function DraftTimer({ currentUser, draftState }) {
    const [timeLeft, setTimeLeft] = useState(draftState.timeLeft);

    useEffect(() => {
        if (draftState.isPaused) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    handleTimeUp();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [draftState.isPaused, draftState.currentPick]);

    const handleTimeUp = () => {
        if (currentUser.uid === 'admin') {
            // Admin gets the draft rights
            const draftStateRef = ref(database, 'draftState');
            set(draftStateRef, {
                ...draftState,
                currentPick: 'admin',
                timeLeft: 90,
                isPaused: false
            });
        }
    };

    const handlePause = () => {
        if (draftState.pauseTimeLeft > 0) {
            const draftStateRef = ref(database, 'draftState');
            set(draftStateRef, {
                ...draftState,
                isPaused: true,
                pauseTimeLeft: draftState.pauseTimeLeft - 1
            });
        }
    };

    return (
        <div>
            <h2>Draft Timer</h2>
            <p>Time Left: {timeLeft} seconds</p>
            {draftState.currentPick === currentUser.order && !draftState.isPaused && (
                <button onClick={handlePause} disabled={draftState.pauseTimeLeft === 0}>
                    Pause ({draftState.pauseTimeLeft} left)
                </button>
            )}
            {draftState.isPaused && <p>Timer Paused</p>}
        </div>
    );
}

export default DraftTimer;