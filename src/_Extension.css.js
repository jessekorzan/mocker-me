import { font, colors } from './_vars.css';

export const styles = `
    @font-face {
        font-family: 'redacted_regular';
        src: url('chrome-extension://__MSG_@@extension_id__/fonts/redacted-regular.woff') format('woff'), 
             url('chrome-extension://__MSG_@@extension_id__/fonts/redacted-regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'redacted_scriptbold';
        src: url('chrome-extension://__MSG_@@extension_id__/fonts/redacted-script-bold.woff') format('woff'), 
             url('chrome-extension://__MSG_@@extension_id__/fonts/redacted-script-bold.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    *, *:before, *:after {
        box-sizing: border-box;
    }
    #ext--dialogue {
        position: fixed;
        z-index: 999999;
        right: 22px;
        bottom: 22px;
        background: ${colors.black};
        color: $black; 
        font-family: ${font};
        font-size: 12px;
        text-align: center;
        min-width: 244px;
        max-width: 100vw;
        min-height: 88px;
        cursor: auto;
        user-select: none;  
        box-shadow: -8px 8px 16px 3px rgba(0,0,0,0.15);
        transition: all 260ms ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIns;
        animation-duration: 260ms;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
    }
    #ext--dialogue > div {
        padding: 0 22px;
    }
    h1, h2, h3, h4, h5, h6, p {
        color:  ${colors.black};
        font-size: 16px;
        font-weight: normal;
    }
    button {
        border: none;
        line-height: 34px;
        background: ${colors.green};
        padding: 0 17px;
        border-radius: 2px;
        color: ${colors.blue};
        outline: none;
    }
    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        display: flex;
        width: 100%;
    }
    ul li {
        position: relative;
        z-index: 1;
        margin: 0 0;
        padding: 0;
        width: 88px;
        display: block;
        line-height: 34px;
        border: 1px solid ${colors.white};
        background: transparent;
        white-space: nowrap;
        border-radius: 0px;
        cursor: pointer;
        color:  ${colors.white};
        text-transform: uppercase;
        font-weight: bold;
        font-size: 10px;
        transition: all 260ms ease-in-out;
    }
    ul li:nth-child(3) {
        
    }
    ul li:nth-child(4) {
        margin-left: -1px;
    }
    ul li.on {
        background: ${colors.white};
        color:  ${colors.black};
    }
    ul li.toggler {
        width: 60px;
        border-color: transparent;
        border-radius: 6px;
        background: #fff;
        margin-right: 12px;
    }
    ul li.toggler span {
        position: absolute;
        top: -26px;
        left: 0;
        font-size: 9px;
        text-transform: uppercase;
        color: ${colors.white};
        opacity: 0.45;
    }
    ul li.toggler:after {
        content: 'OFF';
        position: absolute;
        z-index: 999;
        top: 0px;
        right: 6px;
        font-size: 10px;
        font-weight: bold;
        color: ${colors.black};
        text-indent: 0px;
    }
    ul li.toggler:before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        border-radius: 4px;
        width: 24px;
        height: 24px;
        background:  ${colors.black};
        opacity: 0.24;
        transition: all 260ms ease-in-out;
    }
    ul li.off.toggler,  ul li.open.toggler {
        background:  ${colors.green};
    }
    ul li.off.toggler:before, ul li.open.toggler:before {
        left: 29px;
        background:  darkgreen;
        opacity: 1;
    }
    ul li.off.toggler:after, ul li.open.toggler:after {
        content: "ON";
        left: 7px;
        right: auto;
        color: darkgreen;
    }
    ul li:last-child {
        border-radius: 80px;
        border-color:  ${colors.white};
        background:  ${colors.black};
        color:  ${colors.white};
        margin-left: 22px;
    }
    @keyframes fadeIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;