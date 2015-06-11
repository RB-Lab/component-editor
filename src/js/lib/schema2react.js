const React = require('react');

function schema2VDOM(schema){
	function parse(schema){
		if(Array.isArray(schema)){
			return schema.map(parse);
		} else
		if (typeof schema === 'object'){
			return React.createElement(
				schema.element,
				schema.props,
				parse(schema.children)
			);
		} else
		if (typeof schema === 'string' || typeof schema === 'number'){
			return schema;
		}
	}

	return parse(schema);
}

module.exports = schema2VDOM;
