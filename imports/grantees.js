require('babel-polyfill')
const SiteClient = require('datocms-client').SiteClient
const buildModularBlock = require('datocms-client').buildModularBlock
const csv = require('csv-parser')
const fs = require('fs')

const client = new SiteClient('c59da171a82e4feb314339a6e4cc24')

// client.itemTypes.all().then(models => console.log(models))

// client.fields.all('176621').then(fields => console.log(fields)) // quilt model
// client.fields
// 	.find('770003')
// 	.then(field => {
// 		console.log(field.validators.richTextBlocks.itemTypes)
// 	})
// 	.catch(error => {
// 		console.log(error)
// 	})

const data = []
fs.createReadStream('grantees_12-25-19-3.csv')
	.pipe(csv())
	.on('data', row => {
		data.push(row)
	})
	.on('end', () => {
		// console.log('CSV file successfully processed')
		data.forEach((row, index) => {
			let slug = row.Title
			slug = slug.replace(/[^A-Za-z0-9]/g, '-')
			const grantees = []
			const areas = []
			const contents = []
			if (row.Grantee0Name !== '') {
				const grantee = {
					grantee: row.Grantee0Name,
					institution: row.Grantee0Inst,
				}
				grantees.push(grantee)
			}
			if (row.Grantee1Name !== '') {
				const grantee = {
					grantee: row.Grantee1Name,
					institution: row.Grantee1Inst,
				}
				grantees.push(grantee)
			}
			if (row.Grantee2Name !== '') {
				const grantee = {
					grantee: row.Grantee2Name,
					institution: row.Grantee2Inst,
				}
				grantees.push(grantee)
			}
			if (row.GrantArea0 !== '') {
				areas.push(row.GrantArea0)
			}
			if (row.GrantArea1 !== '') {
				areas.push(row.GrantArea1)
			}
			if (row.GrantArea2 !== '') {
				areas.push(row.GrantArea2)
			}
			if (row.Content0Header !== '') {
				const content = {
					header: row.Content0Header,
					content: row.Content0Content,
				}
				contents.push(content)
			}
			if (row.Content1Header !== '') {
				const content = {
					header: row.Content1Header,
					content: row.Content1Content,
				}
				contents.push(content)
			}
			if (row.Content2Header !== '') {
				const content = {
					header: row.Content2Header,
					content: row.Content2Content,
				}
				contents.push(content)
			}
			const grantInformation = {
				grantees,
				areas,
				year: row.GrantYear !== '' ? row.GrantYear : '',
				amount: row.GrantAmount !== '' ? row.GrantAmount : '',
				mentor: row.GrantMentor !== '' ? row.GrantMentor : '',
				type: row.GrantType !== '' ? row.GrantType : '',
				
			}
			if (index === 1) {
				setTimeout(() => {
					client
						.uploadFile(row.ImageURL)
						.then(image => {
							return client.items.create({
								itemType: '176621',
								title: row.Title,
								slug: slug,
								grantInformation: [
									{amount: {
										amount: grantInformation.amount
									}, type: '176635'},
									{grantee: {
										granteeName: grantInformation.grantees[0].grantee,
										granteeInstitution: grantInformation.grantees[0].institution,
										granteeImage: image,
									}, type: '176632'},
									{mentor: {
										mentor: grantInformation.mentor
									}, type: '176634'},
									{year: {
										year: grantInformation.year
									}, type: '176633'},
								],
								grantDetails: [
									{content: {
										contentHeading: 'foo',
										contentBody: 'bar'
									}, type: '148717'}
								],
								seo: {
									title: row.Title,
									description: 'The American Foundation for Suicide Prevention is the largest private funder of suicide prevention research.',
									image: image

								}
							})
						})
						.then(record => console.log(record))
						.catch(error => console.log(error.message))
				}, index * 1000)
			}
		})
	})
