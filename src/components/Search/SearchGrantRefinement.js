import React from 'react'
import { connectRefinementList } from 'react-instantsearch-dom'
import { css } from '@emotion/react'

import { styles } from '../../css/css'

const refinementListCSS = css`
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	button {
		background: none;
		border: none;
		cursor: pointer;
		border-radius: ${styles.scale.px5};
		padding: ${styles.scale.px7};
	}
	span {
		background-color: ${styles.colors.lightGray};
		padding: ${styles.scale.px5} ${styles.scale.px5} ${styles.scale.px2};
		border-radius: ${styles.scale.px5};
	}
`

const RefinementList = ({
	items,
	attribute,
	displayAttribute,
	searchState,
	handleSearchChange,
}) => (
	<div css={refinementListCSS}>
		<h3>{displayAttribute}</h3>
		<ul id={`grant-${attribute}`}>
			{items.map(item => (
				<li key={item.label}>
					<button
						style={{
							border: item.isRefined
								? `${styles.colors.blue} ${styles.scale.px2} solid`
								: '',
						}}
						onClick={() =>
							handleSearchChange({
								target: {
									value: item.value,
									attribute: attribute,
								},
							})
						}
					>
						{item.label} <span>{item.count}</span>
					</button>
				</li>
			))}
		</ul>
	</div>
)

const SearchGrantRefinement = connectRefinementList(RefinementList)

export default SearchGrantRefinement
