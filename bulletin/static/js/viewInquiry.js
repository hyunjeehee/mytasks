document.addEventListener("DOMContentLoaded", function () {
    const viewInquiryForm = document.getElementById("view-inquiry-form");
    const messageDiv = document.getElementById("message");
    const mod_btn = document.getElementById("mod-btn"); 

    viewInquiryForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const inquiry_id = document.getElementById("inquiry-id").value;
        const password = document.getElementById("view-password").value;

        fetch(`/viewinquiry?inquiry_id=${inquiry_id}&password=${password}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if ("content" in data) {
                    // messageDiv.innerHTML = `조회 성공`;
                    
                    messageDiv.querySelector('input').value = data.content;
                    messageDiv.hidden = false
                }
                else{
                    messageDiv.innerHTML = "비밀번호 오류";
                }
            })
            .catch((error) => {
            });
    });

    mod_btn.addEventListener('click', function(e) {
        console.log('수정버튼');
        e.preventDefault();     // 폼 제출을 방지하여 페이지 새로고침 방지
        const newContent = messageDiv.querySelector('input').value;
        console.log(newContent)
        const inquiryId = document.getElementById("inquiry-id").value;
        console.log(inquiryId)


    
        // inquiryId를 기반으로 문의를 업데이트하기 위한 AJAX 요청 수행
        fetch(`/modinquiry/${inquiryId}`, { //fetch는 js에서 서버로 네트워크 요청을 보내고 응답을 받을 수 있게하는 메서드
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: newContent,
                update_time: new Date().toISOString(),
            }),
        })
            .then((response) => response.json())    // 응답을 JSON형식으로 parsing
            .then((data) => {

                //if (data.content in data) {
                   // messageDiv.innerHTML = "수정 성공";
                    messageDiv.innerHTML = `문의 내용: '${newContent}'`;
                    //console.log(data.content)
                //} else {
                 //   messageDiv.innerHTML = "수정 실패";
                //}
            })
            .catch((error) => {
                console.error("Fetch operation error:", error);
            });
        
    });
});
    
            // .catch((error) => {
            //     console.error("오류:",error);
            //     messageDiv.innerHTML = "조회 시도 중 오류가 발생했습니다.";
            // });

    //     // AJAX 요청을 통해 서버로 조회 요청 보내기
    //     const xhr = new XMLHttpRequest();
    //     xhr.open("GET", `/viewinquiry/${inquiryId}`, true); // .open 새 창 열기
    //     xhr.setRequestHeader("Content-Type", "application/json"); //  .http 요청 헤더의 값 설정 (헤더이름, 헤더값)

    //     xhr.onload = function () {   // .onload 화면에 필요한 모든 요소들이 웹 브라우저 메모리에 모두 올려진 다음 실행됨
    //         if (xhr.status === 200) {
    //             const response = JSON.parse(xhr.responseText);
    //             if (response.message === "SUCCESS") {
    //                 // 조회 결과를 화면에 표시
    //                 messageDiv.innerHTML = `문의 내용: ${response.content}`;
    //             } else {
    //                 messageDiv.innerHTML = "조회 실패";
    //             }
    //         } else {
    //             console.error("오류:", xhr.statusText);
    //             messageDiv.innerHTML = "오류 발생";
    //         }
    //     };

    //     xhr.onerror = function () {
    //         console.error("오류:", xhr.statusText);
    //         messageDiv.innerHTML = "오류 발생";
    //     };

    //     xhr.send(JSON.stringify({ password })); // .send 서버에 요청 보내기, get 방식 요청일 때 사용

