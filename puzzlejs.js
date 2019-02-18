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
      piece.textContent = `${x}${y}`;
      piece.classList.add("piece");
      document.querySelector("#container").appendChild(piece);
    }
  }
}
