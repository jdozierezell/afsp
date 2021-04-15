const blue = 'hsla(224, 100%, 60%, 1)' // #3369ff
const darkGray = 'hsla(0, 0%, 14.9%, 1)' // #262626
const lightGray = 'hsla(0, 0%, 91.8%, 1)' // #eaeaea
const yellow = 'hsla(48, 100%, 51.6%, 1)'
const darkBlue = 'hsla(247, 65.1%, 44.9%, 1)'
const poppy = 'hsla(355, 84.3%, 50%, 1)' // #eb1426
const poppyHover = 'hsla(355, 84.3%, 45%, 1)'
const green = 'hsla(156, 69%, 50.6%, 1)' // #2cd893
const fuchsia = 'hsla(326, 75%, 49%, 1)'
const brown = 'hsla(29, 68%, 30%, 1)'
const orange = 'hsla(29, 100%, 60%, 1)'
const white = 'hsla(0, 0%, 100%, 1)'
const black = 'hsla(0, 0%, 0%, 1)'

export const styles = {
	colors: {
		blue,
		darkGray,
		lightGray,
		yellow,
		darkBlue,
		poppy,
		poppyHover,
		green,
		fuchsia,
		white,
		black,
	},
	stateGraphColors: [
		lightGray,
		blue,
		darkGray,
		yellow,
		darkBlue,
		poppy,
		green,
		fuchsia,
	],
	ageRaceMethodGraphColors: [
		darkGray,
		blue,
		yellow,
		poppy,
		darkBlue,
		green,
		fuchsia,
		brown,
		orange,
	],
	fonts: {
		avenirRegular: 'AvenirNextLTPro-Regular, Arial, sans-serif',
		avenirRegularIt: 'AvenirNextLTPro-It, Arial, sans-serif',
		avenirDemi: 'AvenirNextLTPro-Demi, Arial, sans-serif',
		avenirDemiIt: 'AvenirNextLTPro-DemiIt, Arial, sans-serif',
		avenirBold: 'AvenirNextLTPro-Bold, Arial, sans-serif',
		avenirBoldIt: 'AvenirNextLTPro-BoldIt, Arial, sans-serif',
		paul: 'PaulGroteskSoft-Bold, Arial, sans-serif',
	},
	scale: {
		npx10: '-0.625rem',
		px2: '0.125rem',
		px5: '0.3125rem',
		px7: '0.4375rem',
		px12: '0.75rem',
		px14: '0.875rem',
		px16: '1rem',
		px17: '1.0625rem',
		px18: '1.125rem',
		px20: '1.25rem',
		px22: '1.375rem',
		px24: '1.5rem',
		px25: '1.5625rem',
		px28: '1.75rem',
		px30: '1.875rem',
		px35: '2.1875rem',
		px36: '2.25rem',
		px40: '2.5rem',
		px42: '2.625rem',
		px44: '2.75rem',
		px45: '2.8125rem',
		px46: '2.875rem',
		px50: '3.125rem',
		px52: '3.25rem',
		px54: '3.375rem',
		px56: '3.5rem',
		px60: '3.75rem',
		px62: '3.875rem',
		px64: '4rem',
		px70: '4.375rem',
		px75: '4.6875rem',
		px80: '5rem',
		px90: '5.625rem',
		px126: '7.875rem',
		px150: '9.375rem',
		px160: '10rem',
		px180: '11.25rem',
	},
	screens: {
		mobile: 415,
		tablet: 769,
		video: 1000,
		navigation: 1310,
		footer: 1100,
	},
	gridGap: {
		mobile: '0.625rem',
		desktop: '1.25rem',
	},
	logo: {
		mobileDarkDesktopDark: {
			mobile: 'dark',
			desktop: 'dark',
		},
		mobileDarkDesktopLight: {
			mobile: 'dark',
			desktop: 'light',
		},
		mobileLightDesktopDark: {
			mobile: 'light',
			desktop: 'dark',
		},
		mobileLightDesktopLight: {
			mobile: 'light',
			desktop: 'light',
		},
	},
	duration: 0.5,
}
