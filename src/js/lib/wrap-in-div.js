const React = require('react');

module.exports = function wrapInDiv(children){
	return React.createElement(
			'div',
			{},
			children
		);
};
