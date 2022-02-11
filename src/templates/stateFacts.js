import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import HeroFacts from '../components/Hero/HeroFacts'
import NavigationSideStateFacts from '../components/Navigation/NavigationSideStateFacts'
import FactsWrapper from '../components/StateFacts/FactsWrapper'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

import { styles } from '../css/css'

const carouselCSS = css`
	z-index: 2;
`

const StateFacts = ({ data: { stateFacts } }) => {
	const [factsTop, setFactsTop] = useState(null)
	let metaImage,
		metaDescription = ''
	stateFacts.seoMetaTags.tags.forEach(tag => {
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
		'@type': 'WebPage',
		about: 'suicide public policy',
		description: metaDescription,
		image: metaImage,
		accessibilityAPI: 'ARIA',
		accessibilityControl: ['fullKeyboardControl', 'fullMouseControl'],
		name: stateFacts.state,
		lastReviewed: stateFacts.meta.publishedAt,
		publisher: 'American Foundation for Suicide Prevention',
		url: `https://afsp.org/facts/${stateFacts.slug}`,
	}
	stateFacts.facts = [
		{
			display: 'Crisis lines and 988 implementation',
			anchor: 'crisis-lines-and-988-implementation',
			facts: [
				{
					display:
						'Addresses 988 infrastructure and provides for telecom user fee',
					value: stateFacts.addresses988InfrastructureAndProvidesForTelecom,
				},
				{
					display:
						'Addresses 988 infrastructure but does not include telecom user fee',
					value: stateFacts.addresses988InfrastructureButNotProvideForTelecom,
				},
				{
					display:
						'988 law limited to creating an exploratory commission, advisory committee, or task force',
					value: stateFacts.lawLimitedToCreatingCommissionCommitteeTaskForce,
				},
			],
		},
		{
			display: 'Mental health parity',
			anchor: 'mental-health-parity',
			facts: [
				// {
				// 	display: 'Federal parity law codified in state statute',
				// 	value: stateFacts.parityLawCodified,
				// },
				// {
				// 	display: 'State regulators must enforce parity law(s)',
				// 	value: stateFacts.enforceParityLaws,
				// },
				{
					display:
						'Public health plans (e.g., Medicaid) regularly submit parity compliance analyses to state regulators',
					value: stateFacts.privateHealthPlans,
				},
				{
					display:
						'Private health plans (individual and group) regularly submit parity compliance analyses to state regulators',
					value: stateFacts.publicHealthPlans,
				},
			],
		},
		{
			display: 'K – 12 school suicide prevention',
			anchor: 'k-12-school-suicide-prevention',
			facts: [
				{
					display:
						'Inclusion of the National Suicide Prevention Lifeline and/or other crisis line(s) on student ID cards',
					value: stateFacts.nationalSuicidePreventionLifeline,
				},
				{
					display:
						'Student allowances for excused mental health absences',
					value: stateFacts.excusedMentalHealthAbsences,
				},
				{
					display:
						'School personnel must report student suicide risk to a parent and/or guardian',
					value: stateFacts.mustReportStudentSuicideRisk,
				},
				{
					display:
						'Suicide prevention and/or mental health training for certain school personnel, annual',
					value: stateFacts.trainingForPersonnelAnnual,
				},
				{
					display:
						'Suicide prevention and/or mental health training for certain school personnel, not annual',
					value: stateFacts.trainingForPersonnelNotAnnual,
				},
				{
					display:
						'Suicide prevention, intervention, and postvention policies/programming',
					value: stateFacts.preventionInterventionPostvention,
				},
				{
					display: 'Student education on suicide prevention',
					value: stateFacts.studentEducationSuicidePrevention,
				},
				{
					display: 'Student education on mental health',
					value: stateFacts.studentEducationMentalHealth,
				},
			],
		},
		{
			display:
				'Health professional training in suicide assessment, treatment and management',
			anchor: 'health-professional-training',
			facts: [
				{
					display:
						'Mental health professionals receive regular training',
					value: stateFacts.mentalHealthProfessionalsRegular,
				},
				{
					display:
						'Mental health professionals receive one time training',
					value: stateFacts.mentalHealthProfessionalsOneTime,
				},
				{
					display:
						'Medical/surgical professionals receive regular training',
					value: stateFacts.medicalSurgicalProfessionalsRegular,
				},
				{
					display:
						'Medical/surgical professionals receive one time training',
					value: stateFacts.medicalSurgicalProfessionalsOneTime,
				},
			],
		},
		{
			display: 'Conversion therapy bans',
			anchor: 'conversion-therapy-bans',
			facts: [
				// {
				// 	display:
				// 		'Prohibits licensed/board certified mental health providers from engaging in conversion therapy with all patients',
				// 	value: stateFacts.prohibitsProvidersConversionTherapyWithAllPatients,
				// },
				{
					display:
						'Prohibits licensed/board certified mental health providers from engaging in conversion therapy with minors under 18 years of age',
					value: stateFacts.prohibitsProvidersConversionTherapyWithMinors,
				},
				{
					display:
						'Prohibits licensed/board certified mental health providers from engaging in conversion therapy with vulnerable adults',
					value: stateFacts.prohibitsProvidersConversionTherapyWithVulnerableAdults,
				},
				{
					display:
						'Prohibits use of state funds for any purpose related to conversion therapy (e.g., conducting, making a referral for, or extending health benefits coverage for)',
					value: stateFacts.prohibitsStateFundsConversionTherapy,
				},
			],
		},

		{
			display: 'University and college campus suicide prevention',
			anchor: 'university-and-college',
			facts: [
				{
					display:
						'Inclusion of the National Suicide Prevention Lifeline and/or other crisis line(s) on student ID cards',
					value: stateFacts.unicolNationalSuicidePreventionLifeline,
				},
				{
					display:
						'Students receive information on available mental health and/or suicide prevention services and/or resources',
					value: stateFacts.unicolStudentsReceiveInformation,
				},
				{
					display:
						'Adoption of suicide prevention/awareness policy or program',
					value: stateFacts.unicolAdoptionPolicy,
				},
			],
		},
	]
	console.log(stateFacts)
	useEffect(() => {
		setFactsTop(
			document.getElementById('factsContainer').getBoundingClientRect()
				.height +
				document
					.getElementById('crisisResources')
					.getBoundingClientRect().height
		)
	}, [factsTop])

	return (
		<Layout
			theme={styles.logo.mobileLightDesktopLight}
			seo={stateFacts.seoMetaTags}
			structuredData={structuredData}
		>
			<div id="factsContainer">
				<HeroFacts stateFacts={stateFacts}></HeroFacts>
			</div>
			<NavigationSideStateFacts
				facts={stateFacts.facts}
				slug={stateFacts.slug}
				topStart={factsTop}
			></NavigationSideStateFacts>
			<FactsWrapper stateFacts={stateFacts}></FactsWrapper>
			<CarouselChapterContainer
				carouselCSS={carouselCSS}
			></CarouselChapterContainer>
		</Layout>
	)
}

export default StateFacts

export const query = graphql`
	query ($slug: String) {
		stateFacts: datoCmsStateFact(slug: { eq: $slug }) {
			stateName
			slug
			seoMetaTags {
				...GatsbyDatoCmsSeoMetaTags
			}
			meta {
				publishedAt
			}
			stateFactSheetImage {
				url
				alt
				gatsbyImageData(width: 768)
			}
			addresses988InfrastructureAndProvidesForTelecom
			addresses988InfrastructureButNotProvideForTelecom
			enforceParityLaws
			excusedMentalHealthAbsences
			initiativesAndPlans
			lawLimitedToCreatingCommissionCommitteeTaskForce
			medicalSurgicalProfessionalsOneTime
			medicalSurgicalProfessionalsRegular
			mentalHealthProfessionalsOneTime
			mentalHealthProfessionalsRegular
			mustReportStudentSuicideRisk
			nationalSuicidePreventionLifeline
			preventionInterventionPostvention
			privateHealthPlans
			prohibitsProvidersConversionTherapyWithMinors
			prohibitsProvidersConversionTherapyWithVulnerableAdults
			prohibitsStateFundsConversionTherapy
			publicHealthPlans
			studentEducationMentalHealth
			studentEducationSuicidePrevention
			trainingForPersonnelAnnual
			trainingForPersonnelNotAnnual
			unicolAdoptionPolicy
			unicolNationalSuicidePreventionLifeline
			unicolStudentsReceiveInformation
		}
	}
`
