function removeShorts() {
    // 1. Target the main Shorts button in the Sidebar
    // (Backup for older browsers or if CSS :has fails)
    const sidebarLinks = document.querySelectorAll('ytd-guide-entry-renderer a[href^="/shorts"]');
    sidebarLinks.forEach(link => {
        const container = link.closest('ytd-guide-entry-renderer');
        if (container) container.style.display = 'none';
    });

    // 2. Target specific "Shorts" shelves in the feed
    const shelves = document.querySelectorAll('ytd-rich-shelf-renderer, ytd-reel-shelf-renderer');
    shelves.forEach(shelf => {
        const titleSpan = shelf.querySelector('#title');
        // Check if the shelf title contains "Shorts"
        if (titleSpan && titleSpan.textContent.includes('Shorts')) {
            shelf.style.display = 'none';
        }
    });

    // 3. Remove the Shorts tab from the mobile/mini guide
    const miniGuide = document.querySelectorAll('ytd-mini-guide-entry-renderer[aria-label="Shorts"]');
    miniGuide.forEach(icon => icon.style.display = 'none');
}

// Run immediately when the script loads
removeShorts();

// Set up a MutationObserver to watch for new content (infinite scroll)
const observer = new MutationObserver((mutations) => {
    // We assume any DOM change might have added a Short, so we re-run the check.
    // This is lightweight enough for modern browsers.
    removeShorts();
});

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});
