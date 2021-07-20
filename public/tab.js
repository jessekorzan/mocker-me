chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message) {
            console.log(request.message);

            document.querySelector("#screenshot").innerHTML += request.message;
        }
});

document.addEventListener('DOMContentLoaded', function () {
    //console.log("dude, where's my content?");
});

