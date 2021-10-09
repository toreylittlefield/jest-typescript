import languageCodes from './utils/languageCodes';
import httpRequest from './utils/http-request';

const { languageInEnglish, alpha2Codes } = languageCodes;

const capitalize = (language) => {
  return language.charAt(0).toUpperCase() + language.toLowerCase().slice(1);
};

const getAlpha2Code = (language) => {
  const codeIndex = languageInEnglish.indexOf(language);
  const alpha2Code = codeIndex && alpha2Codes[codeIndex];
  return alpha2Code;
};

const countryExtractor = (countriesObject) => {
  const countriesArray = [];
  for (const country in countriesObject) {
    countriesArray.push(countriesObject[country].name);
  }
  return countriesArray;
};

const countryListLookup = async (alpha2Code, handleResponse) => {
  try {
    const res = await httpRequest(alpha2Code);
    handleResponse(res.data);
  } catch (error) {
    return console.error(error);
  }
};

countryListLookup('ita', console.log);

const getResponse = (language, listOfPlaces) => {
  return `${capitalize(language)} is spoken in ${listOfPlaces.length} countries around the world`;
};

export { capitalize, getAlpha2Code, countryExtractor, countryListLookup, getResponse };
