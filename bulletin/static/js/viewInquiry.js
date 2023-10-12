document.addEventListener("DOMContentLoaded", function () { 
    const viewInquiryForm = document.getElementById("view-inquiry-form");
    const messageDiv = document.getElementById("message");
    const mod_btn = document.getElementById("mod-btn");


    // 조회
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


    // 수정
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

    //문의글 목록 보여주기
    fetch(`/getinquiry/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.length === 0) {
            let listTbody = `<tr><td colspan="5">등록된 문의글이 없습니다.</td></tr>`;
            $('#listTbody').html(listTbody);
            $('#Result').show();
        } else {
            //console.log(typeof data);

            let listTbody = '';
            //console.log(typeof listTbody);

            data.forEach((item) => {
                listTbody += `<tr>
                                <td>${item.id}</td>
                                <td>${item.content}</td>
                                <td>${item.password}</td>
                                <td>${item.create_time}</td>
                                <td>${item.update_time}</td>
                                <td><button class='delete_btn' type="button" name='${item.id}'>삭제</button></td>
                             </tr>`;
            });


            $('#listTbody').html(listTbody);
            

            
            // 삭제
            const delete_btn = document.querySelectorAll('.delete_btn');
            delete_btn.forEach((btn) =>{
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    // var inquiryId = document.getElementById("");
                    console.log('삭제 버튼');
                    console.log(this.name);
                
                    fetch(`/deleteinquiry/${this.name}`, {
                        method: 'DELETE',
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                    .then((response) => response.json())
                    .then(() => location.reload());
                });
            });
        }
    });
         
});

