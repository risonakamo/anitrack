# anitrack 3
track anilist.co shows with days and nyaa links.

# installation
1. `npm i`
2. `npm run build`
3. add to chrome as developer extension

# registering tracking user
1. open the extension popup from the chrome extensions toolbar area
2. click LIST to open the showlist
3. enter your anilist.co name as it appears in your anilist's show page url
    - example <span>http</span>s://anilist.co/user/**risona**/animelist
4. click apply

# operation
- upon navigating to your anilist.co page by using the extension popup's built in anilist navigation button, or reloading manually on the show page, the shows in the **watching** category will be tracked.
- incrementing the progress of a show on the anilist.co show page while the extension is active will automatically update the tracked progress without necessitating a reload.
- days and nyaa links can be assigned by using the extension's **showlist** page, accessible via the extension popup menu.

# build release
1. `npm run build-prod`
2. folder called `release` will be created. zip the contents up and give it a name.