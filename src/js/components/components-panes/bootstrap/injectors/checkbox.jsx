const React = require('react');
const {Button, Input} = require('react-bootstrap');

const CheckBoxInjector = React.createClass({

	addCheckBox(){
		this.props.addComponent({
			element: Input,
			props: {
				type: 'checkbox',
				label: 'Check it'
			}
		});
	},

	render() {
		return (
			<Button onClick={this.addCheckBox}>Check box</Button>
		);
	}

});

module.exports = CheckBoxInjector;
