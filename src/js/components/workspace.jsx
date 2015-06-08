const React = require('react');


let WorkSpace = React.createClass({
	render() {
		return (
			<section
				style={{
					width: '60%',
					float: 'left',
					marginTop: '-50px',
					paddingTop: '50px',
					height: '100%'}}
				onClick={this.props.onClick}
				className="container">
				{this.props.children}
			</section>
		);
	}

});

module.exports = WorkSpace;
