import React, { Component } from 'react'
import { tuxColors, tuxInputStyles } from '../../styles'
import Checkbox from './Checkbox'

export interface State {
}

class Radio extends Component<any, State> {
  state: State = {
    checkedValue: null
  }

  componentDidMount() {
    const { value } = this.props
    this.setState({
      checkedValue: value
    })
  }

  onChangeValue = (choice: string) => {
    const { onChange } = this.props
    this.setState({
      checkedValue: choice
    })
    onChange(choice, this.props.id)
  }

  render() {
    const { id, label, choices, value } = this.props
    return (
      <div className="Radio-wrapper">
        <label className="Radio-inputLabel">
          {label}
        </label>
        {choices.map((choice: string) => (
          <label
            key={choice}
            className="Radio"
            htmlFor={choice}>
            {choice}
            <Checkbox
              id={choice}
              label={choice}
              checked={choice === value}
              onChange={() => {this.onChangeValue(choice)}}
            />
          </label>
        ))}

      <style jsx>{`
        .Radio-wrapper {
          display: inline-flex;
          flex-direction: column;
          margin-bottom: 20px;
        }

        .Radio {
          cursor: pointer;
          display: block;
          font-size: 15px;
          line-height: 24px;
          margin-bottom: 5px;
          padding-left: 28px;
          position: relative;
          user-select: none;
        }

        .Radio-inputLabel {
          color: ${tuxInputStyles.labelTextColor};
          font-size: 16px;
          font-weight: 300;
          line-height: 24px;
          padding: 5px 0;
          text-transform: capitalize;
        }

      `}</style>
      </div>
    )
  }
}

export default Radio
