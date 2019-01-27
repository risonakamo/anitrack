class DayBlock extends React.Component {
  render() {
    var displayedShows;

    if (!this.props.shows) {
      displayedShows = React.createElement("p", {
        className: "none-text"
      }, "\u306A\u3057");
    } else {
      displayedShows = this.props.shows.map((x, i) => {
        return React.createElement(Showblock, {
          showdata: x,
          key: i
        });
      });
    }

    return React.createElement("div", {
      className: "day-block"
    }, React.createElement("h1", {
      className: "day-label"
    }, this.props.day), displayedShows);
  }

}