import React from 'react';
import ReactDOM from 'react-dom';
import ReactShadowRoot from 'react-shadow-root';
import Extension from './Extension';
import Tab from './Tab';
import './global.scss';
const injectWrapper = document.querySelector("body:not(#mocker-me-tab)");
const ext = document.createElement('div');
ext.id = 'jk--chrome--extension';
if (injectWrapper) {
    injectWrapper.prepend(ext);
    injectWrapper.classList.add('mocker-me');   
    ReactDOM.render(<ReactShadowRoot><Extension /></ReactShadowRoot>, document.getElementById('jk--chrome--extension'));
} else {
    ReactDOM.render(<Tab />, document.getElementById('root'));
}

// without #shadow-dom
// ReactDOM.render(<Extension />, document.getElementById('jk--chrome--extension'));
// with #shadow-dom
