//这里就是两个参数传入一个颜色一个提示语
function toast(color, text){
    //创建一个div之后把参数上的提示语放上去再加入颜色
	const body = document.getElementsByTagName('body')
	const toast = document.createElement("div")
	toast.innerHTML = `<div
				class="flex fixed top-2.5 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
				role="alert">
				<svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor"
					viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd"
						d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
						clip-rule="evenodd"></path>
				</svg>
				<span class="sr-only">Info</span>
				<div>
					${text}
				</div>
			</div>`
	document.body.appendChild(toast)
    //定义一个显示时间多少秒之后消失
	setTimeout(function(){
		document.body.removeChild(toast)
	}, 3000)
}
exports.toast= toast;

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
