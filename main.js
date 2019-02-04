var arrPrize = [];
var arrMember = [];
var res = [];
var oneWin = 0;
var date = new Date();

function handleClick(typeGen) {
    if (typeGen.value == 1) {
        res = [];
        arrPrize = [];
        arrMember = [];
        oneWin = 0;
        showTables();
    } else {
        res = [];
        arrPrize = [];
        arrMember = [];
        oneWin = 1;
        showTables();
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
    var strResultTable;
    var str = '<table id=\"tableInDivConteiner\"><tr><td>';
    str += '<table id=\"tableInDivPrize\">';
    str += '<tr><td colspan=\"2\">Приз</td></tr>';
    for (i = 0; i < arrPrize.length; i++) {
        str += '<tr><td colspan=\"2\">' + arrPrize[i] + '</td></tr>';
    }
    if (res.length == 0 && oneWin == 0) {
        str += '<tr><td><input type="button" onclick="onClickPrize()" value="+"></td><td><input type="text" id="prizeId" name="prize"></td></tr>';
    }
    if (res.length == 0 && oneWin == 1 && arrPrize.length == 0) {
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
    if (res.length == 0 && oneWin == 0) {
        str += '<input type="button" onclick="calcArray()" value="Mix">';
    } else if (oneWin == 1 && res.length == 0) {
        str += '<input type="button" onclick="calcOneWin()" value="Mix">';
    } else {
        str += '<table id=\"tableInDivResult\">';

        str += '<tr><td colspan=\"2\">Победители:</td></tr>';
        strResultTable = 'Победители:\r\n';
        strResultTable += 'Приз - Победитель;\r\n';


        str += '<tr><td>Приз</td><td>Победитель</td></tr>';
        for (i = 0; i < arrPrize.length; i++) {
            str += '<tr><td>' + arrPrize[i] + '</td><td>' + arrMember[res[i]] + '</td></tr>';
            strResultTable += arrPrize[i] + ' - ' + arrMember[res[i]] + ';\r\n';
        }
        str += '</table>';
        saveResult(strResultTable);
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

    }
}
function calcOneWin() {
    if (arrPrize.length < 1) {
        alert('Необходимо добавить приз');
        exit();
    } else if (arrMember.length < 1) {
        alert('Учасников должно быть больше одного');
        exit();
    } else {
        var min = 0;
        var max = arrMember.length;
        alert(max);
        res.push(Math.floor(Math.random() * (max - min)) + min);
        showTables();
    }
}

function saveResult(str) {
    var textToSave = str;

    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Result_' +date.yyyymmddhhmmss()+'.txt';
    hiddenElement.click();
}

Date.prototype.yyyymmddhhmmss = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();
  var hh = this.getHours();
  var min = this.getMinutes();
  var sec = this.getSeconds();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd,
          (hh>9 ? '' : '0') + hh,
          (min>9 ? '' : '0') + min,
          (sec>9 ? '' : '0') + sec
         ].join('_');
};








