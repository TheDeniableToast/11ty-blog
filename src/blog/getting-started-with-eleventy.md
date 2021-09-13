---
title: Getting started with eleventy
---

{% raw %}

[Eleventy](https://www.11ty.dev/) is what you would call a Static Site Generator (SSG). All pages on a statically generated website are pre-generated on a server which removes the need for the websites visitor to wait for them to be rendered in real time, thus practically removing any loading time between the pages. In this blog post i will teach you how to set up eleventy with nunjucks and sass and then create a blog with it.

## Installation
Open wsl and install node and npm.
```bash	
sudo apt install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

sudo apt install nodejs
```


Create a new git repository, call it 11ty-blog. Clone the repository to your local machine.
```bash
git clone <repository url>
cd 11ty-blog
```


Once done we need to initialize the project.
```bash
npm init -y
```


Install 11ty and Sass
```bash
npm install @11ty/eleventy npm run all sass
```


In order for eleventy and sass to both ```watch``` and ```build``` we need to add these scripts to ```package.json```

```json
"scripts": {
    "watch:sass": "sass --no-source-map --watch src/scss:_site/css",
    "watch:eleventy": "eleventy --serve",
    "build:sass": "sass --no-source-map src/scss:_site/css",
    "build:eleventy": "eleventy",
    "start": "npm-run-all --parallel watch:*",
    "build": "npm-run-all --parallel build:*"
}
```


Create the first index.md to test the dev server, you can write anything you want to but i went with the classic:
```markdown
# Hello World!
```

Now we can start the server to see the contents of our markdown file, you can either use the built-in debug mode in VS Code or run the start script in the terminal like this:
```bash
npm run start
```

## Configuration
Create a file called ```eleventy.js``` in the project root and use this code:
```js
module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget('src/css');
    return {
        dir: {
            input: 'src'
        },
        passthroughFileCopy: true,
    };
};
```

This code tells eleventy to use the ```src``` folder for source code and other content. It also enables the sass compiler to watch the ```scss``` folder that we will soon create. The sites output gets placed in the ```_site``` folder by default. ```passthroughFileCopy: true``` makes sure that the compiled CSS also gets placed in the output folder, making it usable by the website. The next step is to move the ```index.md``` file into the ```src``` folder and check if it is still visible on the website. You might have to restart the server in order for this to work. The final step in the configuration of eleventy is to add the title of the site and also your name and email adress as metadata that can be used on the site without having to type it in every time. Create a folder called ```data``` inside the ```src``` folder. Inside that folder, create a file called ```meta.json``` and fill it with your info like in this following example:
```json
{
    "siteTitle": "cool web blog",
    "authorName": "Filip Norberg",
    "authorEmail": "filip.norberg@elev.ga.ntig.se"
}
```

## Basic layout/scss

Create a folder called ```_includes``` inside ```src``` and create a file inside that folder called ```base.njk```. This will be the base-layout for all the pages we will create. Let's add some basic html like this:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ meta.siteTitle }}</title>
    <link rel="stylesheet" href="{{ '/css/main.css' }}">
  </head>
  <body>
    {% include "components/navigation.njk"%}
    <main class="container">
      {{ content | safe }}
    </main>
    {% include "components/footer.njk" %}
  </body>
</html>
```

```meta.siteTitle``` was of course declared in the ```meta.json``` file we created. ```{{ content | safe }}``` is what you could call the customizable part of every page. It will be replaced by the contents of any created file that extends from this base layout. Of course this is only html and we will get to scss later. First we need to adress ```{% include "components/navigation.njk"%}``` and ```{% include "components/footer.njk" %}```. These are files that we have not created yet, let's change that. First we need to create a file called ```navigation.json``` inside a folder called ```_data``` which will be placed in the ```src``` folder. This file will be the start of our navbar, it will contain the links to our pages which the navbar can use:
```json
{
    "items": [
        {
            "text": "Home",
            "url": "/"
        },
        {
            "text": "Blog",
            "url": "/blog"
        }
    ]
}
```
The next step is to create the navbar itself. Create a folder called ```components``` and place it in the ```_includes``` folder. Create a file called navigation.njk in the ```components``` folder and use this code:
```html
{% if navigation.items %}
    <nav>
        <ul>
            {% for item in navigation.items %}
                <li class="navbar">
                    <a href="{{ item.url }}">{{ item.text }}</a>
                </li>
            {% endfor %}
        </ul>
    </nav>
{% endif %}
```
This for loop generates an ```li``` element for every link in ```navigation.json```. Now for the footer, create a file called ```footer.njk``` inside the ```components``` folder and use this code:
```html
 <footer class="container">
    <p>This page is created by <a href="mailto:{{meta.authorEmail}}">{{ meta.authorName }}</a></p>
    <p>All text &copy; {{ meta.authorName }}</p>
    <p>This is version {{ pkg.version }} of this site and the source is available on 
        <a href="{{ pkg.homepage }}">Github</a></p>
</footer>
```
This code gives us some text at the bottom of every page, such as your name and links to your email and github. It also shows which version of the website is running. this is accomplished by eleventy being able to read globally accesible variables, in this case it reads ```pkg``` variables in order to obtain values from ```package.json```

## Creating pages
This part of the guide is dedicated to creating the different pages on the site. We will create a blog posts, a blog page with links to those posts and a home page.'

### Home page
Open up ```index.md``` and insert our base layout:
```
---
title: Blog
layout: base.njk
---

# Welcome to my cool web blog

Very technology!
```
The text between the three dashes gives the page a title and tells it what layout to use, in this case ```base.njk```.

### Blog page
Create a new ```.md``` file called ```blog.md``` in the ```src``` folder and type the following:
```
---
title: Blog
layout: blog.njk
---

## All posts
```
Now create a file called ```blog.njk``` inside the ```components``` folder and type in the following:
```
---
layout: base.njk
title: All posts
---

{{ content | safe }}
{% include "components/postlist.njk" %}
```
In order for the blog page to display links to all of our upcoming blog posts we need to create a file called ```postlist.njk``` inside the ```components``` folder and fill it with the following code:
```
<ul>
    {% for post in collections.post %}
        <li>
            <a href="{{ post.url }}">{{ post.data.title }}</a>
            {% if post.data.excerpt %}
                <p>{{ post.data.excerpt }}</p>
            {% endif %}
        </li>
    {% endfor %}
</ul>
```
Here we are using the same kind of for loop as in ```navigation.njk```. ```collections.post``` lists all files with the tag ```post```. We will add that tag to all blog posts.

{% endraw %} 