let fs = require('fs');
let beautify = require('json-beautify');
let countries = require('country-data').countries.all;

let result = {
	countries: [],
	code2: {},
	code3: {}
}


countries.forEach( country => {
	if(country.status === 'deleted') return;

	let resCountry = {
		code2: [country.alpha2],
		code3: [country.alpha3],
		alpha3: country.alpha3,
		name: country.name,
		emoji: country.emoji
	}
	let prevCountry = null;

	if(country.status === 'assigned') resCountry.alpha2 = country.alpha2;

	result.countries.forEach( c => {
		if(country.name === c.name){ // dublicate
			prevCountry = c;
		}
	})

	if(!prevCountry){ // this country was not added to result.countries yet

		if(country.ioc && !resCountry.code3.includes(country.ioc)){
			// eg. United Arab Emirates: alpha3: "ARE", ioc: "UAE"
			resCountry.code3.push(country.ioc)
		}

		result.countries.push(resCountry);
	} else { // update the country we added to result.countries already
		if(country.alpha2 && !prevCountry.code2.includes(country.alpha2)) {
			prevCountry.code2.push(country.alpha2)
		}
		if(country.alpha3 && !prevCountry.code3.includes(country.alpha3)) {
			prevCountry.code3.push(country.alpha3)
		}
		if(country.ioc && !prevCountry.code3.includes(country.ioc)) {
			prevCountry.code3.push(country.ioc)
		}
		if(country.emoji) prevCountry.emoji = country.emoji;
		if(country.name) prevCountry.name = country.name;
		if(country.alpha3) prevCountry.alpha3 = country.alpha3;
		if(country.status === 'assigned') prevCountry.alpha2 = country.alpha2;
	}
})


result.countries = result.countries.filter( c => {
	//console.log('COUNTRY', c )
	return !!c.alpha3;
})





// add to code2 and code3 nodes countries by their alpha2, alpha3, ioc
result.countries.forEach( c => {
	// console.log('COUNTRY', c )
	c.code2.forEach( code2 => {
		if(!result.code2[code2]) result.code2[code2] = [];
		result.code2[code2].push(c);
	});
	c.code3.forEach( code3 => {
		if(!result.code3[code3]) result.code3[code3] = [];
		result.code3[code3].push(c);
	})
})



// Add EU countries to code2.EU
let euCountries = ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GB", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"];


if(!result.code2.EU) result.code2.EU = [];
euCountries.forEach( alpha2 => {
	result.code2.EU.push( result.code2[alpha2][0] );
})




// add to code2 and code3 countries that start with their first letters
result.countries.forEach( c => {

	let code2 = c.name.substr(0, 2).toUpperCase();
	if(code2.length===2){
		if(!result.code2[code2]) result.code2[code2] = [];
		var found = result.code2[code2].filter( co => { return co.alpha3===c.alpha3 });
		if(!found.length) result.code2[code2].push(c);
	}

	let code3 = c.name.substr(0, 3).toUpperCase();
	if(code3.length===3){
		if(!result.code3[code3]) result.code3[code3] = [];
		var found = result.code3[code3].filter( co => { return co.alpha3===c.alpha3 });
		if(!found.length) result.code3[code3].push(c);
	}

})





// add to code2 and code3 countries that start with first letters of every word of the name
result.countries.forEach( c => {

	let words = c.name.split(' ');

	words.forEach( word => {
		word = word.replace(/\W/g,'');
		let code2 = word.substr(0, 2).toUpperCase();
		if(code2.length===2){
			if(!result.code2[code2]) result.code2[code2] = [];
			var found = result.code2[code2].filter( co => { return co.alpha3===c.alpha3 });
			if(!found.length) result.code2[code2].push(c);
		}

		let code3 = word.substr(0, 3).toUpperCase();
		if(code3.length===3){
			if(!result.code3[code3]) result.code3[code3] = [];
			var found = result.code3[code3].filter( co => { return co.alpha3===c.alpha3 });
			if(!found.length) result.code3[code3].push(c);
		}
		
	})

})









// result.countries.forEach( c => {
// 	console.log('COUNTRY', c )
// })


// slowly show all countries in result
let l = (i) => {
	let loop = () =>{
		console.log('\r\n', result.countries[i]);
		if(result.countries[++i]) setTimeout( loop, 100 );
	}
	loop();
}
// l(0);


// slowly show all countries in code2
l = (i) => {
	let keys = Object.keys(result.code2);
	let loop = () =>{
		console.log('\r\n', keys[i], '\r\n', result.code2[ keys[i] ]);
		if(keys[++i]) setTimeout( loop, 100 );
	}
	loop();
}
// l(0);


// slowly show all countries in code3
l = (i) => {
	let keys = Object.keys(result.code3);
	let loop = () =>{
		console.log('\r\n', keys[i], '\r\n', result.code3[ keys[i] ]);
		if(keys[++i]) setTimeout( loop, 100 );
	}
	loop();
}
// l(0);





// console.log('BEAUTIFUL', beautify( result, null, 2, 80 ))

fs.writeFile('countries.json', beautify( result, null, 2, 80 ))