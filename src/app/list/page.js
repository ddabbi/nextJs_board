import { connectDB } from "@/util/db"
import ListItem from "./listItem";

//export const dynamic = 'force-dynamic'              // 빌드시 dynamic 페이지로 빌드되어야할 때 기입
export const revalidate = 20;               // 20초마다 캐싱

export default async function List(){

    // 늦게 처리되는 코드를 건너뛰지말고 기다려라 await
    const db = (await connectDB).db('mydb')                         // DB접속
    let result = await db.collection('post').find().toArray()       // post에서 데이터 가져옴

    // _id 필드를 문자열로 변환
    result = result.map(item =>({
        ...item,
        _id: item._id.toString(),
    }));

    return(
        <>
            <div className="list-bg">
                <ListItem result={result}/>
            </div>
        </>
    )
}

// 삭제하기 버튼을 누르면 state를 변경해서 화면ㅇ르 갱신
// page.js의 기본값은 'use server' : 서버컴포넌트
// onClick, useStae, ... : 클라이언트 컴포넌틑 'use client'
// 클라이언트 함수가 필요한 부분은 컴포넌트로 분리