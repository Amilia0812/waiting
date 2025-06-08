let score = 0, timeLeft = 10;
const container = document.getElementById("game-container");

// 玩家角色
const player = document.createElement("div");
player.style.position = "absolute";
player.style.width = "40px";
player.style.height = "40px";
player.style.backgroundColor = "lime";
player.style.borderRadius = "5px";
player.style.top = "50%";
player.style.left = "50%";
player.style.zIndex = "1000";
document.body.appendChild(player);

let playerX = window.innerWidth / 2;
let playerY = window.innerHeight / 2;
const moveStep = 15;

document.addEventListener("keydown", e => {
    const k = e.key.toLowerCase();
    if (k === "w") playerY -= moveStep;
    if (k === "s") playerY += moveStep;
    if (k === "a") playerX -= moveStep;
    if (k === "d") playerX += moveStep;
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
});

// 顯示分數統計
const scoreBox = document.createElement("div");
scoreBox.style.position = "fixed";
scoreBox.style.bottom = "20px";
scoreBox.style.left = "50%";
scoreBox.style.transform = "translateX(-50%)";
scoreBox.style.color = "white";
scoreBox.style.fontSize = "20px";
scoreBox.style.zIndex = "1000";
scoreBox.innerText = "分數統計區：0";
document.body.appendChild(scoreBox);

// 建立靶心
function createTarget() {
    const target = document.createElement("div");
    target.className = "target";
    target.style.top = Math.random() * 80 + "vh";
    target.style.left = Math.random() * 80 + "vw";
    document.body.appendChild(target);
}
createTarget();

// 左鍵射擊子彈
document.addEventListener("click", e => {
    const bullet = document.createElement("div");
    bullet.style.position = "absolute";
    bullet.style.width = "10px";
    bullet.style.height = "10px";
    bullet.style.backgroundColor = "yellow";
    bullet.style.borderRadius = "50%";
    bullet.style.left = playerX + 15 + "px";
    bullet.style.top = playerY + 15 + "px";
    bullet.style.zIndex = "1000";
    document.body.appendChild(bullet);

    const angle = Math.atan2(e.clientY - playerY, e.clientX - playerX);
    const vx = Math.cos(angle) * 10;
    const vy = Math.sin(angle) * 10;

    const bulletInterval = setInterval(() => {
        let bx = bullet.offsetLeft + vx;
        let by = bullet.offsetTop + vy;
        bullet.style.left = bx + "px";
        bullet.style.top = by + "px";

        // 撞到靶心？
        const targets = document.querySelectorAll(".target");
        targets.forEach(t => {
            const tx = t.offsetLeft + 25;
            const ty = t.offsetTop + 25;
            const dx = tx - bx;
            const dy = ty - by;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 30) {
                t.remove();
                bullet.remove();
                clearInterval(bulletInterval);
                score++;
                scoreBox.innerText = `分數統計區：${score}`;
                createTarget();
            }
        });

        // 超出畫面就刪除
        if (bx < 0 || bx > window.innerWidth || by < 0 || by > window.innerHeight) {
            bullet.remove();
            clearInterval(bulletInterval);
        }
    }, 20);
});

// 倒數計時
const countdown = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = "剩餘時間: " + timeLeft + " 秒";
    if (timeLeft <= 0) {
        clearInterval(countdown);
        document.querySelectorAll(".target").forEach(t => t.remove());
        scoreBox.innerText += score >= 5 ? "｜🎯 你是神射手！" : "｜😅 要多練習喔！";
        setTimeout(() => window.close(), 3000);
    }
}, 1000);
