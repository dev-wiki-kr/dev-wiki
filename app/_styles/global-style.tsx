'use client'

import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /* 폰트 크기의 팽창을 방지합니다. */
    html {
        -moz-text-size-adjust: none;
        -webkit-text-size-adjust: none;
        text-size-adjust: none;
        scroll-behavior: smooth;
    }

    /* 기본 여백을 제거하여 작성된 CSS를 더 잘 제어할 수 있습니다. */
    body,
    h1,
    h2,
    h3,
    h4,
    p,
    figure,
    blockquote,
    dl,
    dd {
        margin-block-start: 0;
        margin-block-end: 0;
    }

    /* list를 role값으로 갖는 ul, ol 요소의 기본 목록 스타일을 제거합니다. */
    ul[role='list'],
    ol[role='list'] {
        list-style: none;
    }

    /* 핵심 body의 기본값을 설정합니다. */
    body {
        min-height: 100vh;
        line-height: 1.5;
        margin: 0;
    }

    /* 제목 요소와 상호작용하는 요소에 대해 line-height를 더 짧게 설정합니다. */
    h1,
    h2,
    h3,
    h4,
    button,
    input,
    label {
        line-height: 1.1;
    }

    /* 제목에 대한 text-wrap을 balance로 설정합니다. */
    h1,
    h2,
    h3,
    h4 {
        text-wrap: balance;
    }

    /* 클래스가 없는 기본 a 태그 요소는 기본 스타일을 가져옵니다. */
    a {
        text-decoration: none;
        color: currentColor;
    }

    /* 이미지 관련 작업을 더 쉽게 합니다. */
    img,
    picture {
        max-width: 100%;
        display: block;
    }

    /* input 및 button 항목들이 글꼴을 상속하도록 합니다. */
    input,
    button,
    textarea,
    select {
    font: inherit;
    }

    /* 행 속성이 없는 textarea가 너무 작지 않도록 합니다. */
    textarea:not([rows]) {
        min-height: 10em;
    }

    /* 고정된 모든 항목에는 여분의 스크롤 여백이 있어야 합니다. */
    :target {
        scroll-margin-block: 5ex;
    }

    /* Foote를 하단에 고정시키기 위해 (Root)Layout.tsx에서 Wrapper Div로 컨텐츠를 감쌌습니다. */
    #wrapper {
        height: auto;
        min-height: calc(100vh - 440px);
    }

    /* 버튼의 기본 스타일을 제거합니다. */
    button {
        margin: 0;
        padding: 0;
        background:none;
        border:0;
        outline: none;
        cursor:pointer;
    }
    
    ol {
        margin: 0;
        padding: 0;
    }

    blockquote {
        padding-left: 1em;
        border-left: 4px rgb(141, 150, 160) solid;
        color: rgb(141, 150, 160);
        margin: 20px;
    }

    table {
        max-width: 100%;
        width: max-content;
        overflow: auto;
        display: block;
        padding: 0;
        border-collapse: collapse;
    }

    td, 
    th {
        border: 1px solid #d0d7de;
        padding: 6px 10px;
        border-collapse: collapse;
    }

    table tr:nth-child(2n) { 
        background-color: #f6f8fa;
     }

    ul {
        padding-left: 30px;
    }

    
`
