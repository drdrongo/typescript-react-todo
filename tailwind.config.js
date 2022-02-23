const colors = require('tailwindcss/colors');
module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	mode: 'jit',
	content: [
		'./src/**/*.{js,jsx,ts,tsx}'
  ],
	theme: {
		extend: {},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			...colors
			// backgroundColor: theme => ({
			// 	...theme('colors'),
			// 	'primary': '#3490dc',
			// 	'secondary': '#ffed4a',
			// 	'danger': '#e3342f',
			//    })
		},
	},
	variants: {
		extend: {
			borderWidth: ['last'],
			translate: ['group-hover']
		},
	},
	
};
