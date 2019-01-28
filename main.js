function btnClick() {
    var str = '<table id=\"tableInDiv\">';
    var prize = +document.getElementById("prize").value;
    var member = +document.getElementById("member").value;
    var arr = [];

}



function handleClick(typeGen) {    
    if (typeGen.value == 1) {
        var str = '<table id=\"tableInDiv\">';
        var num = 1;
        str += '<tr><td>' + num + '</td><td>Приз</td><td>Учасник</td></tr>';
        num++;
        str += '<tr><td>' + num + '</td><td><input type="text" id="prize" name="prize"></td><td><input type="text" id="member" name="member"></td></tr>';
        str += '</table>';
        str += '<input type="button" onclick="btnClick()" value="Ok">';
        document.getElementById("tableMendel").innerHTML = str;
    } else {
        alert('Value: 2 - ' + typeGen.value);
    }
    ;
}

