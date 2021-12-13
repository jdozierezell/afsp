import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import HeroFacts from '../components/Hero/HeroFacts'
import NavigationSideStateFacts from '../components/Navigation/NavigationSideStateFacts'
import FactsWrapper from '../components/StateFacts/FactsWrapper'
import CarouselChapterContainer from '../components/Carousels/CarouselChapterContainer'

import { styles } from '../css/css'

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
			display: 'Mental health parity',
			anchor: 'mental-health-parity',
			facts: [
				{
					display: 'Federal parity law codified in state statute',
					value: stateFacts.parityLawCodified,
				},
				{
					display: 'State regulators must enforce parity law(s)',
					value: stateFacts.enforceParityLaws,
				},
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
			promo: [stateFacts.mentalHealthParityPromo],
		},
		{
			display: 'K – 12 school suicide prevention',
			anchor: 'k-12-school-suicide-prevention',
			public: {
				display: 'Public schools',
				facts: [
					{
						display:
							'Inclusion of the National Suicide Prevention Lifeline and/or other crisis line(s) on student ID cards',
						value: stateFacts.pubNationalSuicidePreventionLifeline,
					},
					{
						display:
							'Student allowances for excused mental health absences',
						value: stateFacts.pubExcusedMentalHealthAbsences,
					},
					{
						display:
							'School personnel must report student suicide risk to a parent and/or guardian',
						value: stateFacts.pubMustReportStudentSuicideRisk,
					},
					{
						display:
							'Suicide prevention and/or mental health training for certain school personnel, annual',
						value: stateFacts.pubTrainingForPersonnelAnnual,
					},
					{
						display:
							'Suicide prevention and/or mental health training for certain school personnel, not annual',
						value: stateFacts.pubTrainingForPersonnelNotAnnual,
					},
					{
						display:
							'Suicide prevention, intervention, and postvention policies/programming',
						value: stateFacts.pubPreventionInterventionPostvention,
					},
					{
						display: 'Student education on suicide prevention',
						value: stateFacts.pubStudentEducationSuicidePrevention,
					},
					{
						display: 'Student education on mental health',
						value: stateFacts.pubStudentEducationMentalHealth,
					},
				],
			},
			nonPublic: {
				display: 'Non-public schools',
				facts: [
					{
						display:
							'Inclusion of the National Suicide Prevention Lifeline and/or other crisis line(s) on student ID cards',
						value: stateFacts.npubNationalSuicidePreventionLifeline,
					},
					{
						display:
							'Student allowances for excused mental health absences',
						value: stateFacts.npubExcusedMentalHealthAbsences,
					},
					{
						display:
							'School personnel must report student suicide risk to a parent and/or guardian',
						value: stateFacts.npubMustReportStudentSuicideRisk,
					},
					{
						display:
							'Training for certain school personnel, annual',
						value: stateFacts.npubTrainingForPersonnelAnnual,
					},
					{
						display:
							'Training for certain school personnel, not annual',
						value: stateFacts.npubTrainingForPersonnelNotAnnual,
					},
					{
						display:
							'Suicide prevention, intervention, and postvention policies/programming',
						value: stateFacts.npubPreventionInterventionPostvention,
					},
					{
						display: 'Student education on suicide prevention',
						value: stateFacts.npubStudentEducationSuicidePrevention,
					},
					{
						display: 'Student education on mental health',
						value: stateFacts.npubStudentEducationMentalHealth,
					},
				],
			},
			promo: [stateFacts.k12SchoolSuicidePreventionPromo],
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
			promo: [stateFacts.healthProfessionalTrainingSuicidePromo],
		},
		{
			display: 'Conversion therapy bans',
			anchor: 'conversion-therapy-bans',
			facts: [
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
						'Prohibits licensed/board certified mental health providers from engaging in conversion therapy with all patients',
					value: stateFacts.prohibitsProvidersConversionTherapyWithAllPatients,
				},
				{
					display:
						'Prohibits use of state funds for any purpose related to conversion therapy (e.g., conducting, making a referral for, or extending health benefits coverage for)',
					value: stateFacts.prohibitsStateFundsConversionTherapy,
				},
			],
			promo: [stateFacts.conversionTherapyBansPromo],
		},

		{
			display: 'University and college campus suicide prevention',
			anchor: 'university-and-college',
			public: {
				display: 'Public schools',
				facts: [
					{
						display:
							'Inclusion of the National Suicide Prevention Lifeline and/or other crisis line(s) on student ID cards',
						value: stateFacts.pubUnicolNationalSuicidePreventionLifeline,
					},
					{
						display:
							'Students receive information on available mental health and/or suicide prevention services and/or resources',
						value: stateFacts.pubUnicolStudentsReceiveInformation,
					},
					{
						display:
							'Adoption of suicide prevention/awareness policy',
						value: stateFacts.pubUnicolAdoptionPolicy,
					},
				],
			},
			nonPublic: {
				display: 'Non-public schools',
				facts: [
					{
						display:
							'Inclusion of the National Suicide Prevention Lifeline and/or other crisis line(s) on student ID cards',
						value: stateFacts.npubUnicolNationalSuicidePreventionLifeline,
					},
					{
						display:
							'Students receive information on available mental health and/or suicide prevention services and/or resources',
						value: stateFacts.npubUnicolStudentsReceiveInformation,
					},
					{
						display:
							'Adoption of suicide prevention/awareness policy',
						value: stateFacts.npubUnicolAdoptionPolicy,
					},
				],
			},
			promo: [
				stateFacts.universityAndCollegeCampusSuicidePreventionPromo,
			],
		},
	]
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
			<CarouselChapterContainer></CarouselChapterContainer>
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
			initiativesAndPlans
			enforceParityLaws
			medicalSurgicalProfessionalsOneTime
			medicalSurgicalProfessionalsRegular
			mentalHealthProfessionalsOneTime
			mentalHealthProfessionalsRegular
			npubExcusedMentalHealthAbsences
			npubMustReportStudentSuicideRisk
			npubNationalSuicidePreventionLifeline
			npubPreventionInterventionPostvention
			npubStudentEducationMentalHealth
			npubStudentEducationSuicidePrevention
			npubTrainingForPersonnelAnnual
			npubTrainingForPersonnelNotAnnual
			npubUnicolAdoptionPolicy
			npubUnicolNationalSuicidePreventionLifeline
			npubUnicolStudentsReceiveInformation
			parityLawCodified
			privateHealthPlans
			prohibitsProvidersConversionTherapyWithAllPatients
			prohibitsProvidersConversionTherapyWithMinors
			prohibitsProvidersConversionTherapyWithVulnerableAdults
			prohibitsStateFundsConversionTherapy
			pubExcusedMentalHealthAbsences
			pubMustReportStudentSuicideRisk
			pubNationalSuicidePreventionLifeline
			pubPreventionInterventionPostvention
			pubStudentEducationMentalHealth
			pubStudentEducationSuicidePrevention
			pubTrainingForPersonnelAnnual
			pubTrainingForPersonnelNotAnnual
			pubUnicolAdoptionPolicy
			pubUnicolNationalSuicidePreventionLifeline
			pubUnicolStudentsReceiveInformation
			publicHealthPlans
			mentalHealthParityPromo {
				... on DatoCmsCallsToAction {
					... on DatoCmsCallsToAction {
						__typename
						...CsTAs
					}
				}
				... on DatoCmsDetail {
					__typename
					...Detail
				}
			}
			k12SchoolSuicidePreventionPromo {
				... on DatoCmsCallsToAction {
					... on DatoCmsCallsToAction {
						__typename
						...CsTAs
					}
				}
				... on DatoCmsDetail {
					__typename
					...Detail
				}
			}
			healthProfessionalTrainingSuicidePromo {
				... on DatoCmsCallsToAction {
					... on DatoCmsCallsToAction {
						__typename
						...CsTAs
					}
				}
				... on DatoCmsDetail {
					__typename
					...Detail
				}
			}
			conversionTherapyBansPromo {
				... on DatoCmsCallsToAction {
					... on DatoCmsCallsToAction {
						__typename
						...CsTAs
					}
				}
				... on DatoCmsDetail {
					__typename
					...Detail
				}
			}
			universityAndCollegeCampusSuicidePreventionPromo {
				... on DatoCmsCallsToAction {
					... on DatoCmsCallsToAction {
						__typename
						...CsTAs
					}
				}
				... on DatoCmsDetail {
					__typename
					...Detail
				}
			}
		}
	}
`
