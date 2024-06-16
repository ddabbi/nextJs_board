export default function WritePage(){
    return(
        <div className="write-container">
            <h4>글작성 페이지</h4>
            {/* /api/post/new에 POST요청 */}
            <form action="/api/post/new" method="POST">
                <input name="title" placeholder="제목을 입력하세요"/>  
                <input name="content" placeholder="내용을 입력하세요"/>
                <button type="submit">POST요청 버튼</button>
            </form>
            <br/>
            {/* /api/test에 GET요청 (method생략시 GET)*/}
            <form action="/api/test" method="GET">
                <button type="submit">GET요청 버튼</button>
            </form>
        </div>
    )
}
// 서버 통신 방식 ( 간단하게 URL통해서 메시지를 주고받자 REST API)
// REST API : GET, POST, DELETE, PUT .. 요청하면 -> 응답줌
// GET 요청 : 서버에 데이터를 요청할 때
// POST 요청: 서버에 데이터를 전송할 때 (보안성이 강함, 문자열 길이가 길다) 