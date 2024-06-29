'use client'

import { usePathname, useRouter } from 'next/navigation';
import './DetailLink.css';

export default function DetailLink()
{
    let router = useRouter();        // 클라이언트 컴포넌트에서만 사용가능

    return(
        <button onClick={()=>{router.prefetch('/list')}}>버튼</button>          // /list로 이동
    )
}
// 사용 안함