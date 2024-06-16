'use client'

// onClick, fetch, useStaet: 'use client'

import './LoginBtn.css';
import {signIn, signOut, useSession} from 'next-auth/react';

export default function LoignBtn({login}){
    console.log(login);
    return(
        <>
            {
                login ? (
                    <>
                        <button onClick={() => {signIn()}}>로그아웃</button>
                        <span>{login.user.name}</span>
                    </>
                ) : (
                    <button onClick={() => {signOut()}}>로그인</button>
                )
            }
            
        </>
    )
}