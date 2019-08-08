// graphql query for algolia
const articleQuery = `{
  articles: allDatoCmsArticle {
    edges {
      node {
        slug
        title
        author {
          authorName
        }
        article {
          __typename
          ...on DatoCmsBody {
          copy
          }
				}
        tags {
          tag
        }
        seo: seoMetaTags {
          tags
        }
      }
    }
  }
}`
// function to flatten data into one-dimensional arrays
const flatten = arr => {
  arr.forEach(edge => {
    let { article, author, seo, slug, tags, title } = edge.node
    // title and slug are already flat; no need to do anything there
    const copyArray = [],
      authorArray = [],
      imageArray = [],
      descriptionArray = [],
      tagsArray = []
    // article flattening and capping at 9000 characters
    article.forEach((article, index) => {
      const { __typename } = article
      if (__typename === 'DatoCmsBody') {
        // get the actual article copy
        const { copy } = article
        // limit the character count of each array
        const characters = 4500
        for (let i = 0; i < copy.length; i += characters) {
          if (i > characters) return
          copyArray.push(copy.slice(i, i + characters))
        }
      }
    })
    // author flattening
    author.forEach(author => authorArray.push(author.authorName))
    // seo flattening to break out image and description
    seo.tags.forEach(tag => {
      if (tag.hasOwnProperty('attributes')) {
        const attrs = tag.attributes
        // if the property property exists and contains an image, add to imageArray
        if (attrs.hasOwnProperty('property')) {
          if (attrs.property === 'og:image')
            imageArray.push(tag.attributes.content)
        }
        // if the name property exists and contains a description, add to descriptionArray
        if (attrs.hasOwnProperty('name')) {
          if (attrs.name === 'description')
            descriptionArray.push(tag.attributes.content)
        }
      }
    })
    // tags flattening
    tags.forEach(tag => tagsArray.push(tag.tag))
    // return edge.node
    return (edge.node = {
      authorArray,
      copyArray,
      descriptionArray,
      imageArray,
      slug,
      tagsArray,
      title,
    })
  })
  return arr
}
const settings = { attributesToSnippet: [`article:20`] }
const queries = [
  {
    query: articleQuery,
    transformer: ({ data }) => flatten(data.articles.edges),
    indexName: `Articles`,
    settings,
  },
]
module.exports = queries
