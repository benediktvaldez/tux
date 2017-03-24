import React, { Component } from 'react'
import classNames from 'classnames'
import { lighten, fade } from '../../utils/color'
import { Theme } from '../../colors'

export interface State {
  user: null | {
    name: string
    avatarUrl: string
    spaceName: string
  },
  isVisible: boolean
  isHovered: boolean
}

class TuxFab extends Component<any, State> {
  static contextTypes = {
    tux: React.PropTypes.object,
  }

  theme = this.context.tux.theme

  state: State = {
    user: null,
    isVisible: false,
    isHovered: false,
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

  handleMouseOver = () => {
    this.setState({
      isHovered: true,
    })
  }

  handleMouseLeave = () => {
    const { isHovered } = this.state
    if (isHovered) {
      this.setState({
        isHovered: false,
      })
    }
  }

  handleLogin = () => {
    this.context.tux.adapter.login()
  }

  render() {
    const { isEditing, overlayIsActive, onClickEdit } = this.props
    const { user, isVisible, isHovered } = this.state
    const classes = classNames('TuxFab', {
      'is-active': isEditing,
      'is-visible': isVisible,
      'has-overlay': overlayIsActive,
      'is-hovered': isHovered,
    })

    return (
      <div className={classes} onMouseLeave={this.handleMouseLeave}>
        <a
          className="TuxFab-item TuxFab-mainItem"
          onClick={onClickEdit}
          onMouseOver={this.handleMouseOver}>
            <i className="icon icon-plus"></i>
        </a>
        <a className="TuxFab-item" href="/" data-tooltip="Documentation">
        <i className="icon icon-white_question"></i>
        </a>
        <a className="TuxFab-item" href="/" data-tooltip="Tux on Github">
        <i className="icon icon-git"></i>
        </a>
        <a
          onClick={this.handleLogin}
          data-tooltip="Log out"
          className="TuxFab-item TuxFab-signInOut">
          <i className="icon icon-user"></i>
        </a>

        <style jsx>{`
          .TuxFab {
            align-items: center;
            bottom: 40px;
            cursor: pointer;
            overflow: visible;
            position: fixed;
            pointer-events: none;
            right: 40px;
            display: flex;
            flex-direction: column;
          }

          .TuxFab.is-hovered:hover {
            pointer-events: auto;
          }

          .TuxFab-item {
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${this.theme.floatingActionButton.color};
            text-decoration: none;
            background: #fdfdfd;
            border-radius: 50%;
            height: 45px;
            flex: none;
            position: relative;
            width: 45px;
            order: 0;
            margin-top: 10px;
            transition:
              opacity 0.2s ease,
              transform 0.4s cubic-bezier(${this.theme.floatingActionButton.itemAnimationEase});
            transition-origin: center;
          }
          .TuxFab-item:hover {
            background: #FFF;
          }
          .TuxFab-item::before {
            border-radius: 50%;
            border: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: 0 2px 7px rgba(0, 0, 0, 0.1), 0 2px 7px rgba(0, 0, 0, 0.05);
            content: '';
            display: block;
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            transform-origin: center;
            width: 100%;
            z-index: -1;
          }
          .TuxFab-mainItem {
            background-color: ${this.theme.floatingActionButton.color};
            color: white;
            height: 65px;
            order: 1;
            pointer-events: auto;
            transform: scale(0.9);
            transition:
              transform 0.25s cubic-bezier(${this.theme.floatingActionButton.itemAnimationEase}),
              background-color 0.15s;
            width: 65px;
          }
          .TuxFab-mainItem .icon {
            font-size: 23px;
            transform: scale(0.87);
          }
          .TuxFab:hover .TuxFab-mainItem {
            transform: scale(1);
            background-color: ${lighten(this.theme.floatingActionButton.color, 0.1)};
          }
          .TuxFab.is-active .TuxFab-mainItem {
            background: ${this.theme.floatingActionButton.activeColor};
            transform: rotateZ(135deg);
          }
          .TuxFab.is-active .TuxFab-mainItem .icon {
            transform: scale(1);
            transition: transform 0.25s cubic-bezier(${this.theme.floatingActionButton.itemAnimationEase});
          }
          .TuxFab-item:not(.TuxFab-mainItem) {
            opacity: 0;
          }
          .TuxFab-item:not(.TuxFab-mainItem)::after {
            background: rgb(97, 97, 97);
            border-radius: 2px;
            box-sizing: content-box;
            color: white;
            content: attr(data-tooltip);
            left: -10px;
            padding: 2px 10px;
            position: absolute;
            text-align: center;
            transform: translateX(-120%);
            transition: all 0.25s ease-in-out;
            white-space: nowrap;
            opacity: 0;
            z-index: -1;
            width: auto;
          }
          .TuxFab-item:not(.TuxFab-mainItem):hover::after {
            transform: translateX(-100%);
            opacity: 1;
          }
          .TuxFab-item:nth-child(2) {
            transform: translateY(30px) scale(0.8);
            transition-delay: ${this.theme.floatingActionButton.itemAnimationDelay}ms;
          }
          .TuxFab-item:nth-child(3) {
            transform: translateY(20px) scale(0.8);
            transition-delay: ${this.theme.floatingActionButton.itemAnimationDelay / 2}ms;
          }
          .TuxFab-item:nth-child(4) {
            transform: translateY(10px) scale(0.8);
            transition-delay: 0s;
          }

          .TuxFab:hover .TuxFab-item:not(:first-child) {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          .TuxFab.is-visible {

          }

          /* When we open a *modal* for editing, we animate the sidebar out. */
          .TuxFab.is-visible.has-overlay {

          }
        `}</style>
      </div>
    )
  }
}

export default TuxFab