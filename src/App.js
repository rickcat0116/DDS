import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './js/GlobalStyles';
import './App.css';

import MainLayout from "./components/layout/MainLayout";
import Home from "./components/page/home";
import TeamPicker from "./components/page/teamPicker";
import DraftPicker from "./components/page/draftPicker";

// 로그인
import Login from "./components/page/login";
import Dashboard from "./components/page/dashboard";
import { AuthProvider } from './components/login/AuthContext'
import PrivateRoute from "./components/login/privateRoute";
import DraftRoom from "./components/page/draftRoom";

function App() {
    return (
        <AuthProvider>
            <GlobalStyles />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                </Route>
                <Route path="/teampick" element={<TeamPicker />} />
                <Route path="/draftpick" element={<DraftPicker />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/draft" element={<PrivateRoute><DraftRoom /></PrivateRoute>} />
            </Routes>
        </AuthProvider>
    );
}

export default App;