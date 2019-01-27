class Showblock extends React.Component {
  render() {
    return React.createElement("div", {
      className: "show-block"
    }, React.createElement("img", {
      src: this.props.showdata.cover
    }), React.createElement("div", {
      className: "right"
    }, React.createElement("div", {
      className: "information"
    }, React.createElement("h1", null, React.createElement("a", {
      href: this.props.showdata.link
    }, this.props.showdata.title)), React.createElement("h2", null, this.props.showdata.progress)), React.createElement("div", {
      className: "setting"
    }, React.createElement("div", {
      className: "nyaa-setting"
    }, React.createElement("a", {
      href: "",
      className: "nyaa-link"
    }, "nyaa"), React.createElement("input", {
      type: "text"
    })), React.createElement("div", {
      className: "day-setting"
    }, React.createElement("select", null, React.createElement("option", {
      value: "0"
    }, "\u306A\u3044"), React.createElement("option", {
      value: "1"
    }, "\u6708"), React.createElement("option", {
      value: "2"
    }, "\u706B"), React.createElement("option", {
      value: "3"
    }, "\u6C34"), React.createElement("option", {
      value: "4"
    }, "\u6728"), React.createElement("option", {
      value: "5"
    }, "\u91D1"), React.createElement("option", {
      value: "6"
    }, "\u571F"), React.createElement("option", {
      value: "7"
    }, "\u65E5"))))));
  }

}