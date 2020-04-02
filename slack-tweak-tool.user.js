// ==UserScript==
// @name         Slack Tweak Tool
// @namespace    https://github.com/na3shkw
// @version      0.1
// @description  Slackをカスタマイズするユーザースクリプト
// @author       na3shkw
// @match        https://app.slack.com/*
// @grant        none
// @updateURL    https://github.com/na3shkw/slack-tweak-tool/raw/master/slack-tweak-tool.user.js
// @downloadURL  https://github.com/na3shkw/slack-tweak-tool/raw/master/slack-tweak-tool.user.js
// ==/UserScript==

(function() {
    'use strict';

    const css = `
        :root {
            --sidebar-width: 260px;
            --sidebar-header-height: 64px;
            --drawer-size: 48px;
        }
        .p-top_nav {
            transform: translateY(-100%);
            width: calc(100% - var(--sidebar-width));
            height: var(--sidebar-header-height);
            margin-left: var(--sidebar-width);
            transition: transform .2s ease 0s;				
        }
        .p-top_nav.expand {
            transform: translateY(0);
        }
        .top-nav-drawer {
            position: absolute;
            width: var(--drawer-size);
            height: var(--drawer-size);
            bottom: 0;
            left: 50%;
            transform: translateY(100%) translateX(-50%);
            color: black;
        }
        .p-top_nav.expand .top-nav-drawer {
            opacity: 0;
        }
        /* 検索表示モーダル */
        .ReactModal__Content--after-open[aria-label="検索"]{
            margin-left: calc(var(--sidebar-width) / 2);
        }
        .p-workspace {
            margin-top: -38px;
        }
    `;
    const html = {
        topNavDrawer: `<div class="top-nav-drawer c-icon c-icon--chevron-circle-down"></div>`
    };

    function elem(selector){
        return document.querySelectorAll(selector);
    }
    
    function main(){
        const style = document.createElement('style');
        style.innerHTML = css;
        elem("head")[0].appendChild(style);

        // ナビゲーションのドロワー追加
        const topNav = elem(".p-top_nav")[0];
        topNav.insertAdjacentHTML('beforeend', html.topNavDrawer);
        topNav.addEventListener("mouseenter", function(){
            topNav.classList.add("expand");
        });
        topNav.addEventListener("mouseleave", function(){
            this.classList.remove("expand");
        });
    }

    // ページが読み込まれるまで待つ
    const contentLoadTimer = setInterval(function() {
        const teamName = elem(".p-ia__sidebar_header__team_name_text");
        if(teamName.length > 0){
            clearInterval(contentLoadTimer);
            main();
        }
    }, 500);
})();
