import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { TeamPicker } from "../data/pickData";

export default function TeamPick () {
    const [availableTeams, setAvailableTeams] = useState([...TeamPicker]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [currentTeam, setCurrentTeam] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const slotRef = useRef(null);

    useEffect(() => {
        // 컴포넌트 마운트 시 무작위 팀 선택
        const randomIndex = Math.floor(Math.random() * availableTeams.length);
        setCurrentTeam(availableTeams[randomIndex]);
    }, []);

    const spinSlot = () => {
        if (availableTeams.length === 0 || isSpinning) return;

        setIsSpinning(true);
        const duration = 2000;
        const interval = 100;
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            if (progress < duration) {
                const randomIndex = Math.floor(Math.random() * availableTeams.length);
                setCurrentTeam(availableTeams[randomIndex]);
                requestAnimationFrame(animate);
            } else {
                const finalIndex = Math.floor(Math.random() * availableTeams.length);
                const selectedTeam = availableTeams[finalIndex];
                setCurrentTeam(selectedTeam);
                setAvailableTeams(prevTeams => prevTeams.filter(team => team !== selectedTeam));
                setSelectedTeams(prevSelected => [...prevSelected, selectedTeam]);
                setIsSpinning(false);
            }
        };

        requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (slotRef.current) {
            slotRef.current.style.fontSize = '24px';
            slotRef.current.style.fontWeight = 'bold';
            slotRef.current.style.textAlign = 'center';
            slotRef.current.style.padding = '20px';
            slotRef.current.style.border = '2px solid black';
            slotRef.current.style.borderRadius = '10px';
            slotRef.current.style.backgroundColor = '#f0f0f0';
        }
    }, []);


    return (
        <PickerWrap>
            <div className="pick-content">
                <div className="pick-tit">
                    <h1>팀 드래프트</h1>
                </div>

                <div className="slot-box">
                    <div className="slot-machine">
                        <div ref={slotRef} className="slot-display">
                            {currentTeam}
                        </div>
                        <p>남은 인원 : {availableTeams.length}</p>

                        <button
                            onClick={spinSlot}
                            disabled={isSpinning || availableTeams.length === 0}
                            style={{
                                width:'100%',
                                marginTop: '10px',
                                padding: '10px 20px',
                                fontSize: '18px',
                                fontFamily:'Pretendard',
                                fontWeight:'700',
                                backgroundColor: isSpinning ? '#cccccc' : '#1D428A',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: isSpinning ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {isSpinning ? '추첨중...' : '추첨'}
                        </button>
                    </div>

                    <div className="selected-teams">
                        <h3>드래프트 순위</h3>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {selectedTeams.map((team, index) => (
                                <li key={index} style={{
                                    width: 'calc(25% - 57px)',
                                    height: '25px',
                                    lineHeight: '25px',
                                    padding: '0 10px',
                                    backgroundColor: '#e0e0e0',
                                    borderRadius: '3px',
                                    fontSize: '14px',
                                    fontWeight:'700',
                                }}>
                                    {team}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </PickerWrap>
    )
}

const PickerWrap = styled.div`
  position:relative;
  width:100%;
  height:100vh;
  display:flex;
  align-items:center;
  justify-content: center;
  
  .pick-content {
    width:980px;

    .pick-tit {
      position:relative;

      h1 {
        font-weight:700;
        font-size:64px;
      }
    }

    .slot-box {
      margin-top:75px;

      p {
        margin-top:18px;
        display:block;
        font-weight:500;
        font-size:18px;
      }

      .selected-teams {
        margin-top:30px;

        h3 {
          font-size:18px;
          font-weight:500;
          text-align: center;
        }

        ul {
          min-height:200px;
          margin-top:30px;
          display:flex;
          flex-wrap:wrap;
          gap:10px 10px;
        }
      }
    }
  }
`