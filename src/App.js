import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './js/GlobalStyles';
import './App.css';

import MainLayout from "./components/layout/MainLayout";
import DashBoardLayout from "./components/layout/DashBoardLayout";

import Home from "./components/page/home";
import TeamPicker from "./components/page/teamPicker";
import DraftPicker from "./components/page/draftPicker";

import Login from "./components/page/login";
import Dashboard from "./components/page/dashboard";
import ProfileSettings from "./components/draft/profile";
import { AuthProvider, useAuth } from './components/login/AuthContext'
import OnlineStatusTracker from "./components/login/OnlineStatus";
import PrivateRoute from "./components/login/privateRoute";
import DraftRoom from "./components/page/draftRoom";
import DraftOrderSetup from "./components/draft/draftOrderSetup";

// Firebase 설정 임포트
import { app } from './firebaseConfig';

function AppRoutes() {
    const { user } = useAuth();

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path='/' element={<Home />} />
            </Route>
            <Route path="/teampick" element={<TeamPicker />} />
            <Route path="/teamSelect" element={<TeamSelect/>} />
            <Route path="/draftpick" element={<DraftPicker />} />
            <Route path="/login" element={<Login />} />
            <Route element={<DashBoardLayout />}>
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/dashboard/draft" element={<PrivateRoute><DraftRoom /></PrivateRoute>} />
                <Route path="/dashboard/profile" element={<PrivateRoute><ProfileSettings /></PrivateRoute>} />
                <Route path="/dashboard/order" element={<PrivateRoute><DraftOrderSetup /></PrivateRoute>} />
            </Route>
        </Routes>
    );
}

function App() {
    return (
            <AuthProvider>
                <GlobalStyles />
                <OnlineStatusTracker />
                <AppRoutes />
            </AuthProvider>
    );
}

export default App;