// Builds Dom Elements
// ---------------
define(function(require) {
  // Dropdown list
  // ---------------
  function dropDownItem(formulasObj) {
    var listItem = document.createElement('div');
    listItem.className = 'formula';
    listItem.id = formulasObj.id;
    listItem.innerHTML = formulasObj.title;
    return listItem;
  }

  // Form Header (on desktop when multi input boxes)
  // ---------------
  function formHeader() {
    var formHeaderDiv = document.createElement('div');
    formHeaderDiv.className = 'form-header';
    var currentYear = document.createElement('div');
    currentYear.className = 'year-title';
    currentYear.innerHTML = 'Current Year';
    var priorYear = document.createElement('div');
    priorYear.className = 'year-title';
    priorYear.innerHTML = 'Prior Year';

    formHeaderDiv.append(currentYear);
    formHeaderDiv.append(priorYear);

    return formHeaderDiv;
  }

  // Input Boxes
  // ---------------
  function formInput(inputObj) {
    if (inputObj.hasOwnProperty('sections')) {
      var inputArr = [];
      for (var key in inputObj.sections) {
        inputArr.push(buildSectionInputLabel(inputObj.sections[key]));
      }
      return inputArr;
    } else {
      return buildSingleInputLabel(inputObj);
    }

    function buildSingleInputLabel(inputObj) {
      var inputHolderObj = {};

      for (key in inputObj.inputs) {
        // input-holder div
        var inputHolder = document.createElement('div');
        inputHolder.className = 'input-holder';

        // input label
        var inputLabel = document.createElement('label');
        inputLabel.setAttribute('for', inputObj.inputs[key].id);
        inputLabel.innerHTML = inputObj.inputs[key].label;

        // input boxes
        var input = document.createElement('input');
        input.type = 'tel';
        input.setAttribute('inputmode', 'numeric');
        input.autocomplete = 'off';
        input.dataset.format = inputObj.inputs[key].dataFormat;
        input.id = inputObj.inputs[key].id;
        input.name = inputObj.inputs[key].id;
        input.pattern = inputObj.inputs[key].pattern;

        inputHolder.append(inputLabel);
        inputHolder.append(input);
        inputHolderObj[key] = inputHolder;
      }
      return inputHolderObj;
    }

    function buildSectionInputLabel(inputObj) {
      // input-holder div
      var inputHolder = document.createElement('div');
      inputHolder.className = 'input-holder section';

      var inputTitle = document.createElement('div');
      inputTitle.className = 'input-title';
      inputTitle.innerHTML = inputObj.title;
      inputHolder.append(inputTitle);

      for (key in inputObj.inputs) {
        var inputWrapper = document.createElement('div');
        inputWrapper.className = 'input-wrapper';

        // input label
        var inputLabel = document.createElement('label');
        inputLabel.setAttribute('for', inputObj.inputs[key].id);
        if (inputObj.inputs[key].year == 'current') {
          inputLabel.innerHTML = 'Current Year';
        } else {
          inputLabel.innerHTML = 'Prior Year';
        }

        // input boxes
        var input = document.createElement('input');
        input.type = 'tel';
        input.setAttribute('inputmode', 'numeric');
        input.autocomplete = 'off';
        input.dataset.format = inputObj.inputs[key].dataFormat;
        input.id = inputObj.inputs[key].id;
        input.name = inputObj.inputs[key].id;
        input.pattern = inputObj.inputs[key].pattern;

        inputWrapper.append(inputLabel);
        inputWrapper.append(input);
        inputHolder.append(inputWrapper);

        // inputHolder.append(inputLabel);
        // inputHolder.append(input);
      }
      return inputHolder;
    }
  }

  // Total Box
  // ---------------
  function outputTotal(total, outputType) {
    switch (outputType) {
      case 'currency':
        if (isNaN(total) || !isFinite(total)) {
          document.getElementById('outputTotal').innerHTML = '$0.00';
        } else {
          total = total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          document.getElementById('outputTotal').innerHTML = '$' + total;
        }
        break;

      case 'percentage':
        if (isNaN(total) || !isFinite(total)) {
          document.getElementById('outputTotal').innerHTML = '0.0%';
        } else {
          total = total * 100;
          document.getElementById('outputTotal').innerHTML =
            total.toFixed(1) + '%';
        }
        break;

      case 'rounded':
        if (isNaN(total) || !isFinite(total)) {
          document.getElementById('outputTotal').innerHTML = '0.0';
        } else {
          document.getElementById('outputTotal').innerHTML = total.toFixed(1);
        }
        break;

      case 'integer':
        if (isNaN(total) || !isFinite(total)) {
          document.getElementById('outputTotal').innerHTML = '0';
        } else {
          document.getElementById('outputTotal').innerHTML = total.toFixed(0);
        }
        break;

      default:
        break;
    }
  }

  return {
    dropDownItem: dropDownItem,
    formHeader: formHeader,
    formInput: formInput,
    outputTotal: outputTotal,
  };
});
