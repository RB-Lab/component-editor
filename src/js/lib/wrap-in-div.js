const React = require('react');

module.exports = function wrapInDiv(children, props){
	return React.createElement(
			'div',
			props,
			children
		);
};
