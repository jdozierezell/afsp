const blue = 'hsla(224, 100%, 60%, 1)' // #3369ff
const darkGray = 'hsla(0, 0%, 14.9%, 1)' // #262626
const lightGray = 'hsla(0, 0%, 91.8%, 1)' // #eaeaea
const yellow = 'hsla(48, 100%, 51.6%, 1)'
const darkBlue = 'hsla(247, 65.1%, 44.9%, 1)'
const poppy = 'hsla(355, 84.3%, 50%, 1)' // #eb1426
const poppyHover = 'hsla(355, 84.3%, 45%, 1)'
const green = 'hsla(156, 69%, 50.6%, 1)' // #2cd893
const fuchsia = 'hsla(326, 75%, 49%, 1)'
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
		blue,
		yellow,
		poppy,
		green,
		darkBlue,
		fuchsia,
		darkGray,
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
		npx10: '-10px',
		px2: '2px',
		px5: '5px',
		px7: '7px',
		px12: '12px',
		px14: '14px',
		px16: '16px',
		px17: '17px',
		px18: '18px',
		px20: '20px',
		px22: '22px',
		px24: '24px',
		px25: '25px',
		px28: '28px',
		px30: '30px',
		px35: '35px',
		px36: '36px',
		px40: '40px',
		px42: '42px',
		px44: '44px',
		px45: '45px',
		px46: '46px',
		px50: '50px',
		px52: '52px',
		px54: '54px',
		px56: '56px',
		px60: '60px',
		px62: '62px',
		px64: '64px',
		px70: '70px',
		px75: '75px',
		px80: '80px',
		px90: '90px',
		px126: '126px',
		px150: '150px',
		px160: '160px',
		px180: '180px',
	},
	screens: {
		mobile: 415,
		tablet: 769,
		video: 1000,
		navigation: 1200,
		footer: 1100,
	},
	gridGap: {
		mobile: '10px',
		desktop: '20px',
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
