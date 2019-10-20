// graphql query for algolia

const storyQuery = `{
  stories: allDatoCmsStory {
    edges {
      node {
        slug
        title
        author {
          authorName
        }
        story {
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
		let { story, author, seo, slug, tags, title } = edge.node
		// title and slug are already flat; no need to do anything there
		const copyArray = [],
			authorArray = [],
			imageArray = [],
			descriptionArray = [],
			tagsArray = []
		// story flattening and capping at 9000 characters
		story.forEach((story, index) => {
			const { __typename } = story
			if (__typename === 'DatoCmsBody') {
				// get the actual story copy
				const { copy } = story
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
		query: storyQuery,
		transformer: ({ data }) => flatten(data.stories.edges),
		indexName: `Stories`,
		settings,
	},
]
module.exports = queries
