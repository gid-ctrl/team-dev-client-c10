# Cohort Manager  

## Table of contents

-
    -   [Table of contents](#table-of-contents)
    -   [General info](#general-info)
   -   [Setup](#setup)
          

## General info

This was a simulation of professional development teamwork. Here, I work on parts of an application in teams. The application already had a backend server live with ‘users’. But it was my job to develop parts of the frontend. Later on we created our own server which followed the same principle with the front end having me work on certain parts of the project.

Teachers and students can have conversations

When signed in, a student user of id 123 can navigate to /home. They will see a list of users from their same cohort in a sidebar. They will see a feed of posts from other students and teachers in the main area. Each conversation in a post can continue with users and teachers adding comments or liking posts/comments. Post messages are ordered by date, and an input field and a submit button at the bottom to create a new post. For now, other users will see these new posts when they refresh their browser page.

A user can create a new post and this should appear on the feed. Any teacher can edit or delete an existing post or comment, unless the post or comment are made by another teacher. A student may edit or delete only the posts and comments that they have made. Any user can add a comment to an existing post. Any user can like or unlike a comment or a post. Liking is only possible if the user has not already liked that post or comment. Unliking is only possible if the user has already liked or unliked that post or comment.

## Setup

Clone this repository (do not fork!)

```sh
git clone git@github.com:boolean-uk/team-dev-client.git && cd team-dev-client
npm ci
npm start
```








