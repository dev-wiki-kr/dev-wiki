'use client'

import { createGlobalStyle } from 'styled-components'

export const GlobalFont = createGlobalStyle`
  @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

  @font-face {
    font-family: 'Pretendard';
    font-style: normal;
    font-display: swap;
    font-weight: 100;
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/woff2-dynamic-subset/Pretendard-Thin.subset.0.woff2') format('woff2'),
         url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/woff-dynamic-subset/Pretendard-Thin.subset.0.woff') format('woff');
    unicode-range: U+f9ca-fa0b, U+ff03-ff05, U+ff07, U+ff0a-ff0b, U+ff0d-ff19, U+ff1b, U+ff1d, U+ff20-ff5b, U+ff5d,
                  U+ffe0-ffe3, U+ffe5-ffe6;
  }

  body {
    font-family: 'Pretendard', sans-serif;
  }
`
