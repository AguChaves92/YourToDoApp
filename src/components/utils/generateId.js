const numbers = '0123456789'
const letters = 'abcdefghijklmnopqrstuvwxyz'
const lettersM = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const passChars = [numbers, letters, lettersM].join('')
const MAX_PASSWORD_LENGTH = 8

export const generateId = (prefix = '', length) => {
	let newPass = prefix ? prefix + '-' : ''
	const maxLength =  MAX_PASSWORD_LENGTH
	for (let i = 0; i < maxLength; i++) {
		const index = Math.floor(Math.random() * passChars.length)
		newPass += passChars[index]
	}

	return newPass
}
