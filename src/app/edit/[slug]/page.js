import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/db"
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

export default async function Edit({params})
{
    console.log(params)
    let session = await getServerSession(authOptions);
    
    if(session){
        const db = (await connectDB).db('mydb');
        let result = await db.collection('post').findOne({_id:ObjectId.createFromHexString(params.slug)})
        console.log(result)
    
        if(session.user?.email === result.email || session.user?.email === 'myadminaccount@admin.com'){
            // _id 필드를 문자열로 변환해서 사용할 것
            const resultIdString = result._id.toString();
        
            return(
                <div className="p-20">
                    <h4>수정페이지</h4>
                    <form action="/api/post/edit" method="POST">
                        <input type="hidden" name="id" value={resultIdString} />
                        <input name="title" placeholder="글제목" defaultValue={result.title}/>
                        <input name="content" placeholder="글내용" defaultValue={result.content}/>
                        <button type="submit">수정하기</button>
                    </form>
                </div>
            )
        }else{
            return(
                <div>글수정은 작성자만 가능합니다</div>
            )
        }
    }else{
        return(
            <div>로그인이 필요해요</div>
        )
    }

}

// 수정하기 버튼을 누르면 action에 해당하는 URL에 요청을 보내게 되어있음