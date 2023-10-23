document.addEventListener("DOMContentLoaded", function () { 
    const inquiryForm = document.getElementById("inquiryForm"); 
    const messageDiv = document.getElementById("message");


    inquiryForm.addEventListener("submit", userSubmitHandler); 

    function userSubmitHandler(event) {
        event.preventDefault(); 
        const formData = new FormData(inquiryForm); 

        const content = formData.get("content"); 
        const password = formData.get("password"); 

        fetch("/inquiry", {
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
                errorLog(data)
            })
            .catch((error) => {
                console.error("오류:", error);
                messageDiv.innerHTML = "문의 작성 중 오류가 발생했습니다.";
            });
    }

    function errorLog(data) {
        if ("inquiry_id" in data) { 
            messageDiv.innerHTML = `문의글 작성 완료. <br>ID: ${data.inquiry_id}`;
        } else {
            messageDiv.innerHTML = "문의 작성에 실패";
        }
    }
});
