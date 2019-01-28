class Showblock extends React.Component {
  constructor(props) {
    super(props);
    this.openBackgroundNyaa = this.openBackgroundNyaa.bind(this);
  }

  openBackgroundNyaa(e) {
    e.preventDefault();

    if (this.props.showdata.nyaa) {
      chrome.tabs.create({
        url: `https://nyaa.si/?q=${this.props.showdata.nyaa}&f=0&c=1_2`,
        active: false
      });
    }
  }

  render() {
    var disabledNyaa;

    if (!this.props.showdata.nyaa) {
      disabledNyaa = "no-link";
    }

    return React.createElement("div", {
      className: "show-block"
    }, React.createElement("img", {
      src: this.props.showdata.cover
    }), React.createElement("div", {
      className: "right"
    }, React.createElement("div", {
      className: "information"
    }, React.createElement("h1", null, React.createElement("a", {
      href: this.props.showdata.link,
      target: "_blank"
    }, this.props.showdata.title)), React.createElement("h2", null, this.props.showdata.progress)), React.createElement("div", {
      className: "setting"
    }, React.createElement("div", {
      className: `nyaa-setting ${disabledNyaa}`
    }, React.createElement("a", {
      href: "",
      className: "nyaa-link",
      onClick: this.openBackgroundNyaa
    }, "nyaa"), React.createElement("input", {
      type: "text",
      defaultValue: this.props.showdata.nyaa
    })), React.createElement("div", {
      className: "day-setting"
    }, React.createElement("select", {
      defaultValue: this.props.showdata.day,
      className: dayNumberToClass[this.props.showdata.day]
    }, React.createElement("option", {
      value: "0"
    }, "\u65E5\u306A\u3057"), React.createElement("option", {
      value: "1"
    }, "\u65E5"), React.createElement("option", {
      value: "2"
    }, "\u6708"), React.createElement("option", {
      value: "3"
    }, "\u706B"), React.createElement("option", {
      value: "4"
    }, "\u6C34"), React.createElement("option", {
      value: "5"
    }, "\u6728"), React.createElement("option", {
      value: "6"
    }, "\u91D1"), React.createElement("option", {
      value: "7"
    }, "\u571F"))))));
  }

}