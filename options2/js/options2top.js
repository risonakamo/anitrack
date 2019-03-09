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

      if (!theday) {
        theday = 0;
      }

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
    this.inputOnChange = this.inputOnChange.bind(this);
    this.inputKeyHandler = this.inputKeyHandler.bind(this);
    this.state = {};
  }

  inputOnChange() {
    if (!this.state.showNotif) {
      this.setState({
        showNotif: 1
      });
    }

    this.setState({
      applied: 0
    });
  }

  inputKeyHandler(e) {
    if (e.key == "Enter") {
      if (!this.state.applied) {
        this.setState({
          applied: 1
        });
        chrome.storage.local.set({
          userOps: [e.currentTarget.value, ""]
        });
      }
    }
  }

  render() {
    var notifClass = "hidden";

    if (this.state.showNotif) {
      notifClass = "";
    }

    var notifText = "press enter to set";

    if (this.state.applied) {
      notifText = "applied";
    }

    return React.createElement(React.Fragment, null, React.createElement("p", null, "Anilist ID:"), React.createElement("input", {
      type: "text",
      defaultValue: this.props.username,
      onChange: this.inputOnChange,
      onKeyPress: this.inputKeyHandler
    }), React.createElement("p", {
      className: `edit-notif ${notifClass}`
    }, notifText));
  }

}