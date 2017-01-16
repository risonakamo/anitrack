void main();

/*returns object {
 title
 link
 id
 cover
 progress}
 does full hook operations*/
Object runHook();

//returns array of hooked cover image links
Array getImgs();

//returns array of [titles,links,ids]
//where all inner things are also arrays of
//the thing
Array getTitles();

//returns array of ids for progress only
Array getIds();

//returns array of hooked progesses
Array getProgress();

/*--- storage functions ---*/
//print all keys in local storage
void printStorageKeys();

//clears storage
void clearStorage();

//updates storage by only adding new ids
//also updates 'ids' of storage
void fullUpdateStorage();

//updates storage 'ids' value by hooking progresses
void progressUpdate();
/*--- end storage functions ---*/
