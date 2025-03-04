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
        if (confirmExit) {
            // 如果使用者點擊「確定」，跳轉到 Steam Apex 頁面
            window.location.href = "https://store.steampowered.com/app/1172470/Apex_Legends/";
        }
        // 如果使用者點擊「取消」，什麼都不做
    }, 600);
}
