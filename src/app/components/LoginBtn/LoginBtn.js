'use client';

import {signIn, signOut, useSession} from 'next-auth/react';
import './LoginBtn.css';
import Link from 'next/link';

// onClick과 useState 등은 'use client' 에서만 사용 가능
export default function LoginBtn({login})
{
    return(
        <>
            {
                !login ? (
                    <button onClick={()=>{signIn()}} className='login-btn'>로그인</button>
                ) : (
                    <button onClick={()=>{signOut()}} className='login-btn'>로그아웃</button>
                )
            }
            
            {
                !login ? (
                    <Link href='/register' className='user-signup'>회원가입</Link>
                ) : (
                    <span className='login-name'>{login?.user?.name}</span>
                )
            }
        </>
    )
}

// signIn : 로그인
// signOut : 로그아웃