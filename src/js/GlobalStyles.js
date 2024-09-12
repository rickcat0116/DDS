import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const globalStyles = createGlobalStyle`

  :root {

    --font-family: 'Pretendard', sans-serif;

    // Color
    --primary-color: #0072B9;
    --primary-sub-color: #539CD0;
    --primary-light-color: #0072B94D;

    --color-grey-0: #f9f9f9;
    --color-grey-5: #f5f5f5;
    --color-grey-10: #EAEAEA;
    --color-grey-20: #DDDDDD;
    --color-grey-30: #CFCFCF;
    --color-grey-40: #BCBCBC;
    --color-grey-50: #A5A5A5;
    --color-grey-60: #868686;
    --color-grey-70: #717171;
    --color-grey-80: #545454;
    --color-grey-90: #363636;
    --color-grey-100: #1D1D1D;
    --color-white: #ffffff;
    --color-black: #000000;
    --color-clear: transparent;


    // Size
    --nav-tit : 18px;
    --team-tit: 24px;
    --head-tit : 32px;
    

    // Spacing(여백)
    --spacing-12: 12px;
    --spacing-24: 24px;
    --spacing-40: 40px;
    --spacing-60: 60px;

    --letter-spacing: -0.03em;

    // Trans
    --transition: all .5s ease-in-out;
    --translate-align: translate(-50%, -50%);
    --translate-align-x: translateX(-50%);
    --translate-align-y: translateY(-50%)
  }

  // CSS 초기화

  ${reset}

  ;
  * {
    box-sizing: border-box;
    line-height: 1.2;
    letter-spacing: -0.03em;
    word-break: keep-all;
  }

  html,
  body,
  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  code,
  form,
  fieldset,
  legend,
  input,
  textarea,
  p,
  blockquote,
  th,
  td,
  img {
    margin: 0;
    padding: 0;
  }

  body, html {
    word-wrap: break-word;
    color: var(--color-gray-1);
    font-family: var(--font-family);
    font-weight: 400;
    font-size: var(--font-page-s);
    letter-spacing: var(--letter-spacing);
  }

  html {
    width: 100%;
  }

  body#popup {
    min-width: 0;
  }

  li {
    list-style: none;
  }

  img,
  fieldset {
    border: none;
    vertical-align: middle;
  }

  table {
    width: 100%;
    border: 0;
    border-spacing: 0;
    border-collapse: collapse;
  }

  caption {
    display: none;
  }

  th,
  td {
    border: 0;
    vertical-align: top;
  }

  div {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
  }

  button {
    overflow: visible;
    padding: 0;
    margin: 0;
    border: 0;
    cursor: pointer;
    background: transparent;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
  }

  hr.layout {
    display: none;
  }

  select {
    -webkit-appearance: none;
  }

  a {
    text-decoration: none;
    color: #000;
  }

  a:hover {
    text-decoration: none;
  }

  a:active {
    text-decoration: none;
  }

  input, textarea {
    font-family: 'Pretendard', serif;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #fff inset;
    -webkit-text-fill-color: #000;
  }

  input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }

  // 자체 공통 CSS
  .inner {
    position:relative;
    max-width:1440px;
    margin:0 auto;
    width:95%;
    text-align:center;
    
    .sec_tit {
      font-weight:700;
      font-size:var(--head-tit);
    }
    
    .sec_tit + * {
      margin-top:48px;
    }
  }


  @media only screen and (max-width: 1024px) {
    :root {
      // Size
      --size-header: 50px;
      --size-logo: 90px;

      --size-pc: 1440px;

      --size-btn: 40px;

      --font-nav: 24px;
      --font-v-tit: 36px;
      --font-v-sub-tit: 24px;
      --font-main-tit: 28px;
      --font-main-sub-tit: 16px;
      --font-card-tit: 18px;
      --font-card-sub-tit: 14px;
      --font-page-b: 24px;
      --font-page-s: 14px;
      --font-nav-tit: 12px;
      --font-nav-tit24: 18px;
      --font-nav-sub-tit: 14px;
      --font-history-tit: 24px;
      --font-history-txt: 16px;
      --font-btn-18: 14px;
      --font-page-tit: 12px;
    }
    
  }
`;
export default globalStyles;
