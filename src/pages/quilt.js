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
// create query
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
// style quilt squares
const sectionCSS = css`
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
`
// component to display quilt squares
const QuiltSquares = () => {
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
              updateQuery: (prev, { fetchMoreResult, ...rest }) => {
                console.log(prev.quilts)
                console.log(fetchMoreResult.quilts)
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
