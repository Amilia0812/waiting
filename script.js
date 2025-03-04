function switchToValorant() {
    // 先讓 Apex Logo 縮放一下
    const apexLogo = document.getElementById("apex-logo");
    apexLogo.style.transform = "scale(1.5)";
    setTimeout(() => {
        apexLogo.style.transform = "scale(1.0)";
    }, 200);

    // 顯示假「錯誤提示」
    setTimeout(() => {
        alert("❌ 你真的要背叛瓦羅蘭嗎？");
        document.getElementById("apex-text").style.display = "none";
        document.getElementById("apex-logo").style.display = "none";
        document.getElementById("joke-text").innerText = "開玩笑的，瓦羅蘭多香啊！";
        document.getElementById("joke-text").style.display = "block";
    }, 600);
}
