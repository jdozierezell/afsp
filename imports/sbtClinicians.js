require('babel-polyfill')
const SiteClient = require('datocms-client').SiteClient
const buildModularBlock = require('datocms-client').buildModularBlock
const csv = require('csv-parser')
const fs = require('fs')

const client = new SiteClient('c59da171a82e4feb314339a6e4cc24')

const data = []
fs.createReadStream('imports/sbtClinicians220118_withState_noHeadings.csv')
	.pipe(csv())
	.on('data', row => {
		data.push(row)
	})
	.on('end', () => {
		data.forEach((row, index) => {
			const name = row.name
			const email = row.email
			const phone = row.phone
			const specialties = row.specialties
			const telehealth = row.telehealth
			// use =SUBSTITUTE(SUBSTITUTE(B5,CHAR(13)," "),CHAR(10)," ") as formula in excel to remove line breaks before processing
			// remove spaces created from formula above. running a few times in cases where there are multiple line breaks
			let fullAddress = row.addressFormatted.replace('  ', ' ')
			fullAddress = fullAddress.replace('  ', ' ')
			fullAddress = fullAddress.replace('  ', ' ')
			fullAddress = fullAddress.replace('  ', ' ')
			fullAddress = fullAddress.replace('  ', ' ')
			const lastSpace = fullAddress.lastIndexOf(' ') + 1
			const zip = fullAddress.substring(lastSpace).replace(',', '')
			const addNoZip = fullAddress.slice(0, lastSpace).trim()
			const lastSpace1 = addNoZip.lastIndexOf(' ') + 1
			const userState = addNoZip.substring(lastSpace1).replace(',', '')
			const state = row.state
			const addNoZipState = addNoZip.slice(0, lastSpace1).trim()
			const lastSpace2 = addNoZipState.lastIndexOf(' ') + 1
			const city = addNoZipState.substring(lastSpace2).replace(',', '')
			const street = addNoZipState
				.slice(0, lastSpace2)
				.trim()
				.replace(',', '')
			setTimeout(() => {
				client.items
					.create({
						itemType: '1679646',
						name: name,
						address1: street,
						city: city,
						state: state,
						zipCode: zip,
						email: email,
						phone: phone,
						specialties: specialties,
						telehealth: telehealth,
					})
					.catch(error => console.log(error.message))
			}, index * 1000)
		})
	})
