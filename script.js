document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("apex-logo").addEventListener("click", switchToValorant);
    document.getElementById("shooting-game-button").addEventListener("click", openShootingGame);
});

// Apex 轉跳功能
function switchToValorant() {
    let confirmExit = confirm("❌ 你真的要背叛瓦羅蘭嗎？");

    if (confirmExit) {
        window.location.href = "https://store.steampowered.com/app/1172470/Apex_Legends/";
    }
}

// 小靶場功能
function openShootingGame() {
    let gameWindow = window.open("", "_blank", "width=600,height=700");

    if (!gameWindow) {
        alert("請允許瀏覽器開啟新的視窗來玩小遊戲！");
        return;
    }

    gameWindow.document.write(`
        <!DOCTYPE html>
        <html lang="zh-TW">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>VALORANT 神射手挑戰</title>
            <style>
                body {
                    background-color: black;
                    color: white;
                    text-align: center;
                    font-family: Arial, sans-serif;
                    overflow: hidden;
                }
                #game-container {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%;
                    height: 90%;
                    background-color: rgba(0, 0, 0, 0.9);
                    border: 3px solid white;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                    color: white;
                    font-size: 24px;
                }
                .target {
                    position: absolute;
                    width: 50px;
                    height: 50px;
                    background-color: red;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .target:hover {
                    transform: scale(1.2);
                }
            </style>
        </head>
        <body>
            <div id="game-container">
                <p id="timer">剩餘時間: 10 秒</p>
                <p id="score">分數: 0</p>
            </div>
            <script>
                let score = 0;
                let timeLeft = 10;
                const gameContainer = document.getElementById("game-container");

                function createTarget() {
                    let target = document.createElement("div");
                    target.classList.add("target");
                    target.style.top = Math.random() * 80 + "vh";
                    target.style.left = Math.random() * 80 + "vw";

                    target.onclick = function () {
                        score++;
                        document.getElementById("score").innerText = "分數: " + score;
                        target.remove();
                        createTarget();
                    };

                    document.body.appendChild(target);
                }

                createTarget(); // 產生第一個靶心

                let gameInterval = setInterval(() => {
                    timeLeft--;
                    document.getElementById("timer").innerText = "剩餘時間: " + timeLeft + " 秒";
                    if (timeLeft <= 0) {
                        clearInterval(gameInterval);
                        document.querySelectorAll(".target").forEach(t => t.remove());

                        let resultText = document.createElement("p");
                        resultText.style.fontSize = "28px";
                        if (score >= 5) {
                            resultText.innerText = "🎯 你是神射手！";
                        } else {
                            resultText.innerText = "😅 要多練習喔！";
                        }
                        gameContainer.appendChild(resultText);

                        // 3 秒後自動關閉遊戲視窗
                        setTimeout(() => {
                            window.close();
                        }, 3000);
                    }
                }, 1000);
            </script>
        </body>
        </html>
    `);
}
