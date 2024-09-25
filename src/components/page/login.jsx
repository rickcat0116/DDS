import React, { useState } from 'react';
import styled from 'styled-components';
import {  ref, get } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../login/AuthContext';
import { database } from '../../firebaseConfig';

import BG from '../../assets/img/dashboard_bg.webp'

function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const usersRef = ref(database, 'user');  // 수정된 부분

        try {
            const snapshot = await get(usersRef);
            const users = snapshot.val();

            const user = Object.values(users).find(
                (user) => user.id === id && user.pw === password
            );

            if (user) {
                console.log('Login successful', user);
                login(user);
                navigate('/dashboard');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login');
        }
    };

    return (
        <LoginWrap>
            <form onSubmit={handleSubmit}>
                <div className="form_tit">
                    <h4>DDS. Tokiwa</h4>
                </div>
                <div className="input_box">
                    <label htmlFor="id">ID</label>
                    <input
                        id="id"
                        type="text"
                        placeholder="ID"
                        required
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </div>
                <div className="input_box">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Login</button>
            </form>
        </LoginWrap>
    );
}

const LoginWrap = styled.div`
  position:relative;
  width:100%;
  height:100vh;
  display:flex;
  justify-content: center;
  align-items: center;
  background:url(${BG}) 50% 50% no-repeat;
  
  &::before {
    content:'';
    z-index:1;
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0, 0.7);
  }
  
  form {
    z-index:2;
    position:relative;
    padding:30px;
    border-radius:12px;
    background:var(--color-white);
    
    h4 {
      font-weight:700;
      font-size:24px;
      color:#000000;
      text-align:center;
    }
    
    .input_box {
      label {
        margin-bottom:12px;
        display:block;
        font-weight:400;
        font-size:18px;
      }
      
      input {
        width:420px;
        height:50px;
        padding:0 16px;
        border-radius:12px;
        outline:none;
        border:1px solid #d0d0d0;
        font-weight:400;
        font-size:18px;
        color:var(--color-black);
      }
    }
    
    div + div {
      margin-top:30px;
    }
    
    button {
      margin-top:30px;
      width:420px;
      height:50px;
      line-height:50px;
      border-radius:12px;
      text-align:center;
      font-family: var(--font-family);
      font-weight:600;
      font-size:18px;
      color:#ffffff;
      background:#000000;
    }
  }
`

export default Login;