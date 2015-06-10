const React = require('react');
const {Button, ButtonGroup} = require('react-bootstrap');

const ButtonGroupInjector = React.createClass({
	addGroup(){
		this.props.addComponent({
			element: ButtonGroup,
			props: {
				style: {
					minHeight: '20px',
					minWidth: '20px',
					outline: '1px #ddd dashed'
				}
			}
		});
	},

	render() {
		return (
			<Button onClick={this.addGroup}>Button group</Button>
		);
	}

});

module.exports = ButtonGroupInjector;
