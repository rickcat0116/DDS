import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, set, get, onDisconnect } from 'firebase/database';
import { useAuth } from '../login/AuthContext';
import styled from 'styled-components';

const DraftReady = () => {
    const { user } = useAuth();
    const [onlineUsers, setOnlineUsers] = useState({});
    const [readyUsers, setReadyUsers] = useState({});
    const [userRoles, setUserRoles] = useState({});
    const [isReady, setIsReady] = useState(false);
    const [canStart, setCanStart] = useState(false);
    const [draftStatus, setDraftStatus] = useState('preparing');
    const [currentRound, setCurrentRound] = useState(1);
    const [currentTurn, setCurrentTurn] = useState(null);
    const [timerSet, setTimerSet] = useState(false);
    const [pausedTime, setPausedTime] = useState(null);
    const [readyCount, setReadyCount] = useState(0);
    const [onlineUserCount, setOnlineUserCount] = useState(0);

    const getDraftStatusKorean = (status) => {
        switch (status) {
            case 'preparing': return '준비 중';
            case 'active': return '진행 중';
            case 'paused': return '일시 정지';
            case 'completed': return '완료';
            default: return '알 수 없음';
        }
    };

    useEffect(() => {
        const db = getDatabase();
        const statusRef = ref(db, `status/${user.id}`);
        const draftRef = ref(db, 'draft');
        const userRef = ref(db, 'user');
        const currentRef = ref(db, 'current');
        const timerRef = ref(db, 'timer');

        const unsubscribeStatus = onValue(ref(db, 'status'), (snapshot) => {
            const statusData = snapshot.val();
            setOnlineUsers(statusData || {});
            checkUserStatus(statusData);
        });

        const unsubscribeUser = onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            const roles = Object.fromEntries(
                Object.entries(userData).map(([id, data]) => [id, data.role])
            );
            setUserRoles(roles);
        });

        const unsubscribeDraft = onValue(draftRef, (snapshot) => {
            const draftData = snapshot.val();
            setReadyUsers(draftData || {});
        });

        const unsubscribeCurrent = onValue(currentRef, (snapshot) => {
            const currentData = snapshot.val();
            setDraftStatus(currentData.draftStatus);
            setCurrentRound(currentData.currentRound);
            setCurrentTurn(currentData.currentTurn);
        });

        const unsubscribeTimer = onValue(timerRef, (snapshot) => {
            const timerData = snapshot.val();
            setTimerSet(timerData && timerData.totalTime !== null);
            setPausedTime(timerData ? timerData.pausedTime : null);
        });

        // Set user status to online and handle disconnection
        set(statusRef, { online: true });
        onDisconnect(statusRef).update({ online: false });

        // Reset ready status on disconnect
        onDisconnect(ref(db, `draft/${user.id}/ready`)).set(false);

        // Clean up function
        return () => {
            unsubscribeStatus();
            unsubscribeUser();
            unsubscribeDraft();
            unsubscribeCurrent();
            unsubscribeTimer();
            // Reset ready status when component unmounts
            set(ref(db, `draft/${user.id}/ready`), false);
        };
    }, [user.id]);

    useEffect(() => {
        updateReadyStatus();
    }, [onlineUsers, readyUsers, userRoles]);

    const checkUserStatus = async (statusData) => {
        const db = getDatabase();
        const currentRef = ref(db, 'current');
        const draftRef = ref(db, 'draft');

        const currentSnapshot = await get(currentRef);
        const currentData = currentSnapshot.val();

        if (currentData.draftStatus === 'active') {
            const draftSnapshot = await get(draftRef);
            const draftData = draftSnapshot.val();

            const activeUsers = Object.keys(statusData).filter(userId => statusData[userId].online);
            const readyUsers = Object.keys(draftData).filter(userId => draftData[userId].ready);

            if (activeUsers.length !== readyUsers.length) {
                await update(currentRef, { draftStatus: 'paused' });
                const timerRef = ref(db, 'timer');
                const timerSnapshot = await get(timerRef);
                const timerData = timerSnapshot.val();
                if (timerData && timerData.timeLeft) {
                    await update(timerRef, { pausedTime: timerData.timeLeft });
                }
            }
        }
    };

    const updateReadyStatus = () => {
        const onlineCount = Object.entries(onlineUsers).filter(
            ([userId, status]) => status.online && userRoles[userId] === 'user'
        ).length;

        const readyCount = Object.entries(readyUsers).filter(
            ([userId, userData]) =>
                userData.ready &&
                onlineUsers[userId]?.online &&
                userRoles[userId] === 'user'
        ).length;

        setOnlineUserCount(onlineCount);
        setReadyCount(readyCount);
        setCanStart(readyCount === onlineCount && onlineCount > 0);
        setIsReady(readyUsers[user.id]?.ready || false);
    };

    const handleReady = async () => {
        if (userRoles[user.id] !== 'user') return;

        const db = getDatabase();
        const userDraftRef = ref(db, `draft/${user.id}`);

        await update(userDraftRef, { ready: !isReady });

        const draftRef = ref(db, 'draft');
        const draftSnapshot = await get(draftRef);
        const draftData = draftSnapshot.val();

        const allReady = Object.values(draftData).every(userData => userData.ready);

        if (allReady && draftStatus === 'paused') {
            const currentRef = ref(db, 'current');
            await update(currentRef, { draftStatus: 'active' });
        }
    };

    const handleStart = async () => {
        if (userRoles[user.id] !== 'admin' || !canStart) return;

        const db = getDatabase();
        const currentRef = ref(db, 'current');
        const draftOrderRef = ref(db, 'draftOrder/regular/players');

        const draftOrderSnapshot = await get(draftOrderRef);
        const draftOrder = draftOrderSnapshot.val() || [];

        await update(currentRef, {
            draftStatus: 'active',
            currentRound: 1,
            currentTurn: draftOrder[0],
            lastPickTime: Date.now()
        });

        // Set default timer when starting the draft
        await setTimer(60);
    };

    const pauseDraft = async () => {
        const db = getDatabase();
        const currentRef = ref(db, 'current');
        const timerRef = ref(db, 'timer');
        await update(currentRef, { draftStatus: 'paused' });
        const timerSnapshot = await get(timerRef);
        const timerData = timerSnapshot.val();
        if (timerData && timerData.timeLeft) {
            await update(timerRef, { pausedTime: timerData.timeLeft });
        }
    };

    const resumeDraft = async () => {
        const db = getDatabase();
        const currentRef = ref(db, 'current');
        const timerRef = ref(db, 'timer');
        await update(currentRef, { draftStatus: 'active' });
        const timerSnapshot = await get(timerRef);
        const timerData = timerSnapshot.val();
        if (timerData && timerData.pausedTime) {
            await update(timerRef, { timeLeft: timerData.pausedTime, pausedTime: null });
        }
    };

    const resetDraft = async () => {
        if (userRoles[user.id] !== 'admin') return;

        const db = getDatabase();
        const currentRef = ref(db, 'current');
        const draftRef = ref(db, 'draft');
        const timerRef = ref(db, 'timer');
        const playersRef = ref(db, 'players');

        try {
            await set(currentRef, {
                currentRound: 1,
                currentTurn: null,
                draftStatus: 'preparing',
                lastPickTime: null
            });

            const draftSnapshot = await get(draftRef);
            const draftData = draftSnapshot.val() || {};
            for (const userId in draftData) {
                await set(ref(db, `draft/${userId}/players`), null);
                await set(ref(db, `draft/${userId}/ready`), false);
            }

            // Reset timer to default 60 seconds
            await set(timerRef, { timeLeft: 60, totalTime: 60, pausedTime: null });

            const playersSnapshot = await get(playersRef);
            const playersData = playersSnapshot.val() || {};
            for (const playerId in playersData) {
                await set(ref(db, `players/${playerId}/selected`), false);
            }

        } catch (error) {
            console.error("Error resetting draft:", error);
        }
    };

    const setTimer = async (seconds) => {
        if (userRoles[user.id] !== 'admin' || draftStatus !== 'active') return;

        const db = getDatabase();
        const timerRef = ref(db, 'timer');
        await set(timerRef, { timeLeft: seconds, totalTime: seconds, pausedTime: null });
    };

    const resumeTimer = async () => {
        if (userRoles[user.id] !== 'admin' || draftStatus !== 'paused' || !pausedTime) return;

        const db = getDatabase();
        const timerRef = ref(db, 'timer');
        await set(timerRef, { timeLeft: pausedTime, totalTime: pausedTime, pausedTime: null });
        await resumeDraft();
    };

    return (
        <ReadyWrapper>
            <StatusInfo>
                <p>드래프트 상태: {getDraftStatusKorean(draftStatus)}</p>
                <p>현재 라운드: {currentRound}</p>
                <p>현재 차례: {currentTurn ? readyUsers[currentTurn]?.name || currentTurn : '없음'}</p>
            </StatusInfo>
            <UserList>
                {Object.entries(readyUsers).map(([userId, userData]) => (
                    onlineUsers[userId]?.online && userRoles[userId] === 'user' && (
                        <UserItem key={userId} ready={userData.ready}>
                            {userData.name || userId} - {userData.ready ? '준비 완료' : '대기 중'}
                        </UserItem>
                    )
                ))}
            </UserList>
            <ReadyCount>준비 완료: {readyCount} / {onlineUserCount}</ReadyCount>
            {userRoles[user.id] === 'user' && (draftStatus === 'preparing' || draftStatus === 'paused') && (
                <ReadyButton onClick={handleReady} isReady={isReady}>
                    {isReady ? '준비 취소' : '준비 완료'}
                </ReadyButton>
            )}
            {userRoles[user.id] === 'admin' && (
                <div className="admin_util">
                    <div className="draft-button">
                        <StartButton onClick={handleStart} disabled={!canStart || draftStatus !== 'preparing'}>
                            드래프트 시작
                        </StartButton>
                        <PauseResumeButton onClick={draftStatus === 'active' ? pauseDraft : resumeDraft} disabled={draftStatus === 'preparing' || draftStatus === 'completed'}>
                            {draftStatus === 'active' ? '일시 정지' : '재개'}
                        </PauseResumeButton>
                        <ResetButton onClick={resetDraft} disabled={draftStatus === 'active'}>
                            초기화
                        </ResetButton>
                    </div>
                    <TimerButtons>
                        <TimerButton onClick={() => setTimer(60)} disabled={draftStatus !== 'active'}>60초 타이머 시작</TimerButton>
                        <TimerButton onClick={() => setTimer(75)} disabled={draftStatus !== 'active'}>75초 타이머 시작</TimerButton>
                        {pausedTime && (
                            <TimerButton onClick={resumeTimer} disabled={draftStatus !== 'paused'}>
                                타이머 재개 ({pausedTime}초)
                            </TimerButton>
                        )}
                    </TimerButtons>
                </div>
            )}
        </ReadyWrapper>
    );
};


const ReadyWrapper = styled.div`
  flex:1;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-bottom: 20px;

  .admin_util {
    display:flex;
    gap:0 36px;
    
    .draft-button {
      display:flex;
      gap:0 10px;
    }
  }
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
  display:flex;
  flex-wrap:wrap;
  gap:10px 10px;
`;

const UserItem = styled.li`
  width:calc(10% - 9px);
  padding: 10px 0;
  background-color: ${props => props.ready ? '#d4edda' : '#f8d7da'};
  border-radius: 4px;
  text-align:center;
  font-weight:700;
  font-size:15px;
`;

const ReadyCount = styled.p`
  font-weight: bold;
  margin: 15px 0;
`;

const ReadyButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.isReady ? '#dc3545' : '#28a745'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.isReady ? '#c82333' : '#218838'};
  }
`;

const StartButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

const PauseResumeButton = styled(StartButton)`
  background-color: #ffc107;
  &:hover:not(:disabled) {
    background-color: #e0a800;
  }
`;

const ResetButton = styled(StartButton)`
  background-color: #dc3545;
  &:hover:not(:disabled) {
    background-color: #c82333;
  }
`;

const TimerButtons = styled.div`
  display: flex;
  gap:0 10px;
`;

const TimerButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

const StatusInfo = styled.div`
    background-color: #f7f7f7;
    padding: 30px;
    border-radius: 12px;
    margin-bottom: 20px;
  
    p {
      font-weight:600;
      font-size:16px;
      line-height:1.5;
    }
`;

export default DraftReady;