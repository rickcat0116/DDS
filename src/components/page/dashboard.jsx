import React from 'react';
import { useAuth } from '../login/AuthContext';
import {Link, useNavigate} from 'react-router-dom';

function Dashboard() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    return (
        <div>
            <h1>대시보드</h1>
            <p>환영합니다, {currentUser.id}님!</p>
            <button onClick={handleLogout}>로그아웃</button>
            <Link to="/draft">드래프트 입장</Link>
        </div>
    );
}

export default Dashboard;