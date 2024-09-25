import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useAuth } from '../login/AuthContext';
import styled from 'styled-components';

const DraftSummary = () => {
    const { user } = useAuth();
    const [draftData, setDraftData] = useState({});
    const [userOrder, setUserOrder] = useState([]);
    const [totalRounds, setTotalRounds] = useState(10); // 기본값 설정, 필요에 따라 조정

    useEffect(() => {
        const db = getDatabase();
        const draftRef = ref(db, 'draft');
        const orderRef = ref(db, 'draftOrder/regular/players');

        const unsubscribeDraft = onValue(draftRef, (snapshot) => {
            const data = snapshot.val();
            setDraftData(data || {});
        });

        const unsubscribeOrder = onValue(orderRef, (snapshot) => {
            const order = snapshot.val();
            setUserOrder(order || []);
        });

        return () => {
            unsubscribeDraft();
            unsubscribeOrder();
        };
    }, []);

    const renderOverallTable = () => (
        <OverallTable>
            <thead>
                <tr>
                    <th>참가자</th>
                    {[...Array(totalRounds)].map((_, index) => (
                        <th key={index}>라운드 {index + 1}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {userOrder.map(userId => (
                    <tr key={userId}>
                        <td>{draftData[userId]?.name || userId}</td>
                        {[...Array(totalRounds)].map((_, index) => (
                            <td key={index}>{draftData[userId]?.players?.[index + 1] || '-'}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </OverallTable>
    );

    const renderPersonalList = () => (
        <PersonalList>
            <h3>내 선수 목록</h3>
            <ul>
                {[...Array(totalRounds)].map((_, index) => (
                    <li key={index}>
                        라운드 {index + 1}: {draftData[user.id]?.players?.[index + 1] || '-'}
                    </li>
                ))}
            </ul>
        </PersonalList>
    );

    return (
        <SummaryWrapper>
            {renderOverallTable()}
            {renderPersonalList()}
        </SummaryWrapper>
    );
};

const SummaryWrapper = styled.div`
    padding: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
`;

const OverallTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #f2f2f2;
    }
`;

const PersonalList = styled.div`
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        margin-bottom: 10px;
    }
`;

export default DraftSummary;