const loginFields = [
	{
		labelText: 'Email',
		labelFor: 'email',
		id: 'email',
		name: 'email',
		type: 'email-address',
		autoComplete: 'email',
		isRequired: true,
		placeholder: 'Email',
	},
	{
		labelText: 'Password',
		labelFor: 'password',
		id: 'password',
		name: 'password',
		type: 'password',
		autoComplete: 'current-password',
		isRequired: true,
		placeholder: 'Password',
	},
];

const registerFields = [
	{
		labelText: 'Username',
		labelFor: 'username',
		id: 'username',
		name: 'username',
		type: 'text',
		autoComplete: 'username',
		isRequired: true,
		placeholder: 'Username',
	},
	{
		labelText: 'Email',
		labelFor: 'email',
		id: 'email',
		name: 'email',
		type: 'email-address',
		autoComplete: 'email',
		isRequired: true,
		placeholder: 'Email',
	},
	{
		labelText: 'Password',
		labelFor: 'password',
		id: 'password',
		name: 'password',
		type: 'password',
		autoComplete: 'current-password',
		isRequired: true,
		placeholder: 'Password',
	},
	{
		labelText: 'Confirm Password',
		labelFor: 'confirm-password',
		id: 'confirm-password',
		name: 'confirm-password',
		type: 'password',
		autoComplete: 'confirm-password',
		isRequired: true,
		placeholder: 'Confirm Password',
	},
];

export { loginFields, registerFields };
