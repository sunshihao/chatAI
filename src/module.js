import {
	modal
} from "./src/components/modal.js"

document.getElementById("example_click").onclick = () => {
	modal.show();
};

function showModal() {
	modal.show();
}
