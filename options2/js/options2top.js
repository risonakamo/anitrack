class OptionsTwoTop extends React.Component {
  render() {
    return React.createElement(React.Fragment, null, ["日なし", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日", "日曜日"].map((x, i) => {
      return React.createElement(DayBlock, {
        day: x,
        key: i
      });
    }));
  }

}