/**
 * @description random array
 * @param array
 * @returns {*}
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
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
 * @param cards_all
 */
function addDOM(cards_all) {
    $('.deck li').each(function (i) {
        $(this).find('.fa').addClass(cards_all[i]);
    });
}

/**
 * @description display the symbol of click card
 * @param index
 */
function displaySymbol(index) {
    $('.card')[index].className += ' open show';
}

/**
 * @description check the situation of two cards
 * @param openCard
 * @param matchlength
 * @param counter
 * @param startnum
 */
function checkMatch(openCard,matchlength,counter,startnum) {
    var card1 = $('.card')[openCard[0]].children[0].className;
    var card2 = $('.card')[openCard[1]].children[0].className;
    if(card1==card2){
        lockCard(openCard);
        matchlength.push(openCard[0]);
        matchlength.push(openCard[1]);
    }else {
        removeCard(openCard);
    }
    if(matchlength.length === 16){
        addMessage(counter,startnum);
    }
}

/**
 * @description display the information when player is win
 * @param counter
 * @param startnum
 */
function addMessage(counter,startnum) {
    $('.container').remove();
    var html = $('<div class="result"></div>');
    var info1 = $('<p class="re-won">Congratulations! You Won!</p>');
    var info2 = $('<p class="re-moves">With'+counter+' Moves and '+startnum+' Stars. </p>');
    var info3 = $('<p class="re-moves">Woooooo!</p>');
    var button = $('<p class="re-button">Play again!</p>');
    html.append(info1);
    html.append(info2);
    html.append(info3);
    html.append(button);
    $(document.body).append(html);
    restart('.re-button');
}

/**
 * @description when the two cards are match, change card's classname and cancel the click event
 * @param openCard
 */
function lockCard(openCard) {
    var match = [];
    $.each(openCard,function (i,data) {
        $('.card')[data].className = 'card match animated bounce';
        match.push(data);
    })
    $.each($('.card'),function (i) {
        for(var j=0;j<match.length;j++) {
            if(i == match[j]){
                var cancel = $('.card')[i];
                $(cancel).unbind("click");
            }
        }
    })
}

/**
 * @description when the two cards are not match, display the wrong color and recover the card's classname
 * @param openCard
 */
function removeCard(openCard) {
    $.each(openCard,function (i,data) {
        $('.card')[data].className = 'card notm animated wobble';
        (function (n) {
            function f() {
                n.className = 'card';
            }
            setTimeout(f,1500);
        })($('.card')[data])
    })
}

/**
 * @description display the pace of player
 * @param counter
 */
function displayNum(counter) {
    $('.moves').text("");
    $('.moves').append(counter);
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
    var starnum = $(".stars>li").length;
    return starnum;
}

/**
 * play function
 */
function play() {
    var openCard = [];//opened card, length is 2
    var matchlength = [];//all the matched card, length is increase
    var counter = 0;//counter the pace
    var startnum;
    //bind the click for each li
    $(".card").bind("click",function () {
        var n = $('.card').index(this);
        openCard.push(n);
        if (openCard[0]!=openCard[1]) {
            displaySymbol(n);
        }else {
            openCard.pop();
        }
        if(openCard.length === 2){
            counter += 1;
            displayNum(counter);
            startnum = displayStar(counter);
            checkMatch(openCard,matchlength,counter,startnum);
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

$(document).ready(function () {
    var cards_all = [
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
    addDOM(cards_all);
    play();
    restart('.restart');
});

