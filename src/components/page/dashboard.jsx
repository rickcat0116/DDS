import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../login/AuthContext';
import { getDatabase, ref, set, onDisconnect } from 'firebase/database';
import BG from '../../assets/img/dashboard_bg.webp'

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const db = getDatabase();

    useEffect(() => {
        // 현재 페이지가 draft가 아니면 online 상태를 false로 설정
        if (location.pathname !== '/dashboard/draft') {
            const statusRef = ref(db, `status/${user.id}`);
            set(statusRef, { online: false });
        }
    }, [location, user.id, db]);

    const handleDraftEntry = () => {
        const statusRef = ref(db, `status/${user.id}`);
        set(statusRef, { online: true })
            .then(() => {
                // 연결이 끊어졌을 때 online 상태를 false로 설정
                onDisconnect(statusRef).set({ online: false });
                navigate('/dashboard/draft');
            })
            .catch((error) => {
                console.error("Error updating online status:", error);
            });
    };

    return (
        <DashBoardWrap>
            <div className="menu_con">
                <ul className="menu_list">
                    <li>
                        <button onClick={handleDraftEntry}>드래프트</button>
                    </li>
                    {user.role === 'user' && (
                        <li>
                            <Link to="/dashboard/profile">프로필 설정</Link>
                        </li>
                    )}
                    {user.role === 'admin' && (
                        <li>
                            <Link to="/dashboard/order">드래프트 순번</Link>
                        </li>
                    )}
                </ul>
            </div>
        </DashBoardWrap>
    );
}

const DashBoardWrap = styled.div`
  position:relative;
  width:100%;
  height:calc(100vh - 80px);
  display:flex;
  align-items:center;
  justify-content: center;
  background:url(${BG}) 50% 50% no-repeat;

  &::before {
    content:'';
    z-index:1;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0, 0.7);
  }
  
  .menu_con {
    z-index:2;
    position:relative;

    .menu_list {
      display:flex;
      gap:30px 30px;
      flex-wrap:wrap;

      li {
        button, a {
          display:block;
          width:420px;
          height:50px;
          line-height:50px;
          border-radius:12px;
          font-weight:700;
          font-size:16px;
          color:#111111;
          background:#ffffff;
          text-align:center;
        }
      }
    }
  }
`