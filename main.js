var arrPrize = [];
var arrMember = [];
var res = [];
function handleClick(typeGen) {
    if (typeGen.value == 1) {
        showTables();
    } else {
        alert('Value: 2 - ' + typeGen.value);
    }
    ;
}
function onClickPrize() {
    var prize = document.getElementById("prizeId").value;
    arrPrize.push(prize);
    showTables();

}
function onClickMember() {
    var member = document.getElementById("memberId").value;
    arrMember.push(member);
    showTables();
}
function showTables() {
    var str = '<table id=\"tableInDivConteiner\"><tr><td>';
    str += '<table id=\"tableInDivPrize\">';
    str += '<tr><td colspan=\"2\">Приз</td></tr>';
    for (i = 0; i < arrPrize.length; i++) {
        str += '<tr><td colspan=\"2\">' + arrPrize[i] + '</td></tr>';
    }
    if (res.length == 0) {
        str += '<tr><td><input type="button" onclick="onClickPrize()" value="+"></td><td><input type="text" id="prizeId" name="prize"></td></tr>';
    }
    
    str += '</table>';
    str += '</td><td>';
    str += '<table id=\"tableInDivMember\">';
    str += '<tr><td>Билет</td><td>Учасник</td></tr>';
    for (i = 0; i < arrMember.length; i++) {
        str += '<tr><td>' + (1 + i) + '</td><td>' + arrMember[i] + '</td></tr>';
    }
    if (res.length == 0) {
        str += '<tr><td><input type="button" onclick="onClickMember()" value="+"></td><td><input type="text" id="memberId" name="member"></td></tr>';
    }

    str += '</table>';
    str += '</td><td>';
    if (res.length == 0) {
        str += '<input type="button" onclick="calcArray()" value="Mix">';
    } else {
        str += '<table id=\"tableInDivResult\">';

        str += '<tr><td colspan=\"3\">Победители:</td></tr>';
        str += '<tr><td>Номер</td><td>Приз</td><td>Победитель</td></tr>';
        for (i = 0; i < arrPrize.length; i++) {
            str += '<tr><td>' + (1 + i) + '</td><td>' + arrPrize[i] + '</td><td>' + arrMember[res[i]] + '</td></tr>';
        }
        str += '</table>';
    }


    str += '</td></tr>';
    document.getElementById("divConteiner").innerHTML = str;
}
function calcArray() {
    if (arrPrize.length > arrMember.length) {
        alert('Призов больше чем учасников');
        exit();
    } else if (arrPrize.length < arrMember.length) {
        alert('Учасников больше чем призов');
        exit();
    } else {
        var i, arr = [];
        var min = 0;
        var max = arrPrize.length - 1;
        var num = arrPrize.length;
        for (i = min; i <= max; i++) {
            arr.push(i);
        }
        for (i = 0; i < num; i++) {
            res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0]);
        }
        showTables();
        alert(res);
    }
}







