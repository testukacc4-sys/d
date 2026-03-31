function copyStoryContent(postElement, btn) {
    // 1. "See more" බොත්තම තිබේ නම් එය ක්ලික් කිරීම
    const seeMore = postElement.querySelector('div[role="button"]');
    if (seeMore && (seeMore.innerText.toLowerCase().includes("see more") || seeMore.innerText.includes("තවත් බලන්න"))) {
        seeMore.click();
    }

    // 2. විස්තරය දිග හැරෙන තෙක් සුළු වේලාවක් රැඳී සිටීම
    setTimeout(() => {
        // ඔබ පින්තූරයේ පෙන්වූ නිවැරදි Class එක සහ ඒ අවට ඇති selectors
        const textElement = postElement.querySelector('span.x193iq5w.xeuugli.x13faqbe.x1vvkbs.x1xmvt09.x1lliihq.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.xudqn12.x3x7a5m.x6prxxf.xvq8zen.xo1l8bm.xzsf02u') 
                            || postElement.querySelector('div[data-ad-preview="message"]')
                            || postElement.querySelector('div[dir="auto"] span[dir="auto"]');

        if (textElement) {
            // "See more" යන වචනය අඩංගු වේ නම් එය ඉවත් කර පිරිසිදු ටෙක්ස්ට් එක ලබා ගැනීම
            let cleanText = textElement.innerText.replace(/See more|තවත් බලන්න/g, "").trim();
            
            navigator.clipboard.writeText(cleanText).then(() => {
                btn.innerText = "Copied!";
                btn.style.backgroundColor = "#28a745";
                setTimeout(() => {
                    btn.innerText = "Copy Story";
                    btn.style.backgroundColor = "#0866FF";
                }, 2000);
            });
        } else {
            console.log("ටෙක්ස්ට් එක සොයාගත නොහැකි විය.");
        }
    }, 400); // තත්පර 0.4 ක ප්‍රමදයක්
}

function addButtons() {
    // ප්‍රධාන පෝස්ට් පමණක් ඉලක්ක කිරීම (කමෙන්ට් මඟ හැරීම)
    const posts = document.querySelectorAll('div[role="article"]:not(.btn-fixed)');
    
    posts.forEach(post => {
        // පෝස්ට් එකක් ඇතුළේ ඇති තවත් article එකක් (කමෙන්ට් එකක්) නොවන බව තහවුරු කරගැනීම
        if (post.closest('ul')) return; 

        post.classList.add('btn-added', 'btn-fixed');
        
        const copyBtn = document.createElement('button');
        copyBtn.innerText = "Copy Story";
        copyBtn.className = "fb-copy-btn-v3";
        
        copyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            copyStoryContent(post, copyBtn);
        });

        post.appendChild(copyBtn);
    });
}

// Facebook එකේ පේජ් එක scroll කරන විට අලුත් පෝස්ට් වලට බොත්තම දැමීම
const observer = new MutationObserver(addButtons);
observer.observe(document.body, { childList: true, subtree: true });

addButtons();
