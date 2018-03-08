"use strict";function shuffle(a){for(var n=a.length,e=void 0,t=void 0;0!==n;)t=Math.floor(Math.random()*n),e=a[n-=1],a[n]=a[t],a[t]=e;return a}function addDOM(a,n){a.each(function(a){$(this).find(".fa").addClass(n[a])})}function displaySymbol(a,n){a[n].className+=" open show"}function checkMatch(a,n,e,t,o,s,c){c[a[0]].children[0].className===c[a[1]].children[0].className?(lockCard(c,a),n.push(a[0]),n.push(a[1])):removeCard(c,a),16===n.length&&(addMessage(e,t,seconds(s)),clearTimeout(o))}function addMessage(a,n,e){$(".container").remove();var t=$('<div class="result"></div>'),o=$('<p class="re-won">Congratulations! You Won!</p>'),s=$('<p class="re-moves">With&nbsp;'+a+"&nbsp;Moves&nbsp;&nbsp;,&nbsp;&nbsp;"+e+"&nbsp;seconds&nbsp;&nbsp;and&nbsp;&nbsp;"+n+"&nbsp;Stars. </p>"),c=$('<p class="re-moves">Woooooo!</p>'),i=$('<p class="re-button">Play again!</p>');t.append(o,s,c,i),$(document.body).append(t),restart(".re-button")}function lockCard(a,n){var e=[];$.each(n,function(n,t){a[t].className="card match animated bounce",e.push(t)}),$.each(a,function(n){for(var t=0;t<e.length;t++)if(n==e[t]){var o=a[n];$(o).unbind("click")}})}function removeCard(a,n){$.each(n,function(n,e){a[e].className="card notm animated wobble",function(a){setTimeout(function(){a.className="card"},1500)}(a[e])})}function displayNum(a){$(".moves").text("").append(a)}function displayStar(a){a>12&&a<=16?$(".stars>li:eq(2)").remove():a>16&&$(".stars>li:eq(1)").remove();return $(".stars>li").length}function play(a){var n=[],e=[],t=0,o=void 0,s=void 0,c=void 0,i=!0;a.bind("click",function(){if(i){var r=new Date;c=r.getTime(),s=timer(0),i=!1}var l=a.index(this);n.push(l),n[0]!=n[1]?displaySymbol(a,l):n.pop(),2===n.length&&(displayNum(t+=1),o=displayStar(t),checkMatch(n,e,t,o,s,c,a),n.splice(0,n.length))})}function restart(a){$(a).bind("click",function(){window.location.reload()})}function interval(a,n){return setTimeout(function e(){a.call(null),setTimeout(e,n)},n)}function timer(a){return interval(function(){a++,$(".time span").text("").append(a)},1e3)}function seconds(a){var n=new Date;return Math.floor((n.getTime()-a)/1e3)}$(document).ready(function(){var a=["fa-diamond","fa-diamond","fa-paper-plane-o","fa-paper-plane-o","fa-anchor","fa-anchor","fa-bolt","fa-bolt","fa-cube","fa-cube","fa-leaf","fa-leaf","fa-bicycle","fa-bicycle","fa-bomb","fa-bomb"];a=shuffle(a);var n=$(".card");addDOM(n,a),play(n),restart(".restart")});