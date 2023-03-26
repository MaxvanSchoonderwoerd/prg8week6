import { DecisionTree } from "./libraries/decisiontree.js";

let decisionTree;

const output = document.getElementById("output");

const color = document.getElementById("color");
const odor = document.getElementById("odor");
const bruises = document.getElementById("bruises");
const btnCheck = document.getElementById("btnCheck");

function loadModel() {
  fetch("/model/model.json")
    .then((response) => response.json())
    .then((model) => modelLoaded(model));
}

function modelLoaded(model) {
  decisionTree = new DecisionTree(model);
}

btnCheck.addEventListener("click", () => {
  checkIfEdible(color.value, odor.value, bruises.value);
});

function checkIfEdible(colorValue, odorValue, bruisesValue) {
  let mushroom = { "cap-color": colorValue, odor: odorValue, bruises: bruisesValue };
  if (decisionTree) {
    let prediction = decisionTree.predict(mushroom);
    output.innerHTML = `predicted ${prediction}`;
  } else {
    output.innerHTML = "Error with decisionTree";
  }
}

loadModel();
