## Project 2
#### By Matt Closson

## Project Summary

This is a blog app built on ExpressJS and MongoDB. Users can login and add posts. People visiting will be able to comment on posts.  

## Models

**Posts:** title, slug, author, content, comments

## Route Table

List routes in a table

| url | method | action |
|-----|--------|--------|
| /post | get | get all blog posts (index)|
| /post/:slug | get | get a particular blog post (show)|
| /post/new | get | form for a new blog post (new)|
| /post/ | post | create a new blog post (create)|
| /post/:slug/edit | get | for to edit a blog post (edit)|
| /post/:slug | put | change a blog post (update)|
| /post/:slug | delete | remove a blog post (delete)|

## User Stories

Users will be able to create, manage, and display their blog posts. People will be able to leave comments on each blog post. 

## Challenges

## List of Technologies

<ul>
    <li>ExpressJS</li>
    <li>MongoDB</li>
    <li>Heroku</li>
</ul>