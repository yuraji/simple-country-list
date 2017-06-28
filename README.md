# Simple Country List

Intended usage: Country selector

This list uses data from `country-data` package, and reformats it for easier usage in a country selector scenario.

    # npm install simple-country-list
    var countriesData = require('simple-country-list');
    
    countriesData.countries = [
      // ...
      {
        "code2": [ "GB", "UK" ],
        "code3": [ "GBR" ],
        "alpha2": "GB",
        "alpha3": "GBR",
        "name": "United Kingdom",
        "emoji": "🇬🇧"
      },
      // ...
    ] // array of countries
    
    countriesData.code2.UK = [
        { // first is always the country with this alpha2
          code2: [ "GB", "UK" ],
          code3: [ "GBR" ],
          alpha2: "GB",
          alpha3: "GBR",
          name: "United Kingdom",
          emoji: "🇬🇧"
        },
        { // another country matching beginning
          code2: [ "UA" ],
          code3: [ "UKR" ],
          alpha2: "UA",
          alpha3: "UKR",
          name: "Ukraine",
          emoji: "🇺🇦"
        }
      ]
    
    countriesData.code3.AUS = [
        { // first is always the country with this alpha3
          code2: [ 'AU' ],
          code3: [ 'AUS' ],
          alpha2: "AU",
          alpha3: 'AUS',
          name: 'Australia',
          emoji: '🇦🇺' 
        },
        { // another country matching beginning
          code2: [ 'AT' ],
          code3: [ 'AUT' ],
          alpha2: "AT",
          alpha3: 'AUT',
          name: 'Austria',
          emoji: '🇦🇹' 
        }
      ],
    
  
  
  
  
