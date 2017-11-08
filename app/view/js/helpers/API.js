export const API = {

	// post url @ /server dir, go to /server/config/router.js
	loginUser : function (requestData) {

		return new Promise(
			function resolver(resolve, reject) {

				var ajaxRequest = new XMLHttpRequest();

				var data = {
					email : requestData.email,
					password : requestData.password
				};

				var userData = JSON.stringify(data);

				console.log('::____API____:: [loginUser]', userData);

				ajaxRequest.onreadystatechange = function () {

					if (this.readyState === 4 && this.status === 200) {

						let responseObj = JSON.parse(this.response);
						//console.log('::____API____:: [loginUser_onreadystatechange]', responseObj);

						if (!!responseObj.error) {

							//console.log('::____API____:: [loginUser_onreadystatechange_ERROR]', responseObj.error);

							reject(responseObj);

						} else {
							//console.log('::____API____:: [loginUser_onreadystatechange_SUCCESS]', responseObj);

							resolve(responseObj)
						}

					}
				};

				ajaxRequest.onerror = function (error) {

					//console.log('::____API____:: [loginUser_onreadystatechange_onerror]', error);

					reject(error);
				};

				ajaxRequest.open("POST", "/login");
				ajaxRequest.setRequestHeader("Content-Type", "application/json");
				ajaxRequest.send(userData);

			}
		);

	},

	// get url to server @ /server dir, go to /server/config/router.js
	getUsers : function (token) {

		return new Promise(
			function resolver(resolve, reject) {

				var ajaxRequest = new XMLHttpRequest();
				var getRequest  = '/api/getUsers/?token=' + token;

				console.log('::____API____:: [getUsers]', getRequest);

				ajaxRequest.onreadystatechange = function () {

					if (this.readyState === 4 && this.status === 200) {

						let responseObj = JSON.parse(this.response);
						//console.log('::____API____:: [getUsers_onreadystatechange]', responseObj);

						if (!!responseObj.error) {

							//console.log('::____API____:: [getUsers_onreadystatechange_ERROR]', responseObj.error);

							reject(responseObj);

						} else {
							//console.log('::____API____:: [getUsers_onreadystatechange_SUCCESS]', responseObj);

							resolve(responseObj)
						}

					}
				};

				ajaxRequest.onerror = function (error) {
					//console.log('::____API____:: [getUsers_onerror]', error);

					reject(error);
				};

				ajaxRequest.open("GET", getRequest);
				ajaxRequest.setRequestHeader("Content-Type", "application/json");
				ajaxRequest.send();

			}
		);
	}
};