// function formatNum(m){
// 	m = Number(m);
// 	return m<10 ? '0'+m : m;
// }

export default{
	// minite2str (minutes) {
	// 	let hour = Math.floor(minutes / 60);
	// 	let minute = minutes % 60;
	// 	let timeStr = '';
	// 	if (hour > 0) {
	// 		timeStr += hour + 'hours';
	// 	}
	// 	if (minute > 0) {
	// 		timeStr += minute + 'minutes';
	// 	}
	// 	return timeStr;
	// },
	// ms2str (mseconds) {
	// 	let msecs = Math.floor(mseconds/10);
	// 	let m = Math.floor(msecs/(100*60));
	// 	let s = Math.floor((msecs-m)/100);
	// 	let ms = msecs%100;
	// 	return{
	// 		minute: formatNum(m),
	// 		second: formatNum(s),
	// 		msecond: formatNum(ms)
	// 	}
	// },
	//
	// getUrlParam () {
	// 	let searchArr = window.location.href.split('?');
	// 	let search = searchArr.length > 1 ? searchArr[1].split('&') : [];
	// 	let param = {};
	// 	if (search.length > 0 && search[0].length > 0) {
	// 		search.forEach(item => {
	// 			let temp = item.split('=');
	// 			param[temp[0]] = temp[1];
	// 		})
	// 	}
	// 	return param;
	// },
	//
	// // set localStorage
	// setStorage (key, value) {
	// 	if((typeof(value)).toLowerCase() == 'object'){
	// 		value = JSON.stringify(value)
	// 	}
	// 	window.localStorage.setItem(key,value);
	// },
	// // get localStorage
	// getStorage (key) {
	// 	return window.localStorage.getItem(key);
	// },
	// // remove localStorage
	// removeStorage (key) {
	// 	window.localStorage.removeItem(key);
	// },
	// // clear localStorage
	// clearStorage () {
	// 	window.localStorage.clear();
	// },
	//
	// // set cookie
	// setCookie (cname, cvalue, exdays) {
	// 	let d = new Date()
	// 	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
	// 	let expires = 'expires=' + d.toUTCString()
	// 	document.cookie = cname + '=' + cvalue + '; ' + expires
	// },
	//
	// // get cookie
	// getCookie (cname) {
	// 	let name = cname + '='
	// 	let ca = document.cookie.split(';')
	// 	for (let i = 0; i < ca.length; i++) {
	// 		let c = ca[i]
	// 		while (c.charAt(0) === ' ') c = c.substring(1)
	// 		if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
	// 	}
	// 	return null
	// },
	//
	// // clear cookie
	// clearCookie () {
	// 	this.setCookie('username', '', -1)
	// },
	// formatNum(m){
	// 	m = Number(m)
	// 	return m<10 ? '0'+m : m
	// },
	// //timestamp to dateTime
	// timestamp2datetime(timestamp){
	// 	var time = new Date(timestamp);
	// 	var y = time.getFullYear();
	// 	var m = time.getMonth()+1;
	// 	var d = time.getDate();
	// 	var h = time.getHours();
	// 	var mm = time.getMinutes();
	// 	var s = time.getSeconds();
	// 	return y+'-'+formatNum(m)+'-'+formatNum(d)+' '+formatNum(h)+':'+formatNum(mm)+':'+formatNum(s);
	// },
	// formatDate(date){
	// 	var time = new Date(date);
	// 	var y = time.getFullYear();
	// 	var m = time.getMonth()+1;
	// 	var d = time.getDate();
	// 	return y+'-'+formatNum(m)+'-'+formatNum(d)
	// },
	//
	// // remove Object From Array By properties
	// removeObjFromArrayBy(arr, propObj){
	// 	let key = Object.keys(propObj)[0];
	// 	let value = propObj[key];
	// 	let matchedObj = null;
	// 	for(let i = 0; i < arr.length; i++){
	// 		if(arr[i][key] == value){
	// 			matchedObj = {
	// 				index: i,
	// 				item: arr[i]
	// 			}
	// 			break;
	// 		}
	// 	}
	// 	arr.splice(matchedObj.index,1);
	// 	return arr
	// },
	// imageFile2DataURL(imageFile, maxWidth, maxHeight, quality=1.0, force){
	// 	return new Promise((resolve, reject)=>{
	// 		const reader = new FileReader(),
	// 			oImg = new Image(),
	// 			canvas = document.createElement('canvas'),
	// 			context = canvas.getContext('2d');
	// 		reader.onerror=reject;
	// 		oImg.onerror=reject;
	// 		oImg.onload = () => {
	// 			let w,h;
	// 			if(force){
	// 				w = maxWidth;
	// 				h = maxHeight;
	// 			}else{
	// 				w = oImg.width;
	// 				h = oImg.height;
	// 				let	mw = maxWidth || w,;
	// 					mh = maxHeight || h,;
	// 					rate = Math.max(w/mw,h/mh);
	// 				if(rate>1){
	// 					w = w/rate;
	// 					h = h/rate;
	// 				}
	// 			}
	// 			canvas.width = w;
	// 			canvas.height = h;
	// 			context.clearRect(0, 0, w, h);
	// 			context.drawImage(oImg, 0, 0, w, h);
	// 			const dataURL = quality < 1 ? canvas.toDataURL('image/jpeg', quality) : canvas.toDataURL(imageFile.type);
	// 			resolve(dataURL);
	// 		}
	// 		reader.onload= () => oImg.src = reader.result;
	// 		reader.readAsDataURL(imageFile);
	// 	})
	// },
	// imageFileCompress(imageFile, maxWidth, maxHeight, quality, force){
	// 	return this.imageFile2DataURL(imageFile, maxWidth, maxHeight, quality, force).then( dataURL => {
	// 		// console.log(dataURL)
	// 		// const newFile = dataURLtoFile(dataURL)
	// 		// newFile.src = dataURL
	// 		return dataURL;
	// 	})
	// },


	//common function for front end
	errorCodeHandling(error){
		let err_msg = "";
		switch (error.response.status){
			case 400:
				err_msg = "wrong request";break;
			case 401:
				err_msg = "your username or password is wrong. Please tyr again.";break;
			case 200:
				err_msg = "200";break;
			case 403:
				err_msg = "reject request";break;
			case 404:
				err_msg = "wrong address";break;
			case 408:
				err_msg = "time out";break;
			case 500:
				err_msg = 'server is down';break;
			case 501:
				err_msg = 'no service';break;
			case 502:
				err_msg = 'DNS error';break;
			case 503:
				err_msg = 'unavailable service';break;
			case 504:
				err_msg = 'time out';break;
			case 505:
				err_msg = 'HTTP version is not supported';break;
			default: err_msg = error.response.toString();
		}
		alert(err_msg);
	},

	deleteCookies(_this){
		_this.$cookie.delete('authentication');
		_this.$cookie.delete('username');
		_this.$cookie.delete('id');
		_this.$cookie.delete('isLogin');
        _this.$cookie.delete('firstname');
		// this.$cookie.set('isLogin', 'false');
		// this.$router.push({path:"/"});
	},

	rateData2Text(data){
		for(let i =0;i<data.length;i++){
			switch (data[i].emotion_icon_ID) {
				case 1:
					data[i].emotion_icon_ID = 'Satisfied';
					break;
				case 2:
					data[i].emotion_icon_ID = 'Delighted';
					break;
				case 3:
					data[i].emotion_icon_id = 'Engaged';
					break;
				case 4:
					data[i].emotion_icon_ID = 'Dissatisfied';
					break;
				case 5:
					data[i].emotion_icon_ID = 'Anxious';
					break;
				case 6:
					data[i].emotion_icon_ID = 'Frustrated';
					break;
			}

		}

	},

	rateBoolean2Text(data){
		for(let i = 0;i<data.length;i++){
			if(data[i].is_Submitted===true){
				data[i].is_Submitted='yes';
			}else if(data[i].is_Submitted===false){
				data[i].is_Submitted='no';
			}

			if(data[i].questions.q1===true){
				data[i].questions.q1='yes';
			}else if(data[i].questions.q1===false){
				data[i].questions.q1='no';
			}else{
				data[i].questions.q1='';
			}

			if(data[i].questions.q2===true){
				data[i].questions.q2='yes';
			}else if(data[i].questions.q2===false){
				data[i].questions.q2='no';
			}else{
				data[i].questions.q2='';
			}

			if(data[i].questions.q3===true){
				data[i].questions.q3='yes';
			}else if(data[i].questions.q3===false){
				data[i].questions.q3='no';
			}else{
				data[i].questions.q3='';
			}

			if(data[i].questions.q3a===true){
				data[i].questions.q3a='yes';
			}else if(data[i].questions.q3a===false){
				data[i].questions.q3a='no';
			}else{
				data[i].questions.q3a='';
			}
		}
	},

	UTC2LocalTime(data){
		for(let i =0;i<data.length;i++){
			//todo it is not necessary, need decided, significant
			// if(data[i].shift_type==='N12'){
			// 	data[i].shift_date=Date.parse(data[i].shift_date)-45000000
			// }else if (data[i].shift_type==='N10'){
			// 	data[i].shift_date=Date.parse(data[i].shift_date)-37800000
			// }
			let time = new Date(data[i].shift_date);
			let year = time.getFullYear();
			let month = time.getMonth()+1;
			if(month < 10){
				month = '0'+ month;
			}
			// console.log(month);
			let day = time.getDate();
			if(day<10){
				data[i].shift_date= year +'-'+month+'-'+'0'+day;
			}else{
				data[i].shift_date= year +'-'+month+'-'+day;
			}
		}
	},

	preferenceData2Text(data){
		for(let i =0;i<data.length;i++){
			switch (data[i].section_icon_ID) {
				case 1:
					data[i].section_icon_ID = 'CTS';
					break;
				case 2:
					data[i].section_icon_ID = 'CRRT';
					break;
				case 3:
					data[i].section_icon_ID = 'Trauma';
					break;
				case 4:
					data[i].section_icon_ID = 'Neurosurgical';
					break;
				case 5:
					data[i].section_icon_ID = 'ECMO';
					break;
				case 6:
					data[i].section_icon_ID = 'EOLC/OD';
					break;
				case 7:
					data[i].section_icon_ID = 'Filtration';
					break;
			}

			switch(data[i].pressure_icon_ID){
				case 1:
					data[i].pressure_icon_ID = 'Challenge';
					data[i].negativeFlag=1;
					break;
				case 2:
					data[i].pressure_icon_ID = 'Low day';
					data[i].negativeFlag=2;
					break;
				case 3:
					data[i].pressure_icon_ID = 'Exhausted';
					data[i].negativeFlag=3;
					break;
			}
		}

	},

	preferenceBoolean2Text(data){
		for(let i = 0;i<data.length;i++){
			if(data[i].is_Submitted===true){
				data[i].is_Submitted='yes';
			}
			else if(data[i].is_Submitted===false){
				data[i].is_Submitted='no'
			}
		}
	},


	// Not been used anymore
	requestNegativeThreshold(_this){
		_this.$axios(
			{
				headers:{'Authorization':_this.$cookie.get('authentication')},
				method: 'GET',
				url: _this.siteConfig.serve.requestConfig
			}
		).then(
			( (response) => {
					// console.log(response.data.data[0].withInDays)
					return response.data.data[0].withInDays;
				}
			)
		).catch(function (error) {
			alert("bad request: " + error);
			// console.log(error.response);
		});
	},
	//TODO check the data structure of this.userData ---> return response.data.data;
	async requestNegative(_this){
		try {
			let response = await _this.$axios(
				{
					headers:{'Authorization':_this.$cookie.get('authentication')},
					method: 'GET',
					url: _this.siteConfig.serve.queryUser+'permissions=nurse',
				}
			);
			return response.data.data;
		} catch (error) {
			alert("bad request: " + error);
		}
	},
}
