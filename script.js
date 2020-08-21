const characterAmountRange = document.querySelector(".characterAmountRange");
const characterAmountNumber = document.querySelector(".characterAmountNumber");
const includeLowercaseElement = document.querySelector(".includeLowercase");
const includeUppercaseElement = document.querySelector(".includeUppercase");
const includeNumbersElement = document.querySelector(".includeNumbers");
const includeSymbolsElement = document.querySelector(".includeSymbols");
const generateBtn = document.querySelector(".generate");
const passDisplay = document.querySelector(".passDisplay");
const form = document.querySelector(".passwordGeneratorForm");

//Adds password generating event to password generating button, as well as giving the user options to include other characters other than the lowercase letters.
window.onload = () => {
  generateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const characterAmount = characterAmountNumber.value;
    const includeLowercase = includeLowercaseElement.checked;
    const includeUppercase = includeUppercaseElement.checked;
    const includeNumbers = includeNumbersElement.checked;
    const includeSymbols = includeSymbolsElement.checked;
    const password = generatePassword(
      characterAmount,
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );
    passDisplay.value = password;
  });

  ///Randomizes selected characters.
  function generatePassword(
    characterAmount,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols
  ) {
    let charHolder = [];
    let passwordCharacters = []; //str
    const lowercaseCharCodes = arrayFromLowToHigh(97, 122); //lowercase ASCII codes
    const uppercaseCharCodes = arrayFromLowToHigh(65, 90); //uppercase ASCII codes
    const numberCharCodes = arrayFromLowToHigh(48, 57); // number ASCII codes
    const symbolCharCodes = arrayFromLowToHigh(33, 47) //special character ASCII codes
      .concat(arrayFromLowToHigh(58, 64))
      .concat(arrayFromLowToHigh(91, 96))
      .concat(arrayFromLowToHigh(123, 126));

    if (includeLowercase) {
      charHolder = charHolder.concat(lowercaseCharCodes);
      let randomLower = Math.floor(Math.random() * lowercaseCharCodes.length);
      passwordCharacters.push(lowercaseCharCodes[randomLower]);
    }

    if (includeUppercase) {
      charHolder = charHolder.concat(uppercaseCharCodes);
      let randomUpper = Math.floor(Math.random() * uppercaseCharCodes.length);
      passwordCharacters.push(uppercaseCharCodes[randomUpper]);
    }

    if (includeNumbers) {
      charHolder = charHolder.concat(numberCharCodes);
      let randomNumber = Math.floor(Math.random() * numberCharCodes.length);
      passwordCharacters.push(numberCharCodes[randomNumber]);
    }

    if (includeSymbols) {
      charHolder = charHolder.concat(symbolCharCodes);
      let randomSymbol = Math.floor(Math.random() * symbolCharCodes.length);
      passwordCharacters.push(symbolCharCodes[randomSymbol]);
    }
    console.log("charHolder", charHolder);
    console.log("passwordCharacters", passwordCharacters);

    let counter = characterAmount - passwordCharacters.length;
    for (let i = 0; i < counter; i++) {
      let randomCharacter = Math.floor(Math.random() * charHolder.length);
      passwordCharacters.push(charHolder[randomCharacter]);

      console.log("password characters", passwordCharacters);
      console.log("random Character index", randomCharacter);
    }
    console.log(
      "password",
      String.fromCharCode.apply(String, passwordCharacters)
    );
    return String.fromCharCode.apply(String, passwordCharacters);
  }

  ///Allows arrays to be created in numerical order for ASCII codes.
  const arrayFromLowToHigh = (low, high) => {
    const array = [];
    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  };

  ///Syncs range bar and number input to set amount of characters in password.
  const syncCharacterAmount = (e) => {
    const value = e.target.value;
    characterAmountNumber.value = value;
    characterAmountRange.value = value;
  };

  characterAmountNumber.addEventListener("input", syncCharacterAmount);
  characterAmountRange.addEventListener("input", syncCharacterAmount);

  ///Copies generated password to computer clipboard.
};

const copyClip = () => {
  document.querySelector(".pass-display").select();

  document.execCommand("Copy");
};
