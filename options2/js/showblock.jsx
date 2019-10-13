/*Showblock element displaying a single show.
  Showblock(object showdata,parent-function triggerDataRerender)
  showdata: ShowObject object containing show data for 1 show
  triggerDataRerender: function from Dayblock parent*/
class Showblock extends React.Component
{
  constructor(props)
  {
    super(props);
    this.openBackgroundNyaa=this.openBackgroundNyaa.bind(this);
    this.changeDay=this.changeDay.bind(this);
    this.updateNyaa=this.updateNyaa.bind(this);
  }

  //opens a background tab to this show's nyaa link,
  //if there is a nyaa set.
  openBackgroundNyaa(e)
  {
    e.preventDefault();

    if (this.props.showdata.nyaa)
    {
      chrome.tabs.create({
        url:`https://nyaa.si/?q=${this.props.showdata.nyaa}&f=0&c=1_2`,
        active:false
      });
    }
  }

  //handle a change of day by day change input. triggers a rerender
  //and pushes new data to chrome storage
  changeDay(e)
  {
    var showdata=this.props.showdata;
    changeDay(showdata,showdata.day,e.currentTarget.value);

    this.props.triggerDataRerender();
  }

  //update nyaa entry for this show in storage and other visual
  //update stuff
  updateNyaa(e)
  {
    var value=e.currentTarget.value;
    var showdata=this.props.showdata;
    delayQueue(showdata.id,()=>{
      showdata.nyaa=value;
      chrome.storage.local.set({[showdata.id]:showdata});
      this.forceUpdate();
    },1000);
  }

  render()
  {
    //decide if nyaa link should have a disabled appearance
    var disabledNyaa="";
    if (!this.props.showdata.nyaa)
    {
      disabledNyaa="no-link";
    }

    return (
      <div className="show-block">
        <div className="img-hold">
          <img src={this.props.showdata.cover}/>
        </div>
        <div className="right">
          <div className="information">
            <h1><a href={this.props.showdata.link} target="_blank">{this.props.showdata.title}</a></h1>
            <h2>{this.props.showdata.progress}</h2>
          </div>

          <div className="setting">
            <div className={`nyaa-setting ${disabledNyaa}`}>
              <a href="" className="nyaa-link" onClick={this.openBackgroundNyaa}>nyaa</a>
              <input type="text" key={this.props.showdata.id} defaultValue={this.props.showdata.nyaa} onChange={this.updateNyaa}/>
            </div>

            <div className="day-setting">
              <select value={this.props.showdata.day}
                className={dayNumberToClass[this.props.showdata.day]}
                onChange={this.changeDay}
              >
                <option value="0">なし</option>
                <option value="1">日</option>
                <option value="2">月</option>
                <option value="3">火</option>
                <option value="4">水</option>
                <option value="5">木</option>
                <option value="6">金</option>
                <option value="7">土</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}