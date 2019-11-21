# FlappyDragon
Game project in JS which is based on popular game "Flappy Bird"

## IMPORTANT FACTS:
 ### Flappy Dragon it's a side-scrolling game based on popular in 2013 year "Flappy Bird" designed by Vietnamese programmer Dong Nguyen.

 ### In my "remake" we can control the dragon trying to avoid the obstacles - big pipes which appear on bottom and top of the screen - btw. very similar to those we can see in Mario.

 * The rules are very simple. We should click in game window to keep the dragon up. 

 ![gameplay](/img/gameplay.gif)
 
 * Everytime when you get the score point, background will change because of this simple function:
```javascript
// SET RANDOM BACKGROUND COLOR
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}


function setRandomColor() {
	$("body").css("background-color", getRandomColor());
}
```

If you want try, just visit: https://sh3ev.github.io/FlappyDragon/

# HF&GL