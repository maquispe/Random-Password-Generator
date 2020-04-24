var characterAmountRange = document.querySelector(".characterAmountRange");
var characterAmountNumber = document.querySelector(".characterAmountNumber");
var includeUppercaseElement = document.querySelector(".includeUppercase");
var includeNumbersElement = document.querySelector(".includeNumbers");
var includeSymbolsElement = document.querySelector(".includeSymbols");
var passDisplay = document.querySelector(".passDisplay");
var form = document.querySelector(".passwordGeneratorForm");

///Makes arrays out of ASCII character codes for lowercase letters, uppercase letters, numbers, and special symbols.
var lowercaseCharCodes = arrayFromLowToHigh(97, 122);
var uppercaseCharCodes = arrayFromLowToHigh(65, 90);
var numberCharCodes = arrayFromLowToHigh(48, 57);
var symbolCharCodes = arrayFromLowToHigh(33, 47)
  .concat(arrayFromLowToHigh(58, 64))
  .concat(arrayFromLowToHigh(91, 96))
  .concat(arrayFromLowToHigh(123, 126));

///Adds password generating event to password generating button, as well as giving the user options to include other characters other than the lowercase letters.
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var characterAmount = characterAmountNumber.value;
  var includeUppercase = includeUppercaseElement.checked;
  var includeNumbers = includeNumbersElement.checked;
  var includeSymbols = includeSymbolsElement.checked;
  var password = generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  );
  passDisplay.value = password;
});

///Randomizes selected characters, with the lowercase letters set as a default to be included at all times.
function generatePassword(
  characterAmount,
  includeUppercase,
  includeNumbers,
  includeSymbols
) {
  var charCodes = lowercaseCharCodes;
  if (includeUppercase) charCodes = charCodes.concat(uppercaseCharCodes);
  if (includeNumbers) charCodes = charCodes.concat(numberCharCodes);
  if (includeSymbols) charCodes = charCodes.concat(symbolCharCodes);

  var passwordCharacters = [];
  for (var i = 0; i < characterAmount; i++) {
    var characterCode = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordCharacters.push(String.fromCharCode(characterCode));
  }
  return passwordCharacters.join("");
}

///Allows arrays to be created in numerical order for ASCII codes.
function arrayFromLowToHigh(low, high) {
  var array = [];
  for (var i = low; i <= high; i++) {
    array.push(i);
  }
  return array;
}

///Syncs range bar and number input to set amount of characters in password.
characterAmountNumber.addEventListener("input", syncCharacterAmount);
characterAmountRange.addEventListener("input", syncCharacterAmount);

function syncCharacterAmount(e) {
  var value = e.target.value;
  characterAmountNumber.value = value;
  characterAmountRange.value = value;
}

///Copies generated password to computer clipboard.
function copyClip() {
  document.querySelector(".pass-display").select();

  document.execCommand("Copy");
}

console.log(symbolCharCodes);
