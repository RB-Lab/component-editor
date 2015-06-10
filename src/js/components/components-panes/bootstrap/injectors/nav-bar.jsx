const React = require('react');
const {Button, Navbar} = require('react-bootstrap');

const NavbarInjector = React.createClass({
	addNavbar(){
		this.props.addComponent({
			element: Navbar,
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
			<Button onClick={this.addNavbar}>Navigation Bar</Button>
		);
	}

});

module.exports = NavbarInjector;
