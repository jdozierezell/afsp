import React, { useState } from 'react'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
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
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;
`

const squareCSS = css`
  margin: 0;
  padding: 0;
`

const imageCSS = css`
  display: block;
  margin: 0;
  padding: 0;
`

const selectedCSS = css`
  display: none;
`

// component that builds quilt square
const QuiltSquare = ({ quilt, selected }) => {
  const [isSelected, setSelected] = useState(selected)
  return (
    <div
      css={isSelected ? selectedCSS : imageCSS}
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
        onClick={() => setSelected(!isSelected)}
        src={`${quilt.quiltImage.url}?w=200&h=200&fit=crop&crop=faces`}
        alt=""
      />
    </div>
  )
}

// component to display quilt squares
const QuiltSquares = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const quiltParam = urlParams.has('q') ? urlParams.get('q') : null
  const [loadMore, setLoadMore] = useState(0)

  const selectedQuilt = useQuery(GET_SELECTED, {
    variables: {
      id: '1518465',
    },
  })
  const selectedData = selectedQuilt.data,
    selectedLoading = selectedQuilt.loading,
    selectedError = selectedQuilt.error,
    selectedFetchMore = selectedQuilt.fetchMore
  const quilts = useQuery(GET_QUILTS, {
    variables: {
      skip: 0,
    },
  })
  const quiltsData = quilts.data,
    quiltsLoading = quilts.loading,
    quiltsError = quilts.error,
    quiltsFetchMore = quilts.fetchMore

  if (quiltsLoading) return 'Loading...'
  if (quiltsError) return `ERROR ${quiltsError.message}`
  console.log(selectedCSS)
  return (
    <>
      <section css={sectionCSS}>
        {quiltsData.quilts &&
          quiltsData.quilts.map(quilt => {
            return (
              <QuiltSquare
                key={quilt.id}
                quilt={quilt}
                selected={quilt.id === quiltParam}
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
