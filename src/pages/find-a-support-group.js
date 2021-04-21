import React, { useState, useEffect } from 'react'
import qs from 'qs'
import { graphql } from 'gatsby'
import axios from 'axios'
import {
	useQueryParams,
	NumberParam,
	StringParam,
	BooleanParam,
} from 'use-query-params'

import Layout from '../components/Layout'
import HeroModelSearch from '../components/Hero/HeroModelSearch'
import SearchModelContainer from '../components/Search/SearchModelContainer'
import CTAContainer from '../components/CTAs/CTAContainer'

import { styles } from '../css/css'

const FindASupportGroup = ({ data: { search } }) => {
	let metaImage,
		metaDescription = ''
	search.seoMetaTags.tags.forEach(tag => {
		if (tag.attributes) {
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:image'
			) {
				metaImage = tag.attributes.content
			}
			if (
				tag.attributes.property &&
				tag.attributes.property === 'og:description'
			) {
				metaDescription = tag.attributes.content
			}
		}
	})
	const structuredData = {
		'@content': 'https://schema.org',
		'@type': 'SearchAction',
		about: 'find a support group',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: search.title,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${search.slug}`,
	}

	const existingSearch =
		typeof window !== `undefined`
			? qs.parse(window.location.search.slice(1))
			: {}
	const [radius, setRadius] = useState(
		existingSearch.radius ? existingSearch.radius : 15
	)
	const [zip, setZip] = useState(existingSearch.zip ? existingSearch.zip : '')
	const [nonus, setNonus] = useState(
		existingSearch.nonus === '1' ? true : false
	)
	const [virtual, setVirtual] = useState(
		existingSearch.virtual === '1' ? true : false
	)
	const [country, setCountry] = useState(
		existingSearch.country ? existingSearch.country : ''
	)
	const [supportGroups, setSupportGroups] = useState([])
	const [countryGroups, setCountryGroups] = useState([])
	const [virtualGroups, setVirtualGroups] = useState([])
	// eslint-disable-next-line no-unused-vars
	const [query, setQuery] = useQueryParams({
		zip: NumberParam,
		radius: NumberParam,
		nonus: BooleanParam,
		virtual: BooleanParam,
		country: StringParam,
	})

	const updateRadius = newRadius => setRadius(newRadius)

	const updateZip = newZip => setZip(newZip)

	const updateNonus = () => {
		setNonus(!nonus)
		setQuery({
			nonus: !nonus,
			virtual: virtual,
			zip: zip,
			radius: radius,
			country: country,
		})
	}

	const updateVirtual = () => {
		setVirtual(!virtual)
		setQuery({
			nonus: nonus,
			virtual: !virtual,
			zip: zip,
			radius: radius,
			country: country,
		})
	}

	const updateCountry = newCountry => setCountry(newCountry)

	const handleSearchClick = () => {
		setQuery({
			nonus: nonus,
			virtual: virtual,
			zip: zip,
			radius: radius,
			country: country,
		})
		axios
			.post('https://serene-dusk-44738.herokuapp.com/zip-lookup', {
				zip: zip,
				radius: radius,
				nonus: nonus,
				source: 'groupSearch',
				type: 'supportGroup',
			})
			.then(res => {
				setCountryGroups(res.data.arraysToSend.country)
				setVirtualGroups(res.data.arraysToSend.virtual)
				setSupportGroups(res.data.arraysToSend.group)
			})
	}

	useEffect(() => {
		console.log('fetch heroku')
		axios
			.post('https://serene-dusk-44738.herokuapp.com/zip-lookup', {
				zip: zip,
				radius: radius,
				nonus: nonus,
				source: 'groupSearch',
				type: 'supportGroup',
			})
			.then(res => {
				setCountryGroups(res.data.arraysToSend.country)
				setVirtualGroups(res.data.arraysToSend.virtual)
				setSupportGroups(res.data.arraysToSend.group)
			})
	}, [])

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={search.seoMetaTags}
			structuredData={structuredData}
		>
			{console.log(supportGroups)}
			<HeroModelSearch
				title={search.title}
				description={search.brief}
				searchType={'supportGroup'}
				handleSubmit={handleSearchClick}
				nonus={nonus}
				virtual={virtual}
				virtualGroups={virtualGroups}
				radius={radius}
				zip={zip}
				country={country}
				updateRadius={updateRadius}
				updateZip={updateZip}
				updateNonus={updateNonus}
				updateVirtual={updateVirtual}
				updateCountry={updateCountry}
				countryGroups={countryGroups}
			/>
			{(supportGroups.length >= 1 ||
				(virtualGroups.length >= 1 && virtual) ||
				zip.length >= 5) && (
				<SearchModelContainer
					supportGroups={supportGroups}
					virtual={virtual}
					virtualGroups={virtualGroups}
					radius={radius}
					zip={zip}
					nonus={nonus}
					country={country}
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

export default FindASupportGroup

export const query = graphql`
	query {
		search: datoCmsSearchPage(slug: { eq: "find-a-support-group" }) {
			title
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			brief
			callsToAction {
				... on DatoCmsCallToAction {
					__typename
					...CTAs
				}
			}
		}
		datoSupportGroups: allDatoCmsSupportGroup {
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
					secondContactName
					secondContactEmail
					secondContactPhone
					registrationProcess
					meetingSchedule
					meetingType
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
