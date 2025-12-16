module.exports = function(eleventyConfig) {
  // Add passthrough copy for static assets
  eleventyConfig.addPassthroughCopy("src/assets");

  // Collections
  eleventyConfig.addCollection("projects", function(collection) {
    const fs = require('fs');
    const path = require('path');
    const projectsDir = path.join(__dirname, 'data/projects');
    
    const projects = [];
    
    if (fs.existsSync(projectsDir)) {
      const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));
      files.forEach(file => {
        const content = fs.readFileSync(path.join(projectsDir, file), 'utf8');
        projects.push(JSON.parse(content));
      });
    }
    
    // Sort by year in descending order (newest/current first)
    // Extract numeric year from format like "2024-25"
    return projects.sort((a, b) => {
      const yearA = parseInt(a.year.split('-')[0]);
      const yearB = parseInt(b.year.split('-')[0]);
      return yearB - yearA;
    });
  });

  // People collection
  eleventyConfig.addCollection("people", function(collection) {
    const fs = require('fs');
    const path = require('path');
    const peopleFile = path.join(__dirname, 'data/people.json');
    
    if (fs.existsSync(peopleFile)) {
      const content = fs.readFileSync(peopleFile, 'utf8');
      return JSON.parse(content);
    }
    return [];
  });

  // Configuration
  return {
    pathPrefix: "/programming-party-website/",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
