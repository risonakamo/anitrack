/*Showblock element displaying a single show.
  Showblock(object showdata)
  showdata: ShowObject object containing show data for 1 show*/
class Showblock extends React.Component
{
  render()
  {
    return (
      <div className="show-block">
        <img src={this.props.showdata.cover}/>
        <div className="right">
          <div className="information">
            <h1><a href={this.props.showdata.link}>{this.props.showdata.title}</a></h1>
            <h2>{this.props.showdata.progress}</h2>
          </div>

          <div className="setting">
            <div className="nyaa-setting">
              <a href="" className="nyaa-link">nyaa</a>
              <input type="text" defaultValue={this.props.showdata.nyaa}/>
            </div>

            <div className="day-setting">
              <select defaultValue={this.props.showdata.day} className={dayNumberToClass[this.props.showdata.day]}>
                <option value="0">日なし</option>
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