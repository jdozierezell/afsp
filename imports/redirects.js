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

// client.fields.all('208099').then(fields => console.log(fields)) // redirect model

const data = []
fs.createReadStream('redirection-afsp-org-march-17-2020_edit.csv')
	.pipe(csv())
	.on('data', row => {
		data.push(row)
	})
	.on('end', () => {
		// console.log('CSV file successfully processed')
		data.forEach((row, index) => {
			setTimeout(() => {
				client.items
					.create({
						itemType: '208099',
						alias: row.source,
						destination: row.target,
					})
					.then(record => console.log(record))
					.catch(error => console.log(error.message))
			}, index * 1000)
		})
	})
