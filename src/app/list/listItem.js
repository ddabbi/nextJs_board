'use client'

import Link from "next/link"
import { useState } from "react";

// 클라이언트 컴포넌트로 분리

export default function ListItem({result}){

    const [listData, setListData] = useState(result);

    return(
        <>
            {
                listData && listData.length > 0 ? listData.map((item, index)=>{
                    return(
                        <div className="list-item" key={index}>
                            <Link href={`/detail/` + item._id}>
                                <h4>{item.title}</h4>
                                <p>{item.content}</p>
                            </Link>
                            <Link href={'/edit/' + item._id}>✏️수정</Link>
                            <span onClick={()=>{
                                fetch('/api/delete/list_item', {
                                    method: 'DELETE',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({ id: item._id, email:item.email }) // id를 JSON으로 전송
                                })
                                .then((res)=>{
                                    if(res.status == 200){
                                        setListData(prevListData => prevListData.filter((i) => i._id !== item._id));
                                        return res.json();
                                    }
                                    else if(res.status == 400){
                                        alert('글 작성자만 삭제할 수 있습니다')
                                        console.log('계정 정보가 불일치');
                                    }
                                    else{
                                        return "500";
                                    }
                                })
                                .then((data)=>{
                                    console.log(data + '완~');
                                })
                                .catch((error)=>{
                                    console.log(error);
                                })
                            }}>🗑️삭제</span>
                        </div>            
                    )
                }) : null
            }
        </>
    )
}