import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";
import { connectDB } from "@/util/db";

// api/comment/new로 요청하면 받을 API서버
export default async function handler(req, res){
    // POST방식으로 요청이 들어오면
    if(req.method == "POST"){
        console.log(req.body);      // 프론트에서 어떤 메시지를 보내왔는지?
        // JSON문자열은 해체해서 사용한다(자바스크립트는 object형태로 해체가 됨)
        let reqObject = JSON.parse(req.body);       // JSON규칙의 문자열 -> object 자료형
        console.log(reqObject);

        // 현재 료그인한 정보 (로그인 안되어있으면 session == null)
        let session = await getServerSession(req, res, authOptions)
        console.log(session)

        // 댓글을 DB에 저장
        // 1. 댓글내용 2.게시글ID 3. 사용자의 이메일   저장
        // 'mydb' 데이터베이스 안에 'comment' 컬랙션(폴더)로 저장
        if(session !== null){
            //로그인 상태가 맞으면
            let insertItem = {
                content : reqObject.comment,
                parent: ObjectId.createFromHexStrin(reqObject.boardId),
                email:session.user?.email 
            }

            // 데이터 삽입 insertOne
            try{
                const db = (await connectDB).db('mydb')
                let result = await db.collection('comment').insertOne(insertItem);
                console.log('댓글입력완료')
                res.status(200).json(insertItem)
            }catch(error){
                console.log('댓글입력실패: ',error);
                res.status(500).json({error:error})
            }
            
        }else{
            res.status(400).json({error:'로그인이 필요합니다'})
        }
        //res.status(200).json({msg: "받았음"})
    }
}  