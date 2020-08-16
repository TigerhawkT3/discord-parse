const emojis = {
    ':smudge:': 'https://cdn.discordapp.com/emojis/692149087407177799.webp',
    ':AAA:': 'https://cdn.discordapp.com/emojis/704025209119834153.webp',
    ':AAAA:': 'https://cdn.discordapp.com/emojis/696785501348429925.webp'};
const config = { childList: true};
const expression = /\[([^\]]+)\]\((<a [^>]+>)[^<]+<\/a>\)/g;
const messages = document.querySelectorAll('[aria-label="Messages in general"]')[0]

function replaceAll(str,mapObj){ // from https://stackoverflow.com/a/15604206/2617068
    const re = new RegExp(`(?<!")` + Object.keys(mapObj).join("|(?<!\")"),"gi");
    return str.replace(re, function(matched){
        return `<span class="emojiContainer-3X8SvE" role="button" tabindex="0"><img aria-label="${matched}" src="${mapObj[matched]}" alt="${matched}" draggable="false" class="emoji"></span>`;
    });
}

const parseNode = function (n) {
    n.innerHTML = replaceAll(n.innerHTML.replace(expression, `$2$1</a>`), emojis); // parse emojis and links
    // then magnify standalone emojis
    if (!n.textContent &&
        n.children.length &&
        n.children[0].children.length) for (let i of n.children) i.children[0].className = 'emoji jumboable';
}

const callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) for (let node of mutation.addedNodes)
        parseNode(node.children[0].children[2] || node.children[0].children[1])    
};

for (let message of document.querySelectorAll('[class*="messageContent"]')) {
    parseNode(message)
}

const observer = new MutationObserver(callback);
observer.observe(messages, config);