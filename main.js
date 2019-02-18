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
        showTitle(oneWin);
        showTablePrizes();
        showTableMembers();
        showTableResult();
    } else {
        res = [];
        arrPrize = [];
        arrMember = [];
        oneWin = 1;
        showTitle(oneWin);
        showTablePrizes();
        showTableMembers();
        showTableResult();
    }
    ;
}
function onClickPrize() {
    var prize = document.getElementById("prizeId").value;
    arrPrize.push(prize);
    showTablePrizes();

}
function onClickMember() {
    var member = document.getElementById("memberId").value;
    arrMember.push(member);
    showTableMembers();
}
function showTitle(oneWin) {
    var str = '';
    if (oneWin === 0) {
        str += '<h3>Беспроигрышная лотерея</h3>';
    } else {
        str += '<h3>Один победитель</h3>';
    }
    document.getElementById("divTitle").innerHTML = str;
}
function showMassage(massage, type = 0) {
    var str = '';
    if (type === 0) {
        str += '<div class="alert alert-danger" role="alert">' + massage + '</div>';
    } else if (type === 1) {
        str += '<div class="alert alert-success" role="alert">' + massage + '</div>';
    } else {
        exit();
    }

    document.getElementById("divMassage").innerHTML = str;
}


function showTablePrizes() {
    var prizeStr = '<ul class="list-group"><a href="#" class="list-group-item list-group-item-action list-group-item-dark">Билет(ы):</a>';
    for (i = 0; i < arrPrize.length; i++) {
        prizeStr += '<li class="list-group-item d-flex justify-content-between align-items-center">' + arrPrize[i] + '</li>';
    }
    if (res.length == 0 && oneWin == 0) {
        prizeStr += '<li class="list-group-item d-flex justify-content-between align-items-center"><input type="text" id="prizeId" name="prize"><input type="button" onclick="onClickPrize()" value="+"></li>';
    } else if (res.length == 0 && oneWin == 1 && arrPrize.length == 0) {
        prizeStr += '<li class="list-group-item d-flex justify-content-between align-items-center"><input type="text" id="prizeId" name="prize"><input type="button" onclick="onClickPrize()" value="+"></li>';
    } else {
        prizeStr += '<li class="list-group-item d-flex justify-content-between align-items-center"><input type="text" id="prizeId" name="prize" disabled><input type="button" onclick="onClickPrize()" value="+" disabled></li>';
    }
    prizeStr += '</ul>';
    document.getElementById("prizeDiv").innerHTML = prizeStr;
}
function showTableMembers() {
    var membersStr = '<ul class="list-group"><a href="#" class="list-group-item list-group-item-action list-group-item-dark">Учасник(и):</a>';
    for (i = 0; i < arrMember.length; i++) {
        membersStr += '<li class="list-group-item d-flex justify-content-between align-items-center">' + (1 + i) + '   -   ' + arrMember[i] + '</li>';
    }
    if (res.length == 0) {
        membersStr += '<li class="list-group-item d-flex justify-content-between align-items-center"><input type="text" id="memberId" name="prize"><input type="button" onclick="onClickMember()" value="+"></li>';
    } else {
        membersStr += '<li class="list-group-item d-flex justify-content-between align-items-center" disabled><input type="text" id="memberId" name="prize"><input type="button" onclick="onClickMember()" value="+"disabled></li>';
    }

    membersStr += '</table>';
    document.getElementById("membersDiv").innerHTML = membersStr;
}
function showTableResult() {
    var strResultTable;
    var resultStr = '';
    if (res.length == 0 && oneWin == 0) {
        resultStr += '<input type="button" onclick="calcArray()" value="Mix">';
    } else if (oneWin == 1 && res.length == 0) {
        resultStr += '<input type="button" onclick="calcOneWin()" value="Mix">';
    } else {
        resultStr += '<table id=\"tableInDivResult\">';

        resultStr += '<tr><th colspan=\"2\">Результат</th></tr>';
        strResultTable = 'Результат\r\n';
        strResultTable += 'Приз - Победитель;\r\n';


        resultStr += '<tr><th>Приз:</th><th>Победитель:</th></tr>';
        for (i = 0; i < arrPrize.length; i++) {
            resultStr += '<tr><td>' + arrPrize[i] + '</td><td>' + arrMember[res[i]] + '</td></tr>';
            strResultTable += arrPrize[i] + ' - ' + arrMember[res[i]] + ';\r\n';
        }
        resultStr += '</table>';
        saveResult(strResultTable);
        showMassage('Успех', 1);
    }


    document.getElementById("resultDiv").innerHTML = resultStr;
    showTablePrizes();
    showTableMembers();

}
function calcArray() {
    if (arrPrize.length < 1) {
        showMassage('Необходимо добавить приз');
        exit();
    } else if (arrPrize.length > arrMember.length) {
        showMassage('Призов больше чем учасников');
        exit();
    } else if (arrPrize.length < arrMember.length) {
        showMassage('Учасников больше чем призов');
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
        showTableResult();

    }
}
function calcOneWin() {
    if (arrPrize.length < 1) {
        showMassage('Необходимо добавить приз');
        exit();
    } else if (arrMember.length < 1) {
        showMassage('Учасников должно быть больше одного');
        exit();
    } else {
        var min = 0;
        var max = arrMember.length;
        res.push(Math.floor(Math.random() * (max - min)) + min);
        showTableResult();
    }
}

function saveResult(str) {
    var textToSave = str;

    var hiddenElement = document.createElement('a');

    hiddenElement.href = 'data:attachment/text,' + encodeURI(textToSave);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Result_' + date.yyyymmddhhmmss() + '.txt';
    hiddenElement.click();
}

Date.prototype.yyyymmddhhmmss = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    var hh = this.getHours();
    var min = this.getMinutes();
    var sec = this.getSeconds();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd,
        (hh > 9 ? '' : '0') + hh,
        (min > 9 ? '' : '0') + min,
        (sec > 9 ? '' : '0') + sec
    ].join('_');
};








