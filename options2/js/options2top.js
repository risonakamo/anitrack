class OptionsTwoTop extends React.Component {
  constructor(props) {
    super(props);
    this.triggerDataRerender = this.triggerDataRerender.bind(this);
    this.state = {
      shows: this.props.shows
    };
  }

  triggerDataRerender() {
    this.setState({
      shows: this.state.shows
    });
  }

  render() {
    var data = this.state.shows;
    var daySortData = {};
    var theday;

    for (var x in data) {
      theday = data[x].day;

      if (daySortData[theday]) {
        daySortData[theday].push(data[x]);
      } else {
        daySortData[theday] = [data[x]];
      }
    }

    return React.createElement(React.Fragment, null, ["なし", "日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"].map((x, i) => {
      return React.createElement(DayBlock, {
        day: x,
        key: i,
        shows: daySortData[i],
        triggerDataRerender: this.triggerDataRerender
      });
    }));
  }

}

class HeaderSetter extends React.Component {
  constructor(props) {
    super(props);
    this.editNotif = React.createRef();
  }

  render() {
    return React.createElement(React.Fragment, null, React.createElement("p", null, "Anilist ID:"), React.createElement("input", {
      type: "text",
      defaultValue: this.props.username
    }), React.createElement("p", {
      className: "edit-notif hidden",
      ref: this.editNotif
    }, "press enter to set"));
  }

}