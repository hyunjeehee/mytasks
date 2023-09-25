document.addEventListener("DOMContentLoaded", function () {
    const modInquiryForm = document.getElementById("modify-inquiry-form"); // 문의 수정 양식
    const messageDiv = document.getElementById("message");  // 결과 메시지를 표시할 div

    modInquiryForm.addEventListener("submit", function (e) {
        e.preventDefault();     // 폼 제출을 방지하여 페이지 새로고침 방지
        const formData = new FormData(modInquiryForm);     // 폼 데이터 가져오기


        const inquiryId = formData.get("inquiry-id");
        const newContent = formData.get("new-content");
        const password = formData.get("password");

        // inquiryId를 기반으로 문의를 업데이트하기 위한 AJAX 요청 수행
        fetch(`/modinquiry/${inquiryId}`, { //fetch는 js에서 서버로 네트워크 요청을 보내고 응답을 받을 수 있게하는 메서드
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: newContent,
                password: password,
                update_time: new Date().toISOString(),
            }),
        })
            .then((response) => response.json())    // 응답을 JSON형식으로 parsing
            .then((data) => {
                if (data.message === "문의글이 수정되었습니다.") {
                    messageDiv.innerHTML = "SUCCESSFULLY UPDATED";
                } else {
                    messageDiv.innerHTML = "FAIL UPDATE";
                }
            })
            .catch((error) => {
                console.error("오류:", error);
                messageDiv.innerHTML = "오류 발생";
            });
    });
});
