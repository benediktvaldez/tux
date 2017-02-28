import React from 'react'
import classNames from 'classnames'
import { lighten, fade } from '../../utils/color'
import { tuxColors } from '../../styles'

export interface State {
  user : null | {
    name : string
    avatarUrl : string
    spaceName : string
  }
}

class TuxSidebar extends React.Component<any, State> {
  static contextTypes = {
    tux: React.PropTypes.object,
  }

  state : State = {
    user: null,

  }

  async componentDidMount() {
    const user = await this.context.tux.adapter.currentUser()

    if (user) {
      this.setState({
        user: {
          name: user.firstName,
          avatarUrl: user.avatarUrl,
          spaceName: user.space.name,
        }
      })
    }
  }

  login = () => {
    this.context.tux.adapter.login()
  }

  render() {
    const { isEditing, overlayIsActive, onClickEdit } = this.props
    const { user } = this.state
    return (
      <div className={classNames('TuxSidebar', overlayIsActive && 'has-overlay')}>
        <ul className="TuxSidebar-content">
          <div className="TuxSidebar-logo">Tux</div>
          <li>
            <button className={classNames('TuxSidebar-editButton', isEditing && 'is-active')} onClick={onClickEdit}>{isEditing ? 'Editing: on' : 'Editing: off'}</button>
          </li>
          <li><a href="/">Documentation</a></li>
          <li><a href="/">Tux on Github</a></li>
        </ul>
        {user && (
          <div className="TuxSidebar-user">
            <a onClick={this.login} className="TuxSidebar-signInOut">{user ? 'Sign out' : 'Sign in'}</a>
          </div>
        )}

        <style jsx>{`
          .TuxSidebar {
            background: ${tuxColors.colorSnow};
            box-sizing: border-box;
            position: fixed;
            width: 100%;
            max-width: 260px;
            height: 100%;
            min-height: 100vh;
            z-index: 100;
            box-shadow: 7px 1px 10px ${fade(tuxColors.colorBlack, 0.2)};
            transform: none;
            transition: transform 0.4s ease-out;
            will-change: transform;
          }
          /* When we open a *modal* for editing, we animate the sidebar out. */
          .TuxSidebar.has-overlay {
            transform: translateX(-100%);
          }
          .TuxSidebar-content {
            display: block;
            position: relative;
            flex: 0 1 100%;
            padding: 10px;
          }
          .TuxSidebar-content li {
            color: ${tuxColors.textGray};
            display: block;
            font-size: 16px;
            margin: 10px 15px;
            padding: 10px 15px;
          }
          .TuxSidebar-content li a {
            text-decoration: none;
          }
          .TuxSidebar-logo {
            font-size: 24px;
            padding: 10px;
            text-align: center;
            font-size: 24px;
            border-bottom: 1px solid ${fade(tuxColors.colorBlack, 0.05)};
            margin-bottom: 10px;
          }
          .TuxSidebar-editButton {
            appearance: none;
            background: ${tuxColors.colorPurple};
            border: none;
            box-shadow: 0 12px 20px -10px ${fade(tuxColors.colorPurple, 0.2)}, 0 4px 20px 0px ${fade(tuxColors.colorBlack, 0.2)}, 0 7px 8px -5px ${fade(tuxColors.colorPurple, 0.2)};
            color: ${tuxColors.textLight};
            cursor: pointer;
            display: block;
            font-size: 16px;
            padding: 15px;
            width: 100%;
          }
          .TuxSidebar-editButton:hover {
            background: ${lighten(tuxColors.colorPurple, 0.1)};
          }
          .TuxSidebar-editButton.is-active {
            background: ${tuxColors.colorPink};
            box-shadow: 0px 0px 3px 2px ${fade(tuxColors.colorPink, 0.25)};
          }
          .TuxSidebar-user {
            bottom: 25px;
            left: 0; right: 0;
            margin: auto;
            position: absolute;
          }
          .TuxSidebar-signInOut {
            opacity: 0.85;
            cursor: pointer;
            color: ${tuxColors.textGray};
            display: block;
            text-decoration: none;
            text-align: center;
            text-shadow: 0 1px 0 ${fade(tuxColors.textLight, 0.4)};
          }
          .TuxSidebar-signInOut:hover {
            color: ${tuxColors.colorPink};
          }
        `}</style>
      </div>
    )
  }
}

export default TuxSidebar
