import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { useAuth } from '../login/AuthContext';
import styled from 'styled-components';

const DraftUtil = () => {
    const { user } = useAuth();
    const [connectedUsers, setConnectedUsers] = useState(0);
    const [isAdminConnected, setIsAdminConnected] = useState(false);
    const [myDraftOrder, setMyDraftOrder] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const db = getDatabase();

        const statusRef = ref(db, 'status');
        const userRef = ref(db, `user/${user.id}`);
        const draftOrderRef = ref(db, 'draftOrder/regular/players');

        const unsubscribeStatus = onValue(statusRef, (snapshot) => {
            const statusData = snapshot.val();
            updateConnectedUsers(statusData);
        });

        const unsubscribeUser = onValue(userRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                setUserRole(userData.role);
            }
        });

        const unsubscribeDraftOrder = onValue(draftOrderRef, (snapshot) => {
            const data = snapshot.val();
            if (data && userRole === 'user') {
                const myOrder = data.indexOf(user.id) + 1;
                setMyDraftOrder(myOrder > 0 ? myOrder : null);
            } else {
                setMyDraftOrder(null);
            }
        });

        return () => {
            unsubscribeStatus();
            unsubscribeUser();
            unsubscribeDraftOrder();
        };
    }, [user.id, userRole]);

    const updateConnectedUsers = async (statusData) => {
        const db = getDatabase();
        const userSnapshot = await get(ref(db, 'user'));
        const userData = userSnapshot.val();

        let userCount = 0;
        let adminConnected = false;

        Object.entries(statusData || {}).forEach(([userId, status]) => {
            if (status.online) {
                const userRole = userData[userId]?.role;
                if (userRole === 'user') {
                    userCount++;
                } else if (userRole === 'admin') {
                    adminConnected = true;
                }
            }
        });

        setConnectedUsers(userCount);
        setIsAdminConnected(adminConnected);
    };

    return (
        <UtilWrapper>
            <InfoItem>접속 유저 수: {connectedUsers}</InfoItem>
            <InfoItem>관리자 접속 여부: {isAdminConnected ? '접속 중' : '미접속'}</InfoItem>
            <InfoItem>내 닉네임: {user?.name}</InfoItem>
            {userRole === 'user' && myDraftOrder && (
                <InfoItem>내 드래프트 순서: {myDraftOrder}</InfoItem>
            )}
        </UtilWrapper>
    );
};

const UtilWrapper = styled.div`
  flex:.3;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const InfoItem = styled.p`
  font-size: 18px;
  line-height:1.8;
  font-weight:600;
`;

export default DraftUtil;