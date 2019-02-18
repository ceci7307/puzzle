"use strict";
let container_width;
let container_height;

const imageAddress = document.querySelector("#URL").value;
document.addEventListener("DOMContentLoaded", startTheScript);

function startTheScript() {
  document.querySelector("button").addEventListener("click", loadImage);
}

function loadImage() {
  document.querySelector("img").src = imageAddress;
  document.querySelector("img").onload = PicLoaded;
}

function PicLoaded() {
  container_width = document.querySelector("img").naturalWidth;
  container_height = document.querySelector("img").naturalHeight;
  createDropxones();
}

let numOfXPieces = document.querySelector("#numX").value;
let numOfYPieces = document.querySelector("#numY").value;

function createDropxones() {
  //alert("Hey");
  document.querySelector(
    "#container"
  ).style.gridTemplateColumns = `repeat(${numOfXPieces}, 1fr)`;
  document.querySelector("#container").style.width = `${container_width}px`;
  document.querySelector("#container").style.height = `${container_height}px`;

  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let piece = document.createElement("div");
      piece.style.height = container_height / numOfYPieces + "px";
      //piece.textContent = `${x}${y}`;

      piece.dataset.xyid = `ID${x}${y}`;
      piece.classList.add("dropzone");
      document.querySelector("#container").appendChild(piece);
    }
  }

  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let piece = document.createElement("div");
      piece.style.height = container_height / numOfYPieces + "px";
      piece.style.width = container_width / numOfXPieces + "px";
      piece.style.backgroundImage = `url(${imageAddress})`;
      piece.style.backgroundPosition = `${(x * container_width) /
        numOfXPieces}px ${(y * container_height) / numOfYPieces}px`;

      piece.dataset.xyid = `ID${x}${y}`;
      piece.classList.add("piece");
      document.querySelector("#piececontainer").appendChild(piece);
    }
  }
  draggable();
}
document.querySelectorAll(".piece").draggable = true;

let dragged;

function draggable() {
  /* events fired on the draggable target */
  document.addEventListener("drag", function(event) {});
  document.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = 0.5;
  });
  document.addEventListener("dragend", function(event) {
    // reset the transparency
    event.target.style.opacity = "";
  });
  /* events fired on the drop targets */
  document.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
  });
  document.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    console.log("DROP", event.target.className);
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
      event.target.style.background = "";
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
      dragged.style.left = event.target.style.left;
      dragged.style.top = event.target.style.top;
    } else if (event.target.className == "theBody") {
      // park the dragged elem somewhere on the body
      dragged.style.left = event.pageX + "px";
      dragged.style.top = event.pageY + "px";
    }
  });

  randomPieces();
}

function randomPieces() {
  document.querySelectorAll(".piece").forEach(pieces => {
    pieces.style.left = `${Math.random() * 500 + 250}px`;
    pieces.style.right = `${Math.random() * 500 + 250}px`;
  });
}
