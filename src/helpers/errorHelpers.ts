// Error Codes:
// 1 - Cell issue regarding hint

export const errorReport = (exception: any, errorCode: number, errorText: string = '', doContact: boolean = false) => {
	alert(`
		${errorText}\n
		${doContact ? 'If this issue continues; contact RyanUlchDev@Gmail.com with Error code in Subject line/n/n' : '/n'}
		Error code: ${errorCode}\n
		Error Message: ${exception}
	`);
}