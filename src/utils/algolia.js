// graphql query for algolia

const storyQuery = `{
  stories: allDatoCmsStory {
    edges {
      node {
		objectID: id
        slug
        title
        author {
          authorName
        }
        article {
          __typename
          ... on DatoCmsBody {
			__typename
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

const landingQuery = `{
  landings: allDatoCmsLanding {
    edges {
      node {
		objectID: id
		slug
        title
        seo {
          description
		  image {
			url
		  }
        }
        channelList {
          heading
        }
        ctaChapterResourceDetailList {
          ... on DatoCmsResourceList {
			  __typename
            resource {
              ... on DatoCmsDetail {
				  __typename
                title
                seo {
                  description
                }
              }
              ... on DatoCmsLanding {
				  __typename
                title
                seo {
				  description
                }
              }
            }
          }
          ... on DatoCmsCallToAction {
			__typename
            cta {
              callToAction {
                ... on DatoCmsCtaVideo {
				  __typename
                  heading
                  brief
                }
                ... on DatoCmsCtaWithDescription {
				  __typename
				  heading
                  brief
                }
                ... on DatoCmsCtaNoDescription {
				  __typename
				  heading
                }
              }
            }
          }
          ... on DatoCmsDetailSquare {
			__typename
            detail {
              details {
                ... on DatoCmsContent {
				  __typename
                  id
                  contentHeading
                }
              }
              title
            }
          }
        }
      }
    }
  }
}`

// function to flatten data into one-dimensional arrays
const flatten = (type, arr) => {
	if (type === 'stories') {
		arr.forEach(edge => {
			let { slug, title, author, article, tags, seo } = edge.node
			// title and slug are already flat; no need to do anything there
			const copyArray = [],
				authorArray = [],
				imageArray = [],
				descriptionArray = [],
				tagsArray = []
			// article flattening and capping at 9000 characters
			article.forEach((article, index) => {
				if (article.__typename === 'DatoCmsBody') {
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
	} else if (type === 'landings') {
		arr.forEach(edge => {
			let {
				slug,
				title,
				channelList,
				seo,
				ctaChapterResourceDetailList,
			} = edge.node
			let { image, description } = seo
			const ctaArray = []
			const imageArray = [image.url]
			ctaChapterResourceDetailList.forEach(listItem => {
				let title, description
				if (listItem.__typename === 'DatoCmsResourceList') {
					const resource = listItem.resource
					title = resource.title
					if (resource.seo) {
						description = resource.seo.description
					} else {
						description = ''
					}
				} else if (listItem.__typename === 'DatoCmsCallToAction') {
					const cta = listItem.cta.callToAction
					title = cta.heading
					if (
						cta.__typename === 'DatoCmsCtaVideo' ||
						cta.__typename === 'DatoCmsCtaWithDescription'
					) {
						description = cta.brief
					} else {
						description = ''
					}
				} else if (listItem.__typename === 'DatoCmsDetailSquare') {
					const detail = listItem.detail
					title = detail.title
					description = detail.details.contentHeading
				}
				ctaArray.push([title, description])
			})
			// title and slug are already flat; no need to do anything there
			return (edge.node = {
				channelList,
				ctaArray,
				description,
				slug,
				title,
				imageArray,
			})
		})
	}
	return arr
}
const settings = { attributesToSnippet: [`article:20`] }
const queries = [
	{
		query: storyQuery,
		transformer: ({ data }) => flatten('stories', data.stories.edges),
		indexName: `DatoCMS`,
		settings,
	},
	{
		query: landingQuery,
		transformer: ({ data }) => flatten('landings', data.landings.edges),
		indexName: `DatoCMS`,
		settings,
	},
]
module.exports = queries
