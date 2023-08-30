document.addEventListener("DOMContentLoaded", function () {
    var storedFormData = localStorage.getItem('formData');
    if (storedFormData) {
        var formData = JSON.parse(storedFormData);

        var formTitle = formData.formTitle;

        var formTitleElement = document.getElementById("form-title");
        if (formTitleElement) {
            formTitleElement.textContent = formTitle;
        }

        document.title = formTitle;


        document.getElementById('input-container').style.display = 'block';
        var inputContainer = document.getElementById("input-container");

        var inputVisible = false;
        var checkboxInputVisible = false;
        var radioInputVisible = false;
        if (inputContainer) {
            formData.inputFields.forEach(function (inputField) {

                var removeWrapper = document.createElement('button');
                removeWrapper.className = 'removeField';
                removeWrapper.textContent = 'Delete';

                var inputWrapper = document.createElement("div");
                inputWrapper.className = "input-wrapper";

                var buttonsDiv = document.createElement("div");
                buttonsDiv.className = 'buttons-div';

                var inputDiv = document.createElement("div");
                inputDiv.className = 'input-div';

                var addOption = document.createElement("button");
                addOption.className = "dropdown-add";
                addOption.textContent = "Add Option";

                var hideOption = document.createElement('button');
                hideOption.textContent = 'Hide Options';
                hideOption.className = 'removeField';

                var question = inputField.question;
                var questionLabel = addQuestionLabel(question, "h4", "question-label");
                inputWrapper.appendChild(questionLabel);

                if (inputField.tagName === 'input' && inputField.type === 'text') {
                    var input = document.createElement(inputField.tagName);
                    input.type = inputField.type;
                    input.placeholder = "User will enter here";
                    input.className = "form-control";
                    inputWrapper.appendChild(input);
                    inputWrapper.appendChild(removeWrapper);
                }
                else if (inputField.tagName === 'textarea') {
                    var input = document.createElement(inputField.tagName);
                    input.className = 'textarea';
                    input.addEventListener("input", function () {
                        input.style.height = "auto";
                        input.style.height = (input.scrollHeight) + "px";
                    });
                    inputWrapper.appendChild(input);
                    inputWrapper.appendChild(removeWrapper);
                }
                else if (inputField.tagName === 'input' && inputField.type === 'radio') {
                    inputWrapper.appendChild(inputDiv);
                    inputWrapper.appendChild(buttonsDiv);

                    buttonsDiv.append(addOption);
                    buttonsDiv.append(removeWrapper);
                    radioInputVisible = false;

                    var radioDiv = document.createElement('div');
                    radioDiv.className = 'radio-div';

                    var optionInput = document.createElement("input");
                    optionInput.type = "text";
                    optionInput.placeholder = "Enter the label";
                    optionInput.className = "form-control";

                    var valueInput = document.createElement("input");
                    valueInput.type = "text";
                    valueInput.placeholder = "Enter the value";
                    valueInput.className = "form-control";

                    for (var i = 0; i < inputField.value.length; i++) {
                        var radioContainer = document.createElement('div');
                        radioContainer.className = 'radio-container';

                        var option = document.createElement(inputField.tagName);
                        var label = document.createElement('label');
                        option.type = inputField.type;
                        option.value = inputField.value[i].value;
                        option.name = inputField.groupName;
                        label.textContent = inputField.value[i].label;
                        label.htmlFor = inputField.value[i].value;

                        radioContainer.appendChild(option);
                        radioContainer.appendChild(label);
                        radioDiv.appendChild(radioContainer);
                    }
                    inputWrapper.appendChild(radioDiv);

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
                                var option = document.createElement(inputField.tagName);
                                option.type = inputField.type;
                                option.value = radioOption.toLowerCase();
                                option.name = inputField.groupName;

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
                else if (inputField.tagName === 'input' && inputField.type === 'checkbox') {
                    inputWrapper.appendChild(inputDiv);
                    inputWrapper.appendChild(buttonsDiv);

                    buttonsDiv.append(addOption);
                    buttonsDiv.append(removeWrapper);

                    checkboxInputVisible = false;

                    var checkboxDiv = document.createElement('div');
                    checkboxDiv.className = 'checkbox-div';

                    var optionInput = document.createElement("input");
                    optionInput.type = "text";
                    optionInput.placeholder = "Enter the label";
                    optionInput.className = "form-control";

                    var valueInput = document.createElement("input");
                    valueInput.type = "text";
                    valueInput.placeholder = "Enter the value";
                    valueInput.className = "form-control";

                    for (var i = 0; i < inputField.value.length; i++) {
                        var checkboxContainer = document.createElement('div');
                        checkboxContainer.className = 'checkbox-container';

                        var option = document.createElement(inputField.tagName);
                        var label = document.createElement('label');
                        option.type = inputField.type;
                        option.value = inputField.value[i].value;
                        option.name = inputField.groupName;
                        label.textContent = inputField.value[i].label;
                        label.htmlFor = inputField.value[i].value;

                        checkboxContainer.appendChild(option);
                        checkboxContainer.appendChild(label);
                        checkboxDiv.appendChild(checkboxContainer);
                    }
                    inputWrapper.appendChild(checkboxDiv);

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
                else if (inputField.tagName === 'select') {
                    inputVisible = false;
                    inputWrapper.appendChild(inputDiv);
                    inputWrapper.appendChild(buttonsDiv);

                    buttonsDiv.append(addOption);
                    buttonsDiv.append(removeWrapper);

                    var dropdownDiv = document.createElement('div');
                    dropdownDiv.className = 'dropdown-div';

                    var input = document.createElement('select');
                    input.id = 'dropdown';
                    input.name = inputField.groupName;
                    input.className = 'selection';

                    for (var i = 0; i < inputField.value.length; i++) {
                        var option = document.createElement("option");
                        option.value = inputField.value[i].value;
                        option.textContent = inputField.value[i].label;

                        input.appendChild(option);
                    }
                    dropdownDiv.appendChild(input);
                    inputWrapper.appendChild(dropdownDiv);

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
                                console.log("oload" + optionValue);
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

                removeWrapper.addEventListener('click', function () {
                    event.preventDefault();
                    inputWrapper.remove();
                });
                inputContainer.appendChild(inputWrapper);
                
                if (document.querySelector('.input-field').childNodes.length === 0) {
                    document.querySelector('.input-field').style.display = 'none';
                }
            });
        }
    }
});

