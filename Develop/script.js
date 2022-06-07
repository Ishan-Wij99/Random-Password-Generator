

// HTML selectors
const generateBtn = document.querySelector("#generate");
const areaToWritePassword = document.querySelector('#password');

// a function that creates an array, we can use this to create a custom array of charcodes
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



// refactoring the code - creating external functions that prevent us from repeating ourselves in our code

const includeCharacterType = function(characterType) {
  return prompt(`Would you like to include ${characterType} in your password? (y/n)`);
}

const whileLoopCharacterType = function(characterType) {
  return prompt(`You did not type 'y' or 'n'. Please type 'y' if you wish to include ${characterType}, or 'n' if you don't want to include them.`);
}

const convertingYandN = function(includeVariable) {
    if(includeVariable == 'y') {
    includeVariable = true;
    } else if(includeVariable == 'n') {
    includeVariable = false;
    }

    return includeVariable;
}

const creatingCharCodesArray = function(includeVariable, array, charCodeType) {
  if(includeVariable) {
    array = array.concat(charCodeType);
  }

  return array;
}







// creating a function that randomly generates a password based off certain conditions
// TO RANDOMLY GENERATE A WORD, YOU MUST FIRST RANDOMLY GENERATE A CHARACTER, AND YOU ONLY KNOW HOW TO RANDOMLY GENERATE A NUMBER. THANKFULLY, THERE IS A BUILT IN METHOD CALLED fromCharCode() that converts any number into a corresponding character
// THIS IS HOW YOU COME UP WITH RANDOM PHRASES AND WORDS

const generatePassword = function() {

  // ask user how many characters they want in their generated password
  let characterNumber = Number(prompt('How many characters long would you like your password to be? Choose between 8 to 128.'));

  // if the user doesn't type a number between 8 and 128, repeat the prompt until they do, keep redefining characterNumber
  while(characterNumber < 8 || characterNumber > 128) {
    characterNumber = Number(prompt('The number you chose was not between 8 and 128, type again how many characters you would like in your password.'));
  }
  // fix bug here where user might write something that isn't a number



  // ask user if they want to include lowercase letters in ther generated password
  let includeLowercase = includeCharacterType('lowercase letters');

  // if the user doesn't type 'y' or 'n' , repeat the prompt until they do, keep redefining includeLowercase
  while(includeLowercase !== 'y' && includeLowercase !== 'n') {
    includeLowercase = whileLoopCharacterType('lowercase letters')
  }

  

  // ask user if they want to include uppercase letters in their generated password
  let includeUppercase = includeCharacterType('uppercase letters');

  // if the user doesn't type 'y' or 'n' , repeat the prompt until they do, keep redefining includeUppercase
  while(includeUppercase !== 'y' && includeUppercase !== 'n') {
    includeUppercase = whileLoopCharacterType('uppercase letters');
  }



  // ask user if they want to include numbers in their generated password
  let includeNumbers = includeCharacterType('numbers');

  // if the user doesn't type 'y' or 'n' , repeat the prompt until they do, keep redefining includeNumbers
  while(includeNumbers !== 'y' && includeNumbers !== 'n') {
    includeNumbers = whileLoopCharacterType('numbers');
  }



  // ask user if they want to include symbols in their generated password
  let includeSymbols = includeCharacterType('symbols');

  // if the user doesn't type 'y' or 'n' , repeat the prompt until they do, keep redefining includeSymbols
  while(includeSymbols !== 'y' && includeSymbols !== 'n') {
    includeSymbols = whileLoopCharacterType('symbols');
  }



  // check if at least one of the character types were included. You need at least one character type to generate a random password
  if(includeLowercase === 'n' && includeUppercase === 'n' && includeNumbers === 'n' && includeSymbols === 'n') {
    let redefineIncludedChar = prompt("You have not included any types of characters, at least one type is needed to generate a random password. Choose one which you would like to include. Type 'l' for lowercase, 'u' for uppercase, 'n' for numbers, 's' for symbols.")

    // if they didn't type 'l' 'u' 'n' or 's' , repeat the prompt until they do, keep redefining the variable
    while(redefineIncludedChar !== 'l' && redefineIncludedChar !== 'u' && redefineIncludedChar !== 'n' && redefineIncludedChar !== 's') {
      redefineIncludedChar = prompt("You did not choose a valid letter. Type 'l' for lowercase, 'u' for uppercase, 'n' for numbers, 's' for symbols.")
    }

    // need to add code here, completely forgot about this part of the code

  }



  // converting 'y' and 'n' to true and false
  includeLowercase = convertingYandN(includeLowercase);
  
  includeUppercase = convertingYandN(includeUppercase);

  includeNumbers = convertingYandN(includeNumbers);

  includeSymbols = convertingYandN(includeSymbols);




  
  // creating an array of all the character options depending on the choices made by user
  let charCodes = [];

  charCodes = creatingCharCodesArray(includeLowercase, charCodes, lowercaseCharCodes);
  
  charCodes = creatingCharCodesArray(includeUppercase, charCodes, uppercaseCharCodes);

  charCodes = creatingCharCodesArray(includeNumbers, charCodes, numberCharCodes);

  charCodes = creatingCharCodesArray(includeSymbols, charCodes, symbolCharCodes);




  // actually generating the random password
  let passwordCharacters = [];

  for(let i=0; i<characterNumber; i++) {
    let randomCharacterNumber = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(randomCharacterNumber));
  }

  let randomPasswordFinal = passwordCharacters.join('');



  // displaying the random password on the webpage 
  areaToWritePassword.value = randomPasswordFinal;

}





// when 'Generate password' button is clicked, execute generatePassword function
generateBtn.addEventListener('click', generatePassword);








