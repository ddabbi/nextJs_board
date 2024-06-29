import { connectDB } from "@/util/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
    //GET요청의 quary를 받아서 모두 찾기(?~~~~)
    console.log(req.query);

    const db = (await connectDB).db('mydb');
    let result = await db.collection('comment').find({
        parent: ObjectId.createFromHexString(req.query.id)  // 이 조건으로 모두찾기 
    }).toArray();
    res.status(200).json(result);
}