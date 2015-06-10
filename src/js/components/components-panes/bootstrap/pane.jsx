const React = require('react');
const ButtonInjector = require('./injectors/button.jsx');
const ButtonGroupInjector = require('./injectors/button-group.jsx');
const ColInjector = require('./injectors/col.jsx');
const RowInjector = require('./injectors/row.jsx');
const InputInjector = require('./injectors/input.jsx');
const ProgressBarInjector = require('./injectors/progressbar.jsx');
const NavbarInjector = require('./injectors/nav-bar.jsx');
const NavInjector = require('./injectors/nav.jsx');
const NavItemInjector = require('./injectors/nav-item.jsx');

const BootstrapPane = React.createClass({

	render() {
		return (
			<section>
				<h4>Grid</h4>
				<RowInjector {...this.props}/>
				<ColInjector {...this.props}/>
				<h4>Controls</h4>
				<ButtonGroupInjector {...this.props}/>
				<ButtonInjector {...this.props}/>
				<InputInjector {...this.props}/>
				<ProgressBarInjector {...this.props}/>
				<h4>Navigation</h4>
				<NavbarInjector {...this.props}/>
				<NavInjector {...this.props}/>
				<NavItemInjector {...this.props}/>
			</section>
		);
	}

});

module.exports = BootstrapPane;
