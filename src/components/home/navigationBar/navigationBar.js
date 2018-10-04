import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import slug from 'slugify';

import styles from './navigationBar.scss';

import Avatar from '../avatar/avatar';

import logo from '../../../assets/landingPage/appIcon.svg';

import * as actions from '../../../store/actions/ui/actions';

class NavigationBar extends Component {
  constructor(props) {
    super(props);

    if(this.props.mode !== 3) {
      switch(this.props.role) {
        case 1:
        case 2: {
          this.state = {tabs: ['Announcements', 'Applications']};
          break;
        }

        case 3:
        case 4: {
          this.state = {tabs: ['Applications']};
          break;
        }

        case 7: {
          this.state = {tabs: ['Maintenance']};
          break;
        }
      }
    } else {
      this.state = {tabs: ['Complete registration']}
    }
  }

  componentDidMount = () => {
    if(this.props.location.pathname === '/') {
      if(this.props.mode !== 3) {
        switch(this.props.role) {
          case 1:
          case 2: {
            this.props.history.push('/announcements');
            break;
          }

          case 3: {
            this.props.history.push('/applications');
            break;
          }

          case 7: {
            this.props.history.push('/maintenance/employees');
            break;
          }
        }

        this.forceUpdate();
      }
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
          this.state.tabs.map((tab, index) => (
            <div key={index} className={styles.tab + (this.props.location.pathname.includes('/' + slug(tab.toLowerCase())) ? ' ' + styles.active : '')}>
              <Link to={tab === 'Maintenance' ? `/${tab.toLowerCase()}/employees` : `/${slug(tab.toLowerCase())}`}>{tab}</Link>
              {
                this.props.location.pathname.includes('/' + slug(tab.toLowerCase())) || (tab === 'Announcements' && this.props.location.pathname === '/') ?
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
    role: state.authentication.role,
    employeeId: state.authentication.employeeId
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleAvatarDropdown: () => dispatch({type: actions.TOGGLE_AVATAR_DROPDOWN})
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavigationBar));