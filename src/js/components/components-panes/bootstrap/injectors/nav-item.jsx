const React = require('react');
const {Button, NavItem} = require('react-bootstrap');

const NavItemInjector = React.createClass({
	addItem(){
		this.props.addComponent({
			element: NavItem,
			props: {
				eventKey: 1
			},
			children: ['Item Name']
		});
	},

	render() {
		return (
			<Button onClick={this.addItem}>Navigation item</Button>
		);
	}

});

module.exports = NavItemInjector;
