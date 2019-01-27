/* showblock container for each day
   DayBlock(string day,array shows)
   day: the day string
   shows: array of show objects*/
class DayBlock extends React.Component
{
  render()
  {
    //creating show blocks or placeholder for empty
    var displayedShows;
    if (!this.props.shows)
    {
      displayedShows=<p className="none-text">なし</p>;
    }

    else
    {
      displayedShows=this.props.shows.map((x,i)=>{
        return <Showblock showdata={x} key={i}/>;
      });
    }

    return (
      <div className="day-block">
        <h1 className="day-label">{this.props.day}</h1>

        {displayedShows}
      </div>
    );
  }
}