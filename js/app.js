/*
 * Create a list that holds all of your cards
 */
var cards_all = ['fa-diamond','fa-diamond',
'fa-paper-plane-o','fa-paper-plane-o',
'fa-anchor','fa-anchor',
'fa-bolt','fa-bolt',
'fa-cube','fa-cube',
'fa-leaf','fa-leaf',
'fa-bicycle','fa-bicycle',
'fa-bomb','fa-bomb'];

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
		//open_card.splice(0,open_card.length);
	}else{
		remove_hide();
	}
    open_card.splice(0,open_card.length);
	display_counter();
	console.log(match_card.length);
	if (match_card.length == 16){
		Message();
	}
}
function display_counter(){
	counter += 1;
	document.getElementsByClassName('moves')[0].innerHTML = counter;
}
function Message(){
	var original = document.getElementsByClassName("container")[0];
	console.log(original);
	original.parentNode.removeChild(original);
	var html = document.createElement('div');
	html.className = 'result';
	var info1 = document.createElement("p");
	var info2 = document.createElement("p");
	var info3 = document.createElement("p");
	info1.innerHTML="Congratulations! You Won!";
	info1.className = 're-won';
	info2.innerHTML="With "+display_counter()+" Moves and "+" Stars.";
	info2.className = 're-moves';
	info3.innerHTML="Woooooo!";
	info3.className = 're-moves';
	
	html.appendChild(info1);
	html.appendChild(info2);
	html.appendChild(info3);
	
	var info_button = document.createElement("button");
	var span_button = document.createElement("span");
	span_button.innerHTML = 'Play again!';
	
	info_button.appendChild(span_button);
	info_button.className="re-button";
	html.appendChild(info_button);
	document.body.appendChild(html);
}


var card = document.getElementsByClassName("card");//获得所有的卡牌
var open_card = [];//翻开的卡牌数组，长度始终为2
var match_card = [];//匹配的卡牌数组，长度在增加
var counter = 0;//计步
var cId = [];//控制每次翻开的卡牌不能是同一张

/*for(var i =0;i<card.length;i++){
	(function(n){*/
var handler = function(){
	var n = this.dataset.index;
	console.log(n+'dataset.index');
	cId.push(n);//翻开的卡牌索引
	console.log(cId);
	if(cId[0] != cId[1]){//两次点击不能是同一个
		console.log(cId);
		console.log(match_card);
		display_symbol(n);//展示卡牌
		add_open_list(n);
		console.log(open_card);
	}else{
		cId.pop();
	}
	if(open_card.length == 2){//打开的卡牌数组长度是2时
		check_match();//看匹配情况
		for(var j=0;j<match_card.length;j++){//match_card是匹配的卡牌索引数组，现要取消匹配的卡牌的点击事件
			//console.log('要取消的索引是'+match_card[j]);
			(function (m){
				var mid = match_card[m];
				console.log(mid);
				card[mid].removeEventListener("click",handler,false);
				//console.log('取消了'+mid+'的点击事件');
			})(j)
		}
		cId.splice(0,cId.length);//翻开的卡牌索引数组清空
	}
}
for(var n = 0;n<card.length;n++){
	card[n].dataset['index'] = n;
	card[n].addEventListener("click",handler,false);
}
/*card[n].addEventListener("click",handler,false);//为每张卡牌设置点击事件
	})(i)
}*/
/*星星评分*/
/*重置和刷新*/
var restart_botton = document.getElementsByClassName("restart")[0];
console.log(restart_botton);
restart_botton.addEventListener("click",restart,false);

var restart=function(){
	console.log('restart');
	shuffle(cards_all);
	//console.log(cards_all);
	var str = '';
	for (var i = 0; i<=cards_all.length;i++){
		str += '<li class = \"card\"><i class=\"fa '+cards_all[i]+'\"></i></li>';
	}
	document.getElementsByClassName("deck").innerHTML = str;
	for(var n = 0;n<card.length;n++){
		card[n].dataset['index'] = n;
		card[n].addEventListener("click",handler,false);
	}
}