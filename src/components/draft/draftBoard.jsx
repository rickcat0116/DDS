import React, { useState, useEffect, useMemo } from 'react';
import { getDatabase, ref, set, onValue, update, get } from 'firebase/database';
import { useAuth } from '../login/AuthContext';
import styled from 'styled-components';
import playersData from '../data/player.json';
import DraftTimer from './draftTimer';

const DraftBoard = () => {
    const { user } = useAuth();
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [draftStatus, setDraftStatus] = useState('preparing');
    const [currentRound, setCurrentRound] = useState(1);
    const [currentTurn, setCurrentTurn] = useState(null);
    const [lastPickTime, setLastPickTime] = useState(null);
    const [timerEnded, setTimerEnded] = useState(false);
    const [timerSet, setTimerSet] = useState(false);
    const [regularOrder, setRegularOrder] = useState([]);
    const [snakeOrder, setSnakeOrder] = useState([]);
    const [isReady, setIsReady] = useState(false);
    const playersPerPage = 10;

    useEffect(() => {
        const db = getDatabase();
        const currentRef = ref(db, 'current');
        const playersRef = ref(db, 'players');
        const timerRef = ref(db, 'timer');
        const regularOrderRef = ref(db, 'draftOrder/regular/players');
        const snakeOrderRef = ref(db, 'draftOrder/snake/players');
        const draftRef = ref(db, 'draft');

        const unsubscribeCurrent = onValue(currentRef, (snapshot) => {
            const currentData = snapshot.val();
            setDraftStatus(currentData.draftStatus);
            setCurrentTurn(currentData.currentTurn);
            setCurrentRound(currentData.currentRound);
            setLastPickTime(currentData.lastPickTime);
        });

        const unsubscribePlayers = onValue(playersRef, (snapshot) => {
            const playersData = snapshot.val();
            if (playersData) {
                setPlayers(Object.values(playersData));
            }
        });

        const unsubscribeTimer = onValue(timerRef, (snapshot) => {
            const timerData = snapshot.val();
            if (timerData) {
                setTimerSet(timerData.totalTime !== null);
                if (timerData.timeLeft === 0 && isUserTurn) {
                    setTimerEnded(true);
                }
            }
        });

        const unsubscribeRegularOrder = onValue(regularOrderRef, (snapshot) => {
            setRegularOrder(snapshot.val() || []);
        });

        const unsubscribeSnakeOrder = onValue(snakeOrderRef, (snapshot) => {
            setSnakeOrder(snapshot.val() || []);
        });

        const unsubscribeDraft = onValue(draftRef, (snapshot) => {
            const draftData = snapshot.val();
            if (draftData) {
                const userReady = draftData[user.id]?.ready || false;
                setIsReady(userReady);
            }
        });

        return () => {
            unsubscribeCurrent();
            unsubscribePlayers();
            unsubscribeTimer();
            unsubscribeRegularOrder();
            unsubscribeSnakeOrder();
            unsubscribeDraft();
        };
    }, [user.id]);

    const isUserTurn = draftStatus === 'active' && currentTurn === user.id && timerSet && isReady;

    const filteredPlayers = useMemo(() => {
        return players.filter(player => {
            if (player.selected) return false;
            const searchTermLower = searchTerm.toLowerCase();
            const playerNameLower = player.name.toLowerCase();
            let matchCount = 0;
            for (let i = 0; i < searchTermLower.length; i++) {
                if (playerNameLower.includes(searchTermLower[i])) {
                    matchCount++;
                }
            }
            return matchCount === searchTermLower.length;
        }).sort((a, b) => {
            const aStartsWith = a.name.toLowerCase().startsWith(searchTerm.toLowerCase());
            const bStartsWith = b.name.toLowerCase().startsWith(searchTerm.toLowerCase());
            if (aStartsWith && !bStartsWith) return -1;
            if (!aStartsWith && bStartsWith) return 1;
            return a.name.localeCompare(b.name);
        });
    }, [players, searchTerm]);

    const paginatedPlayers = useMemo(() => {
        const startIndex = (currentPage - 1) * playersPerPage;
        return filteredPlayers.slice(startIndex, startIndex + playersPerPage);
    }, [filteredPlayers, currentPage]);

    const getCurrentDraftOrder = () => {
        return currentRound % 2 === 1 ? regularOrder : snakeOrder;
    };

    const getNextTurn = () => {
        const currentOrder = getCurrentDraftOrder();
        const currentIndex = currentOrder.indexOf(currentTurn);
        return currentOrder[(currentIndex + 1) % currentOrder.length];
    };

    const selectRandomPlayer = () => {
        const availablePlayers = players.filter(player => !player.selected);
        if (availablePlayers.length > 0) {
            const randomIndex = Math.floor(Math.random() * availablePlayers.length);
            const randomPlayer = availablePlayers[randomIndex];
            handleConfirmSelection(randomPlayer);
        }
        setTimerEnded(false);
    };

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleConfirmSelection = async (player) => {
        if (!player || !isUserTurn || draftStatus !== 'active' || !timerSet) return;

        const db = getDatabase();
        const userDraftRef = ref(db, `draft/${user.id}/players`);
        const currentRef = ref(db, 'current');
        const playersRef = ref(db, 'players');

        try {
            // Update player selection
            await update(userDraftRef, { [currentRound]: player.name });

            // Mark player as selected
            await update(ref(db, `players/${player.id}`), { selected: true });

            const nextTurn = getNextTurn();
            const currentOrder = getCurrentDraftOrder();
            const nextRound = nextTurn === currentOrder[0] ? currentRound + 1 : currentRound;

            // Update current state
            await update(currentRef, {
                currentTurn: nextTurn,
                lastPickTime: Date.now(),
                currentRound: nextRound
            });

            // Reset timer
            const timerRef = ref(db, 'timer');
            const timerSnapshot = await get(timerRef);
            const timerData = timerSnapshot.val();
            if (timerData && timerData.totalTime !== null) {
                await set(timerRef, { timeLeft: timerData.totalTime, totalTime: timerData.totalTime });
            }

            setSelectedPlayer(null);
        } catch (error) {
            console.error("Error confirming selection:", error);
        }
    };

    return (
        <BoardWrapper disabled={!isUserTurn}>
            <DraftTimer isUserTurn={isUserTurn} />
            {draftStatus === 'paused' && <PausedMessage>드래프트가 일시 정지되었습니다. 모든 참가자가 준비되면 재개됩니다.</PausedMessage>}
            <SearchBar
                type="text"
                placeholder="선수 검색..."
                value={searchTerm}
                onChange={handleSearchChange}
                disabled={!isUserTurn}
            />
            <PlayerList>
                {paginatedPlayers.map(player => (
                    <PlayerItem
                        key={player.id}
                        onClick={() => isUserTurn && handlePlayerClick(player)}
                        isSelected={selectedPlayer && selectedPlayer.id === player.id}
                        disabled={!isUserTurn}
                    >
                        {player.name}
                    </PlayerItem>
                ))}
            </PlayerList>
            <Pagination>
                <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1 || !isUserTurn}
                >
                    이전
                </Button>
                <span>페이지 {currentPage}</span>
                <Button
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={paginatedPlayers.length < playersPerPage || !isUserTurn}
                >
                    다음
                </Button>
            </Pagination>
            {selectedPlayer && isUserTurn && (
                <SelectionPanel>
                    <p>{selectedPlayer.name}</p>
                    <ButtonGroup>
                        <Button onClick={() => handleConfirmSelection(selectedPlayer)}>선수 선택</Button>
                        <Button onClick={() => setSelectedPlayer(null)}>선택 취소</Button>
                    </ButtonGroup>
                </SelectionPanel>
            )}
        </BoardWrapper>
    );
};

const BoardWrapper = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  opacity: ${props => props.disabled ? 0.5 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const PlayerList = styled.div`
  display: grid;
  gap: 10px;
  margin-bottom: 20px;
`;

const PlayerItem = styled.div`
  padding: 10px;
  background-color: ${props => props.isSelected ? '#e0e0e0' : 'white'};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.isSelected ? '#e0e0e0' : '#f0f0f0'};
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #cccccc;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const SelectionPanel = styled.div`
  margin-top: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const PausedMessage = styled.div`
  background-color: #ffeeba;
  color: #856404;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`;

export default DraftBoard;