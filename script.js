function switchToValorant() {
    // 先讓 Apex Logo 縮放一下，增加視覺效果
    const apexLogo = document.getElementById("apex-logo");
    apexLogo.style.transform = "scale(1.5)";
    setTimeout(() => {
        apexLogo.style.transform = "scale(1.0)";
    }, 200);

    // 顯示確認對話框
    setTimeout(() => {
        let confirmExit = confirm("❌ 你真的要背叛瓦羅蘭嗎？");

        // 讓 Apex 圖標和建議文字消失
        document.getElementById("apex-container").style.display = "none";

        if (confirmExit) {
            // 如果使用者點擊「確定」，跳轉到 Steam Apex 頁面
            window.location.href = "https://store.steampowered.com/app/1172470/Apex_Legends/";
        } else {
            // **如果選擇「取消」，啟動模擬射擊遊戲**
            startShootingGame();
        }
    }, 600);
}

// **小遊戲：模擬射擊場**
function startShootingGame() {
    let score = 0;
    let timeLeft = 10; // 限時 10 秒
    const gameContainer = document.createElement("div");
    gameContainer.id = "game-container";
    gameContainer.style.position = "absolute";
    gameContainer.style.top = "50%";
    gameContainer.style.left = "50%";
    gameContainer.style.transform = "translate(-50%, -50%)";
    gameContainer.style.width = "80vw";
    gameContainer.style.height = "80vh";
    gameContainer.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    gameContainer.style.border = "3px solid white";
    gameContainer.style.borderRadius = "10px";
    gameContainer.style.display = "flex";
    gameContainer.style.justifyContent = "center";
    gameContainer.style.alignItems = "center";
    gameContainer.style.flexDirection = "column";
    gameContainer.style.color = "white";
    gameContainer.style.fontSize = "24px";
    document.body.appendChild(gameContainer);

    const timerText = document.createElement("p");
    timerText.innerText = `剩餘時間: ${timeLeft} 秒`;
    gameContainer.appendChild(timerText);

    const scoreText = document.createElement("p");
    scoreText.innerText = `分數: ${score}`;
    gameContainer.appendChild(scoreText);

    function createTarget() {
        let target = document.createElement("div");
        target.classList.add("target");
        target.style.position = "absolute";
        target.style.width = "50px";
        target.style.height = "50px";
        target.style.backgroundColor = "red";
        target.style.borderRadius = "50%";
        target.style.cursor = "pointer";
        target.style.top = `${Math.random() * 80}vh`;
        target.style.left = `${Math.random() * 80}vw`;

        target.onclick = function () {
            score++;
            scoreText.innerText = `分數: ${score}`;
            target.remove();
            createTarget(); // 產生新靶心
        };

        gameContainer.appendChild(target);
    }

    createTarget(); // 產生第一個靶心

    let gameInterval = setInterval(() => {
        timeLeft--;
        timerText.innerText = `剩餘時間: ${timeLeft} 秒`;
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            document.querySelectorAll(".target").forEach(t => t.remove());

            let resultText = document.createElement("p");
            resultText.style.fontSize = "28px";
            if (score >= 5) {
                resultText.innerText = "你是神射手！";
            } else {
                resultText.innerText = "要多練習喔！";
            }
            gameContainer.appendChild(resultText);

            // 遊戲結束 3 秒後移除遊戲畫面
            setTimeout(() => {
                gameContainer.remove();
            }, 3000);
        }
    }, 1000);
}
