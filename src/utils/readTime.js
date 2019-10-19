// https://www.freecodecamp.org/news/how-to-more-accurately-estimate-read-time-for-medium-articles-in-javascript-fb563ff0282a/

const WORDS_PER_MIN = 275, // wpm
	IMAGE_READ_TIME = 12, // in seconds
	CHINESE_KOREAN_READ_TIME = 500, // cpm
	IMAGE_TAGS = ['img', 'Image']

const stripWhitespace = string => string.replace(/^\s+/, '').replace(/\s+$/, '')

const imageCount = (imageTags, string) => {
	const combinedImageTags = imageTags.join('|')
	const pattern = `<(${combinedImageTags})([\\w\\W]+?)[\\/]?>`
	const reg = new RegExp(pattern, 'g')
	return (string.match(reg) || []).length
}

const imageReadTime = (
	customImageTime = IMAGE_READ_TIME,
	tags = IMAGE_TAGS,
	string
) => {
	let seconds = 0
	const count = imageCount(tags, string)

	if (count > 10) {
		seconds = (count / 2) * (customImageTime + 3) + (count - 10) * 3 // n/2(a+b) + 3 sec/image
	} else {
		seconds = (count / 2) * (2 * customImageTime + (1 - count)) // n/2[2a+(n-1)d]
	}
	return {
		time: seconds / 60,
		count,
	}
}

const stripTags = string => {
	const pattern = '<\\w+(\\s+("[^"]*"|\\\'[^\\\']*\'|[^>])+)?>|<\\/\\w+>'
	const reg = new RegExp(pattern, 'gi')
	return string.replace(reg, '')
}

const wordsCount = string => {
	const pattern = '\\w+'
	const reg = new RegExp(pattern, 'g')
	return (string.match(reg) || []).length
}

// Chinese / Japanese / Korean
const otherLanguageReadTime = string => {
	const pattern =
		'[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]'
	const reg = new RegExp(pattern, 'g')
	const count = (string.match(reg) || []).length
	const time = count / CHINESE_KOREAN_READ_TIME
	const formattedString = string.replace(reg, '')
	return {
		count,
		time,
		formattedString,
	}
}

const wordsReadTime = (string, wordsPerMin = WORDS_PER_MIN) => {
	const {
		count: characterCount,
		time: otherLanguageTime,
		formattedString,
	} = otherLanguageReadTime(string)
	const wordCount = wordsCount(formattedString)
	const wordTime = wordCount / wordsPerMin
	return {
		characterCount,
		otherLanguageTime,
		wordTime,
		wordCount,
	}
}

const humanizeTime = time => {
	if (time < 1.5) {
		return '1'
	}
	return `${Math.ceil(time)}`
}

const readTime = (
	string,
	customWordTime,
	customImageTime,
	chineseKoreanReadTime,
	imageTags
) => {
	const { time: imageTime, count: imageCount } = imageReadTime(
		customImageTime,
		imageTags,
		string
	)
	const strippedString = stripTags(stripWhitespace(string))
	const {
		characterCount,
		otherLanguageTime,
		wordTime,
		wordCount,
	} = wordsReadTime(strippedString, customWordTime)
	return {
		humanizedDuration: humanizeTime(imageTime + wordTime),
		duration: imageTime + wordTime,
		totalWords: wordCount,
		wordTime,
		totalImages: imageCount,
		imageTime,
		otherLanguageTimeCharacters: characterCount,
		otherLanguageTime,
	}
}

export default readTime
