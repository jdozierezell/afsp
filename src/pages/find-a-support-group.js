import React, { useState } from 'react'
import { graphql } from 'gatsby'
import zipcodes from 'zipcodes'
import { useQueryParams, NumberParam } from 'use-query-params'

import Layout from '../components/Layout'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import HeroModelSearch from '../components/Hero/HeroModelSearch'
import CTAContainer from '../components/CTAs/CTAContainer'
import SearchModelContainer from '../components/Search/SearchModelContainer'

import { styles } from '../css/css'

const FindALocalChapter = ({ data: { search, supportGroups } }) => {
	const [radius, setRadius] = useState(15)
	const [zip, setZip] = useState()
	const [searchResults, setSearchResults] = useState([])
	const [query, setQuery] = useQueryParams({
		zip: NumberParam,
		radius: NumberParam,
	})

	const supportGroupSearchResults = (supportGroups, response) => {
		const supportGroupArray = []
		supportGroups.edges.forEach(supportGroup => {
			console.log(response.otherZips)
			if (supportGroup.node.meetingZipPostalCode) {
				if (
					supportGroup.node.meetingZipPostalCode ===
					response.primaryZip
				) {
					supportGroupArray.unshift([
						supportGroup.node,
						response.primaryZip,
					])
				} else if (
					response.otherZips.includes(
						supportGroup.node.meetingZipPostalCode
					)
				) {
					supportGroup.node['location'] = response.primaryZip
					supportGroupArray.push([
						supportGroup.node,
						response.primaryZip,
					])
				}
			}
		})
		return supportGroupArray
	}

	const handleSearchClick = () => {
		setQuery({
			zip: zip,
			radius: radius,
		})
		setSearchResults(
			supportGroupSearchResults(supportGroups, {
				primaryZip: zip,
				otherZips: zipcodes.radius(zip, radius),
			})
		)
	}
	const updateRadius = newRadius => setRadius(newRadius)
	const updateZip = newZip => setZip(newZip)

	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HelmetDatoCms seo={search.seoMetaTags} />
			<HeroModelSearch
				title={search.title}
				description={search.brief}
				handleClick={handleSearchClick}
				handleSubmit={handleSearchClick}
				radius={query.radius}
				updateRadius={updateRadius}
				zip={query.zip}
				updateZip={updateZip}
			/>
			{searchResults.length >= 1 && (
				<SearchModelContainer
					supportGroups={searchResults}
					radius={query.radius}
					zip={query.zip}
				/>
			)}
			{search.callsToAction.map((item, index) => (
				<CTAContainer
					key={index}
					number={index}
					cta={item.cta.callToAction[0]}
				/>
			))}
		</Layout>
	)
}

export default FindALocalChapter

export const query = graphql`
	query {
		search: datoCmsSearchPage(slug: { eq: "find-a-support-group" }) {
			title
			slug
			brief
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			callsToAction {
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
			}
		}
		supportGroups: allDatoCmsSupportGroup {
			edges {
				node {
					supportGroupName
					slug
					supportGroupWebsite
					hostingSponsoringOrganization
					hostingSponsoringOrganizationWebsite
					groupDemographic
					newMembers
					contactName
					contactEmail
					contactPhone
					registrationProcess
					meetingSchedule
					nameOfMeetingSite
					meetingCountry
					meetingAddress
					meetingCity
					meetingState
					meetingZipPostalCode
					facilitator
					attendedTraining
					costToAttend
					additionalInformation
				}
			}
		}
	}
`
