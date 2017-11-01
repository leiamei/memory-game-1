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
//console.log(cards_all);


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
//console.log(cards_all);
var str = '';
for (var i = 0; i<=cards_all.length;i++){
	str += '<li class = \"card\"><i class=\"fa '+cards_all[i]+'\"></i></li>';
}
document.getElementsByClassName("deck").innerHTML = str;
//console.log(document.getElementsByClassName("deck").innerHTML);

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
	var card_id = card[index];//clicked li
	card_id.className+=" open show";
}
function add_open_list(index){
	var card_li = card[index].getElementsByTagName("i")[0];//elements i in the array
	open_card.push(card_li);
}
function lock(){
	for(var i=0;i<2;i++){
		var index = open_card[i];
		var card_lock = index.parentNode;
		card_lock.className = "card match";
	}
}
function remove_hide(){//clicked <i> in the array
	for(var i=0;i<2;i++){
		
		var card_not_match = open_card[i].parentNode;//<li> not be matched, length of array is 2
		card_not_match.className = 'card notmatch';//backgroundColor of this li is set as red
		/*(function (n) {
			function f() {
				n.className = 'card'
			}
		setTimeout(f, 1000)
		})(card_not_match)*/
		setTimeout((function(n){//callback generator
			return function(){//disappear after 1s
				array[n].parentNode.className = 'card';
			};
		})(i),1000);
		/*(function (n) {
			function f() {
				card_not_match.className = 'card';
				//array[n].parentNode.className = 'card'//显示array[n]没有定义
			}
			setTimeout(f, 1000)
		})(i)*/
		//这里的i没有被用上，array已经被清空了，因为setTimeout函数是异步执行
		/*
		setTimeout(function(n){//disappear after 1s
			array[n].parentNode.className = 'card';
		}(i),1000);因为第一个参数立即执行了，所以时间没有用*/
	}
}
function check_match(){
	var a1 = open_card[0].className;
	var a2 = open_card[1].className;
	if (a1 == a2){
		lock();
		open_card.splice(0,open_card.length);
	}else{
		remove_hide();
		open_card.splice(0,open_card.length);
	}
	display_counter();
	if (counter == 16){
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
var card = document.getElementsByClassName("card");
var open_card = [];
var counter = 0;

for(var i =0;i<card.length;i++){
	(function(n){
		card[i].onclick = function(){
			display_symbol(n);
			add_open_list(n);
			if(open_card.length == 2){
				check_match();
			}
		}
		
	})(i)
}
