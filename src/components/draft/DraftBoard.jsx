import React, { useState, useEffect } from 'react';
import { database } from '../firebase/firebase';
import { ref, onValue } from 'firebase/database';

function DraftBoard({ draftState, players }) {
    const [draftPicks, setDraftPicks] = useState([]);

    useEffect(() => {
        const draftInfoRef = ref(database, 'draftInfo');
        const unsubscribe = onValue(draftInfoRef, (snapshot) => {
            const picks = [];
            snapshot.forEach((userSnapshot) => {
                const userData = userSnapshot.val();
                Object.entries(userData.picks || {}).forEach(([round, playerId]) => {
                    const player = players.find(p => p.id === playerId);
                    if (player) {
                        picks.push({
                            round: parseInt(round.replace('round', '')),
                            pickNumber: (parseInt(round.replace('round', '')) - 1) * 30 + userData.order,
                            playerName: player.name
                        });
                    }
                });
            });
            setDraftPicks(picks.sort((a, b) => a.pickNumber - b.pickNumber));
        });

        return () => unsubscribe();
    }, [players]);

    return (
        <div>
            <h2>Draft Board</h2>
            {[...Array(10)].map((_, round) => (
                <div key={round}>
                    <h3>Round {round + 1}</h3>
                    <ul>
                        {draftPicks
                            .filter(pick => pick.round === round + 1)
                            .sort((a, b) => (round % 2 === 0 ? a.pickNumber - b.pickNumber : b.pickNumber - a.pickNumber))
                            .map(pick => (
                                <li key={pick.pickNumber}>
                                    Pick {pick.pickNumber}: {pick.playerName}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default DraftBoard;