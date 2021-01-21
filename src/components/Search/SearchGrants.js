import React from 'react'
import { css } from '@emotion/core'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox } from 'react-instantsearch-dom'

import SearchHits from '../../components/Search/SearchHits'
import SearchResearchRefinement from './SearchResearchRefinement'

import { styles } from '../../css/css'

const searchClient = algoliasearch(
	'BONWJFMMRS',
	'dc6a5a451c85739a43419955d7a505c1'
)

const searchDetailCSS = css`
	/* max-width: 623px; */
	margin: ${styles.scale.px50} ${styles.scale.px24};
	@media (min-width: ${styles.screens.mobile}px) {
		margin: ${styles.scale.px80} ${styles.scale.px50};
	}
`

const searchBoxCSS = css`
	position: relative;
	input {
		width: 100%;
		padding-top: 4px;
	}
	button {
		position: absolute;
		right: ${styles.scale.px24};
		top: ${styles.scale.px16};
		background-color: transparent;
		border: none;
		padding: 0;
		width: ${styles.scale.px24};
		height: ${styles.scale.px36};
		cursor: pointer;
	}
	svg {
		width: 20px;
		height: 20px;
	}
	.ais-SearchBox-reset {
		display: none;
	}
`

const indexWrapperCSS = css`
	width: 100%;
	@media (min-width: ${styles.screens.navigation}px) {
		display: grid;
		grid-template-columns: 400px 1fr;
	}
	h2 {
		margin: ${styles.scale.px36} 0 ${styles.scale.px24};
	}
`

const refinementCSS = css`
	margin-bottom: ${styles.scale.px36};
	border-bottom: 1px solid ${styles.colors.darkGray};
	@media (min-width: ${styles.screens.tablet}px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
	@media (min-width: ${styles.screens.navigation}px) {
		display: block;
		border-bottom: none;
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
		grid-template-columns: repeat(2, 1fr);
	}
	li {
		width: 100%;
	}
`

const SearchGrants = ({
	searchState,
	handleSearchChange,
	indexName,
	placeholder,
	refinements,
}) => {
	return (
		<div css={searchDetailCSS}>
			<InstantSearch
				indexName={indexName}
				searchClient={searchClient}
				searchState={searchState}
			>
				<SearchBox
					css={searchBoxCSS}
					onChange={handleSearchChange}
					translations={{
						placeholder: placeholder,
					}}
				/>
				<div css={indexWrapperCSS}>
					<div css={refinementCSS}>
						{refinements.map(refinement => (
							<SearchResearchRefinement
								key={index}
								attribute={refinement.attribute}
								displayAttribute={refinement.displayAttribute}
								searchState={searchState}
								handleSearchChange={handleSearchChange}
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
