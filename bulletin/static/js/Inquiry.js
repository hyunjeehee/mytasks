document.addEventListener("DOMContentLoaded", function () { 
    const inquiryForm = document.getElementById("inquiry-form"); 
    const messageDiv = document.getElementById("message");


    inquiryForm.addEventListener("submit", function (e) {
        e.preventDefault(); 
        const formData = new FormData(inquiryForm); 

        const content = formData.get("content"); 
        const password = formData.get("password"); 

        fetch("/newinquiry/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                content: content, 
                password: password, 
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if ("inquiry_id" in data) {
                    messageDiv.innerHTML = `문의글 작성 완료. <br>ID: ${data.inquiry_id}`;
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
