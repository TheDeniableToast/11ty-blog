const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [400, 600],
      formats: ["webp", "jpeg"],
      outputDir: './_site/img/'
    });
  
    let imageAttributes = {
      alt,
      sizes: sizes || '100%',
      loading: "lazy",
      decoding: "async",
    };
  
    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes, {
        whitespaceMode: "inline"
    });
  }

module.exports = function (eleventyConfig) {
    // eleventyConfig.addPassthroughCopy("src/css");
    // eleventyConfig.addWatchTarget("src/css");

    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(pluginRss);

    eleventyConfig.addWatchTarget("src/scss");

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addLiquidShortcode("image", imageShortcode);
    eleventyConfig.addJavaScriptFunction("image", imageShortcode);

    return {
        dir: {
            input: 'src'
        },
        passthroughFileCopy: true
    };
const Image = require("@11ty/eleventy-img");};
