import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../login/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashBoardHeader() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [userName, setUserName] = useState(user ? user.name : '');
    const [userRole, setUserRole] = useState(user ? user.role : '');

    useEffect(() => {
        if (user) {
            setUserName(user.name);
            setUserRole(user.role);
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Header>
            <h4>DDS. Tokiwa</h4>
            <div className="right">
                {user && (
                    <>
                        <p>{userName} ({userRole})</p>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                )}
            </div>
        </Header>
    );
}

const Header = styled.div`
  position: relative;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 80px;
  border-bottom: 1px solid #d0d0d0;

  h4 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 700;
    font-size: 24px;
  }

  .right {
    display: flex;
    align-items: center;
    gap: 0 10px;

    p {
      font-weight: 400;
      font-size: 14px;
    }

    button {
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      background: none;
      border: none;
      color: #007bff;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;