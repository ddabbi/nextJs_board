// api/post/edit 으로 API 요청하면 동작할 서버함수

import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";

// 받아온 input정보로 DB에 수정하고 list페이지로 이동시키기
export default async function handler(req, res){
    //req : 요청메시지
    //res : 응답할 값을 담는 공간
    console.log(req.body);      // input에 적은 값은 req.body에 있음
    if(req.method == "POST"){
        let {id, title, content} = req.body;
        if(id && title && content){     // 비어있으면 안되는 값들을 체크
            // DB에서 해당 id를 찾아 title과 content를 수정
            // list페이지로 이동시킴
            try {
                const db = (await connectDB).db("mydb");
                let result = await db.collection("post").updateOne({_id:ObjectId.createFromHexString(id)}, 
                    {$set: {
                        title: title,
                        content: content
                    }});      // 수정을 위해선 updateOne({조건}, {변경값})
                return res.redirect(302, '/list');  // 변경이 끝나면 list로
            } catch (error) {
                // try-catch : 상황에 따라 실패할 수 있는 함수를 사용할 떄 활용(프로그램 다운 방지)
                // 서버기능이 실패하면 500
                return res.status(500).json({error: error});

            }
        }
    }else{
        //POST방식이 아닌 형태로 요청이 옴(거른다)
        // 405 : 사용자 실수(클라이언트 컴포넌트가 사용방법이 틀림)
        return res.status(405).json({error: 'POST요청을 보내주세요'})
    }
}