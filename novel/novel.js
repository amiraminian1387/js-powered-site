document.querySelectorAll(".novel-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        console.log("Novel details opened.");
    });
});
const API_URL = "https://6995f89db081bc23e9c5017a.mockapi.io/BOOK-STORE/BOOKNEST";

const wrapper = document.querySelector(".novel-wrapper");

// دریافت رمان‌ها از API
async function loadNovels() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        wrapper.innerHTML = ""; // پاک کردن کارت‌های ثابت

        data.forEach(novel => {
            const card = document.createElement("div");
            card.className = "novel-card";

            card.innerHTML = `
                <img src="${novel.image}" alt="Novel Cover">
                <h3 class="novel-title">${novel.title}</h3>
                <p class="novel-author">${novel.author}</p>
                <button class="novel-btn">Read More</button>
            `;

            wrapper.appendChild(card);
        });

        // رویداد دکمه‌ها
        document.querySelectorAll(".novel-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                console.log("Novel details opened.");
            });
        });

    } catch (error) {
        console.error("Error loading novels:", error);
        wrapper.innerHTML = `<p style="color:red;">Failed to load novels.</p>`;
    }
}

loadNovels();
