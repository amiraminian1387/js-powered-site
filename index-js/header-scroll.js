let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 80) {
        // اسکرول به پایین → هدر مخفی شود
        header.classList.add('hide');
        header.classList.remove('show');
    } else {
        // اسکرول به بالا → هدر ظاهر شود
        header.classList.add('show');
        header.classList.remove('hide');
    }

    lastScroll = currentScroll;
});
