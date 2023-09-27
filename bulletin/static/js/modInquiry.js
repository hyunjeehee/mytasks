// document.addEventListener("DOMContentLoaded", function () {
//     const modInquiryForm = document.getElementById("modify-inquiry-form"); // 문의 수정 양식
    
//     const mod_btn = document.getElementById("mod-btn");  // 결과 메시지를 표시할 div
//     const messageDiv = document.getElementById("message");  // 결과 메시지를 표시할 div

//     mod_btn.on('click', () => {
//         console.log('수정버튼')
//     })
        
//     messageDiv.addEventListener("submit", function (e) {
//         e.preventDefault();     // 폼 제출을 방지하여 페이지 새로고침 방지
//         const formData = new FormData(modInquiryForm);     // 폼 데이터 가져오기 //////

//         const inquiryId = formData.get("inquiry-id");
//         const newContent = formData.get("new-content");

//         // inquiryId를 기반으로 문의를 업데이트하기 위한 AJAX 요청 수행
//         fetch(`/modinquiry/${inquiryId}`, { //fetch는 js에서 서버로 네트워크 요청을 보내고 응답을 받을 수 있게하는 메서드
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 content: newContent,
//                 update_time: new Date().toISOString(),
//             }),
//         })
//             .then((response) => response.json())    // 응답을 JSON형식으로 parsing
//             .then((data) => {
//                 if (data.content in data) {
//                     messageDiv.innerHTML = "수정 성공";
//                     messageDiv.innerHTML = `문의 내용: '${data.content}'`;
//                     //console.log(data.content)
//                 } else {
//                     messageDiv.innerHTML = "수정 실패";
//                 }
//             })
//             .catch((error) => {
//                 console.error("Fetch operation error:", error);
//             });
//     });
// });
