const React = require('react');

function schema2VDOM(schema, onClick){
	function parse(schema){
		if(Array.isArray(schema)){
			return schema.map(parse);
		} else
		if (typeof schema === 'object'){
			if(onClick){
				if(!schema.props){
					schema.props = {};
				}
				schema.props.onClick = function(e){
					e.stopPropagation();
					onClick(schema);
				};
			}
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
