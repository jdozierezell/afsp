import React from 'react'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const token = '17c3868770121b0a95844f825f90d8'

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

export const GET_QUILTS = gql`
  query($skip: IntType) {
    quilts: allQuiltSquares(skip: $skip) {
      id
      title
    }
  }
`

const QuiltSquares = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_QUILTS)

  if (loading) return 'Loading...'
  if (error) return `ERROR ${error.message}`

  return (
    <>
      {data.quilts &&
        data.quilts.map(quilt => {
          return <p key={quilt.id}>{quilt.title}</p>
        })}
      {data.quilts && (
        <button
          onClick={() =>
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
          }
        >
          Load More
        </button>
      )}
    </>
  )
}

const Quilt = () => {
  return (
    <ApolloProvider client={client}>
      <QuiltSquares />
    </ApolloProvider>
  )
}

export default Quilt
