window.onload=main;

function main()
{

}

function showStorage()
{
    chrome.storage.local.get(null,(data)=>{
        console.log(data);
    });
}