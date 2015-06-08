const reactToJsx = require('react-to-jsx');
const wrapInDiv = require('lib/wrap-in-div');
const schema2VDOM = require('lib/schema2react');

function indent(spaces, text){
	spaces = new Array(spaces).join(' ');
	return spaces + text.replace(/\n/g, '\n' + spaces);
}


module.exports = function exportToText(name, children){
	var text = 'const ' + name + ' = React.createClass({\n' +
		'    render(){\n' +
		'        return (\n\n' +
		indent(12, reactToJsx(wrapInDiv(schema2VDOM(children)))) + '\n' +
		'        );\n' +
		'    }\n' +
		'});';
	return text;
};
