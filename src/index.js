
/**
 * 暂时使用 待优化TODO
 */ 
function showAlert(type, text, TIME = 3000) {

	const $triggerEl = document.getElementById(`alert_${type}`);
	$triggerEl.style.display = "flex";

	$triggerEl.children[2].textContent = text

	let timer = setTimeout(() => {
		$triggerEl.style.display = "none";
		clearTimeout(timer);
	}, TIME)
}

//这里就是两个参数传入一个颜色一个提示语
// function toast(color, text){
//     //创建一个div之后把参数上的提示语放上去再加入颜色
// 	// const body = document.getElementsByTagName('body')
// 	const toast = document.createElement("div")
//     toast.className = 'toast_area'
// 	toast.innerHTML = `<div
// 				class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
// 				role="alert">
// 				<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
// 					viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
// 					<path fill-rule="evenodd"
// 						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
// 						clip-rule="evenodd"></path>
// 				</svg>
// 				<span class="sr-only">Info</span>
// 				<div>
// 					${text}
// 				</div>
// 			</div>`
// 	document.body.appendChild(toast)
//     //定义一个显示时间多少秒之后消失
// 	// setTimeout(function(){
// 	// 	document.body.removeChild(toast)
// 	// }, 3000)
// }


let voiceFlag = false; // 是否进行语音输入的标志

function useVoiceFuc() {
	showAlert("info", "你好")
	// toast('info', "你好")
	voiceFlag = !voiceFlag;
}

/** blob data to object */
function blobToObject(blob) {
	const reader = new FileReader();

	reader.onload = function() {

		try {
			const dataAsString = reader.result;


			const dataAsObject = JSON.parse(dataAsString); // 传入参数转义Object
			const messagesDiv = document.querySelector('#messages');
			const messElementById = document.getElementById("messages");

			console.log('receive message: ', dataAsObject)

			if (dataAsObject.code == "300") {
				return;
			} else if (dataAsObject.code != "200") {
				alert("AI 回复失败!")
				return;
			}

			if (dataAsObject.user === 'AI') {
				messElementById.innerHTML += `<div class="chat-bubble chat-bubble-right">
        					<div class="chat-bubble-header">
        						<span>${dataAsObject.user}</span>
        						<span>${dataAsObject.date}</span>
        					</div>
        					<div class="chat-bubble-content">
        						<p>${dataAsObject.content}</p>
        					</div>
        				</div>`
			} else {
				messElementById.innerHTML += `<div class="chat-bubble chat-bubble-left">
        					  <div class="chat-bubble-header">
        					    <span>${dataAsObject.user}</span>
        					    <span>${dataAsObject.date}</span>
        					  </div>
        					  <div class="chat-bubble-content">
        					    <p>${dataAsObject.content}</p>
        					  </div>
        					</div>`;
			}
			
			messElementById.scrollTop = messElementById.scrollHeight; 
		} catch (e) {
			//TODO handle the exception
		}


	};

	reader.readAsText(blob);
}

// connect socket
const socket = new WebSocket('ws://localhost:8080');
// const socket = new WebSocket('ws://82.157.139.89:8080');
// const socket = new WebSocket('wss://dhc.ink/ws');

// 心跳检测间隔时间（毫秒）
const HEARTBEAT_INTERVAL = 5000;

// 最近一次收到消息的时间
let lastMessageTime = Date.now();

// 发送心跳包
function sendHeartbeat() {
	if (Date.now() - lastMessageTime > HEARTBEAT_INTERVAL) {
		socket.send('heartbeat');
	}
}

socket.addEventListener('open', event => {
	console.log('WebSocket connection established');

	// 启动心跳检测定时器
	setInterval(sendHeartbeat, HEARTBEAT_INTERVAL);
});

// receive message
socket.addEventListener('message', event => {
	blobToObject(event.data)
});

socket.addEventListener('close', event => {
	console.log('WebSocket connection closed');

	// 清除心跳检测定时器
	clearInterval(sendHeartbeat);
});


const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');

messageForm.addEventListener('submit', event => {
	event.preventDefault();
	const message = messageInput.value;

	if (message) {
		socket.send(message);
		messageInput.value = '';
	} else {

	}


});
