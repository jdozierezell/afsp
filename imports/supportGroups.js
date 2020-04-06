require('babel-polyfill')
const SiteClient = require('datocms-client').SiteClient
const buildModularBlock = require('datocms-client').buildModularBlock
const csv = require('csv-parser')
const fs = require('fs')

const client = new SiteClient('c59da171a82e4feb314339a6e4cc24')

// client.itemTypes
// 	.all()
// 	.then(models =>
// 		models.forEach(model => console.log(`${model.name} - ${model.id}`))
// 	)

// client.fields.all('203375').then(fields => console.log(fields)) // redirect model

const data = []
fs.createReadStream('support-group-renewal-form_entries_4-4-20-missing.csv')
	.pipe(csv())
	.on('data', row => {
		data.push(row)
	})
	.on('end', () => {
		console.log('CSV file successfully processed')
		data.forEach((row, index) => {
			const supportGroupName = row['Support Group Name']
			const random = Math.floor(Math.random() * 989 + 10)
			let anchor = supportGroupName.replace(/[^A-Za-z0-9]/g, '-')
			while (anchor.includes('--')) {
				anchor = anchor.replace('--', '-')
			}
			while (anchor.endsWith('?') || anchor.endsWith('-')) {
				anchor = anchor.substring(0, anchor.length - 1)
			}
			while (anchor.startsWith('-')) {
				anchor = anchor.substring(1)
			}
			anchor = anchor.toLowerCase()
			anchor = `${anchor}-${random}`

			setTimeout(() => {
				client.items
					.create({
						itemType: '203375',
						supportGroupName: supportGroupName,
						slug: anchor,
						supportGroupWebsite: row['Support Group Website'],
						hostingSponsoringOrganization:
							row['Hosting/Sponsoring Organization'],
						hostingSponsoringOrganizationWebsite:
							row['Hosting/Sponsoring Organization Website'],
						groupDemographic: row['Group Demographic'],
						newMembers:
							row['Is this group open?'] ===
							'Yes, this group is open and new members may join at any time.'
								? true
								: false,
						contactName: row['Contact Name'],
						contactEmail: row['Contact Email'],
						contactPhone: row['Contact Phone'],
						secondContactName: row['Second Contact Name'],
						secondContactEmail: row['Second Contact Email'],
						secondContactPhone: row['Second Contact Phone'],
						submitterName: row['Submitter Name'],
						submitterEmail: row['Submitter Email'],
						registrationProcess: row['Registration Process'],
						meetingSchedule: row['Meeting Schedule'],
						nameOfMeetingSite: row['Name of Meeting Site'],
						meetingCountry: row['Meeting Country'],
						meetingAddress: row['Meeting Address'],
						meetingCity: row['Meeting City'],
						meetingState: row['Meeting State'],
						meetingZipPostalCode: row['Meeting Zip/Postal Code'],
						facilitator: row['Facilitator'],
						attendedTraining:
							row[
								'Attended AFSP Support Group Facilitator Training'
							] ===
							"Yes the group's facilitator has attended AFSP's training"
								? true
								: false,
						costToAttend: row['Cost to Attend'],
						additionalInformation: row['Additional Information'],
					})
					.then(record => console.log(record))
					.catch(error => console.log(error.message))
			}, index * 1000)
		})
	})
