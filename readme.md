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

[screenshot of ppoup]

### Options/Configuration Page
This page is where shows detected by the extension from Anilist.co are displayed and can be configured. A show can be configured by RIGHT CLICKING the X to the right of the show, which changes to an "n" if the show has been given a NYAA string. What does configuration involves:

- shows can be set a DAY and a NYAA string.
- once a DAY is set the show will appear under the correct day category (once reloaded). The show will also begin appearing in the popup on the set day.  Additionally, the show on your Anilist.co page will be colour-coded to show the set DAY.

[screenshot demonstrating day]

- a NYAA string is a search string for the NYAA service. Once the NYAA string is set, clicking on the show in the popup or the "n" icon on the configuration page will open a new tab performing a search at NYAA for the set string. Using this, one can quickly search up releases for a show.

[screenshot demonstrating nyaa string]

### Anilist Page
The extension adds colour-coding to your Anilist.co page for shows that have been given a DAY.

[screenshot of that]

## Setup, Usage and Show Tracking
Before functionality can be used the extension must be setup. This is done by entering your Anilist.co username into the fields at the top of the configuration page. This username must be the same as the string that appears in your Anilist.co's profile page url. And of course, your Anilist.co must be public.

[screen shot of that]

The extension cannot hack your account. It needs this link in order to know on what page to being its actions, as well as allow you to go to your Anilist.co page via the popup.

**Why are there two fields?**  In the past Anilist randomly switched between your username in the URL and a number ID, this might happen to you if your username is common, but it has not been happening lately.  If your url is constantly changing, use both fields to tell the extension that there are two usernames to track. If you accidentally put your password in the second field, nothing will happen.

### Usage
Now that the extension knows what page to do work at, simply visit your Show List page at Anilist.co. A popup should appear near the bottom right to notify that the extension has performed an update. Shows that have been given a DAY will be coloured at this point.

### Tracking
- Upon visiting your Anilist page, the extension begins tracking only shows that are under the WATCHING category. Make use of Anilist.co's category systems to narrow down which shows the extension should track.
- The extension is optimised to run on page load. Making changes to shows, such as moving them out or into the WATCHING category will require a reload before the extension updates its tracked shows.
    - An exception to this is the "+" button, which increments your WATCHED PROGRESS. Use of this button will be properly tracked by the extension, without a reload

If things are going wrong, reloading generally works.

## Bugs
Anilist.co currently has a bug where navigating to the site directly appears to prevent interaction with website functions such as incrementing show progress (the + button). It is as if you are not logged in. The extension will continue to update as usual. A solution to this is using the navigation tabs at the top to move to another page (such as the "profile" page), and then moving back to the show list page. The extension will update again as usual.

## trivia
It is a rather specific process this extension is streamlining, so I don't expect anyone to use it.  So why did I write this? Because if I lose my memory and forget the process this extension becomes completely useless.