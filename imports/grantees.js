require('babel-polyfill')
const SiteClient = require('datocms-client').SiteClient
const buildModularBlock = require('datocms-client').buildModularBlock
const csv = require('csv-parser')
const fs = require('fs')

const client = new SiteClient('c59da171a82e4feb314339a6e4cc24')

const data = []
fs.createReadStream('grantees_12-25-19-3.csv')
	.pipe(csv())
	.on('data', row => {
		data.push(row)
	})
	.on('end', () => {
		data.forEach((row, index) => {
			let slug = row.Title
			slug = slug.replace(/[^A-Za-z0-9]/g, '-').toLowerCase()
			slug = slug.replace(/--/g, '-')
			slug = slug.replace(/--/g, '-')
			if (slug.indexOf('-') === 0) {
				slug = slug.slice(1)
			}
			if (slug.lastIndexOf('-') === slug.length - 1) {
				slug = slug.slice(0, -1)
			}
			if (slug.indexOf('--') !== -1) {
				console.log(slug, index)
			}
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
			if (contents[2]) {
				setTimeout(() => {
					client
						.uploadFile(row.ImageURL)
						.then(image => {
							return client.items.create({
								itemType: '176621',
								title: row.Title,
								slug: slug,
								grantInformation: [
									buildModularBlock({
										amount: grantInformation.amount,
										itemType: '176635',
									}),
									buildModularBlock({
										granteeName:
											grantInformation.grantees[0]
												.grantee,
										granteeInstitution:
											grantInformation.grantees[0]
												.institution,
										granteeImage: image,
										itemType: '176632',
									}),
									buildModularBlock({
										mentor: grantInformation.mentor,
										itemType: '176634',
									}),
									buildModularBlock({
										year: grantInformation.year,
										itemType: '176633',
									}),
								],
								grantDetails: [
									buildModularBlock({
										contentHeading: contents[0].header,
										contentBody: contents[0].content,
										itemType: '148717',
									}),
									buildModularBlock({
										contentHeading: contents[1].header,
										contentBody: contents[1].content,
										itemType: '148717',
									}),
									buildModularBlock({
										contentHeading: contents[2].header,
										contentBody: contents[2].content,
										itemType: '148717',
									}),
								],
								seo: {
									title: row.Title,
									description:
										'The American Foundation for Suicide Prevention is the leading private funder of suicide prevention research in the United States.',
									image: image.uploadId,
								},
							})
						})
						.then(record => console.log(record))
						.catch(error => console.log(error.message))
				}, index * 1000)
			} else if (contents[1] && !contents[2]) {
				setTimeout(() => {
					client
						.uploadFile(row.ImageURL)
						.then(image => {
							return client.items.create({
								itemType: '176621',
								title: row.Title,
								slug: slug,
								grantInformation: [
									buildModularBlock({
										amount: grantInformation.amount,
										itemType: '176635',
									}),
									buildModularBlock({
										granteeName:
											grantInformation.grantees[0]
												.grantee,
										granteeInstitution:
											grantInformation.grantees[0]
												.institution,
										granteeImage: image,
										itemType: '176632',
									}),
									buildModularBlock({
										mentor: grantInformation.mentor,
										itemType: '176634',
									}),
									buildModularBlock({
										year: grantInformation.year,
										itemType: '176633',
									}),
								],
								grantDetails: [
									buildModularBlock({
										contentHeading: contents[0].header,
										contentBody: contents[0].content,
										itemType: '148717',
									}),
									buildModularBlock({
										contentHeading: contents[1].header,
										contentBody: contents[1].content,
										itemType: '148717',
									}),
								],
								seo: {
									title: row.Title,
									description:
										'The American Foundation for Suicide Prevention is the leading private funder of suicide prevention research in the United States.',
									image: image.uploadId,
								},
							})
						})
						.then(record => console.log(record))
						.catch(error => console.log(error.message))
				}, index * 1000)
			} else if (contents[0]) {
				setTimeout(() => {
					client
						.uploadFile(row.ImageURL)
						.then(image => {
							return client.items.create({
								itemType: '176621',
								title: row.Title,
								slug: slug,
								grantInformation: [
									buildModularBlock({
										amount: grantInformation.amount,
										itemType: '176635',
									}),
									buildModularBlock({
										granteeName:
											grantInformation.grantees[0]
												.grantee,
										granteeInstitution:
											grantInformation.grantees[0]
												.institution,
										granteeImage: image,
										itemType: '176632',
									}),
									buildModularBlock({
										mentor: grantInformation.mentor,
										itemType: '176634',
									}),
									buildModularBlock({
										year: grantInformation.year,
										itemType: '176633',
									}),
								],
								grantDetails: [
									buildModularBlock({
										contentHeading: contents[0].header,
										contentBody: contents[0].content,
										itemType: '148717',
									}),
								],
								seo: {
									title: row.Title,
									description:
										'The American Foundation for Suicide Prevention is the leading private funder of suicide prevention research in the United States.',
									image: image.uploadId,
								},
							})
						})
						.then(record => console.log(record))
						.catch(error => console.log(error.message))
				}, index * 1000)
			}
		})
	})
