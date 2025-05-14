Project Overview: Voting Widget
This is a React + Vite based dynamic voting widget that allows users to upvote or downvote ideas displayed as cards. Each card includes editable content through a responsive modal, promoting interactive feedback.

🛠️ Tools & Technologies Used
React – for building user interfaces

Vite – as the build tool for fast development and HMR (Hot Module Replacement)

JavaScript (ES6+)

CSS – custom styles for voting buttons and card layout

LocalStorage – for storing vote counts locally

ESLint – for linting and code quality checks

💡 Assumptions & Design Decisions
Voting data is stored locally in the browser (LocalStorage), assuming no backend integration is required for the initial version.

Each voting card is indexed to uniquely manage its vote count.

Only one vote (either upvote or downvote) is allowed at a time per card.

The widget is self-contained and assumes a simple JSON-like array (votingData) to render voting cards dynamically.

Modals are used for editing content assuming frontend-only data updates.

