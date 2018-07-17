import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';

import styles from './navigationBar.scss';

import Avatar from '../avatar/avatar';

import logo from '../../../assets/landingPage/appIcon.svg';

import * as actions from '../../../store/actions/ui/actions';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    if(props.role === 1) {
      this.state = {tabs: ['Announcements', 'Maintenance']}
    }
  }

  componentDidMount = () => {
    if(this.props.location.pathname === '/' && this.props.mode === 4) {
      this.props.history.push('/announcements')
    }

    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  shouldComponentUpdate = nextProps => {
    return !(nextProps.location.pathname.includes(this.props.location.pathname) || this.props.location.pathname.includes(nextProps.location.pathname));
  };

  handleClickOutside = e => {
    if (this.refs.avatar && !this.refs.avatar.contains(e.target) && this.props.showAvatarDropdown === true) {
      this.props.toggleAvatarDropdown();
    }
  };

  render() {
    const tabs =
      <TransitionGroup component={null}>
        {
          this.state.tabs.map((tab) => (
            <div className={styles.tab + (this.props.location.pathname.includes('/' + tab.toLowerCase()) || (tab === 'Announcements' && this.props.location.pathname === '/') ? ' ' + styles.active : '')}>
              <Link to={`/${tab.toLowerCase()}`}>{tab}</Link>
              {
                this.props.location.pathname.includes('/' + tab.toLowerCase()) || (tab === 'Announcements' && this.props.location.pathname === '/') ?
                  <CSSTransition
                    in="true"
                    timeout={200}
                    classNames={{
                      enter: styles.enter,
                      enterActive: styles.enterActive,
                      exit: styles.exit,
                      exitActive: styles.exitActive
                    }}>
                      <div className={styles.selector}/>
                  </CSSTransition> : null
              }
            </div>
          ))
        }
      </TransitionGroup>;

    return (
      <div className={styles.navigationBar}>
        <div className={styles.logoSection}>
          <img src={logo} alt=""/>
        </div>
        <div className={styles.tabs}>
          {tabs}
        </div>
        <div className={styles.profileTabs}>
          <div ref="avatar" className={styles.profileTab}>
            <Avatar onClick={this.props.toggleAvatarDropdown} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showAvatarDropdown: state.ui.showAvatarDropdown,
    mode: state.authentication.mode,
    role: state.authentication.role
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAvatarDropdown: () => dispatch({type: actions.TOGGLE_AVATAR_DROPDOWN})
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));