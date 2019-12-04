import React, { useState } from 'react'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import fetch from 'isomorphic-fetch'
import gql from 'graphql-tag'

import { css } from '@emotion/core'
import styled from '@emotion/styled'

// token for accessing afsp-quilt
const token = '17c3868770121b0a95844f825f90d8'
// create apollo client
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'https://graphql.datocms.com/',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			Accept: 'application/json',
		},
		fetch,
	}),
})

// create query for squares
export const GET_QUILTS = gql`
	query($skip: IntType) {
		quilts: allQuiltSquares(skip: $skip) {
			id
			title
			quiltImage {
				url
			}
		}
	}
`

// create query for selected square
export const GET_SELECTED = gql`
  query($id: ItemId) {
    selected: quiltSquare(filter: { id: { eq: $id } }) {
      id
      title
      quiltImage {
        url
      }
    }
  }
`
// style quilt squares
const sectionCSS = css`
<<<<<<< HEAD
	display: flex;
	flex-flow: row wrap;
	justify-content: flex-start;
	align-items: stretch;
	align-content: flex-start;
	div {
		margin: 0;
		padding: 0;
	}
	img {
		display: block;
		margin: 0;
		padding: 0;
	}
=======
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;
>>>>>>> quilt
`

const squareCSS = css`
  margin: 0;
  padding: 0;
  width: 10%;
`

const imageCSS = css`
  display: block;
  margin: 0;
  padding: 0;
`

const selectedCSS = css`
  width: 100%;
`

// component that builds quilt square
const QuiltSquare = ({ quilt, selected, handleClick }) => {
  const isSelected = quilt.id === selected
  return (
    <div
      css={isSelected ? [squareCSS, selectedCSS] : squareCSS}
      key={quilt.id}
      id={quilt.id}
      onClick={() => {
        // update the window history to provide a deep link to quilt square
        window.history.pushState(
          { id: quilt.id }, // give history state an id
          `Memory Quilt | ${quilt.title}`, // give page a title
          `?q=${quilt.id}` // create the new url with variables to base on render
        )
      }}
    >
      <img
        css={imageCSS}
        onClick={() => {
          // handleClick lets parent know which element was clicked on
          handleClick(quilt.id)
        }}
        src={`${quilt.quiltImage.url}?w=200&h=200&fit=crop&crop=faces`}
        alt=""
      />
    </div>
  )
}

// component to display quilt squares
const QuiltSquares = () => {
<<<<<<< HEAD
	const [loadMore, setLoadMore] = useState(0)
	const { data, loading, error, fetchMore } = useQuery(GET_QUILTS, {
		variables: {
			skip: 0,
		},
	})

	if (loading) return 'Loading...'
	if (error) return `ERROR ${error.message}`

	return (
		<>
			<section css={sectionCSS}>
				{data.quilts &&
					data.quilts.map(quilt => {
						return (
							<div
								key={quilt.id}
								onClick={() => {
									// update the window history to provide a deep link to quilt square
									window.history.pushState(
										{ id: quilt.id }, // give history state an id
										`Memory Quilt | ${quilt.title}`, // give page a title
										`?q=${quilt.id}` // create the new url with variables to base on render
									)
								}}
							>
								<img
									src={`${quilt.quiltImage.url}?w=200&h=200&fit=crop&crop=faces`}
									alt=""
								/>
							</div>
						) // displays quilt squares
					})}
			</section>
			{data.quilts && (
				<button
					onClick={() => {
						setLoadMore(loadMore + 1)
						// adds quilt squares to query on click
						fetchMore({
							variables: {
								skip: data.quilts.length,
							},
							updateQuery: (
								prev,
								{ fetchMoreResult, ...rest }
							) => {
								console.log(prev.quilts)
								console.log(fetchMoreResult.quilts)
								if (!fetchMoreResult) return prev
								const returnQuilts = {
									...prev,
									quilts: [
										...prev.quilts,
										...fetchMoreResult.quilts,
									],
								}
								console.log(returnQuilts)
								return returnQuilts
							},
						})
					}}
				>
					{`Load More - ${loadMore}`}
				</button>
			)}
		</>
	)
=======
  const urlParams = new URLSearchParams(window.location.search)
  const quiltParam = urlParams.has('q') ? urlParams.get('q') : null
  const [loadMore, setLoadMore] = useState(0)
  const [selected, setSelected] = useState(quiltParam)

  const selectedQuiltQuery = useQuery(GET_SELECTED, {
    variables: {
      id: selected,
    },
  })
  const selectedData = selectedQuiltQuery.data,
    selectedLoading = selectedQuiltQuery.loading,
    selectedError = selectedQuiltQuery.error,
    selectedFetchMore = selectedQuiltQuery.fetchMore
  const quilts = useQuery(GET_QUILTS, {
    variables: {
      skip: 0,
    },
  })
  const quiltsData = quilts.data,
    quiltsLoading = quilts.loading,
    quiltsError = quilts.error,
    quiltsFetchMore = quilts.fetchMore

  const handleClick = id => {
    // sets selected element for each click
    setSelected(id)
  }
  if (quiltsLoading) return 'Loading...'
  if (quiltsError) return `ERROR ${quiltsError.message}`
  return (
    <>
      <section css={sectionCSS}>
        {quiltsData.quilts &&
          quiltsData.quilts.map(quilt => {
            return (
              <QuiltSquare
                // css={}
                key={quilt.id}
                quilt={quilt}
                selected={selected}
                handleClick={handleClick}
              />
            ) // displays quilt squares
          })}
      </section>
      {quiltsData.quilts && (
        <button
          onClick={() => {
            setLoadMore(loadMore + 1)
            // adds quilt squares to query on click
            quiltsFetchMore({
              variables: {
                skip: quiltsData.quilts.length,
              },
              updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                if (!fetchMoreResult) return prev
                const returnQuilts = {
                  ...prev,
                  quilts: [...prev.quilts, ...fetchMoreResult.quilts],
                }
                return returnQuilts
              },
            })
          }}
        >
          {`Load More - ${loadMore}`}
        </button>
      )}
    </>
  )
>>>>>>> quilt
}
// main component that displays QuiltSquares
const Quilt = () => {
	return (
		<ApolloProvider client={client}>
			<QuiltSquares />
		</ApolloProvider>
	)
}

export default Quilt
