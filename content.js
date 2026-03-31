function copyStoryContent(postElement, btn) {
    // 1. "See more" තිබේ නම් එය ක්ලික් කරයි
    const seeMore = postElement.querySelector('div[role="button"]');
    if (seeMore && (seeMore.innerText.toLowerCase().includes("see more") || seeMore.innerText.includes("තවත් බලන්න"))) {
        seeMore.click();
    }

    // 2. ටෙක්ස්ට් එක ලෝඩ් වන තෙක් තත්පර 0.5ක් රැඳී සිටියි
    setTimeout(() => {
        // ඔබ පින්තූරයේ පෙන්වා දුන් නිවැරදි Class එක සහිත Span එක සොයයි
        const targetClass = "x193iq5w xeuugli x13faqbe x1vvkbs x1xmvt09 x1lliihq x1s928wv xhkezso x1gmr53x x1cpjm7i x1fgarty x1943h6x xudqn12 x3x7a5m x6prxxf xvq8zen xo1l8bm xzsf02u".split(" ").join(".");
        const textElement = postElement.querySelector(`span.${targetClass}`) 
                            || postElement.querySelector('div[data-ad-preview="message"]')
                            || postElement.querySelector('div[dir="auto"] > span');

        if (textElement) {
            let fullText = textElement.innerText.replace(/See more|තවත් බලන්න/g, "").trim();
            
            navigator.clipboard.writeText(fullText).then(() => {
                btn.innerText = "Copied!";
                btn.style.backgroundColor = "#28a745";
                setTimeout(() => {
                    btn.innerText = "Copy Story";
                    btn.style.backgroundColor = "#0866FF";
                }, 2000);
            });
        } else {
            console.log("Story text not found.");
        }
    }, 500);
}

function injectButtons() {
    // Facebook පෝස්ට් එකක් ලෙස හඳුනාගත හැකි ප්‍රධාන containers
    const posts = document.querySelectorAll('div[role="article"]:not(.btn-added)');

    posts.forEach(post => {
        // ඉතා වැදගත්: කමෙන්ට් එකක් දැයි පරීක්ෂා කිරීම. 
        // කමෙන්ට් පවතින්නේ 'ul' (unordered list) එකක් ඇතුළේය. ඒවා මඟහරින්න.
        if (post.closest('ul[role="group"]') || post.closest('.x1n2onr6')) {
            return; 
        }

        post.classList.add('btn-added');

        const copyBtn = document.createElement('button');
        copyBtn.innerText = "Copy Story";
        copyBtn.className = "fb-main-post-btn";
        
        copyBtn.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            copyStoryContent(post, copyBtn);
        };

        // පෝස්ට් එකේ ඉහළ කොටසට (Header) බොත්තම එක් කරයි
        post.appendChild(copyBtn);
    });
}

// පේජ් එක scroll කරන විට අලුත් පෝස්ට් සඳහා බොත්තම ඇතුළත් කිරීමට
const observer = new MutationObserver(injectButtons);
observer.observe(document.body, { childList: true, subtree: true });

injectButtons();
