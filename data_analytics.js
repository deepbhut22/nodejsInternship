const _ = require('lodash');

exports.getStat = (blogs) => {
    
    const NumberOfBlogs = blogs.length;
    const longestBlog = _.maxBy(blogs, 'title.length');
    const PrivacyRelated = _.filter(blogs, (blog) =>  {
        return _.includes(_.toLower(blog.title), 'privacy')
    });
    const UniqueTitles = _.uniqBy(blogs, 'title');

    return({
      NumberOfBlogs,
      LongestBlogTitle: longestBlog.title,
      PrivacyRelated: PrivacyRelated.length,
      UniqueTitles: _.map(UniqueTitles, 'title'),
    });
}