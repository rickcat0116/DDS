import React from 'react';

function DraftUtil({ activeUsers, currentUser, draftState }) {
    const currentUserInfo = activeUsers.find(user => user.uid === currentUser.uid);
    const totalUsers = 30; // 총 유저 수

    return (
        <div>
            <h2>Draft Utility</h2>
            <p>Current Users: {activeUsers.length} / {totalUsers}</p>
            <p>Your Name: {currentUser.displayName}</p>
            <p>Your Nickname: {currentUser.nickname}</p>
            <p>Your Draft Order: {currentUserInfo?.order}</p>
            {draftState.currentPick === currentUserInfo?.order && (
                <p style={{color: 'red', fontWeight: 'bold'}}>It's your turn!</p>
            )}
        </div>
    );
}

export default DraftUtil;