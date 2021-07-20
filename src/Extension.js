/* global chrome */
import React, { useState, useEffect } from 'react';
import { styles } from './_Extension.css';

// zap the live page into mocker-mode
function App() {
    const [ show, setShow ] = useState(true);
    const [ elements, setElements ] = useState([]);
    const [ style, setStyle ] = useState('off'); // off, wireframe, blur
    const [ custom, setCustom ] = useState(false);
    
    useEffect(() => handleClickElements(), []);

    let processScreenshot = () => {
        chrome.runtime.sendMessage({action: "capture"}, function(response) {
            let data = response.imgSrc,
                image = new Image();
            
            image.src = data;
            
            setTimeout(function(){
                chrome.runtime.sendMessage({capture: image.outerHTML, title: document.title, url: window.location.href});
                setShow(true);
                document.getElementsByTagName('body')[0].classList.remove('mocker-me-paused');
            }, 300);
            
        });
    }
    
    let processClearStyles = () => {
        document.body.classList.remove('off');
        document.body.classList.remove('blur');
        document.body.classList.remove(`custom-blur`); 
        document.body.classList.remove('wireframe');
        document.body.classList.remove(`custom-wireframe`); 
    }
    
    let handleStyles = (option) => {
        processClearStyles();
        
        // OPEN default to wireframe
        if (option === 'off' && style === 'off') {
            setStyle('wireframe');
            document.body.classList.add(`wireframe`); 
        // CLOSE / CLEAR all styles
        } else if (option === 'off' && style !='off') {
            setStyle('off');
            setCustom(false);
            return;
        // CUSTOM choose DOM elements
        } else if (option === 'choose' && !custom) {
            setCustom(true);
            setStyle(style);
            document.body.classList.add(`custom-${style}`); 
        // CUSTOM off
        } else if (option === 'choose' && custom) {
            setCustom(false);
            setStyle('wireframe');
            document.body.classList.add(`wireframe`); 
        // APPLY custom styles
        } else if (custom) {
            setStyle(option);
            document.body.classList.add(`custom-${option}`); 
        // APPLY global page style
        } else {
            setStyle(option);
            document.body.classList.add(`${option}`); 
        }
        
    }
    let handleScreenshot = async () => {
        // everything is "in view"  
        setShow(false);
        document.getElementsByTagName('body')[0].classList.add('mocker-me-paused');
        setTimeout(function(){
            processScreenshot();
        }, 300);
    }
    let handleClickElements = () => {
        let _body = document.getElementsByTagName('body')[0];
        
        
/*
        let els = document.getElementsByTagName("*");
        for(var i = 0, all = els.length; i < all; i++){   
            els[i].classList.add('mocker-me-custom');
        }
*/
        
        _body.addEventListener('click', function(e) {
            let _target = e.target;
            
            if (!_target.classList.contains('mocker-me-custom')) {
                _target.classList.add(`mocker-me-custom`);
            } else {
                _target.classList.remove(`mocker-me-custom`);
            } 
        });
        
        _body.addEventListener('mouseover', function(e) {
            let _target = e.target;
            
            if (!custom) {
                _target.classList.add("mocker-me-hover");
            }
        });
        
        _body.addEventListener('mouseout', function(e) {
            let _target = e.target;
            _target.classList.remove("mocker-me-hover");
        });
    }
    return (
        <>
            <style>{styles}</style>
            { show && 
                <div id="ext--dialogue">
                    <div>
                        
                        <ul>
                            <li 
                                class={ style === 'off' ? 'closed toggler' : 'open toggler'  } 
                                onClick={ () => handleStyles('off')} ><span>active</span></li>
                            { style != 'off' &&
                            <>
                                <li 
                                    class={ !custom ? 'on toggler' : 'off toggler' } 
                                    onClick={ () => handleStyles('choose') } ><span>tailor</span></li>
                                {['wireframe', 'blur'].map( (option, index) => 
                                        <li 
                                            class={ style === option ? 'on' : 'off' } 
                                            onClick={ () => handleStyles(option)} >
                                            style 00{ index }
                                        </li>
                                    )}
                            </>
                            }
                            <li onClick={ handleScreenshot }>Capture</li>
                        </ul>
                    </div>
                </div>  
            }
        </>
    )
}

export default App;