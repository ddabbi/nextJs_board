// localhost:3000/detail/1
// localhost:3000/detail/2
// localhost:3000/detail/3
//slug: 내가 이동한 URL의 값

// [폴더명] : 다이나믹 라우터

import Comment from "@/app/components/comment/comment" 
import { connectDB } from "@/util/db"
import { ObjectId } from "mongodb"

// URL마다 다른 내용이 보여야하기 때문에 {params} 로 매개변수를 받는다
export default async function Detail({params})
{
    const db = (await connectDB).db('mydb')                         // DB접속
    let result = await db.collection('post').findOne({_id: ObjectId.createFromHexString(params.slug)})       // post에서 하나의 데이터만 가져옴(title이 안녕인 것 찾아서 가져오기)
    //console.log(result)           // 조회 결과
    //console.log(params.slug)           // slug 키 (폴더명 의존)

    return(
        <div>
            <h4>상세페이지</h4>
            <h4>{result?.title}</h4>
            <p>{result?.content}</p>
            <Comment boardId={result?._id.toString()}/>
        </div>
    )
}

// URL과 method를 기입해서 전송 (REST API)
// GET : 데이터 전송 시
// POST : 데이터 추가 시
// PUT : 수정
// DELETE : 삭제
// PATCH