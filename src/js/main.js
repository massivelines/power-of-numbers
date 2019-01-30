define([
  'module',
  'modules/custFormulas',
  'modules/intFormulas',
  'modules/buildDom',
  'modules/methods',
], function(module, custFormulas, intFormulas, buildDom, methods) {
  var formulas;
  var defaultFormula;

  if (module.config().formula == 'customer') {
    formulas = custFormulas;
    defaultFormula = 'pennyProfit';
  } else if (module.config().formula == 'internal') {
    formulas = intFormulas;
    defaultFormula = 'marginalContributionCurrentYear';
  }

  // gets any sessonStoage data between pages on first load and refreshes
  var currentValues = methods.getSessionValues();
  var currentFormula;
  var currentArguments;
  var currentOutputType;

  // Build dropdown list and addEventListener to each div
  for (key in formulas) {
    var listItem = buildDom.dropDownItem(formulas[key]);
    listItem.addEventListener('click', function(data) {
      // sets title of button when clicked
      document.getElementById('dropdownButton').innerHTML =
        formulas[this.id].title;
      // updates input-wrapper and button title
      updateInputDom(this.id);
    });
    document.getElementById('dropdownList').appendChild(listItem);
  }

  // Update Input Dom
  // ---------------
  function updateInputDom(domId) {
    // Updates the Input Dom when dropdown item is selected
    // while inputContainer has children remove them
    var inputContainer = document.getElementById('inputContainer');
    while ((child = inputContainer.firstChild)) {
      child.remove();
    }

    // set current formula, arguments, output type
    currentFormula = formulas[domId].formula;
    currentArguments = methods.getArgs(formulas[domId].formula);
    currentOutputType = formulas[domId].outputType;

    // returns array for sections or object for singles
    var inputObj = buildDom.formInput(formulas[domId]);

    // test if array else object
    if (Array.isArray(inputObj)) {
      var formHeader = buildDom.formHeader();
      inputContainer.appendChild(formHeader);

      inputObj.forEach(function(inputHolder) {
        // inputContainer.appendChild(inputHolder);
        buildInputItems(inputHolder);
      });
    } else {
      for (var key in inputObj) {
        buildInputItems(inputObj[key]);
      }
    }

    function buildInputItems(inputObj) {
      // get the input item and set on input, value, and append
      var inputItem = inputObj.getElementsByTagName('INPUT')[0];
      var inputItemArray = inputObj.getElementsByTagName('INPUT');

      for (var i = 0; i < inputItemArray.length; i++) {
        inputItemArray[i].oninput = function() {
          inputChange(this);
        };

        inputItemArray[i].onclick = function() {
          if (typeof this.selectionStart == 'number') {
            this.selectionStart = this.selectionEnd = this.value.length;
            // set the color back to black after its moved
            this.style.caretColor = 'auto';
          } else if (typeof this.createTextRange != 'undefined') {
            this.focus();
            var range = this.createTextRange();
            range.collapse(false);
            range.select();
            // set the color back to black after its moved
            this.style.caretColor = 'auto';
          }
        };

        // sets input value if it has already been set
        if (currentValues[inputItemArray[i].id]) {
          inputItemArray[i].value = currentValues[inputItemArray[i].id];
        } else {
          inputItemArray[i].value = formatInputValue(inputItemArray[i]);
        }
      }
      inputContainer.appendChild(inputObj);
    }

    updateTotal();
  }

  function formatInputValue(data) {
    var sanitizeValue = methods.sanitizeInput(data.value);
    var currentValue = sanitizeValue;

    if (currentValue.length === 0) {
      currentValue = 0;
    }

    if (data.dataset.format == 'currency') {
      var currentValueString = currentValue.toString().replace('.', '');

      // if value is only one number add a 0 in front of it
      if (currentValueString.length < 2) {
        currentValueString = '0' + currentValueString;
      }

      var outputTotalString =
        currentValueString.substring(0, currentValueString.length - 2) +
        '.' +
        currentValueString.substring(currentValueString.length - 2);

      var outputTotal = parseFloat(outputTotalString);
      var output = outputTotal.toFixed(2);
      return output;
    } else {
      return parseFloat(currentValue);
    }
  }

  // called  when input changes
  function inputChange(data) {
    // sets input value to currentValues object by input id
    // save inputs id and value in session storage
    var formatedValue = formatInputValue(data);
    // currentValues[data.id] = Number(formatedValue);
    currentValues[data.id] = formatedValue;
    methods.setSessionValues(data.id, formatedValue);
    updateTotal();
    return (data.value = formatedValue);
  }

  // Update Total
  // ---------------
  function updateTotal() {
    // map through currentArguments get their values and set to new array
    var totalArray = currentArguments.reduce(function(arr, data) {
      var testValue = Number(currentValues[data]);

      // if (!isNaN(testValue) && testValue.length > 0 && isFinite(testValue)) {
      // if a number push to array
      if (!isNaN(testValue) && testValue != 0) {
        arr.push(currentValues[data]);
      }
      return arr;
    }, []);

    // change output
    buildDom.outputTotal(
      currentFormula.apply(null, totalArray),
      currentOutputType,
    );
  }

  // Form Reset
  // ---------------
  document.getElementById('reset').onclick = function(event) {
    // Currently resets whole form
    event.preventDefault();
    currentArguments.forEach(function(id) {
      document.getElementById(id).value = '';
      document.getElementById(id).value = inputChange(
        document.getElementById(id),
      );
    });
    currentValues = {};
    buildDom.outputTotal(undefined, currentOutputType);
    sessionStorage.clear();
  };

  // sets the default loading formulas
  function init() {
    // var defaultFormula = 'marginalContributionCurrentYear';
    document.getElementById('dropdownButton').innerHTML =
      formulas[defaultFormula].title;
    updateInputDom(defaultFormula);
  }
  init();

  // ----------------------------------------------------------
  // Form Submit
  document.getElementById('form').onsubmit = function(event) {
    event.preventDefault();
    document.getElementById('reset').focus();
    document.getElementById('reset').blur();
  };

  // Dropdown Toggle
  // Toggles show class on dropdownList div when button clicked
  document.getElementById('dropdownButton').onclick = function() {
    document.getElementById('dropdownList').classList.toggle('show');
  };
  // Close the dropdownList div if when clicked outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropdown-button')) {
      if (dropdownList.classList.contains('show')) {
        dropdownList.classList.remove('show');
      }
    }
  };

  // Set App min height for mobile recalculate on resize
  var screenHeight = window.innerHeight * 0.01;
  document.documentElement.style.setProperty(
    '--screenHeight',
    `${screenHeight}px`,
  );

  window.addEventListener('resize', function() {
    screenHeight = window.innerHeight * 0.01;
    document.documentElement.style.setProperty(
      '--screenHeight',
      `${screenHeight}px`,
    );
  });
});
