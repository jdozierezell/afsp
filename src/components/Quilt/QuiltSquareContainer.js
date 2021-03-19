import React, { useState } from 'react'
import { css } from '@emotion/react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import QuiltSquare from './QuiltSquare'

import { styles } from '../../css/css'

const sectionCSS = css`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (min-width: ${styles.screens.navigation}px) {
		grid-template-columns: repeat(6, 1fr);
	}
	/* below classes based on index of quilt square determine grid column location */
	.quilt-col-0 {
		grid-column: 1 / 2;
	}
	.quilt-col-1 {
		grid-column: 2 / 3;
	}
	.quilt-col-2 {
		grid-column: 1 / 2;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 3 / 4;
		}
	}
	.quilt-col-3 {
		grid-column: 2 / 3;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 1 / 2;
		}
		@media (min-width: ${styles.screens.navigation}px) {
			grid-column: 4 / 5;
		}
	}
	.quilt-col-4 {
		grid-column: 1 / 2;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 2 / 3;
		}
		@media (min-width: ${styles.screens.navigation}px) {
			grid-column: 5 / 6;
		}
	}
	.quilt-col-5 {
		grid-column: 2 / 3;
		@media (min-width: ${styles.screens.tablet}px) {
			grid-column: 3 / 4;
		}
		@media (min-width: ${styles.screens.navigation}px) {
			grid-column: 6 / 7;
		}
	}
`

const buttonCSS = css`
	display: block;
	margin: ${styles.scale.px24} auto;
`

export const GET_QUILTS = gql`
	query($skip: IntType) {
		quilts: allQuiltSquares(skip: $skip, first: 24) {
			id
			title
			quiltImage {
				url
			}
			quiltDescription
		}
	}
`

export const GET_SELECTED = gql`
	query($id: ItemId) {
		selected: quiltSquare(filter: { id: { eq: $id } }) {
			id
			title
			quiltImage {
				url
			}
			quiltDescription
		}
	}
`

const QuiltSquareContainer = () => {
	let quiltParam = null
	if (typeof window !== `undefined`) {
		const urlParams = new URLSearchParams(window.location.search)
		quiltParam = urlParams.has('q') ? urlParams.get('q') : null
	}
	const [loadMore, setLoadMore] = useState(0)
	const [selected, setSelected] = useState(quiltParam)
	const [clean, setClean] = useState(true)
	const selectedQuilt = useQuery(GET_SELECTED, {
		variables: {
			id: selected,
		},
	})
	const selectedData = selectedQuilt.data

	const quilts = useQuery(GET_QUILTS, {
		variables: {
			skip: 0,
		},
	})
	const quiltsData = quilts.data,
		quiltsLoading = quilts.loading,
		quiltsError = quilts.error,
		quiltsFetchMore = quilts.fetchMore

	let renderQuilts = []

	const handleClick = id => {
		// sets selected element for each click
		setSelected(id)
		setClean(false)
	}

	if (quiltsLoading) return 'Loading...'
	if (quiltsError) return `ERROR ${quiltsError.message}`

	if (clean && selectedData) {
		if (selectedData.selected) {
			if (
				quiltsData.quilts.some(
					quilt => quilt.id === selectedData.selected.id
				)
			) {
				renderQuilts = quiltsData.quilts
			} else {
				renderQuilts.push(selectedData.selected)
				quiltsData.quilts.forEach(quilt => renderQuilts.push(quilt))
			}
		} else {
			renderQuilts = quiltsData.quilts
		}
	} else {
		renderQuilts = quiltsData.quilts
	}
	return (
		<>
			<section css={sectionCSS}>
				{renderQuilts &&
					renderQuilts.map((quilt, index) => {
						return (
							<QuiltSquare
								key={index}
								quilt={quilt}
								selected={selected}
								handleClick={handleClick}
								index={index}
							/>
						) // displays quilt squares
					})}
			</section>
			{quiltsData.quilts && (
				<button
					className="secondary-button"
					css={buttonCSS}
					onClick={() => {
						setLoadMore(loadMore + 1)
						// adds quilt squares to query on click
						quiltsFetchMore({
							variables: {
								skip: quiltsData.quilts.length,
							},
							updateQuery: (
								prev,
								{ fetchMoreResult, ...rest }
							) => {
								if (!fetchMoreResult) return prev
								const returnQuilts = {
									...prev,
									quilts: [
										...prev.quilts,
										...fetchMoreResult.quilts,
									],
								}
								return returnQuilts
							},
						})
					}}
				>
					Load More
				</button>
			)}
		</>
	)
}

export default QuiltSquareContainer
