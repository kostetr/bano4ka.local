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
        showMassage('', 'off');
        showTitle(oneWin);
        showTablePrizes();
        showTableMembers();
        showTableResult();
    } else {
        res = [];
        arrPrize = [];
        arrMember = [];
        oneWin = 1;
        showMassage('', 'off');
        showTitle(oneWin);
        showTablePrizes();
        showTableMembers();
        showTableResult();
    }
    ;
}
function onClickPrize() {
    var prize = document.getElementById("prizeId").value;
    if (prize == '') {
        showMassage('Поле приз не может быть пустым!');
        exit();
    } else {
        arrPrize.push(prize);
        showTablePrizes();
    }
    ;

}
function onClickMember() {
    var member = document.getElementById("memberId").value;
    if (member == '') {
        showMassage('Поле учасник не может быть пустым!');
        exit();
    } else {
        arrMember.push(member);
        showTableMembers();
    }
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
    }
    ;
    document.getElementById("divMassage").innerHTML = str;
}


function showTablePrizes() {
    var prizeStr = '<ul class="list-group"><a href="#" class="list-group-item list-group-item-action list-group-item-dark">Приз(ы):</a>';
    for (i = 0; i < arrPrize.length; i++) {
        prizeStr += '<li class="list-group-item d-flex justify-content-between align-items-center">' + arrPrize[i] + '</li>';
    }
    if (res.length == 0 && oneWin == 0) {
        prizeStr += '<li class="list-group-item d-flex justify-content-between align-items-center"><input type="text" id="prizeId" name="prize"><input type="button" class="btn btn-secondary" onclick="onClickPrize()" value="Добавить"></li>';
    } else if (res.length == 0 && oneWin == 1 && arrPrize.length == 0) {
        prizeStr += '<li class="list-group-item d-flex justify-content-between align-items-center"><input type="text" id="prizeId" name="prize"><input type="button" class="btn btn-secondary" onclick="onClickPrize()" value="Добавить"></li>';
    } else {
        prizeStr += '<li class="list-group-item d-flex justify-content-between align-items-center"><input type="text" id="prizeId" name="prize" disabled><input type="button" class="btn btn-secondary" onclick="onClickPrize()" value="Добавить" disabled></li>';
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
        membersStr += '<li class="list-group-item d-flex justify-content-between align-items-center"><input type="text" id="memberId" name="prize"><input type="button" class="btn btn-secondary" onclick="onClickMember()" value="Добавить"></li>';
    } else {
        membersStr += '<li class="list-group-item d-flex justify-content-between align-items-center"><input type="text" id="memberId" name="prize" disabled><input type="button" class="btn btn-secondary" onclick="onClickMember()" value="Добавить"disabled></li>';
    }
    membersStr += '</ul>';
    document.getElementById("membersDiv").innerHTML = membersStr;
}
function showTableResult() {
    var strResultInFile;
    var resultStr = '<ul class="list-group"><a href="#" class="list-group-item list-group-item-action list-group-item-dark">Результаты:</a>';
    if (res.length == 0 && oneWin == 0) {
        resultStr += '<li class="list-group-item d-flex justify-content-between align-items-center"><input type="button" class="btn btn-secondary btn-block" onclick="calcArray()" value="Разыграть"></li>';
    } else if (oneWin == 1 && res.length == 0) {
        resultStr += '<li class="list-group-item d-flex justify-content-between align-items-center"><input type="button" class="btn btn-secondary btn-block" onclick="calcOneWin()" value="Разыграть"></li>';
    } else {
        strResultInFile = 'Результат\r\n';
        strResultInFile += 'Приз - Победитель;\r\n';
        resultStr += '<a href="#" class="list-group-item list-group-item-action list-group-item-dark">Приз - Победитель</a>';
        for (i = 0; i < arrPrize.length; i++) {
            resultStr += '<li class="list-group-item d-flex justify-content-between align-items-center">' + arrPrize[i] + ' - ' + arrMember[res[i]] + '</li>';
            strResultInFile += arrPrize[i] + ' - ' + arrMember[res[i]] + ';\r\n';
        }
        resultStr += '</ul>';
        saveResult(strResultInFile);
        showMassage('Поздравляем победителей розыгрыша!', 1);
    }
    ;
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
    hiddenElement.download = 'Result_' + date.ddmmyyyyhhmmss() + '.txt';
    hiddenElement.click();
}

Date.prototype.ddmmyyyyhhmmss = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();
    var hh = this.getHours();
    var min = this.getMinutes();
    var sec = this.getSeconds();

    return [(mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd,
        this.getFullYear(),
        (hh > 9 ? '' : '0') + hh,
        (min > 9 ? '' : '0') + min,
        (sec > 9 ? '' : '0') + sec
    ].join('_');
};








