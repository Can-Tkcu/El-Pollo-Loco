class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  F = false;

  
 keyCodeToKeyboardProperty = {
    39: "RIGHT",
    37: "LEFT",
    38: "UP",
    70: "F",
  };


  constructor() {
    this.keyListener();
    setInterval(() => {
      if (startGame == true) {
        this.btnListener();
      }
    }, 1000);
  }


  /**
* Attaches event listeners to the document for keydown and keyup events.
* When a keydown event is detected, the corresponding property in the "keyboard" object is set to true.
* When a keyup event is detected, the corresponding property in the "keyboard" object is set to false.
*
* @param {Keyboard} keyboard - class representing the keyboard state
* @this {keyCodeToKeyboardProperty} - object with mapping of keyCode to keyboard properties
*/
  keyListener() {
    document.addEventListener("keydown", (event) => {
      if (this.keyCodeToKeyboardProperty[event.keyCode]) {
        keyboard[this.keyCodeToKeyboardProperty[event.keyCode]] = true;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (this.keyCodeToKeyboardProperty[event.keyCode]) {
        keyboard[this.keyCodeToKeyboardProperty[event.keyCode]] = false;
      }
    });
  }


  /**
 * Handles an event, preventing its default behavior if it is cancelable.
 * 
 * @param {Event} e - the event to handle
 */
  handleEvent(e) {
    if (e.cancelable) {
      e.preventDefault();
    }
  }


  /**
 * Attaches event listeners to touchstart and touchend events for various buttons on the page.
 * Calls the `handleEvent` function to prevent the default behavior of the event if it is cancelable.
 * Sets the state of various class properties based on the button that was pressed/released.
 * 
 * @function
 * @property {Boolean} RIGHT - holds the state of the right button
 * @property {Boolean} LEFT - holds the state of the left button
 * @property {Boolean} UP - holds the state of the jump button
 * @property {Boolean} F - holds the state of the throw button
 */
  btnListener() {
    document.getElementById("right").ontouchstart = (e) => {
      this.handleEvent(e);
      this.RIGHT = true;
    };

    document.getElementById("right").ontouchend = (e) => {
      this.handleEvent(e);
      this.RIGHT = false;
    };

    document.getElementById("left").ontouchstart = (e) => {
      this.handleEvent(e);
      this.LEFT = true;
    };

    document.getElementById("left").ontouchend = (e) => {
      this.handleEvent(e);
      this.LEFT = false;
    };

    document.getElementById("jump").ontouchstart = (e) => {
      this.handleEvent(e);
      this.UP = true;
    };

    document.getElementById("jump").ontouchend = (e) => {
      this.handleEvent(e);
      this.UP = false;
    };

    document.getElementById("throw").ontouchstart = (e) => {
      this.handleEvent(e);
      this.F = true;
    };

    document.getElementById("throw").ontouchend = (e) => {
      this.handleEvent(e);
      this.F = false;
    };
  }
}
