window.onload=main;

function main()
{
    console.log(runHook());

    chrome.storage.local.clear();    
    chrome.storage.local.get("alist",function(d){
        if (!d.alist)
        {
            chrome.storage.local.set({alist:0});
            return;
        }
        
        console.log(d.alist);
        d.alist++;
        chrome.storage.local.set({alist:d.alist});
    });
}

/*returns object {
 title
 link
 id
 cover
 progress}*/
function runHook()
{
    var imgs=getImgs();
    var info=getTitles();
    var progress=getProgress();

    var d=[];
    
    for (var x=0;x<imgs.length;x++)
    {
        var n={cover:imgs[x],
           title:info[0][x],
           link:info[1][x],
           id:info[2][x],
           progress:progress[x]};

        d.push(n);
    }

    return d;
}

function getImgs()
{
    var imgs=[];
    var covers=document.querySelectorAll(".cover");
    var link;
    
    covers.forEach(function(e){
        link=e.style["background-image"];
        link=`https://cdn.anilist.co/img/dir/anime/reg/${link.slice(46,-2)}`;
        imgs.push(link);
    });

    return imgs;
}

//gets titles,link,and id
function getTitles()
{
    var titles=document.querySelectorAll(".title a");
    var ta=[];
    var tl=[];
    var tid=[];
    var link;
    
    titles.forEach(function(e){
        ta.push(e.innerHTML);

        link=e.href;
        tl.push(link);
        tid.push(link.slice(24))
    });

    return [ta,tl,tid];
}

function getProgress()
{
    var p=[];
    var progresses=document.querySelectorAll(".progress>span:nth-of-type(1)");

    progresses.forEach(function(e){
        p.push(e.innerHTML);
    });

    return p;
}
