//function btnClick() {
//    var str = '<table id=\"tableInDiv\">';
//    var typeGen1 = +document.getElementById("typeGen1").value;
//    var typeGen2 = +document.getElementById("typeGen2").value;
//    alert('jjjj'.typeGen1);
//    if (typeGen1!=1 || typeGen2!=2) {
//        alert('Сделайте свой выбор');
//    }else if (typeGen1!=1){
//    for (var i = 0; i <= numberTR; i++) {
//        str += '<tr>';
//        for (var j = 0; j <= numberTD; j++) {
//
//            if (i === 0 && j === 0) {
//                str += '<td class=\"firstTdTr\"></td>';
//            } else if (i === 0) {
//                str += '<td class=\"firstTdTr\">' + j + '</td>';
//            } else if (j === 0) {
//                str += '<td class=\"firstTdTr\">' + i + '</td>';
//            } else {
//                str += '<td id=\"tableTD\">' + (j * i) + '</td>';
//            }
//        };
//        str += '</tr>';
//    };
//    str += '</table>';
//    document.getElementById("tableMendel").innerHTML = str;
//    }else{
//        alert('Значение вне диапазона 0-10');
//    }
//}



function handleClick(myRadio) {

    if (myRadio.value==1) {
        var str = '<table id=\"tableInDiv\">';
        var num = 1;
        str += '<tr><td>'+num+'</td><td>Приз</td><td>Учасник</td></tr>';
        str += '</table>';
        document.getElementById("tableMendel").innerHTML = str;
    } else {
        alert('Value: 2 - ' + myRadio.value);
    };
}

