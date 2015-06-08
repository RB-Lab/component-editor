const React = require('react');
const Frame = require('./components/frame.jsx');

function observe(){
	React.render(<Frame notify={observe}/>, document.getElementById('main'));
}

observe();
