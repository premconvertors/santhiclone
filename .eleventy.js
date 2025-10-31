// const { DateTime } = require('luxon')

// module.exports = function(eleventyConfig) {

//     // tell to get it css . if eleventy doesnt pass thruough something from src to public. you gotta tell it explicitly to do so.
//     // eleventyConfig.addPassthroughCopy('./src/style.css')
//     // eleventyConfig.addPassthroughCopy('./src/assets')
    
//     eleventyConfig.addPassthroughCopy('./src/images')
//     eleventyConfig.addPassthroughCopy('./src/js')
//     eleventyConfig.addPassthroughCopy('./src/css')
//     eleventyConfig.addPassthroughCopy('./src/fonts')
//     // eleventyConfig.addPassthroughCopy('./src/blog/blogs.json')
//     // eleventyConfig.addPassthroughCopy('./src/admin/config.yml')
//     eleventyConfig.addPassthroughCopy('./src/robots.txt')
//     eleventyConfig.addPassthroughCopy('./src/sitemap.xml')

//     // eleventyConfig.addPassthroughCopy('./src/admin/config.yml')
    
//     // date filter
//     eleventyConfig.addFilter("postDate", (dateObj) => {
//         return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
//     })

//     // blog collection
//     eleventyConfig.addCollection("post", function(collectionApi) {
//         return collectionApi.getFilteredByGlob("./src/blog/*.md").sort((a, b) => {
//             return b.date - a.date; // Sort by descending date
//         });
//     });

//     return {
//         dir: {
//             input: "src",
//             output: "public"
//         },
//         pathPrefix: "/",
//         htmlTemplateEngine: "njk",
//         markdownTemplateEngine: "njk",
//         dataTemplateEngine: "njk",
//         templateFormats: ["html", "njk", "md"],
//     }

// }

const { DateTime } = require('luxon')
const slugify = require('slugify') // 👈 ADD THIS LINE

module.exports = function(eleventyConfig) {

    // --- Passthrough Copy ---
    eleventyConfig.addPassthroughCopy('./src/images')
    eleventyConfig.addPassthroughCopy('./src/js')
    eleventyConfig.addPassthroughCopy('./src/css')
    eleventyConfig.addPassthroughCopy('./src/fonts')
    eleventyConfig.addPassthroughCopy('./src/robots.txt')
    eleventyConfig.addPassthroughCopy('./src/sitemap.xml')
    
    // --- Filters ---
    // Standard date filter (using your existing name)
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED)
    })

    // HTML Date filter (Needed for <time datetime="..."> in your template)
    eleventyConfig.addFilter('htmlDateString', (dateObj) => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    });


    // Add this filter to your .eleventy.js inside module.exports:

// Filter to safely get the current year using Luxon for the footer
eleventyConfig.addFilter("currentYear", () => {
    return DateTime.now().toFormat('yyyy');
});


    // --- Collections ---
    // Collection matches the 'src/blogs' folder and is named 'blogs'
    eleventyConfig.addCollection("blogs", function(collectionApi) {
        return collectionApi.getFilteredByGlob("./src/blogs/*.md").sort((a, b) => {
            return b.date - a.date; // Sort descending (newest first)
        });
    });

    eleventyConfig.addFilter("slug", (input) => {
        return slugify(input, {
            lower: true,
            strict: true, // This option removes characters that are unsafe for URLs/filesystems
            remove: /[*+~.()'"!:@]/g // Explicitly remove specific characters if 'strict' isn't enough
        });
    });

    // --- Config Return ---
    return {
        dir: {
            input: "src",
            output: "public"
        },
        pathPrefix: "/",
        htmlTemplateEngine: "njk",
        markdownTemplateEngine: "njk",
        dataTemplateEngine: "njk",
        templateFormats: ["html", "njk", "md"],
    }

}