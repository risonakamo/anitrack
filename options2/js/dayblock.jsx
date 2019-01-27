/* showblock container for each day
   DayBlock(string day)
   day: the day string*/
class DayBlock extends React.Component
{
  render()
  {
    return (
      <div class="day-block">
        <h1 class="day-label">{this.props.day}</h1>

        <p class="none-text">なし</p>
      </div>
    );
  }
}