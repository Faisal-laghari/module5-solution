# Module 5 Coding Assignment — David Chu's China Bistro

Based on the official Johns Hopkins Coursera starter project.

## Implemented behavior
- Loads categories from the course Firebase endpoint using AJAX.
- Chooses a random category from the returned categories when building the home view.
- Leaves `snippets/home-snippet.html` unchanged and substitutes its random category placeholder in JavaScript.
- Clicking Specials loads the selected category's menu items without a full page reload.
- Menu categories and menu items are loaded dynamically from the course data endpoint.

## Run
Serve this folder with VS Code Live Server or another HTTP server. Opening `index.html` directly with `file://` may block AJAX requests to local snippets.

## Official starter
https://github.com/jhu-ep-coursera/fullstack-course4/tree/master/assignments/assignment5/assignment5-solution-starter

