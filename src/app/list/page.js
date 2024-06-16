import { connectDB } from "@/util/db";
import Link from "next/link";
import ListItem from "./listItem";

export default async function ListPage(){
    const db = (await connectDB).db("mydb");          // await을 쓰려면 async function이여야함
    let result = await db.collection("post").find().toArray();
    
    return(
        <div className="list-bg">
            <ListItem result={result}/> 
        </div>
    )
}

// 삭제하기 버튼을 누르면 state를 변경해서 화면ㅇ르 갱신
// page.js의 기본값은 'use server' : 서버컴포넌트
// onClick, useStae, ... : 클라이언트 컴포넌틑 'use client'
// 클라이언트 함수가 필요한 부분은 컴포넌트로 분리