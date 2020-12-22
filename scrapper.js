const $ = require('cheerio');

/*
* Extract og:title
* fallback: extract data from <title>
*/
const getTitle = (html) => {
  let title = $('meta[property="og:title"]', html).attr('content');
  if (!title) title = $('title', html).text();
  return title;
};

/*
* Extract og:description
* fallback: extract data from <meta name="description">
* added support for title case value of attribute name.
* (Might need to provide support for uppercase values in attribute name, however haven't encountered yet so ignoring that for now)
*/
const getDescription = (html) => {
    let desc = $('meta[property="og:description"]', html).attr('content');
    if (!desc) desc = $('meta[name*="escription"]', html).attr('content');
    return desc;
};


/*
* Extract data from <meta name="keywords">
* added support for title case value of attribute name.
* (Might need to provide support for uppercase values in attribute name, however haven't encountered yet so ignoring that for now)
*/
const getKeywords = (html) => {
    let keywords = $('meta[name*="eywords"]', html).attr('content');
    if (keywords) {
        keywords = keywords.split(',')
            .map((word) => {
                return word.trim();
            });
        return keywords;
    }
};

/*
* Extract og:image
* multiple og:image support added
*/
const getImages = (html) => {
    const metaImages = $('meta[property="og:image"]', html);
    if (metaImages) {
        let images = [];
        Object.entries(metaImages)
            .forEach(([key, value]) => {
                if (!isNaN(key)) images.push(value.attribs.content);
            });
        if(images.length) return images;
    }
};

/*
* Extract og:type
*/
const getType = (html) => {
    return $('meta[property="og:type"]', html).attr('content')
};

/*
* Extract og:site_name
*/
const getSiteName = (html) => {
    return $('meta[property="og:site_name"]', html).attr('content');
};

module.exports = {
    getTitle,
    getDescription,
    getKeywords,
    getImages,
    getType,
    getSiteName
};
