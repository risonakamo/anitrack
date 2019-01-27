window.onload=main;

function main()
{
    ReactDOM.render(React.createElement(OptionsTwoTop),document.querySelector(".day-blocks"));
}

function showStorage()
{
    chrome.storage.local.get(null,(data)=>{
        console.log(data);
    });
}