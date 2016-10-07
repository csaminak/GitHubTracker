# GitHubTracker

<!-- We're going to build a GitHub tracker using their API.

Learning Objectives

We now have a larger project we need to build. We'll have to pace ourselves because the project is larger in scope than one day! Instead, we'll have to plan out our work and do little pieces at a time. Over the course of the next week you will be getting practice writing proper views in a Single Page Application (SPA), using the URL hash for navigation, using a REST API with proper authentication, testing your JavaScript code, and using a build automation tool with dependency management.

You only need to submit this assignment once at the end of the week (before Monday morning next week). However, you must have FREQUENT commits (and pushes) demonstrated through the history on your GitHub repository. In other words, no waiting until the end of the week to commit everything at once.

Your Mission

We would like to have a new UI for GitHub based on the data GitHub already has (and collects). You must create the entire UI for this from the wireframes below. Note that this does not represent the style, just the UI elements required. For look and feel you should use the default Bootstrap styles, with any additional positioning and styling you feel necessary. The size of the content in these images is not representative of the final UI. Please make it more appropriate to the size of the browser window.

The specific actions that can be taken are below the images

LoginMy InfoReposRepo Detail

Specific Tasks and Workflow

The specific actions a user can take are further below, but there are a couple of other requirements:

Each view in this app can be accessed directly through the URL
For example, I can go directly to the "Repo Detail" view for a specific repo by typing in the appropriate URL (what should that URL look like?)
You must use the URL hash to determine what view the user wants to see (you can only have ONE HTML file)
You must have tests for any function exposed by a module (on the namespace)
You must use Bootstrap, but you can augment it with other styles
You must use a package manager for any code library dependencies (including jQuery)
You must use Grunt to automate your testing, code linting, and Sass (other tasks are acceptable as well)
While using this system a user can:

Enter a personal access token to log into the system.
_Note: Your code will need to send this token with each subsequent API call: Authorization: "token a66b39d75c..."
EPIC Mode Store the token in localStorage so the user does not need to log in each time
Once logged in, the user can see their basic info by default as well as a "tab" navigation interface
Clicking on the username links to the user's GitHub profile page
Clicking on the "Repos" tab shows the user a list of their repositories along with the number of stars and open issues for each repo.
Clicking on a repo's name opens the "Repo Detail" tab with that repo's data loaded into the UI
Clicking on the name of the repo links to the GitHub page for that repo
Clicking on the number of open issues in the "Repo Detail" view links to the repo's "Issues" page on GitHub
There should only be ONE "Repo Detail" tab at any time. If the user clicks back on "Repos" and selects a different repo, the "Repo Detail" tab should now show the newly selected repo.
Clicking "Logout" at any time removes the user's personal access token from the system and takes the user back to the login form
GitHub API

Below is the documentation links for the GitHub API (the parts that you'll need):

https://developer.github.com/v3/users/
https://developer.github.com/v3/repos/
Don't forget that you'll have to authenticate the user to get their information. You can read about it on the GitHub API docs, but essentially you need to provide an Authorization header with each API call in the form: Authorization: "token a66b39d75c..."

EPIC Mode

Store the "token" in localStorage so that the user does not need to log in each time they return to the site.

Try to implement another view (or two or three) to pull in the issues for a particular repo. Here are some wireframes:

IssuesClose IssueNew Issue

When "Close Issue" is clicked, a popup box is shown in the UI asking for confirmation and an optional comment. If a comment is provided, it should be added to the GitHub issue using the API and then a second API call should be made to update the "state" of the issue (changing it to "closed").
When "New Issue" is clicked in the "Repo Issues" view the user will see the new issue view/form
Filling in this information and clicking "Submit" creates the issue in GitHub and take the use back to the issue list
Clicking "cancel" in this view takes the user back to the issue list -->
