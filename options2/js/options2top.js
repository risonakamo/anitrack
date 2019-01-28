class OptionsTwoTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    var data = this.props.shows;
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

    this.state.shows = daySortData;
  }

  render() {
    return React.createElement(React.Fragment, null, ["日なし", "日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"].map((x, i) => {
      return React.createElement(DayBlock, {
        day: x,
        key: i,
        shows: this.state.shows[i]
      });
    }));
  }

}