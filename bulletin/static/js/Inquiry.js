document.addEventListener("DOMContentLoaded", function () {
    const inquiryForm = document.getElementById("inquiry-form"); // 문의 작성 양식
    const messageDiv = document.getElementById("message"); // 결과 메시지를 표시할 div

    inquiryForm.addEventListener("submit", function (e) {
        e.preventDefault(); // 폼 제출을 방지하여 페이지 새로고침 방지
        const formData = new FormData(inquiryForm); // 폼 데이터 가져오기

        const content = formData.get("content"); // 문의 내용 가져오기
        const password = formData.get("password"); 

        // 문의 작성을 위한 AJAX 요청 수행
        fetch("/newinquiry/", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                content: content, // 문의 내용
                password: password, // 비밀번호
            }),
        })
            .then((response) => response.json()) // 응답을 JSON 형식으로 파싱
            .then((data) => {
                if ("inquiry_id" in data) {
                    messageDiv.innerHTML = `문의글 작성 완료. ID: ${data.inquiry_id}`;
                    // 작성된 문의의 ID를 표시
                } else {
                    messageDiv.innerHTML = "문의 작성에 실패";
                }
            })
            .catch((error) => {
                console.error("오류:", error);
                messageDiv.innerHTML = "문의 작성 중 오류가 발생했습니다.";
            });
    });
});
