require('babel-polyfill')
const SiteClient = require('datocms-client').SiteClient
const buildModularBlock = require('datocms-client').buildModularBlock
const csv = require('csv-parser')
const fs = require('fs')

const client = new SiteClient('c59da171a82e4feb314339a6e4cc24')

const data = []
fs.createReadStream('redirection-afsp-org-march-17-2020_edit.csv')
	.pipe(csv())
	.on('data', row => {
		data.push(row)
	})
	.on('end', () => {
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
