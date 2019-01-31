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
    this.inputOnChange=this.inputOnChange.bind(this);
    this.inputKeyHandler=this.inputKeyHandler.bind(this);

    this.state={
      //showNotif:0* //if notif element is showing
      //applied:0*  //if the input is "applied". upon
                    //being changed, it is no longer "applied"
    };
  }

  //onchange event handler for main input
  inputOnChange()
  {
    //if the notif is not showing yet, show it
    if (!this.state.showNotif)
    {
      this.setState({showNotif:1});
    }

    //the input is not not applied anymore, and is changed
    this.setState({applied:0});
  }

  //keypress event handler for main input
  inputKeyHandler(e)
  {
    if (e.key=="Enter")
    {
      //if not already applied, do stuff
      if (!this.state.applied)
      {
        this.setState({applied:1});
        chrome.storage.local.set({userOps:[e.currentTarget.value,""]});
      }
    }
  }

  render()
  {
    //determine if notif element should be hidden
    var notifClass="hidden";
    if (this.state.showNotif)
    {
      notifClass="";
    }

    //determine which message notif should show, based
    //on if it is applied or not
    var notifText="press enter to set";
    if (this.state.applied)
    {
      notifText="applied";
    }

    return <>
      <p>Anilist ID:</p>
      <input type="text" defaultValue={this.props.username} onChange={this.inputOnChange} onKeyPress={this.inputKeyHandler}/>
      <p className={`edit-notif ${notifClass}`}>{notifText}</p>
    </>;
  }
}