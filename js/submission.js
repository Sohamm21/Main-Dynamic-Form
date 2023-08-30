var jsonData = localStorage.getItem('formData');
if(jsonData){
    console.log(jsonData);
    var formData = JSON.parse(jsonData);
    var formTitle = formData.formTitle;
    
    document.title = formTitle;
    
    var formTitleElement = document.getElementById("form-title");
    if (formTitleElement) {
        formTitleElement.textContent = formTitle;
    }
}

document.getElementById("new-form").addEventListener("click", function() {
    localStorage.clear();
    window.location.href = '/index.html';
})