import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import styled from 'styled-components';

const DraftTimer = ({ isUserTurn }) => {
    const [timeLeft, setTimeLeft] = useState(null);
    const [totalTime, setTotalTime] = useState(null);

    useEffect(() => {
        const db = getDatabase();
        const timerRef = ref(db, 'timer');

        const unsubscribe = onValue(timerRef, (snapshot) => {
            const timerData = snapshot.val();
            if (timerData) {
                setTimeLeft(timerData.timeLeft);
                setTotalTime(timerData.totalTime);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        let interval;
        if (isUserTurn && timeLeft !== null && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    const newTime = prevTime - 1;
                    updateTimerInDatabase(newTime);
                    return newTime;
                });
            }, 1000);
        } else if (timeLeft === 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isUserTurn, timeLeft]);

    const updateTimerInDatabase = (newTime) => {
        const db = getDatabase();
        const timerRef = ref(db, 'timer');
        set(timerRef, { timeLeft: newTime, totalTime });
    };

    if (timeLeft === null || totalTime === null) {
        return <TimerWrapper>타이머 대기 중...</TimerWrapper>;
    }

    const progress = (timeLeft / totalTime) * 100;

    return (
        <TimerWrapper>
            <ProgressBar progress={progress} />
            <TimeDisplay>{timeLeft}초</TimeDisplay>
        </TimerWrapper>
    );
};

const TimerWrapper = styled.div`
  width: 100%;
  height: 30px;
  background-color: #e0e0e0;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressBar = styled.div`
  width: ${props => props.progress}%;
  height: 100%;
  background-color: #4caf50;
  transition: width 1s linear;
`;

const TimeDisplay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #000;
  font-weight: bold;
`;

export default DraftTimer;