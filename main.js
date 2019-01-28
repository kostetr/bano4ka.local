function handleClick(typeGen) {
    if (typeGen.value == 1) {
        var str = '<table id=\"tableInDiv\">';
        str += '<tr><td>Номер</td><td>Приз</td><td>Учасник</td></tr>';
        str += '<tr><td>qqq</td><td><input type="text" id="prize" name="prize"></td><td><input type="text" id="member" name="member"></td></tr>';
        str += '</table>';
        str += '<input type="button" onclick="handleClick('+typeGen.value+')" value="Ok">';
        document.getElementById("tableMendel").innerHTML = str;
        
        var prize = +document.getElementById("prize").value;
        var member = +document.getElementById("member").value;
        var arr = [];

        
    } else {
        alert('Value: 2 - ' + typeGen.value);
    };
}

