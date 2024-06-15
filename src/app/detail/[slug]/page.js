// localhost:3000/detail/1
// localhost:3000/detail/2
// localhost:3000/detail/3
//slug: 내가 이동한 URL의 값

import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";

// [폴더] : 동적 route(URL)

//[아무거나] : 동적 route(URL)
// 어떤 항목에 대해 열린 페이지인지 알아야 상세내용을 보여줌
// URL마다 다른 내용이 보내야하기 때문에 {params}로 매개변수를 받음
export default  async function Detail({params}){
    const db = (await connectDB).db("mydb");
    let result = await db.collection("post").findOne({_id: ObjectId.createFromHexString(params.slug)});  // findOne: 하나만 가져옴
    console.log(params);
    console.log(result);
    return(
        <div>
            <h4>상세페이지</h4>
            <h4>{result.title}</h4>
            <p>{result.content}</p>
        </div>
    )
}
