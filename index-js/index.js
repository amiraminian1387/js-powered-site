// ---------------------------------------------------------------

// Splash screen logic
setTimeout(() => {
    document.querySelectorAll('#splash .hidden').forEach(el => {
        el.classList.remove('hidden');
        el.classList.add('fall');
    });
    setTimeout(() => {
        document.getElementById("splash").style.opacity = 0;
        setTimeout(() => {
            document.getElementById("splash").style.display = "none";
            document.querySelectorAll(".main-content").forEach(el => el.style.display = "block");
        }, 10);
    }, 3000);
}, 100);

