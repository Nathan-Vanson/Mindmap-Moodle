// Lorsque l'utilisateur ajoute l'extension ou l'a met à jour :

browser.runtime.onInstalled.addListener(function() {
    alert("L'extension a été installée et est désormais prête à être utilisée !");
})

// Lorsque l'on charge une nouvelle page pour l'utilisateur dans le lieu en question :

browser.webNavigation.onCompleted.addListener(function() {
    alert("Vous voilà dans une nouvelle page");
}, {urls: [{urlMatches: "https://moodle.unige.ch/mod/forum/post.php?post=&postformat=*"}]});