import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import axios from 'axios'

import { SEO } from '../components/SEO/SEO'
import Layout from '../components/Layout'
import HeroModelSearch from '../components/Hero/HeroModelSearch'
import SearchModelContainer from '../components/Search/SearchModelContainer'
import CTAContainer from '../components/CTAs/CTAContainer'

import { styles } from '../css/css'

const FindASupportGroup = ({
	data: { search, datoSupportGroups },
	location,
}) => {
	const queryString = location.search
	const query = new URLSearchParams(queryString)

	const [radius, setRadius] = useState(
		query.get('radius') ? query.get('radius') : 15
	)
	const [zip, setZip] = useState(query.get('zip') ? query.get('zip') : '')
	const [nonus, setNonus] = useState(
		query.get('nonus') === '1' ? true : false
	)
	const [virtual, setVirtual] = useState(
		query.get('virtual') === '1' ? true : false
	)
	const [country, setCountry] = useState(
		query.get('country') ? query.get('country') : ''
	)
	const [supportGroups, setSupportGroups] = useState([])
	const [countryGroups, setCountryGroups] = useState([])
	const [virtualGroups, setVirtualGroups] = useState([])
	const [firstRun, setFirstRun] = useState(true)

	const countryList = []
	datoSupportGroups.edges.forEach(group => {
		if (
			group.node.meetingCountry !== 'United States of America' &&
			group.node.meetingCountry !== 'Not Applicable'
		) {
			countryList.push(group.node.meetingCountry)
		}
	})

	const updateRadius = newRadius => setRadius(newRadius)

	const updateZip = newZip => setZip(newZip)

	const updateNonus = e => {
		setNonus(e.target.checked)
		setCountryGroups([])
		setSupportGroups([])
	}

	const updateVirtual = e => {
		setVirtual(e.target.checked)
		setCountryGroups([])
		setSupportGroups([])
	}

	const updateCountry = e => {
		setCountry(e.target.value)
	}

	const handleUSSearchClick = () => {
		if (/^[0-9]{5}-?([0-9]{4})?$/g.test(zip)) {
			// a U.S. site
			axios
				.post('https://serene-dusk-44738.herokuapp.com/zip-lookup', {
					zip: zip,
					radius: radius,
					type: 'supportGroup',
				})
				.then(res => {
					setCountryGroups(res.data.arraysToSend.country)
					setVirtualGroups(res.data.arraysToSend.virtual)
					setSupportGroups(res.data.arraysToSend.group)
				})
			window.history.replaceState(
				{ radius: radius, zip: zip },
				`Find a support group near ${zip} | AFSP`,
				`${
					location.origin + location.pathname
				}?radius=${radius}&zip=${zip}`
			)
		}
	}

	const handleNonUSSearchClick = () => {
		axios
			.post('https://serene-dusk-44738.herokuapp.com/zip-lookup', {
				country: country,
				type: 'supportGroup',
			})
			.then(res => {
				setCountryGroups(res.data.arraysToSend.country)
				setVirtualGroups(res.data.arraysToSend.virtual)
				setSupportGroups(res.data.arraysToSend.group)
			})
	}

	useEffect(() => {
		if (firstRun) {
			if (/^[0-9]{5}-?([0-9]{4})?$/g.test(zip)) {
				axios
					.post(
						'https://serene-dusk-44738.herokuapp.com/zip-lookup',
						{
							zip: zip,
							radius: radius,
							nonus: nonus,
							source: 'groupSearch',
							type: 'supportGroup',
						}
					)
					.then(res => {
						setCountryGroups(res.data.arraysToSend.country)
						setVirtualGroups(res.data.arraysToSend.virtual)
						setSupportGroups(res.data.arraysToSend.group)
					})
			} else if (country.length > 0) {
				axios
					.post(
						'https://serene-dusk-44738.herokuapp.com/zip-lookup',
						{
							country: country,
							type: 'supportGroup',
						}
					)
					.then(res => {
						setCountryGroups(res.data.arraysToSend.country)
						setVirtualGroups(res.data.arraysToSend.virtual)
						setSupportGroups(res.data.arraysToSend.group)
					})
			} else {
				const virtualGroupArray = []
				datoSupportGroups.edges.forEach(group => {
					if (group.node.meetingType === 'Nationwide Online Group') {
						virtualGroupArray.push(group.node)
					}
					setVirtualGroups(virtualGroupArray)
				})
			}
			// if (typeof window !== `undefined`) {
			// 	window.scroll(0, existingSearch.yPos)
			// }
			setFirstRun(false)
		}
	}, [firstRun, nonus, radius, zip, datoSupportGroups])

	return (
		<Layout theme={styles.logo.mobileLightDesktopLight}>
			<HeroModelSearch
				title={search.title}
				description={search.brief}
				searchType={'supportGroup'}
				handleUSSearchClick={handleUSSearchClick}
				handleNonUSSearchClick={handleNonUSSearchClick}
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
				countryList={countryList}
			/>
			{(supportGroups.length >= 1 ||
				countryGroups.length >= 1 ||
				(virtualGroups.length >= 1 && virtual)) && (
				<SearchModelContainer
					supportGroups={supportGroups}
					virtual={virtual}
					virtualGroups={virtualGroups}
					countryGroups={countryGroups}
					radius={radius}
					zip={zip}
					nonus={nonus}
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

export const Head = ({ data: { search } }) => {
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
		about: 'find a local chapter of AFSP',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: search.title,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/${search.slug}`,
	}

	return <SEO structuredData={structuredData} meta={search.seoMetaTags} />
}

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
