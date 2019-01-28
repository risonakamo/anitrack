/*react root options2
  OptionsTwoTop(object shows)
  shows: object containing all shows to display, with keys being show IDs*/
class OptionsTwoTop extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state={
      //shows:{}*
    };

    //sorting the recieved show data into days
    var data=this.props.shows;
    var daySortData={};
    var theday;
    for (var x in data)
    {
      theday=data[x].day;
      if (daySortData[theday])
      {
        daySortData[theday].push(data[x]);
      }

      else
      {
        daySortData[theday]=[data[x]];
      }
    }

    this.state.shows=daySortData;
  }

  render()
  {
    return <>
      {["日なし","日曜日","月曜日","火曜日","水曜日",
        "木曜日","金曜日","土曜日"].map(
        (x,i)=>{
          return <DayBlock day={x} key={i} shows={this.state.shows[i]}/>;
        }
      )}
    </>;
  }
}