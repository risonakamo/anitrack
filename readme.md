# anitrack 3
track anilist.co shows.

# development
1. clone this repo
2. `npm i`
3. in 2 terminals:
    - `npm run watch`
    - `npm run watch-cs`

this runs builders for web content and content scripts

4. add to chrome this folder as a developer extension
5. find the newly added anitrack popup. click on it, and click on "LIST"
6. in the "Tracked User" text box, add the name of your anilist user as it shows in the anilist.co URL when you go to your user page. Click apply
    - ex: https://anilist.co/user/Risona/ -> Risona
7. in the anitrack popup, click on the AL button. it should go to your anilist page
8. anitrack should now synchronise with your anilist page. go back to the LIST page
9. the LIST page should now be showing your watching shows