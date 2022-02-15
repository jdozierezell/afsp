import { createTheme } from '@mui/material/styles'

import { styles } from './css'

export const textFieldCSS = {
	borderRadius: styles.scale.px5,
	bgcolor: styles.colors.white,
	marginBottom: styles.scale.px25,
	fontSize: 16,
	'& .MuiInputLabel-root, & .MuiFormHelperText-root, & .MuiOutlinedInput-root':
		{
			fontFamily: styles.fonts.avenirRegular,
		},
	'& .MuiOutlinedInput-notchedOutline': {
		border: `${styles.scale.px2} solid ${styles.colors.darkGray}`,
	},
	'& .Mui-focused': {
		color: `${styles.colors.darkGray} !important`,
	},
	'& .Mui-focused > .MuiOutlinedInput-notchedOutline': {
		borderColor: `${styles.colors.green} !important`,
	},
}

export const buttonCSS = {
	fontFamily: styles.fonts.avenirBold,
	fontSize: 18,
	color: styles.colors.poppy,
	textAlign: 'center',
	minHeight: styles.scale.px50,
	bgcolor: styles.colors.white,
	borderRadius: styles.scale.px30,
	border: `solid ${styles.scale.px2} ${styles.colors.poppy}`,
	padding: `${styles.scale.px10} ${styles.scale.px36}`,
	marginTop: styles.scale.px24,
	marginBottom: styles.scale.px24,
	display: 'inline-block',
	textDecoration: 'none',
	textTransform: 'none',
	cursor: 'pointer',
	lineHeight: 0.6,
	'&:hover': {
		textDecoration: 'underline',
		border: `solid ${styles.scale.px2} ${styles.colors.poppy}`,
	},
}

export const afspMuiTheme = createTheme({
	palette: {
		background: {
			default: styles.colors.white,
		},
		text: {
			primary: styles.colors.darkGray,
		},
		primary: {
			main: styles.colors.poppy,
		},
		secondary: {
			main: styles.colors.blue,
		},
		error: {
			main: styles.colors.poppy,
		},
		warning: {
			main: styles.colors.yellow,
		},
		info: {
			main: styles.colors.darkGray,
		},
		success: {
			main: styles.colors.green,
		},
		divider: 'rgba(38,38,38,0.2)',
	},
	typography: {
		fontSize: 16,
		fontFamily: styles.fonts.avenirRegular,
	},
})
