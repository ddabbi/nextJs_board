import Image from "next/image";
import styles from "./page.module.css";
import { connectDB } from "@/util/db";

export default async function Home() {
  // 오래 걸리는 작업은 건너뛰고 다음코드 실행(=> await으로 기다리게 변경)
  const db = (await connectDB).db("mydb");        //데이터베이스 이름

  let result = await db.collection("post").find().toArray();
  console.log(result);
  return (
    <div>
      <p>{result[0]?.title}</p>
      <p>{result[0]?.content}</p>
    </div>
  );
}

// app/layout.js : page.js를 감싸고 있는 main페이지
// app/page.js : home페이지
// global.css : layout.js 에 연결된 css
// page.module.css : page.js에 연결된 css

// app폴더가 'http://localhost:3000/'기본경로
// http://localhost:3000/list --> app폴더에 list폴더 만들고 page.js (nextJs는 폴더기반으로 만들어짐)

// build폴더의 내용을 클라우드에(AWS, vercel) 업로드하고 npm run start