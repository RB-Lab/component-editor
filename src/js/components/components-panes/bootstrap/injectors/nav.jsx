const React = require('react');
const {Button, Nav} = require('react-bootstrap');

const NavInjector = React.createClass({
	addNav(){
		this.props.addComponent({
			element: Nav,
			props: {
				bsStyle: 'tabs',
				activeKey: 1,
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
			<Button onClick={this.addNav}>Navigation group</Button>
		);
	}

});

module.exports = NavInjector;
