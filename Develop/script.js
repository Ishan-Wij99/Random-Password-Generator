// Assignment code here


// Get references to the #generate element
const generateBtn = document.querySelector("#generate");



// a function that creates an array
const arrayLowToHigh = function(low, high) {
  const array = [];

  for (let i=low; i<=high; i++) {
    array.push(i);
  }

  return array;
}



// arrays that contain the charcodes for each type of character
const uppercaseCharCodes = arrayLowToHigh(65, 90);
const lowercaseCharCodes = arrayLowToHigh(97, 122);
const numberCharCodes = arrayLowToHigh(48, 57);
const symbolCharCodes = arrayLowToHigh(33, 47).concat(arrayLowToHigh(58, 64)).concat(arrayLowToHigh(91, 96)).concat(arrayLowToHigh(123, 126));



// creating a function for randomly generating a password based off certain conditions
// TO RANDOMLY GENERATE A WORD, YOU MUST FIRST RANDOMLY GENERATE A CHARACTER, AND YOU ONLY KNOW HOW TO RANDOMLY GENERATE A NUMBER. THANKFULLY, THERE IS A BUILT IN METHOD CALLED fromCharCode() that converts any number into a corresponding character
// THIS IS HOW YOU COME UP WITH RANDOM PHRASES AND WORDS

const generatePassword = function() {
  // ask user how many characters they want in their generated password
  const characterNumber = Number(prompt('How many characters'));
  let includeUppercase = prompt('Include uppercase? (y/n)');
  let includeNumbers = prompt('Include numbers? (y/n)');
  let includeSymbols = prompt('Include symbols? (y/n)');
  
  if(includeUppercase == 'y') {
    includeUppercase = true;
  } else if(includeUppercase == 'n') {
    includeUppercase = false;
  }

  if(includeNumbers == 'y') {
    includeNumbers = true;
  } else if(includeNumbers == 'n') {
    includeNumbers = false;
  }

  if(includeSymbols == 'y') {
    includeSymbols = true;
  } else if(includeSymbols == 'n') {
    includeSymbols = false;
  }

  let charCodes = lowercaseCharCodes;
  if(includeUppercase) {
    charCodes = charCodes.concat(uppercaseCharCodes);
  }

  if(includeNumbers) {
    charCodes = charCodes.concat(numberCharCodes);
  }

  if(includeSymbols) {
    charCodes = charCodes.concat(symbolCharCodes);
  }

1
  let passwordCharacters = [];
  for(let i=0; i<characterNumber; i++) {
    let randomCharacterNumber = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(randomCharacterNumber));
  }

  let randomPasswordFinal = passwordCharacters.join('');
  console.log(randomPasswordFinal);

  return randomPasswordFinal;
}

generatePassword();










// Write password to the #password input
function writePassword() {
  const password = generatePassword();
  const passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
