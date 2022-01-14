require('babel-polyfill')
const SiteClient = require('datocms-client').SiteClient
const buildModularBlock = require('datocms-client').buildModularBlock
const csv = require('csv-parser')
const fs = require('fs')

const client = new SiteClient('c59da171a82e4feb314339a6e4cc24')

const data = []
fs.createReadStream('sbtClinicians.csv')
	.pipe(csv())
	.on('data', row => {
		data.push(row)
	})
	.on('end', () => {
		// console.log('CSV file successfully processed')
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
			const state = addNoZip.substring(lastSpace1).replace(',', '')
			const addNoZipState = addNoZip.slice(0, lastSpace1).trim()
			const lastSpace2 = addNoZipState.lastIndexOf(' ') + 1
			const city = addNoZipState.substring(lastSpace2).replace(',', '')
			const street = addNoZipState
				.slice(0, lastSpace2)
				.trim()
				.replace(',', '')
			// console.log(row)
			console.log(name)
			console.log(street)
			console.log(city)
			console.log(state)
			console.log(zip)
			console.log(email)
			console.log(phone)
			console.log(specialties)
			console.log(telehealth)
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
					.then(record => console.log(record))
					.catch(error => console.log(error.message))
			}, index * 1000)
		})
	})
