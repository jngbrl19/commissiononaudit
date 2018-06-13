import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

import Aux from '../auxillary/auxillary';
import CookieInfo from '../cookieInfo/cookieInfo';

import styles from './landingPage.scss';

import Getstarted from '../getStarted/getStarted';
import landing from '../../assets/landingPage/landing.svg';
import appIcon from '../../assets/landingPage/appIcon.svg';

class LandingPage extends Component {
  render() {
    return(
      <DocumentTitle title="Welcome to Commission on Audit Promotion System">
        <Aux>
          <Getstarted toggle={() => this.props.history.replace('')} />
          <div className={styles.nav}>
            <div className={styles.inside}>
              <div className={styles.logo}>
                <img src={appIcon} height={40} alt=""/>
                <div className={styles.text}>
                  <p className={styles.com}>Commission on Audit</p>
                  <p className={styles.pms}>PROMOTION MANAGEMENT SYSTEM</p>
                </div>
              </div>
              <div className={styles.rightSide}>
                <div className={styles.li}>
                  <Link to="/get-started/login">LOG IN</Link>
                </div>
                <div className={styles.c}>
                  <Link to="/get-started/register">CREATE ACCOUNT</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.left}>
              <div className={styles.title}>
                <p>An <strong>all-in-one system</strong> to<br/> manage employees'<br/> application for promotion</p>
              </div>
              <div className={styles.desc}>
                <p>An all-in-one system to manage employees' <br/> application for promotion.</p>
              </div>
              <div className={styles.getStarted}>
                <div onClick={() => this.props.history.push('get-started/login')} className={styles.button}>
                  <p>GET STARTED</p>
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <img src={landing} height={320} alt=""/>
            </div>
          </div>
          <CookieInfo />
        </Aux>
      </DocumentTitle>
    )
  }
}

export default LandingPage;
