function saveAuthToCookie(value) {
	document.cookie = `til_auth=${JSON.stringify(value)}`
}

function saveUserToCookie(value) {
	document.cookie = `til_user=${JSON.stringify(value)}`
}

function getAuthFromCookie() {
	const keyValue = document.cookie.split("; ").find(row => {
		return row.startsWith("til_auth")
	})
	const value = keyValue ? keyValue.split("=")[1] : ""
	try {
		if (value) {
			return JSON.parse(value)
		} else return ""
	} catch (e) {
		return ""
	}
}

function getUserFromCookie() {
	const keyValue = document.cookie.split("; ").find(row => {
		return row.startsWith("til_user")
	})
	const value = keyValue ? keyValue.split("=")[1] : ""
	try {
		if (value) {
			return JSON.parse(value)
		} else return ""
	} catch (e) {
		return ""
	}
}

export { saveAuthToCookie, saveUserToCookie, getAuthFromCookie, getUserFromCookie }
