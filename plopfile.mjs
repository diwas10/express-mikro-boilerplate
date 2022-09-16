/* @type import("plop").Nodejs */
const camelCase = (str) => {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
			return index === 0 ? word.toLowerCase() : word.toUpperCase();
		})
		.replace(/\s+/g, '');
};

const pascalCase = (str) => {
	return (' ' + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => {
		return chr.toUpperCase();
	});
};

export default function(
	/** @type {import('plop').NodePlopAPI} */
	plop,
) {
	// create your generators here
	plop.setGenerator('core', {
		description: 'Create controller, services and others',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Name of the folder',
			},
			{
				type: 'confirm',
				name: 'isRepositoryRequired',
				message: 'Is Repository Required',
			},
		],
		actions(data) {
			const getAction = (type) => {
				return {
					type: 'add',
					path: `src/core/{{camelCase name}}/{{camelCase name}}.${type}.ts`,
					templateFile: `plop-templates/${type}.template.hbs`,
				};
			};

			const actions = [getAction('controller'), getAction('dto'), getAction('routes'), getAction('service')];

			if (data.isRepositoryRequired) {
				actions.push(getAction('entity'));
				actions.push(getAction('repository'));
			}
			return actions;
		},
	});

	plop.setHelper('pascalCase', pascalCase);
	plop.setHelper('camelCase', camelCase);
};