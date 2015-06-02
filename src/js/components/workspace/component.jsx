const React = require('react');


let WorkSpace = React.createClass({
	render() {
		return (
			<section
				style={{width: '60%', float: 'left', height: '100%'}}
				onClick={this.props.onClick}
				className="container">
				{this.props.children}
			</section>
		);
	}

});

module.exports = WorkSpace;
