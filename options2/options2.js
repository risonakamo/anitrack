window.onload=main;

function main()
{
    chrome.storage.local.get("ids",(data)=>{
        data=data.ids;
        if (!data)
        {
            data={};
        }

        data=Object.keys(data);

        chrome.storage.local.get(data,(data2)=>{
            ReactDOM.render(React.createElement(OptionsTwoTop,{shows:data2}),document.querySelector(".day-blocks"));
        });
    });

}

function showStorage()
{
    chrome.storage.local.get(null,(data)=>{
        console.log(data);
    });
}