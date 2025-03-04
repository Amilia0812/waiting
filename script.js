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
            // 如果使用者點擊「取消」，顯示「我就知道你最愛瓦羅蘭了！」
            let loveValorantText = document.createElement("h2");
            loveValorantText.innerHTML = "我就知道你最愛瓦羅蘭了！";
            loveValorantText.style.color = "yellow";
            loveValorantText.style.fontSize = "24px";
            loveValorantText.style.fontWeight = "bold";
            loveValorantText.style.position = "absolute";
            loveValorantText.style.bottom = "50px"; // 固定在底部
            loveValorantText.style.left = "50%";
            loveValorantText.style.transform = "translateX(-50%)";
            document.body.appendChild(loveValorantText);
        }
    }, 600);
}
