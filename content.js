function removeShorts() {
    // Shelves CSS can't catch by attribute or link, so match on title text
    const shelves = document.querySelectorAll('ytd-rich-shelf-renderer, ytd-reel-shelf-renderer');
    shelves.forEach(shelf => {
        const titleSpan = shelf.querySelector('#title');
        if (titleSpan && /\b(Shorts|Playables)\b/.test(titleSpan.textContent)) {
            const section = shelf.closest('ytd-rich-section-renderer');
            (section || shelf).style.display = 'none';
        }
    });
}

removeShorts();

let scheduled = false;
const observer = new MutationObserver(() => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
        scheduled = false;
        removeShorts();
    });
});

// document.body is still null at document_start
observer.observe(document.documentElement, {
    childList: true,
    subtree: true
});
