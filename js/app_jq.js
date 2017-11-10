'use strict';
/**
 * @description random array
 * @param array
 * @returns {*}
 */
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0){
        randomIndex = Math.floor(Math.random()*currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

/**
 * @description append classname to 'i'
 * @param $card
 * @param cards_all
 */
function addDOM($card,cards_all) {
    $card.each(function (i) {
        $(this).find('.fa').addClass(cards_all[i]);
    });
}

/**
 * @description display the symbol of click card
 * @param $card
 * @param index
 */
function displaySymbol($card,index) {
    $card[index].className += ' open show';
}

/**
 * @description check the situation of two cards
 * @param openCard
 * @param matchlength
 * @param counter
 * @param startnum
 * @param clearid
 * @param mydate
 * @param $card
 */
function checkMatch(openCard,matchlength,counter,startnum,clearid,mydate,$card) {
    let second;
    let card1 = $card[openCard[0]].children[0].className;
    let card2 = $card[openCard[1]].children[0].className;
    if(card1 === card2){
        lockCard($card,openCard);
        matchlength.push(openCard[0]);
        matchlength.push(openCard[1]);
    }else {
        removeCard($card,openCard);
    }
    if(matchlength.length === 16){
        second = seconds(mydate);
        addMessage(counter,startnum,second);
        clearTimeout(clearid);
    }
}

/**
 * @description display the information when player is win
 * @param counter
 * @param startnum
 * @param second
 */
function addMessage(counter,startnum,second) {
    $('.container').remove();
    let html = $('<div class="result"></div>');
    let info1 = $('<p class="re-won">Congratulations! You Won!</p>');
    let info2 = $('<p class="re-moves">With&nbsp;'+counter+'&nbsp;Moves&nbsp;&nbsp;,&nbsp;&nbsp;'+second+'&nbsp;seconds&nbsp;&nbsp;and&nbsp;&nbsp;'+startnum+'&nbsp;Stars. </p>');
    let info3 = $('<p class="re-moves">Woooooo!</p>');
    let button = $('<p class="re-button">Play again!</p>');
    html.append(info1);
    html.append(info2);
    html.append(info3);
    html.append(button);
    $(document.body).append(html);
    restart('.re-button');
}

/**
 * @description when the two cards are match, change card's classname and cancel the click event
 * @param $card
 * @param openCard
 */
function lockCard($card,openCard) {
    let match = [];
    $.each(openCard,function (i,data) {
        $card[data].className = 'card match animated bounce';
        match.push(data);
    })
    $.each($card,function (index) {
        for(var j=0;j<match.length;j++) {
            if(index == match[j]){
                let cancel = $card[index];
                $(cancel).unbind("click");
            }
        }
    })
}

/**
 * @description when the two cards are not match, display the wrong color and recover the card's classname
 * @param $card
 * @param openCard
 */
function removeCard($card,openCard) {
    $.each(openCard,function (i,data) {
        $card[data].className = 'card notm animated wobble';
        (function (n) {
            function f() {
                n.className = 'card';
            }
            setTimeout(f,1500);
        })($card[data])
    })
}

/**
 * @description display the pace of player
 * @param counter
 */
function displayNum(counter) {
    $('.moves').text("").append(counter);
}

/**
 * @description display the starts of player
 * @param counter
 * @returns {jQuery}
 */
function displayStar(counter) {
    if(counter>12 && counter<=16){
        $('.stars>li:eq(2)').remove();
    }else if(counter>16){
        $('.stars>li:eq(1)').remove();
    }
    let starnum = $(".stars>li").length;
    return starnum;
}

/**
 * @description play function
 * @param $card
 */
function play($card) {
    let openCard = [];//opened card, length is 2
    let matchlength = [];//all the matched card, length is increase
    let counter = 0;//counter the pace
    let startnum, clearid, mydate;
    let time = true;
    $card.bind("click",function () {
        if(time){
            let beDate = new Date();
            mydate = beDate.getTime();
            clearid=timer(0);
            time = false;
        }
        let n = $card.index(this);
        openCard.push(n);
        if (openCard[0]!=openCard[1]) {
            displaySymbol($card,n);
        }else {
            openCard.pop();
        }
        if(openCard.length === 2){
            counter += 1;
            displayNum(counter);
            startnum = displayStar(counter);
            checkMatch(openCard,matchlength,counter,startnum,clearid,mydate,$card);
            openCard.splice(0,openCard.length);
        }

    })
}

/**
 * @description refresh the game
 * @param classname
 */
function restart(classname) {
    $(classname).bind("click",function () {
        window.location.reload();
    })
}

/**
 * @description setInterval function
 * @param func
 * @param wait
 * @returns {number|*}
 */
function interval(func, wait) {
    let id;
    let interv = function () {
        func.call(null);
        id = setTimeout(interv, wait);
    };
    id = setTimeout(interv ,wait);
    return id;
}

/**
 * @description timer
 * @param i
 * @returns {number|*}
 */
function timer(i) {
    let id = interval(function () {
        i++;
        $('.time span').text("").append(i);
    },1000);
    return id;
}

/**
 * @description timepiece
 * @param bsDate
 * @returns {number}
 */
function seconds(bsDate) {
    let date = new Date();
    let second = Math.floor((date.getTime() - bsDate)/1000);
    return second;
}

/**
 * @description main function
 */
$(document).ready(function () {
    let cards_all = [
        'fa-diamond','fa-diamond',
        'fa-paper-plane-o','fa-paper-plane-o',
        'fa-anchor','fa-anchor',
        'fa-bolt','fa-bolt',
        'fa-cube','fa-cube',
        'fa-leaf','fa-leaf',
        'fa-bicycle','fa-bicycle',
        'fa-bomb','fa-bomb'
    ];
    cards_all = shuffle(cards_all);
    let $card = $('.card');
    addDOM($card,cards_all);
    play($card);
    restart('.restart');
});