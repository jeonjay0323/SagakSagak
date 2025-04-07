// index.html
document.addEventListener("DOMContentLoaded", () => {
    const draggableBox = document.getElementById("draggableBox");
    const dropZone = document.getElementById("dropZone");
    const aiResponse = document.getElementById("aiResponse");
  
    draggableBox.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", draggableBox.textContent.trim());
    });
  
    dropZone.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropZone.style.backgroundColor = "#e0f7fa";
    });
  
    dropZone.addEventListener("dragleave", () => {
      dropZone.style.backgroundColor = "#f1f1f1";
    });
  
    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.style.backgroundColor = "#f1f1f1";
      const question = e.dataTransfer.getData("text/plain");
  
      aiResponse.textContent = "질문을 처리 중입니다...";
  
      // ChatGPT API를 사용하는 경우 아래 fetch 요청
      // 실제 동작을 위해서는 백엔드 서버 또는 프록시 필요
  
      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer YOUR_OPENAI_API_KEY"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "-" },
            { role: "user", content: question }
          ]
        })
      })
        .then((res) => res.json())
        .then((data) => {
          const answer = data.choices?.[0]?.message?.content;
          aiResponse.textContent = answer || "답변을 가져오지 못했습니다.";
        })
        .catch((err) => {
          aiResponse.textContent = "에러가 발생했습니다.";
          console.error(err);
        });
    });
  });

// paper.html
const imageInput = document.getElementById('imageInput');
    const profileImg = document.getElementById('profileImg');
    imageInput.addEventListener('change', (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              profileImg.src = event.target.result;
            };
            reader.readAsDataURL(file);
          }});

// loading.html
window.addEventListener("load", () => {
    // 2초 뒤 로딩 화면 제거 & 콘텐츠 표시
    setTimeout(() => {
      document.getElementById("loading").style.display = "none";
      document.getElementById("content").style.display = "block";
    }, 4000); // ← 시간 조정 가능 (단위: ms)
  });