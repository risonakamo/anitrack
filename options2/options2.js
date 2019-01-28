window.onload=main;

//converts a day number to a day class for day colours
var dayNumberToClass={
    0:"",
    1:"nichi",
    2:"getsu",
    3:"kai",
    4:"mizu",
    5:"moku",
    6:"kin",
    7:"do"
};

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