class Showblock extends React.Component
{
  render()
  {
    return (
      <div className="show-block">
        <img src="test.jpg"/>
        <div className="right">
          <div className="information">
            <h1><a href="google.com">eromanga sensei</a></h1>
            <h2>2</h2>
          </div>

          <div className="setting">
            <div className="nyaa-setting">
              <a href="" className="nyaa-link">nyaa</a>
              <input type="text" value="ero"/>
            </div>

            <div className="day-setting">
              <select>
                <option value="0">ない</option>
                <option value="1">月</option>
                <option value="2">火</option>
                <option value="3">水</option>
                <option value="4">木</option>
                <option value="5">金</option>
                <option value="6">土</option>
                <option value="7">日</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}