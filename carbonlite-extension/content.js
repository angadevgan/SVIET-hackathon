chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "analyze_page") {
        fetch(`http://localhost:5000/analyze?url=${encodeURIComponent(window.location.href)}`)
            .then(res => res.json())
            .then(data => {
                const infoBox = document.createElement("div");
                infoBox.innerHTML = `<div style="position:fixed;bottom:10px;right:10px;background:white;padding:10px;border-radius:5px;box-shadow:0px 0px 10px rgba(0,0,0,0.2);">
                    <strong>Carbon Score:</strong> ${data.carbonScore} 
                    <button id="optimize-btn">Optimize</button>
                </div>`;
                document.body.appendChild(infoBox);

                document.getElementById("optimize-btn").addEventListener("click", () => {
                    fetch(`http://localhost:5000/optimize?url=${encodeURIComponent(window.location.href)}`)
                        .then(() => alert("Website optimized!"))
                        .catch(() => alert("Optimization failed."));
                });
            })
            .catch(error => console.error("Carbon analysis failed:", error));
        return true;
    }
});
