import React from 'react';
import { database } from '../firebase/firebase';
import { ref, set } from 'firebase/database';

function AdminControl({ activeUsers, onStartDraft }) {
    const handleStartDraft = () => {
        if (activeUsers.length === 30) {
            const draftStateRef = ref(database, 'draftState');
            set(draftStateRef, {
                isStarted: true,
                currentPick: 1,
                currentRound: 1,
                timeLeft: 90,
                isPaused: false,
                pauseTimeLeft: 10
            });
            onStartDraft();
        } else {
            alert('All 30 participants must be present to start the draft.');
        }
    };

    return (
        <div>
            <h2>Admin Control</h2>
            <p>Current Participants: {activeUsers.length} / 30</p>
            <button
                onClick={handleStartDraft}
                disabled={activeUsers.length !== 30}
            >
                Start Draft
            </button>
            {activeUsers.length !== 30 && (
                <p>Waiting for all participants to join...</p>
            )}
        </div>
    );
}

export default AdminControl;