/*react root options2
  OptionsTwoTop(object shows)
  shows: object containing all shows to display, with keys being show IDs*/
class OptionsTwoTop extends React.Component
{
  constructor(props)
  {
    super(props);
    this.triggerDataRerender=this.triggerDataRerender.bind(this);

    this.state={
      shows:this.props.shows
    };
  }

  //public, passdown. rerender everything, usually with modified data.
  triggerDataRerender()
  {
    this.setState({shows:this.state.shows});
  }

  render()
  {
    //sorting the recieved show data into days
    var data=this.state.shows;
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

    return <>
      {["なし","日曜日","月曜日","火曜日","水曜日",
        "木曜日","金曜日","土曜日"].map(
        (x,i)=>{
          return <DayBlock day={x} key={i} shows={daySortData[i]} triggerDataRerender={this.triggerDataRerender}/>;
        }
      )}
    </>;
  }
}

/*header setter elements. currently just the username setter
  HeaderSetter(string username)
  username: username to start with.*/
class HeaderSetter extends React.Component
{
  constructor(props)
  {
    super(props);

    this.editNotif=React.createRef();
  }

  render()
  {
    return <>
      <p>Anilist ID:</p>
      <input type="text" defaultValue={this.props.username}/>
      <p className="edit-notif hidden" ref={this.editNotif}>press enter to set</p>
    </>;
  }
}