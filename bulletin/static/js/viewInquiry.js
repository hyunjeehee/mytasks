document.addEventListener("DOMContentLoaded", function () { 
    const viewInquiryForm = document.getElementById("viewinquiryForm");
    const messageDiv = document.getElementById("message");
    const mod_btn = document.getElementById("mod-btn");


    viewInquiryForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const inquiry_id = document.getElementById("inquiryId").value;
        const password = document.getElementById("viewPassword").value;

        fetch(`/inquiry?inquiry_id=${inquiry_id}&password=${password}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if ("content" in data) {
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
        e.preventDefault();     
        const newContent = messageDiv.querySelector('input').value;
        console.log(newContent)
        const inquiryId = document.getElementById("inquiryId").value;
        console.log(inquiryId)
    
        fetch(`/inquiry/${inquiryId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                content: newContent,
                update_time: new Date().toISOString(),
            }),
        })
            .then((response) => response.json()) 
            .then((data) => {
                    messageDiv.innerHTML = `문의 내용: '${newContent}'`;
            })
            .catch((error) => {
                console.error("Fetch operation error:", error);
            });
        
    });

    fetch(`/inquiry`, {
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
        }
//else 넣으면 왜 안되지..?
        let listTbody = data.map((item) => {
            return `<tr>
                <td>${item.id}</td>
                <td>${item.content}</td>
                <td>${item.password}</td>
                <td>${item.create_time}</td>
                <td>${item.update_time}</td>
                <td><button class='delete_btn' type="button" name='${item.id}'>삭제</button></td>
            </tr>`;
        });
                
        console.log(listTbody);

        $('#listTbody').html(listTbody);
                
                
        const delete_btn = document.querySelectorAll('.delete_btn');
        delete_btn.forEach((btn) =>{
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                
                // var inquiryId = document.getElementById(""); 안되는 이유
                console.log('삭제 버튼');
                console.log(this.name);
            
                fetch(`/inquiry/${this.name}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => response.json())
                .then(() => location.reload());
            });
        });
            
        });
         
});

