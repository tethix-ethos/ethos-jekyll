# About this website

The website is built in Jekyll 4.0 and deploys to GitLab pages. 

It was built on top of Jekyll's default *minima* theme and uses the following plugins:

- [jekyll-feed](https://github.com/jekyll/jekyll-feed): for generating an RSS feed of blog posts,
- [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag): for adding SEO-friendly tags in the header,
- [jekyll-paginate-v2](https://github.com/sverrirs/jekyll-paginate-v2): for adding pagination and generating autopages for categories and tags,
- [jekyll-target-blank](https://keith-mifsud.me/projects/jekyll-target-blank): to open all external links in a new window in a safe way.


## Getting started on macOS

To get a local copy up and running follow these simple steps.

### Prerequisites

  Jeykyll requires Ruby 2.5 or above. Ruby 3 and above does not include webrick; this dependency will be included when you run bundle install (see below).

  ```sh
  brew install ruby
  ```  
  Install jekyll:

  ```sh
  gem install jekyll bundler
  ```

### Running the website locally

  Make sure all dependencies in your Gemfile are available to your application
  ```sh  
  bundle install
  ```
  Build the site and serve locally with or without live reload
  ```sh
  bundle exec jekyll serve
  bundle exec jekyll serve --livereload
  ```

If you run into any problems, Jekyll documentation has all the information you need to set up your machine, and build and run a Jekyll site: https://jekyllrb.com/docs/.