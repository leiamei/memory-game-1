/*
 * Create a list that holds all of your cards
 */
var cards_all = [];
cards_all[0] = 'fa-diamond',
cards_all[1] = 'fa-paper-plane-o',
cards_all[2] = 'fa-anchor',
cards_all[3] = 'fa-bolt',
cards_all[4] = 'fa-cube',
cards_all[5] = 'fa-leaf',
cards_all[6] = 'fa-bicycle',
cards_all[7] = 'fa-bomb',
cards_all[8] = 'fa-diamond',
cards_all[9] = 'fa-paper-plane-o',
cards_all[10] = 'fa-anchor',
cards_all[11] = 'fa-bolt',
cards_all[12] = 'fa-cube',
cards_all[13] = 'fa-leaf',
cards_all[14] = 'fa-bicycle',
cards_all[15] = 'fa-bomb';

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
shuffle(cards_all);

var str = '';
for (var i = 0; i<=cards_all.length;i++){
	str += '<li class = \"card\"><i class=\"fa '+cards_all[i]+'\"></i></li>';
}
document.getElementsByClassName("deck").innerHTML = str;

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function display_symbol(index){
	var card_id = card[index];
	card_id.className+=" open show";
}
function add_open_list(index){
	var card_li = card[index].getElementsByTagName("i")[0];
	open_card.push(card_li);
}
function lock(){
	for(var i=0;i<2;i++){
		var card_lock = open_card[i].parentNode;
		card_lock.className = "card match";
		//console.log(open_card+'打开的卡牌是');
		match_card.push(cId[i]);//匹配的卡牌获得索引
		console.log('匹配的卡牌是'+match_card);
	}
}
function remove_hide(){
	for(var i=0;i<2;i++){
		var card_not_match = open_card[i].parentNode;
		card_not_match.className = 'card notm';
		//控制卡牌背景色先变红1s后消失
		(function (n) {
			function f() {
				n.className = 'card'
			}
			setTimeout(f, 1000);
		})(card_not_match)
	}
}

function check_match(){
	var o1 = open_card[0].className;
	var o2 = open_card[1].className;
	if (o1 == o2){
		lock();
		open_card.splice(0,open_card.length);
	}else{
		remove_hide();
		open_card.splice(0,open_card.length);
	}
	
	display_counter();
	if (match_card.length == 16){
		Message();
	}
}
function display_counter(){
}
function Message(){
	var fragment = document.createDocumentFragment();
	var html = document.getElementsByClassName("container");
	var info = document.createElement("p");
	info.innerHTML("Congratulations! You Won!"+' \n '+"With 17 Moves and 1 Stars."+' \n '+'Woooooo!');
	html.appendChild(info);
	var info_button = document.createElement("input");
	info_button.type = 'button';
	info_button.value = "Play again!";
}


var card = document.getElementsByClassName("card");//获得所有的卡牌
var open_card = [];//翻开的卡牌数组，长度始终为2
var match_card = [];//匹配的卡牌数组，长度在增加
var counter = 0;//计步
var cId = [];//控制每次翻开的卡牌不能是同一张

for(var i =0;i<card.length;i++){
	(function(n){
		var handler = function(){
			cId.push(n);//翻开的卡牌索引
			if(cId[0] != cId[1]){//两次点击不能是同一个
				display_symbol(n);//展示卡牌
				add_open_list(n);//添加到打开的卡牌数组中
			}else{
				cId.pop();
			}
			if(open_card.length == 2){//打开的卡牌数组长度是2时
				check_match();//看匹配情况
				counter += 1;
				for(var j=0;j<match_card.length;j++){//match_card是匹配的卡牌索引数组，现要取消匹配的卡牌的点击事件
				console.log('要取消的索引是'+match_card[j]);
					(function (m){
						var mid = match_card[m];
						card[mid].removeEventListener("click",handler,false);
						console.log('取消了'+mid+'的点击事件');
					})(j)
					/*var mid = match_card[j];
					card[mid].removeEventListener("click",handler,false);*/
				}
				cId.splice(0,cId.length);//翻开的卡牌索引数组清空
			}
		}
		card[n].addEventListener("click",handler,false);//为每张卡牌设置点击事件
	})(i)
}