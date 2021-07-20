let _on = [], // tabs with extension on
    _react = "asset-manifest.json"; // react manifest

let readTextFile = (file, callback) => {
    // file has to be in the root (/public)
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getOwnTabs() {
    return Promise.all(
        chrome.extension.getViews({type: 'tab'}).map(view =>
            new Promise(resolve =>
                view.chrome.tabs.getCurrent(tab =>
                resolve(Object.assign(tab, {url: view.location.href}))))));
}

async function openOptions(url) {
    const ownTabs = await getOwnTabs();
    const tab = ownTabs.find(tab => tab.url.includes(url));
    if (tab) {
        chrome.tabs.update(tab.id, {active: false});
    } else {
        // workspace
        chrome.tabs.create({'url': chrome.extension.getURL('index.html'), active: false}, function(tab) {});
    }
}

let enable = (tab) => {
    // get the REACT manifest
    readTextFile(_react, function(text) {
        let _data = JSON.parse(text),
            _keys = Object.keys(_data.files),
            _js = [_data.files['main.js'],_data.files[_keys[3]],_data.files[_keys[5]]];
    	
    	// inject all the JS files required
    	_js.forEach(file => {
    	    chrome.tabs.executeScript(tab.id, {
    		    file: file
        	});
        })
        // inject styles
    	chrome.tabs.insertCSS(tab.id, {
        	file: _data.files['main.css']
    	});
	});
	// badges
    chrome.browserAction.setBadgeText({text: 'ON', tabId: tab.id});
    chrome.browserAction.setBadgeBackgroundColor({color: 'crimson'});
}

// extension clicked on/off
chrome.browserAction.onClicked.addListener((tab) => {
    openOptions('index.html')
    let _theCleaner = `if (document.getElementById('jk--chrome--extension')) { 
        document.getElementById('jk--chrome--extension').remove(); 
        document.getElementsByTagName('body')[0].classList.remove('mocker-me');
        document.getElementsByTagName('body')[0].classList.remove('blur');
        document.getElementsByTagName('body')[0].classList.remove('wireframe');
        document.getElementsByTagName('body')[0].classList.remove('custom-blur');
        document.getElementsByTagName('body')[0].classList.remove('custom-wireframe'); }`;
 
	chrome.tabs.executeScript(tab.id, {code: _theCleaner});
	
    if (!_on.includes(tab.id)) {
        _on.push(tab.id);
        enable(tab);
    } else {
        _on = _on.filter(e => e !== tab.id);
        chrome.browserAction.setBadgeText({text: '', tabId: tab.id});
    }
});

// send in the screen capture
chrome.runtime.onMessage.addListener(
    // "screenshot" coming from Extension.js
    function(request, sender, sendResponse) {
        chrome.tabs.captureVisibleTab(
            null,
            {"format":"png"},
            function(dataUrl)
            {
                sendResponse({imgSrc:dataUrl});
            }
        );
        return true;
    }
);