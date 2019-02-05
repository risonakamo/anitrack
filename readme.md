## AniTrack
**Anitrack** is a chrome extension designed for streamlining the process of tracking shows on Anilist.co and downloading them via nyaa torrents. It is not affliated with Anilist.co.

## Functionality
Anitrack has various features that can be used once properly configured.

### Extension Popup
After being installed Anitrack will provide a menu accessible by clicking on its extension icon in the chrome toolbar. The popup:

- displays shows releasing today, and yesterday (for if you are downloading after midnight).
    - if NYAA is configured for a show, clicking on it will open the NYAA page in a new tab, so you can quickly open NYAA pages for all releasing shows
- displays progress of any given show, so you have an idea of what the next episode number should be. This is synced with and manually incremented via your Anilist.co page.
- displays links to relevant sites to the process, including google calendar, your Anilist.co page, NYAA's front page, and a selected stream site which may be useful to keeping track of what is actually releasing
- allows access to the show configuration page, by clicking "more".

*the popup:*

![](https://i.imgur.com/VdTSsOm.png)

### Options/Configuration Page (NEW)
This page is where shows detected by the extension from Anilist.co are displayed and can be configured, accessed by clicking the "More" button on the extension popup.

- Shows are grouped by their assigned day.
- Shows can be set a NYAA string by typing in the field next to the NYAA button. The value is automatically saved after completion of typing.
- Clicking the NYAA button will open a tab to a NYAA search page using the provided NYAA string as the search query. If there is no NYAA string the button will be grey and unclickable.
- The day of any show can be changed by using the day dropdown menu present under the NYAA button in each show. Setting the day will allow the show to appear in the extension popup on their specified day and be colour-coded at the Anilist.co list page, as well as relocate the show to the appropriate day category within this options page.

![](https://i.imgur.com/9n7R6qr.png)

### Options/Configuration Page (OLD)
*(for older versions of anitrack)*

This page is where shows detected by the extension from Anilist.co are displayed and can be configured. A show's options can be accessed by right clicking the symbol at the far right of a show entry.

- shows can be set a DAY and a NYAA string.
- once a DAY is set the show will appear under the correct day category (once reloaded). The show will also begin appearing in the popup on the set day.  Additionally, the show on your Anilist.co page will be colour-coded to show the set DAY.

*shows grouping by day:*

![](https://i.imgur.com/hpTZWlS.png)

- a NYAA string is a search string for the NYAA service.
- The symbol on the right will change to an "n" from an "x" to indicate the show has a nyaa set. The "n" can now be clicked to quickly navigate to a nyaa search for the inputted nyaa string.
    - clicking on the show when it appears in the popup will also now navigate to the nyaa search

![](https://i.imgur.com/wCScsqi.png)

- note: *option changes do not take effect until page reload*

### Anilist Page
The extension adds colour-coding to your Anilist.co page for shows that have been given a DAY. Today, and yesterday's shows are highlighted for faster eye-access, while other shows have a badge indicating the DAY.

![](https://i.imgur.com/yMtmbOP.png)

## Setup, Usage and Show Tracking
Before functionality can be used the extension must be setup. This is done by entering your Anilist.co username into the fields at the top of the configuration page. This username must be the same as the string that appears in your Anilist.co's profile page url. And of course, your Anilist.co must be public.

### (NEW) Username configuration
*input field at top of new Anitrack options/configuration page:*

![](https://i.imgur.com/wBPWnLm.png)

### (OLD) Pre-2.7 configuration
*the input fields at the configuration page's top:*

![](https://i.imgur.com/WLrw9yP.png)

The extension cannot hack your account. It needs this link in order to know on what page to being its actions, as well as allow you to go to your Anilist.co page via the popup.

**Why are there two fields?**  In the past Anilist randomly switched between your username in the URL and a number ID, this might happen to you if your username is common, but it has not been happening lately.  If your url is constantly changing, use both fields to tell the extension that there are two usernames to track. If you accidentally put your password in the second field, nothing will happen.

### Usage
Now that the extension knows what page to do work at, simply visit your Show List page at Anilist.co. A popup should appear near the bottom right to notify that the extension has performed an update. Shows that have been given a DAY will be coloured at this point.

### Tracking
- Upon visiting your Anilist page, the extension begins tracking only shows that are under the WATCHING category. Make use of Anilist.co's category systems to narrow down which shows the extension should track.
    - this means, the only way to remove a tracked show is to remove it from WATCHING and allow the extension to update
- The extension is optimised to run on page load. Making changes to shows, such as moving them out or into the WATCHING category will require a reload before the extension updates its tracked shows.
    - An exception to this is the "+" button, which increments your WATCHED PROGRESS. Use of this button will be properly tracked by the extension, without a reload
- The language of the show will always hook as **romaji**, for now.

If things are going wrong, reloading generally works.

## Bugs
Anilist.co currently has a bug where navigating to the site directly appears to prevent interaction with website functions such as incrementing show progress (the + button). It is as if you are not logged in. The extension will continue to update as usual. A solution to this is using the navigation tabs at the top to move to another page (such as the "profile" page), and then moving back to the show list page. The extension will update again as usual.

## trivia
It is a rather specific process this extension is streamlining, so I don't expect anyone to use it.  So why did I write this? Because if I lose my memory and forget the process this extension becomes a puzzle to use.