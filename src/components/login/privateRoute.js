import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // 사용자가 인증되지 않았다면 로그인 페이지로 리다이렉트합니다.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 사용자가 인증되었다면 자식 컴포넌트를 렌더링합니다.
    return children;
};

export default PrivateRoute;