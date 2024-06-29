import Image from "next/image";
import styles from "./page.module.css";
import { MongoClient } from "mongodb";
import { connectDB } from "@/util/db";

// 0. npx create-next-app@latest next_board
// 1. pagejs, globalscss, pagemodulecss 를 비운다
// 2. 관계형DB : 표로 저장, 비관계형DB : 표가 아닌 형식으로 저장
// 3. mongodb.com 호스팅 서비스 이용 (로그인)
// 4. Access Manager에서 Organization Access
// 5. Project 생성 (샘플/자동권한 체크 모두 해제)
// 6. Project 생성하고 해당 프로젝트 들어가서 Cluster 생성
// 7. Browse Collection 에서 데이터베이스 생성
// 8. npm install mongodb

export const revalidate = 60;         // 60초 동안 캐싱

export default async function Home() {

  try {
    const client = await connectDB;
    const db = client.db('mydb');
    let result = await db.collection('post').find().toArray();
    console.log(result);
    

    return (
        <div>
          <p>{result[0]?.title}</p>
          <p>{result[0]?.content}</p>
        </div>
    );
  } catch (error) {
    console.error("Connection error:", error);
    return (
        <div>Connection error: {error.message}</div>
    );
  }
}

// 배포하려면 npm run build
// 클라우드에 올리고 npm run start

// (Dynamic) 이 필요한데 (Static)으로 되어있으면 Dynamic으로 바꿔줘야함
// export const dynamic = 'force-dynamic'               // // export const dynamic = 'force-static'

// (Dynamic) 은 접속할 때마다 새로 작성 : 화면 갱신 가능 (캐싱기능 활용해서 부담 경량화 가능)
// (Static) 은 고정페이지 : 서버/DB부담 적음

// 캐싱 : 페이지 또는 요청결과를 잠깐 저장하고 재사용
// await fetch('/URL', {cache:'force-cache})
// export const revalidate = 초;        // 캐싱 변수
// app/layout.js : page.js를 감싸고 있는 main페이지
// app/page.js : home페이지
// global.css : layout.js 에 연결된 css
// page.module.css : page.js에 연결된 css

// app폴더가 'http://localhost:3000/'기본경로
// http://localhost:3000/list --> app폴더에 list폴더 만들고 page.js (nextJs는 폴더기반으로 만들어짐)

// build폴더의 내용을 클라우드에(AWS, vercel) 업로드하고 npm run start