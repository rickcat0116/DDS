import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../login/AuthContext';
import { getDatabase, ref, update } from 'firebase/database';
import {Link} from "react-router-dom";

export default function ProfileSettings() {
    const { user, updateUser } = useAuth();
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        const db = getDatabase();
        const updates = {};
        updates[`user/${user.id}/name`] = name;
        if (password) {
            updates[`user/${user.id}/password`] = password;
        }

        update(ref(db), updates)
            .then(() => {
                setSuccess('프로필이 성공적으로 업데이트되었습니다.');
                // 로컬 사용자 정보 업데이트
                updateUser({ name });
            })
            .catch((error) => {
                setError('프로필 업데이트 중 오류가 발생했습니다: ' + error.message);
            });
    };

    return (
        <ProfileSettingsWrap>
            <h2>프로필 설정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">이름:</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">새 비밀번호 (변경하지 않으려면 비워두세요):</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">새 비밀번호 확인:</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
                <button type="submit">저장</button>
                <Link to="/dashboard">돌아가기</Link>
            </form>
        </ProfileSettingsWrap>
    );
}

const ProfileSettingsWrap = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    div {
      display: flex;
      flex-direction: column;
    }

    label {
      margin-bottom: 0.5rem;
    }

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    button, a {
      padding: 0.5rem;
      background-color: #000;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      text-align:center;

      &:hover {
        background-color: #333;
      }
    }
  }

  .error {
    color: red;
  }

  .success {
    color: green;
  }
`;