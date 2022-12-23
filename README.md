# GSoC Analyser

GSoC: Google Summer of Code; 'Oscar of the Coding World', as they popularly call it; has immense mystique surrounding it.Nurturing this dream, as many aspirants step in here, analyzing the right organizations to contribute becomes the most crucial step!

‘GSoC Analyser’, has everything an applicant would need. Not only does it enable the search by tech-stack/organization/category/topics, but displays the number of times of its applications in GSoC to graphical analytics of its projects each year, & everything else under the sun, based on last 12-year analytics.

## Link to website: https://sparsh1212.github.io/gsocanalyzer/

### Home Page

![1](./readme-assets/homePage.png)

### Search by organisation name

![1](./readme-assets/searchByOrganisation.png)

### Search by tech-stack

![1](./readme-assets/searchByTechStack.png)

## Bookmark

### Bookmarking feature allows you to save your favorite organisation and then quickly access them in the browser.

Steps to bookmark an organization.

To add Bookmark search your favorite organization and click on the ribbon icon next to it.

![1](./readme-assets/BookmarkNotAdded.png)

After adding your organization the ribbon will turn red, congrats you've successfully added a bookmark.

![1](./readme-assets/BookmarkSuccessfullAdded.png)

You can check your shortlisted organizations by navigating to the Bookmarks section.

![1](./readme-assets/BookmarkBar.png)

You can reset all your bookmarks by clicking the Reset Bookmarks button, which is present at the footer.

![1](./readme-assets/resetBookmark.png)

# Setup:

- Clone the repo
- cd into the repo directory
- Run: `npm install --force`
- Run: `npm start`

# Contributing :

- Fork the repo.
- Create a new branch named <your_feature>
- Commit changes and make a PR.
- PRs are welcome.

# Updating Data:

- Setup gsoc analyzer using the steps mentioned above
- In `./scrape.py` replace 2023 with the {year}+1
- Run: `python scrape.py`
- Replace the data in ./data/finalData.json with the new data in ./data.json(produced after successfully running scrape script)
- Identify duplicate entries of organisations in data obtained through scraping (produced due to slightly different name in various year of gsoc)
- for each duplicate organisation Run : `python merge.py`
- add {year} to labels in `./components/OrganisationCard.js`
- for charts in `./components/launcher/` add {year} to the labels and add data for the year
