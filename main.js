// ================================
// DOM ELEMENTS
// ================================

const billInput = document.querySelector('[data-js="bill-input"]');
const peopleInput = document.querySelector('[data-js="people-input"]');
const customTipInput = document.querySelector('[data-js="custom-tip-input"]');

const tipButtons = document.querySelectorAll('[data-js="tip-button"]');

const tipAmountOutput = document.querySelector('[data-js="tip-amount"]');
const totalAmountOutput = document.querySelector('[data-js="total-amount"]');

const resetButton = document.querySelector('[data-js="reset-button"]');

const peopleError = document.querySelector('#people-error');


// ================================
// APP STATE
// ================================

let bill = 0;
let tip = 0;
let people = 0;


// ================================
// EVENT LISTENERS
// ================================

// BILL INPUT
billInput.addEventListener('input', () => {
  bill = Number(billInput.value);

  calculate();
  toggleResetButton();
});


// PEOPLE INPUT
peopleInput.addEventListener('input', () => {
  people = Number(peopleInput.value);

  validatePeople();

  calculate();
  toggleResetButton();
});


// TIP BUTTONS
tipButtons.forEach((button) => {
  button.addEventListener('click', () => {

    // Remove active class from all buttons
    removeActiveTipButtons();

    // Add active class to clicked button
    button.classList.add('tip-selector__button--active');

    // Save tip value
    tip = Number(button.dataset.tip);

    // Clear custom tip input
    customTipInput.value = '';

    calculate();
    toggleResetButton();
  });
});


// CUSTOM TIP INPUT
customTipInput.addEventListener('input', () => {

  // Remove active state from preset buttons
  removeActiveTipButtons();

  // Save custom tip
  tip = Number(customTipInput.value);

  calculate();
  toggleResetButton();
});


// RESET BUTTON
resetButton.addEventListener('click', resetCalculator);


// ================================
// FUNCTIONS
// ================================


// REMOVE ACTIVE BUTTONS
function removeActiveTipButtons() {
  tipButtons.forEach((button) => {
    button.classList.remove('tip-selector__button--active');
  });
}


// VALIDATE PEOPLE INPUT
function validatePeople() {

  // SHOW ERROR
  if (people === 0 && peopleInput.value !== '') {

    peopleError.hidden = false;

    peopleInput.classList.add('form-group__input--error');

    return;
  }

  // HIDE ERROR
  peopleError.hidden = true;

  peopleInput.classList.remove('form-group__input--error');
}


// CHECK IF APP CAN CALCULATE
function canCalculate() {
  return (
    bill > 0 &&
    tip > 0 &&
    people > 0
  );
}


// MAIN CALCULATION
function calculate() {

  // Stop if form is incomplete
  if (!canCalculate()) {

    resetOutputs();

    return;
  }

  // Tip amount per person
  const tipAmount =
    ((bill * tip) / 100) / people;

  // Total amount per person
  const totalAmount =
    (bill + ((bill * tip) / 100)) / people;

  updateDisplay(tipAmount, totalAmount);
}


// UPDATE UI
function updateDisplay(tipAmount, totalAmount) {

  tipAmountOutput.textContent =
    `$${tipAmount.toFixed(2)}`;

  totalAmountOutput.textContent =
    `$${totalAmount.toFixed(2)}`;
}


// RESET OUTPUTS
function resetOutputs() {

  tipAmountOutput.textContent = '$0.00';

  totalAmountOutput.textContent = '$0.00';
}


// ENABLE / DISABLE RESET BUTTON
function toggleResetButton() {

  const hasValues =
    bill > 0 ||
    tip > 0 ||
    people > 0;

  resetButton.disabled = !hasValues;
}


// RESET APP
function resetCalculator() {

  // RESET STATE
  bill = 0;
  tip = 0;
  people = 0;

  // RESET INPUTS
  billInput.value = '';

  peopleInput.value = '';

  customTipInput.value = '';

  // REMOVE ACTIVE BUTTONS
  removeActiveTipButtons();

  // HIDE ERRORS
  peopleError.hidden = true;

  peopleInput.classList.remove('form-group__input--error');

  // RESET OUTPUTS
  resetOutputs();

  // DISABLE RESET BUTTON
  resetButton.disabled = true;
}