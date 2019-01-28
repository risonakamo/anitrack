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

//modify a show object's day and update the day arrays
//directly modifies the given show object.
//for oldday and newday, should be day numbers
function changeDay(show,oldDay,newDay)
{
    show.day=newDay;

    //changes day numbers into day# string usable by
    //localstorage
    oldDay=`day${oldDay}`;
    newDay=`day${newDay}`;

    chrome.storage.local.get([oldDay,newDay],(data)=>{
        if (!data[oldDay])
        {
            data[oldDay]={};
        }

        if (!data[newDay])
        {
            data[newDay]={};
        }

        delete data[oldDay][show.id]; //remove id from old day array
        data[newDay][show.id]=""; //add id to new day array

        data[show.id]=show; //update the show id in localstorage

        chrome.storage.local.set(data);
    });
}

//queue a callback to run after some time within a named queue.
//only 1 callback can be queued per queuename, queing another
//function with an existing queuename resets the timer for
//that queue.
var delayQueueQueue={};
function delayQueue(queueName,callback,time=2000)
{
    if (delayQueueQueue[queueName])
    {
        clearTimeout(delayQueueQueue[queueName]);
    }

    delayQueueQueue[queueName]=setTimeout(callback,time);
}