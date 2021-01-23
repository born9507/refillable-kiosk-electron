var boxSelection = "phoneNum"

var inputBox = document.getElementById(boxSelection)
inputBox.focus()
inputBox.value += "010"

var phoneNumSelect = () => {
    boxSelection = "phoneNum"
    console.log(boxSelection, "selected")
}

var password1Select = () => {
    boxSelection = "password1"
    console.log(boxSelection, "selected")
}

var password2Select = () => {
    boxSelection = "password2"
    console.log(boxSelection, "selected")
}

var certificateSelect = () => {
    boxSelection = "certificate"
    console.log(boxSelection, "selected")
}

var nextSelect = () => {
    if (boxSelection == "phoneNum") {
        boxSelection = "password1"
    }
    else if (boxSelection == "password1") {
        if (document.getElementById("password2")) {
            boxSelection = "password2"
        }
        else {
            boxSelection = "phoneNum"
        }
    }
    else if (boxSelection == "password2") {
        boxSelection = "certificate"
    }
    else if (boxSelection == "certificate") {
        boxSelection = "phoneNum"
    }
    var inputBox = document.getElementById(boxSelection)
    inputBox.focus()
    console.log(boxSelection, "selected")
}

var buttonClick = (num) => {
    console.log(num)
    var inputBox = document.getElementById(boxSelection)
    inputBox.focus()
    // 11 글자 이상이면 입력 더 안받음
    if (boxSelection=="phoneNum" && inputBox.value.length >= 11) return
    if (boxSelection=="password1" && inputBox.value.length >= 4) return
    if (boxSelection=="password2" && inputBox.value.length >= 4) return
    if (boxSelection=="certificate" && inputBox.value.length >= 4) return
    inputBox.value += String(num)
}

var buttonClickDelete = () => {
    console.log("delete")
    var inputBox = document.getElementById(boxSelection)
    inputBox.focus()
    inputBox.value = inputBox.value.slice(0, -1)
}