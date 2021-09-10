---
title: Getting started with eleventy
---

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