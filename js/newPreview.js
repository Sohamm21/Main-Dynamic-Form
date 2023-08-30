document.addEventListener("DOMContentLoaded", function () {
    var jsonData = localStorage.getItem('formData');

    if (jsonData) {
        var formData = JSON.parse(jsonData);
        // console.log(formData);
        var formTitle = formData.formTitle;

        var formTitleElement = document.getElementById("form-title");
        if (formTitleElement) {
            formTitleElement.textContent = formTitle;
        }

        document.title = formTitle;

        document.getElementById('input-container').style.display = 'block';
        var inputContainer = document.getElementById("input-container");

        // console.log(inputContainer.childNodes.length);


        if (inputContainer) {
            formData.inputFields.forEach(function (inputField) {
                console.log(inputField);

                // input wrapper division
                var inputWrapper = document.createElement("div");
                inputWrapper.className = "input-wrapper";

                // getting the question from the field
                var question = inputField.question;
                var questionLabelElement = document.createElement("h4");
                questionLabelElement.textContent = question;
                questionLabelElement.className = 'question-label';

                // appending the question
                inputWrapper.appendChild(questionLabelElement);

                // appending the textbox for input text
                if (inputField.tagName === 'input' && inputField.type === 'text') {
                    var text = document.createElement('input');
                    text.type = 'text';
                    text.placeholder = "Enter here";
                    text.className = "form-control";
                    inputWrapper.appendChild(text);
                }
                else if (inputField.tagName === 'textarea') {
                    var textarea = document.createElement('textarea');
                    textarea.placeholder = "Enter here";
                    textarea.className = "textarea";
                    inputWrapper.appendChild(textarea);
                }
                else if (inputField.tagName === 'input' && inputField.type === 'radio') {
                    var radioDiv = document.createElement('div');
                    radioDiv.className = 'radio-div';

                    
                    for(var i=0; i<inputField.value.length; i++){
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
                }
                else if (inputField.tagName === 'input' && inputField.type === 'checkbox') {
                    var checkboxDiv = document.createElement('div');
                    checkboxDiv.className = 'checkbox-div';

                    for(var i=0; i<inputField.value.length; i++){
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
                }
                else if(inputField.tagName === 'select'){
                    var dropdownDiv = document.createElement('div');
                    dropdownDiv.className = 'dropdown-div';

                    var select = document.createElement(inputField.tagName);
                    select.className = 'selection';
                    select.name = inputField.groupName;

                    for(var i=0; i<inputField.value.length; i++){
                        var option = document.createElement("option");
                        option.value = inputField.value[i].value;
                        option.textContent = inputField.value[i].label;

                        select.appendChild(option);
                    }
                    dropdownDiv.appendChild(select);
                    inputWrapper.appendChild(dropdownDiv);
                }

                inputContainer.appendChild(inputWrapper);
            });
        }
    }
});

document.getElementById("back").addEventListener("click", function (event){
    event.preventDefault();
    window.location.href = "/index.html";
});

document.getElementById("user-submit").addEventListener("click", function() {
    event.preventDefault();
    window.location.href = "/submission.html";
});