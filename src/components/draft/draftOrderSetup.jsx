import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, set } from 'firebase/database';
import styled from 'styled-components';

const DraftOrderSetup = () => {
    const [users, setUsers] = useState([]);
    const [draftOrder, setDraftOrder] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const usersRef = ref(db, 'user');

        const unsubscribe = onValue(usersRef, (snapshot) => {
            const userData = snapshot.val();
            if (userData) {
                const userList = Object.entries(userData)
                    .filter(([_, user]) => user.role === 'user')
                    .map(([id, user]) => ({ id, name: user.name }));
                setUsers(userList);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetIndex) => {
        e.preventDefault();
        const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
        const newOrder = [...draftOrder];
        const [removed] = newOrder.splice(sourceIndex, 1);
        newOrder.splice(targetIndex, 0, removed);
        setDraftOrder(newOrder);
    };

    const handleAddUser = (user) => {
        if (!draftOrder.find(u => u.id === user.id)) {
            setDraftOrder([...draftOrder, user]);
        }
    };

    const handleRemoveUser = (index) => {
        const newOrder = [...draftOrder];
        newOrder.splice(index, 1);
        setDraftOrder(newOrder);
    };

    const handleSaveOrder = async () => {
        if (draftOrder.length !== users.length) {
            alert('모든 사용자를 순서에 포함시켜야 합니다.');
            return;
        }

        const db = getDatabase();
        const regularOrder = draftOrder.map(user => user.id);
        const snakeOrder = [...regularOrder].reverse();

        try {
            await set(ref(db, 'draftOrder/regular'), { players: regularOrder });
            await set(ref(db, 'draftOrder/snake'), { players: snakeOrder });
            alert('드래프트 순서가 저장되었습니다.');
        } catch (error) {
            console.error('드래프트 순서 저장 중 오류 발생:', error);
            alert('드래프트 순서 저장에 실패했습니다.');
        }
    };

    return (
        <SetupWrapper>
            <h2>드래프트 순서 설정</h2>
            <FlexContainer>
                <UserList>
                    <h3>사용자 목록</h3>
                    {users.map((user) => (
                        <UserItem key={user.id} onClick={() => handleAddUser(user)}>
                            {user.id}
                        </UserItem>
                    ))}
                </UserList>
                <OrderList>
                    <h3>드래프트 순서</h3>
                    {draftOrder.map((user, index) => (
                        <OrderItem
                            key={user.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, index)}
                        >
                            {index + 1}. {user.name}
                            <RemoveButton onClick={() => handleRemoveUser(index)}>X</RemoveButton>
                        </OrderItem>
                    ))}
                </OrderList>
            </FlexContainer>
            <SaveButton onClick={handleSaveOrder}>순서 저장</SaveButton>
        </SetupWrapper>
    );
};

const SetupWrapper = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
`;

const FlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const UserList = styled.div`
    width: 45%;
`;

const OrderList = styled.div`
    width: 45%;
`;

const UserItem = styled.div`
    padding: 10px;
    margin: 5px 0;
    background-color: #e0e0e0;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #d0d0d0;
    }
`;

const OrderItem = styled.div`
    padding: 10px;
    margin: 5px 0;
    background-color: #ffffff;
    border: 1px solid #cccccc;
    border-radius: 4px;
    cursor: move;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const RemoveButton = styled.button`
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const SaveButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

export default DraftOrderSetup;