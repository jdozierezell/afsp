import React from 'react'
import { css } from '@emotion/react'
import algoliasearch from 'algoliasearch/lite'
import { orderBy } from 'lodash'
import { InstantSearch } from 'react-instantsearch-dom'

import SearchHits from './SearchHitsSBTC'
import SearchResearchRefinement from './SearchResearchRefinement'

import { styles } from '../../css/css'

const searchClient = algoliasearch(
	'BONWJFMMRS',
	'dc6a5a451c85739a43419955d7a505c1'
)

const searchDetailCSS = css`
	margin: ${styles.scale.px50} ${styles.scale.px24};
	position: relative;
	z-index: 101;
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const refinementCSS = css`
	margin-bottom: ${styles.scale.px36};
	border-bottom: 1px solid ${styles.colors.darkGray};
	position: relative;
	z-index: 501;
	@media (min-width: ${styles.screens.tablet}px) {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: ${styles.gridGap.desktop};
	}
`
const customHitsCSS = css`
	list-style: none;
	margin-left: 0;
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: ${styles.gridGap.desktop};
	align-items: stretch;
	@media (min-width: ${styles.screens.tablet}px) {
		grid-template-columns: repeat(3, 1fr);
	}
	li {
		width: 100%;
	}
`

const SearchGrants = ({
	searchState,
	handleSearchChange,
	indexName,
	refinements,
}) => {
	return (
		<div css={searchDetailCSS}>
			<InstantSearch
				indexName={indexName}
				searchClient={searchClient}
				searchState={searchState}
			>
				<div>
					<div css={refinementCSS}>
						{refinements.map((refinement, index) => (
							<SearchResearchRefinement
								key={index}
								attribute={refinement.attribute}
								displayAttribute={refinement.displayAttribute}
								searchState={searchState}
								handleSearchChange={handleSearchChange}
								limit={100}
								transformItems={items =>
									refinement.attribute === 'year'
										? orderBy(items, 'label', 'desc')
										: orderBy(items, 'label', 'asc')
								}
								searchable
							/>
						))}
					</div>
					<div>
						<SearchHits
							indexName={indexName}
							customHitsCSS={customHitsCSS}
						/>
					</div>
				</div>
			</InstantSearch>
		</div>
	)
}

export default SearchGrants
