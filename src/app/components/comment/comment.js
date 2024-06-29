'use client'
// use client로 해야 onClick, onChange, useState, fetch등 프론트엔드 전용 함수를 사용할 수 있음
import { useEffect, useState } from 'react';
// 새로고침없이 리액트 방식으로 ajax요청해서 댓글입력(fetch)
import './comment.css';

export default function Comment({boardId}){

    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([]);
    // 페이지가 로딩될때 commentList의 내용을 요청한다
    // useEffect : 로딩될때, 언로딩될때, 갱신될때
    useEffect(()=>{
        // 서버에 댓글리스트를 get요청해서 받아온다
        // 받아온 응답을 setCommentList에 담는다
        fetch('api/comment/list?id='+boardId)
        .then(res=>res.json())
        .then(result=>{
            setCommentList(result);
        })
    }, [])

    return(
        <div className='comment-container'>
            <hr/>
            {
                commentList.length > 0?(
                    commentList.map((item,index)=>{
                        return(
                            <p key={index}>{item?.content}</p>
                        )
                    })
                ) : (
                    null
                )

            }

            {/* onChange : 무언가 입력될때마다 발동되는 함수 */}
            <div>댓글목록</div>
            <input onChange={(e)=>{setComment(e.target.value)}} id='comment-input'/>
            <button onClick={()=>{
                document.getElementById('comment-input').value = '';
                // 서버에 body메시지를 보낼 땐 JSON문자열로 보내기
                fetch('/api/comment/new', {method:'POST', body:JSON.stringify({comment: comment, boardId: boardId})})    // 댓글내용 + 게시글 ID
                .then((res)=>{
                    if(res.status == 200){
                        return res.json()
                    }else{
                        return null
                    }
                })
                .then((result)=>{
                    console.log(result)
                    // 여기에서 state를 업데이트해서 화면에 반영
                })
            }}>댓글입력</button>
        </div>
    )
}

// 부모의 ObjectId 를 저장해놓기