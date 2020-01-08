
(function() {
    var url = document.URL;
    domains = ["twitter", "reddit"]
    var chosenDomain;
    for (domain of domains) {
        if (url.includes(domain)) {
            chosenDomain = domain;
            break;
        }
    }

    var commentsDOMData;

    if (chosenDomain == "reddit") {
        commentsDOMData = document.querySelectorAll('[data-test-id="comment"]');
    } else if (chosenDomain == "twitter") {
        commentsDOMData = document.querySelectorAll('article');
    }

    // The minimum prediction confidence.
    var threshold = 0.51;

    var sentences = [];
    commentsLen = commentsDOMData.length;

    for (var i = 0; i < commentsLen; ++i) {
        var sentence = commentsDOMData[i].innerText;
        sentences.push(sentence);
        console.log(i + " , " + sentence);
    }

    toxicity.load(threshold).then(model => {
        model.classify(sentences).then(predictions => {
            for (prediction of predictions) {
                console.log(prediction.label);
                for (var i = 0; i < commentsLen; ++i) {
                    var isToxic = prediction.results[i].match;
                    // console.log(prediction.results[i].match)
                    if (isToxic) {
                        commentsDOMData[i].style.display = "none";
                    }
                }
            }
    });

    
    });
})();
