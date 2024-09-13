import React, { useState, useEffect } from 'react';
import playerData from '../data/player.json';

function DraftPick({ currentUser, draftState, availablePlayers, onPlayerPicked }) {
    const [displayedPlayers, setDisplayedPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // 랜덤 30명 선택 (이미 선택된 선수 제외)
        const randomPlayers = availablePlayers
            .sort(() => 0.5 - Math.random())
            .slice(0, 30);
        setDisplayedPlayers(randomPlayers);
    }, [availablePlayers]);

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);
    };

    const handleSelectPlayer = () => {
        if (selectedPlayer) {
            onPlayerPicked(selectedPlayer);
            setSelectedPlayer(null);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        const filteredPlayers = availablePlayers.filter(player =>
            player.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setDisplayedPlayers(filteredPlayers.slice(0, 30));
    };

    if (draftState.currentPick !== currentUser.order) {
        return <div>Waiting for your turn...</div>;
    }

    return (
        <div>
            <h2>Draft Pick</h2>
            <input
                type="text"
                placeholder="Search players..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <ul>
                {displayedPlayers.map(player => (
                    <li key={player.id} onClick={() => handlePlayerClick(player)}>
                        {player.name}
                    </li>
                ))}
            </ul>
            {selectedPlayer && (
                <div>
                    <p>Selected: {selectedPlayer.name}</p>
                    <button onClick={handleSelectPlayer}>Select</button>
                    <button onClick={() => setSelectedPlayer(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}

export default DraftPick;