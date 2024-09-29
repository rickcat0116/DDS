import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { DraftPicker } from "../data/pickData";

export default function TeamSelect () {
    const [availableTeams, setAvailableTeams] = useState([...DraftPicker]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [currentTeam, setCurrentTeam] = useState(null);
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
        const duration = 3000; // 애니메이션 시간을 3초로 늘림
        const interval = 50; // 더 빠른 회전을 위해 간격을 줄임
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            if (progress < duration) {
                // 모든 availableTeams를 순환
                const index = Math.floor((progress / interval) % availableTeams.length);
                setCurrentTeam(availableTeams[index]);
                requestAnimationFrame(animate);
            } else {
                // 최종 선택
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
            slotRef.current.style.backgroundColor = '#ffffff';
        }
    }, []);


    return (
        <PickerWrap>
            <div className="pick-content">
                <div className="pick-tit">
                    <h1>팀 셀렉트</h1>
                </div>

                <div className="slot-box">
                    <div className="slot-machine">
                        <div ref={slotRef} className="slot-display">
                            {currentTeam && (
                                <div className="slot-in">
                                    <div className="image-in">
                                        <img src={currentTeam.image} alt={currentTeam.team} />
                                    </div>
                                    <span>{currentTeam.team}</span>
                                </div>
                            )}
                        </div>
                        <p>남은 팀 : {availableTeams.length}</p>

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
                        <h3>팀 선택</h3>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {selectedTeams.map((team, index) => (
                                <li key={index}>
                                    <p>#{index + 1}</p>
                                    <div className="image-in">
                                        <img src={team.image} alt={team.team} />
                                    </div>
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
    padding:35px 0;
    width:980px;

    .pick-tit {
      position:relative;

      h1 {
        font-weight:700;
        font-size:64px;
      }
    }

    .slot-display {
      height:300px;
      display:flex;
      align-items: center;
      justify-content: center;
      
      .slot-in {
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .image-in {
          display:flex;
          align-items: center;
          justify-content: center;
          width:180px;
          height:180px;
        }
        
        span {
          margin-top:12px;
          display:block;
          font-weight:700;
          font-size:24px;

        }
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
          margin-top:30px;
          display:flex;
          flex-wrap:wrap;
          gap:25px 10px;
          
          li {
            width: calc(10% - 10px);
            .image-in {
              display:flex;
              align-items:center;
              justify-content: center;
              width:88px;
              height:88px;
              
              
              img {
                width:70px;
                height:70px;
                object-fit: scale-down;
              }
            }
            
            p {
              font-weight:700;
              font-size:16px;
            }
            
            span {
              display:block;
              font-weight:700;
              font-size:16px;
              text-align:center;
            }
          }
        }
      }
    }
  }
`