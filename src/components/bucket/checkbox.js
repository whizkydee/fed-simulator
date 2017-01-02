import React from "react"

export default class Checkbox extends React.Component {

  static propTypes = {
    changeHandler: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
    defaultValue: React.PropTypes.any.isRequired,
  }

  onChange = (event) => this.props.changeHandler(event.target.name, event.target.value)

  render() {
    return (
      <input
        type="checkbox"
        name={this.props.name}
        defaultValue={this.props.defaultValue}
        checked={this.props.defaultValue}
        onChange={this.onChange}
      />
    )
  }
}
