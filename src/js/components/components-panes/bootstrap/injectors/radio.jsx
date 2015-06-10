const React = require('react');
const {Button, Input} = require('react-bootstrap');

const RadioButtonInjector = React.createClass({

	addRadioButton(){
		this.props.addComponent({
			element: Input,
			props: {
				type: 'radio',
				label: 'Select it'
			}
		});
	},

	render() {
		return (
			<Button onClick={this.addRadioButton}>Radio button</Button>
		);
	}

});

module.exports = RadioButtonInjector;
