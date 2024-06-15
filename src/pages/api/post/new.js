/* 
    localhost:3000/api/post/new 로 요청하면 이 서버 파일이 실행된다

*/

import { connectDB } from "@/util/db";

export default async function writeHandler(req, res){
    //POST요청에는 body 라는 곳에 데이터를 담아보냄 (req.body에 input으로 입력한 것들이 있음)
    console.log(req.body);

    if(req.method == "POST"){
        // body에 담긴 값들을 꺼내고
        // 비어있지 않으면 
        // mongodb에 insertOne입력
        // 요청한 페이지로 돌려보내기 (302, 'URL')
        let {title, content} = req.body;
        if(title && content){
            try {
                // 이 코드를 실행
                const db = (await connectDB).db("mydb"); 
                let result = await db.collection("post").insertOne({title, content});
                return res.redirect(302, '/list');      // 끝나면 /list 페이지로 이동시키기
            } catch (error) {
                // try코드 실행하다 에러날시 여기로 즉시 이동
                console.log('Database Error : ', error);
                return res.status(500).json({error: '서버기능 오류'});
            }
        }else{
            //빈칸으로 입력해서 요청했을때(사용자 실수)
            return res.status(400).json({error: '빈칸은 허용되지 않습니다'});
        }
    }else{
        return res.status(405).json({error: 'Method Not Allowed'});     // POST요청 외에는 에러처리
    }
}