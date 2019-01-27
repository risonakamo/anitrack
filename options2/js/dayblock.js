class DayBlock extends React.Component {
  render() {
    return React.createElement("div", {
      class: "day-block"
    }, React.createElement("h1", {
      class: "day-label"
    }, this.props.day), React.createElement("p", {
      class: "none-text"
    }, "\u306A\u3057"));
  }

}