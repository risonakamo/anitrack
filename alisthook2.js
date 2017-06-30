window.onload=main;

function main()
{
    hook();
}

function hook()
{
    var watchTable=document.querySelector(".list");
    var entries=watchTable.querySelectorAll("tr");

    console.log(entries);

    var data={};
    var ids={};
    for (var x=1,l=entries.length;x<l;x++)
    {
        var res={};
        res.link=entries[x].childNodes[1].firstChild.href;
        res.id=res.link.slice(25);
        res.title=entries[x].childNodes[1].firstChild.innerText;
        res.progress=entries[x].childNodes[3].firstChild.innerText;
        res.cover=`https://cdn.anilist.co/img/dir/anime/reg/${entries[x].firstChild.style["background-image"]}`;

        ids[res.id]=1;
        data[res.id]=res;
    }

    console.log(ids);
    console.log(data);
    return data;
}