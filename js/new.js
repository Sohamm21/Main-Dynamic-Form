document.getElementById("edit-form-title").addEventListener("click", function () {
    var formTitle = document.getElementById("form-title");
    var newFormTitle = document.createElement("input");
    newFormTitle.className = "form-title-text";
    newFormTitle.type = "text";
    newFormTitle.value = formTitle.innerText;
    formTitle.innerHTML = "";
    formTitle.appendChild(newFormTitle);

    newFormTitle.addEventListener("blur", function () {
        var updatedTitle = newFormTitle.value;
        formTitle.removeChild(newFormTitle);

        if (updatedTitle.trim() === "") {
            alert("Title cannot be blank");
            formTitle.innerText = "Untitled Form";
        } else {
            formTitle.innerText = updatedTitle;
            document.title = updatedTitle;
        }
    });

    newFormTitle.focus();
});

function addQuestionLabel(text, elementType, className, blurCallback) {
    var labelContainer = document.createElement("div");
    labelContainer.className = "label-container";

    var question = document.createElement(elementType);
    question.textContent = text;
    question.className = className;
    labelContainer.appendChild(question);

    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button";
    labelContainer.appendChild(editButton);

    var isEditing = false;

    function enableEdit() {
        if (isEditing) {
            return;
        }
        event.preventDefault();
        isEditing = true;

        var inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.className = "new-form-title-text";
        inputElement.value = question.textContent;

        question.innerHTML = "";
        question.appendChild(inputElement);

        inputElement.addEventListener("blur", function () {
            var updatedText = inputElement.value;
            question.removeChild(inputElement);
            question.textContent = updatedText;

            if (question.textContent == "") {
                alert("Please fill the required field");
                question.textContent = "Click here to write something";
            }

            isEditing = false; // Reset the editing state

            if (blurCallback) {
                blurCallback(updatedText);
            }
        });

        inputElement.focus();
    }

    question.addEventListener("click", function (event) {
        if (!isEditing) {
            enableEdit();
        }
    });

    editButton.addEventListener("click", enableEdit);

    return labelContainer;
}

var storedFormData = localStorage.getItem('formData');
if (storedFormData) {
    console.log(storedFormData);
    var formData = JSON.parse(storedFormData);
    console.log(formData);

    var inputFields = formData.inputFields;

    var lastGroupNamesByTagName = {};

    formData.inputFields.forEach(function (inputField) {
        var tagName = inputField.tagName;
        var typeName = inputField.type;
        var groupName = inputField.groupName;

        if (typeName === 'radio' || typeName === 'checkbox') {
            lastGroupNamesByTagName[typeName] = groupName;
        }
        else{
            lastGroupNamesByTagName[tagName] = groupName;
        }
    });

    console.log(lastGroupNamesByTagName);

    if (lastGroupNamesByTagName['checkbox']) {
        var checkboxCounter = lastGroupNamesByTagName['checkbox'];
        checkboxCounter = checkboxCounter.substr(checkboxCounter.length - 1);
        checkboxCounter = parseInt(checkboxCounter) +1;
    }
    else {
        var checkboxCounter = 1;
    }

    if (lastGroupNamesByTagName['radio']) {
        var radioCounter = lastGroupNamesByTagName['radio'];
        radioCounter = radioCounter.substr(radioCounter.length - 1);
        radioCounter = parseInt(radioCounter) +1;
    }
    else {
        var radioCounter = 1;
    }

    if (lastGroupNamesByTagName['select']) {
        var dropdownCounter = lastGroupNamesByTagName['select'];
        dropdownCounter = dropdownCounter.substr(dropdownCounter.length - 1);
        dropdownCounter = parseInt(dropdownCounter) +1;
    }
    else {
        var dropdownCounter = 1;
    }
}
else {
    var checkboxCounter = 1;
    var radioCounter = 1;
    var dropdownCounter = 1;
}

document.getElementById('addField').addEventListener('click', function () {
    // getting the container divison
    document.getElementById('input-container').style.display = 'block';
    var inputContainer = document.getElementById("input-container");

    // creating a div with name input-wrapper
    var inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";


    // question for each wrapper
    var questionLabel = addQuestionLabel("Click here to write something", "h4", "question-label");
    inputWrapper.appendChild(questionLabel);

    // getting the input type user has selected from the dropdown
    var inputType = document.getElementById("inputType");
    var inputTypeValue = inputType.value;

    // Delete button
    var removeWrapper = document.createElement('button');
    removeWrapper.className = 'removeField';
    removeWrapper.textContent = 'Delete';

    var buttonsDiv = document.createElement("div");
    buttonsDiv.className = 'buttons-div';

    var inputDiv = document.createElement("div");
    inputDiv.className = 'input-div';

    // Add option button
    var addOption = document.createElement("button");
    addOption.className = "dropdown-add";
    addOption.textContent = "Add Option";

    // Hide options button
    var hideOption = document.createElement('button');
    hideOption.textContent = 'Hide Options';
    hideOption.className = 'removeField';

    var newline = document.createElement('br');

    // if user selects text as input field
    if (inputTypeValue === 'text') {
        var input = document.createElement("input");
        input.type = inputTypeValue;
        input.placeholder = "User will enter here";
        input.className = "form-control";
        inputWrapper.appendChild(input);
        inputWrapper.appendChild(removeWrapper);
    }
    // if user selects text as textarea field
    else if (inputTypeValue === 'textarea') {
        var input = document.createElement('textarea');
        input.className = 'textarea';
        input.addEventListener("input", function () {
            input.style.height = "auto";
            input.style.height = (input.scrollHeight) + "px";
        });

        inputWrapper.appendChild(input);
        inputWrapper.appendChild(removeWrapper);
    }
    // if user selects text as dropdown field
    else if (inputTypeValue === 'select') {

        var dropdownGrpName = 'dropdownGroup' + dropdownCounter;
        dropdownCounter++;

        inputWrapper.appendChild(inputDiv);
        inputWrapper.appendChild(buttonsDiv);

        var dropdownDiv = document.createElement("div");
        dropdownDiv.className = 'dropdown-div';
        inputWrapper.appendChild(dropdownDiv);

        var input = document.createElement('select');
        input.id = 'dropdown';
        input.name = dropdownGrpName;
        input.className = 'selection';

        // Add and Delete Buttons
        buttonsDiv.append(addOption);
        buttonsDiv.append(removeWrapper);

        var inputVisible = false;

        var optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.placeholder = "Enter the label";
        optionInput.className = "form-control";

        var valueInput = document.createElement("input");
        valueInput.type = "text";
        valueInput.placeholder = "Enter the value";
        valueInput.className = "form-control";

        // Display the input options
        addOption.addEventListener('click', function () {
            event.preventDefault();

            // if the input is not visible display it
            if (inputVisible === false) {
                buttonsDiv.appendChild(hideOption);
                inputDiv.appendChild(optionInput);
                inputDiv.appendChild(valueInput);
                inputVisible = true;
            }
            // if the input is visible dont display it directly take the input
            else {
                var optionValue = optionInput.value.trim();
                var valueDropdown = valueInput.value.trim();

                if (optionValue !== "" && valueDropdown !== "") {
                    var option = document.createElement("option");
                    option.value = valueDropdown.toLowerCase();
                    option.textContent = optionValue;
                    input.appendChild(option);
                    dropdownDiv.appendChild(input);
                    optionInput.value = "";
                    valueInput.value = "";
                }
            }


        });

        hideOption.addEventListener('click', function () {
            event.preventDefault();
            inputDiv.removeChild(optionInput);
            inputDiv.removeChild(valueInput);
            buttonsDiv.removeChild(hideOption);

            inputVisible = false;
        });
    }
    else if (inputTypeValue === 'checkbox') {
        var checkboxGrpName = 'checkboxGroup' + checkboxCounter;
        checkboxCounter++;

        inputWrapper.appendChild(inputDiv);
        inputWrapper.appendChild(buttonsDiv);

        var checkboxDiv = document.createElement('div');
        checkboxDiv.className = 'checkbox-div';
        inputWrapper.appendChild(checkboxDiv);


        // Add and Delete Buttons
        buttonsDiv.append(addOption);
        buttonsDiv.append(removeWrapper);

        var checkboxInputVisible = false;

        var optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.placeholder = "Enter the label";
        optionInput.className = "form-control";

        var valueInput = document.createElement("input");
        valueInput.type = "text";
        valueInput.placeholder = "Enter the value";
        valueInput.className = "form-control";

        // Display the input options
        addOption.addEventListener('click', function () {
            event.preventDefault();

            // if the input is not visible display it
            if (checkboxInputVisible === false) {
                buttonsDiv.appendChild(hideOption);
                inputDiv.appendChild(optionInput);
                inputDiv.appendChild(valueInput);
                checkboxInputVisible = true;
            }
            // if the input is visible dont display it directly take the input
            else {
                var checkboxOption = optionInput.value.trim();
                var checkboxValue = valueInput.value.trim();

                if (checkboxOption !== "" && checkboxValue !== "") {
                    var checkboxContainer = document.createElement('div');
                    checkboxContainer.className = 'checkbox-container';


                    // option and label
                    var option = document.createElement("input");
                    option.type = 'checkbox';
                    option.value = checkboxOption.toLowerCase();
                    option.name = checkboxGrpName;

                    var label = document.createElement('label');
                    label.htmlFor = checkboxValue;
                    label.textContent = checkboxOption;

                    optionInput.value = "";
                    valueInput.value = "";

                    checkboxContainer.appendChild(option);
                    checkboxContainer.appendChild(label);

                    checkboxDiv.appendChild(checkboxContainer);
                }
            }




        });

        hideOption.addEventListener('click', function () {
            event.preventDefault();
            inputDiv.removeChild(optionInput);
            inputDiv.removeChild(valueInput);
            buttonsDiv.removeChild(hideOption);

            checkboxInputVisible = false;
        });
    }
    // if user selects radio as radio button field
    else if (inputTypeValue === 'radio') {
        var radioGrpName = 'radioGroup' + radioCounter;
        radioCounter++;

        inputWrapper.appendChild(inputDiv);
        inputWrapper.appendChild(buttonsDiv);

        var radioDiv = document.createElement('div');
        radioDiv.className = 'radio-div';
        inputWrapper.appendChild(radioDiv);

        // Add and Delete Buttons
        buttonsDiv.append(addOption);
        buttonsDiv.append(removeWrapper);

        var radioInputVisible = false;

        var optionInput = document.createElement("input");
        optionInput.type = "text";
        optionInput.placeholder = "Enter the label";
        optionInput.className = "form-control";

        var valueInput = document.createElement("input");
        valueInput.type = "text";
        valueInput.placeholder = "Enter the value";
        valueInput.className = "form-control";

        // Display the input options
        addOption.addEventListener('click', function () {
            event.preventDefault();

            // if the input is not visible display it
            if (radioInputVisible === false) {
                buttonsDiv.appendChild(hideOption);
                inputDiv.appendChild(optionInput);
                inputDiv.appendChild(valueInput);
                radioInputVisible = true;
            }
            // if the input is visible dont display it directly take the input
            else {
                var radioOption = optionInput.value.trim();
                var radioValue = valueInput.value.trim();

                if (radioOption !== "" && radioValue !== "") {
                    var radioContainer = document.createElement('div');
                    radioContainer.className = 'radio-container';


                    // option and label
                    var option = document.createElement("input");
                    option.type = 'radio';
                    option.value = radioOption.toLowerCase();
                    option.name = radioGrpName;

                    var label = document.createElement('label');
                    label.htmlFor = radioValue;
                    label.textContent = radioOption;

                    optionInput.value = "";
                    valueInput.value = "";

                    radioContainer.appendChild(option);
                    radioContainer.appendChild(label);

                    radioDiv.appendChild(radioContainer);
                }
            }

        });

        hideOption.addEventListener('click', function () {
            event.preventDefault();
            inputDiv.removeChild(optionInput);
            inputDiv.removeChild(valueInput);
            buttonsDiv.removeChild(hideOption);

            radioInputVisible = false;
        });
    }


    removeWrapper.addEventListener('click', function () {
        event.preventDefault();
        inputWrapper.remove();
    });


    inputContainer.appendChild(inputWrapper);

    // submitting the form
    document.getElementById('form-submit').addEventListener('click', function () {
        event.preventDefault();

        // if any of the input fields for options are open close them
        if (inputVisible === true || checkboxInputVisible === true || radioInputVisible === true) {
            inputDiv.removeChild(optionInput);
            inputDiv.removeChild(valueInput);
            buttonsDiv.removeChild(hideOption);

            inputVisible = false;
            checkboxInputVisible = false;
            radioInputVisible = false;
        }
    });
});

function displayErrorMessage(inputWrapper, errorMessage) {
    if (!inputWrapper.querySelector(".error-message")) {
        var errorElement = document.createElement("div");
        errorElement.className = "error-message"; // You can style this class with CSS
        errorElement.textContent = errorMessage;

        inputWrapper.appendChild(errorElement);
    }
}

document.getElementById("form-submit").addEventListener("click", function (event) {
    var inputWrappers = document.getElementsByClassName("input-wrapper");
    var totalErrors = 0;
    var errorMsg = "This field cannot be left blank.";

    // alert if no fields are added to the form
    if (inputWrappers.length === 0) {
        event.preventDefault();
        alert("No input fields added");
    }
    // check if any of the input fields are blank
    else {
        for (var i = 0; i < inputWrappers.length; i++) {
            var inputWrapper = inputWrappers[i];

            if (inputWrapper.querySelector('.radio-div') &&
                inputWrapper.querySelector('.radio-div').children.length === 0) {
                displayErrorMessage(inputWrapper, errorMsg);
                totalErrors++;
            } else if (inputWrapper.querySelector('.checkbox-div') &&
                inputWrapper.querySelector('.checkbox-div').children.length === 0) {
                displayErrorMessage(inputWrapper, errorMsg);
                totalErrors++;
            } else if (inputWrapper.querySelector('.dropdown-div') &&
                inputWrapper.querySelector('.dropdown-div').children.length === 0) {
                displayErrorMessage(inputWrapper, errorMsg);
                totalErrors++;
            } else {
                var existingErrorMessage = inputWrapper.querySelector(".error-message");
                if (existingErrorMessage) {
                    existingErrorMessage.remove();
                }
            }
        }
        console.log("Total Errors:", totalErrors);
    }


    if (totalErrors === 0) {
        var formData = {
            formTitle: document.querySelector(".form-title-container h1").textContent,
            inputFields: []
        };

        for (var i = 0; i < inputWrappers.length; i++) {
            var inputWrapper = inputWrappers[i];

            var questionLabel = inputWrapper.querySelector(".question-label");
            var label = questionLabel ? questionLabel.textContent : "No Label";

            if (inputWrapper.querySelector('.radio-div')) {
                var radios = inputWrapper.querySelectorAll("input[type='radio']");
                var labels = inputWrapper.querySelectorAll("label");
                var radioValue = "";
                var radioGrp = "";
                let radioValArray = [];
                for (var j = 0; j < radios.length; j++) {
                    radioValArray.push({
                        label: labels[j].textContent,
                        value: radios[j].value
                    });
                    radioGrp = radios[j].name;
                }
                console.log(radioGrp);
                radioValue = radioValArray;

                var inputField = {
                    question: label,
                    tagName: 'input',
                    type: 'radio',
                    value: radioValue,
                    groupName: radioGrp
                };
            }
            else if (inputWrapper.querySelector('.checkbox-div')) {
                var checkboxs = inputWrapper.querySelectorAll("input[type='checkbox']");
                var labels = inputWrapper.querySelectorAll('label');
                var checkboxValue = "";
                var checkboxGrp = "";
                let checkboxValArray = [];
                for (var j = 0; j < checkboxs.length; j++) {
                    checkboxValArray.push({
                        label: labels[j].textContent,
                        value: checkboxs[j].value
                    });
                    checkboxGrp = checkboxs[j].name;
                }
                checkboxValue = checkboxValArray;

                var inputField = {
                    question: label,
                    tagName: 'input',
                    type: 'checkbox',
                    value: checkboxValue,
                    groupName: checkboxGrp
                };
            }
            else if (inputWrapper.querySelector('.dropdown-div')) {
                var select = inputWrapper.querySelector('.selection');
                var selectGrp = select.name;
                var selectVal = "";
                var options = inputWrapper.querySelectorAll('option');
                let selectValArray = [];
                for (var j = 0; j < options.length; j++) {
                    selectValArray.push({
                        label: options[j].textContent,
                        value: options[j].value
                    });
                }
                selectVal = selectValArray;

                var inputField = {
                    question: label,
                    tagName: 'select',
                    value: selectVal,
                    groupName: selectGrp
                };
                console.log(inputField);
            }
            else if (inputWrapper.querySelector("input[type='text']")) {
                var inputField = {
                    question: label,
                    tagName: 'input',
                    type: 'text'
                };
            }
            else if (inputWrapper.querySelector("textarea")) {
                var inputField = {
                    question: label,
                    tagName: 'textarea',
                };
            }
            formData.inputFields.push(inputField);
        }

        if (document.querySelector('.input-field').childNodes.length === 0) {
            document.querySelector('.input-field').style.display = 'none';
        }else{
            event.preventDefault();
            var jsonData = JSON.stringify(formData);
            
            localStorage.setItem('formData', jsonData);
            // localStorage.clear();
            window.location.href = "/preview.html";
        }
    }
});

document.getElementById("new-form").addEventListener("click", function() {
    event.preventDefault();
    localStorage.clear();
    window.location.href = '/index.html';
})