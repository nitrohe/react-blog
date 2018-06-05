import React,{Component} from 'react';
//import { injectIntl } from 'react-intl';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
//bugs must have '.jsx'
import Banner from './Banner.jsx';
import Page1 from './Page1.jsx';
import Page2 from './Page2.jsx';
//import Page3 from './Page3.jsx';

import style from './style.css';

// To store style which is only for Home and has conflicts with others.
///*
function getStyle() {
  return `
    .main-wrapper {
      padding: 0;
    }
    #header {
      box-shadow: none;
      max-width: 1200px;
      width: 100%;
      margin: 20px auto 0;
      padding: 0 24px;
    }
    #header,
    #header .ant-select-selection,
    #header .ant-menu {
      background: transparent;
    }
    #header #logo {
      padding: 0;
    }
    #header .ant-row > div:last-child .ant-select,
    #header .ant-row > div:last-child .ant-menu,
    #header .nav-phone-icon {
      display: none;
    }
    #header .ant-row > div:last-child .header-lang-button {
      margin-right: 0;
    }
    footer .footer-wrap {
      width: 100%;
      padding: 0;
    }
    footer .bottom-bar {
      margin: auto;
      max-width: 1200px;
      padding: 16px 24px;
    }
    footer  .bottom-bar {
      border-top: none;
    }
    footer .footer-wrap .ant-row {
      width: 100%;
      max-width: 1200px;
      padding: 86px 24px 93px 24px;
      margin: auto;
    }
    @media only screen and (max-width: 767.99px) {
      #footer .footer-wrap{
        padding: 40px 24px
      }
      footer .footer-wrap .ant-row {
        padding: 0;
      }
    }
  `;
}
//*/
require('./static/style');

/* eslint-disable react/prefer-stateless-function */
export default class HomeAntd extends Component {
/*
  static contextTypes = {
    intl: PropTypes.object.isRequired,
    isMobile: PropTypes.bool.isRequired,
  }
*/
  render() {
    //const { isMobile, intl } = this.context;
    //const childProps = { ...this.props, isMobile, locale: intl.locale };
    let isMobile = false;
    let locale = 'zh-CN'
    const childProps = { ...this.props, isMobile, locale};
    return (
      <DocumentTitle title={`Nitrohe's Blog | 首页`}>
        <div className={style.homeAntdBox}>
        {/*<div style={{minWidth:1200,backgroundColor:'#fff'}}>*/}
            <div className="main-wrapper">
              <Banner {...childProps} />
              <Page1 {...childProps} />
              <Page2 {...childProps} />
              {/*<Page3 {...childProps} />*/}
              {<style dangerouslySetInnerHTML={{ __html: getStyle() }} />}
            </div>
        </div>
      </DocumentTitle>
    );
  }
}

//export default injectIntl(Home);
//export default HomeAntd;
