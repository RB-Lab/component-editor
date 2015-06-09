
var camelcase = require('camelcase');
var decamelize = require('decamelize');

module.exports.object2css = function object2css(style){
	let result = '{\n';
	for(var key in style){
		result += `\t${decamelize(key, '-')}: ${style[key]};\n`;
	}
	return result + '}\n';
};

module.exports.css2object = function css2object(style){
	style = style.match(/{(.|\s)+}/gm)[0].replace(/{|}/g, '');
	return style.split('\n').reduce((res, line) => {
		let lineArr = line.split(':');
		if(lineArr.length !== 2){
			return res;
		}
		res[camelcase(lineArr[0].trim())] = lineArr[1].replace(';', '').trim();
		return res;
	}, {});
};
