/** main page */


/**
 * Toast弹出框 暂时使用 待优化TODO
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

let voiceFlag = false; // 是否进行语音输入的标志

function useVoiceFuc() {
	showAlert("info", "你好")
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
        					<div class="chat-bubble-content flex justify-center items-center text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg px-5 py-2.5">
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
const HEARTBEAT_INTERVAL = 10000;

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

console.log('messageFormmessageForm', messageForm)

messageForm.addEventListener('submit', event => {
	
	event.preventDefault();
	const message = messageInput.value;
	
	console.log('message_message', message)
	

	if (message) {
		socket.send(message);
		messageInput.value = '';
	} else {

	}
});

function onSubmitChat (){
	const message = messageInput.value;
	
	if (message) {
		socket.send(message);
		messageInput.value = '';
	} else {
	
	}
}
