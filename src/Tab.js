/* global chrome */
import React, { useState, useEffect } from 'react';

function App() {
    const [ screenshots, setScreenshots ] = useState([]);
    const [ total, setTotal ] = useState(0);
    
    useEffect(() => processScreenshot(), []);
    useEffect(() => updateControls(), [total]);
    
    let updateControls = () => {
        document.title = (total > 0 ? 'Done!' : 'Ready!');
        var canvas = document.createElement("canvas");
        canvas.height = 128;
        canvas.width = 128;
        
        var ctx = canvas.getContext("2d");
        ctx.textBaseline = 'top';
        ctx.fillStyle = (total > 0 ? '#91ff26' : '#dc143c');
        ctx.fillRect(0, 0, 128, 128);
        
        ctx.font = "bold 88px Helvetica";
        ctx.fillStyle =  (total > 0 ? '#20467c' : '#ffffff');
        ctx.textAlign = "center";
        ctx.fillText(total, 64, 22); 
        document.querySelector("link[rel*='icon']").href = canvas.toDataURL();
    }
    
    let processScreenshot = () => {
        chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            document.title = `Processing`;
            if (request.capture) {
                // Extension.js sent capture (screenshot)
                let _arr = screenshots;
                _arr.unshift([request.capture, request.title, request.url]);
                setScreenshots(_arr);
                //setPageTitle(request.title);
            }
            setTotal(screenshots.length);
        });
    }
    
    let handleClickImage = (e) => {
        console.log(e.target.src);
        var image = new Image();
        image.src = e.target.src;
        image.style.width = '100%';
        image.style.maxWidth = '100%';

        var w = window.open("");
        w.document.write('<body style="background: black; padding: 22px">' + image.outerHTML + '</body>');
    }
    return (
        <main>
            { total > 0 &&
                <h1>{ total } screens captured</h1>
            }
            { total === 0 &&
                <h1>Your screen captures will appear here...</h1>
            }
           
            <div id="screenshots">
                {screenshots.map( item => 
                    <div class="screenshot">
                        <div dangerouslySetInnerHTML={{__html: item[0]}} onClick={ (e) => handleClickImage(e)  } />
                        <p>{ item[1] }<br />
                        <a href={ item[2] } target="_blank">{ item[2] }</a></p>
                    </div>
                )}
            </div>
            
        </main>
    )
}

export default App;