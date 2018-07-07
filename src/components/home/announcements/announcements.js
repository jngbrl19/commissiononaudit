import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from './announcements.scss';

import Aux from '../../auxillary/auxillary';
import Button from '../../button/button';
import SideBar from '../sideBar/sideBar';

class Announcements extends Component {
  render() {
    return (
      <div className={styles.announcements}>
        <SideBar />
        <div className={styles.container}>
          <div className={styles.titleBar + ' ' + (this.props.location.pathname.includes('/new') ? styles.bottom : '')}>
            {
              this.props.location.pathname.includes('/new') ?
                <React.Fragment>
                  <p>Post new announcement</p>
                  <Link to="/announcements">Cancel</Link>
                </React.Fragment> :
                <Aux>
                  <p>Announcements</p>
                  <Button onClick={() => this.props.history.push('/announcements/new')} classNames={['primary']} width={170} name="+  NEW ANNOUNCEMENT"/>
                </Aux>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Announcements);
