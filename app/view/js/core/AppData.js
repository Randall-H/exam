/**
 *
 *
 * @lv     => 0_entry
 * @notes  => APP_SESSION is the local data that the app starts with
 **/

function getLocalStorage() {

	let keys    = Object.keys(localStorage);
	let session = {
		isLoggedIn : false,
		token      : "",
		profile    : {
			uid         : "",
			displayName : "Anonymous",
			email       : "guest@gmail.com"
		}
	};

	keys.map( (storageKey) => {
		if (storageKey.indexOf('zola_storage') >= 0) {
			let sessionData = JSON.parse(localStorage.getItem(storageKey));

			session.isLoggedIn = sessionData.isLoggedIn;
			session.token = sessionData.token;
			session.profile = {
				uid           : sessionData.profile.uid || "",
				displayName   : sessionData.profile.displayName || "Zola Anonymous",
				email   	  : sessionData.profile.email || "zolaAnon@gmail.com"
			};
		}
	});

	return session;
}

var updateLocalStorage = function (updates) {

	console.log('::____LOCALSTORAGE____:: updateLocalStorage_INIT', {
		updates
	});

	var keys = Object.keys(localStorage);
	var sessionData = null;

	keys.map( (storageKey) => {
		if (storageKey.indexOf('zola_storage') >= 0) {
			sessionData = JSON.parse(localStorage.getItem(storageKey));

			sessionData.token 		  = updates.token;
			sessionData.isLoggedIn    = updates.isLoggedIn;
			sessionData.profile 	  = updates.profile;

			localStorage.setItem(storageKey, JSON.stringify(sessionData));
		}
	});

	if (!sessionData) {
		sessionData = {};

		sessionData.token 		  = updates.token;
		sessionData.isLoggedIn    = updates.isLoggedIn;
		sessionData.profile 	  = updates.profile;

		localStorage.setItem('zola_storage', JSON.stringify(sessionData));
	}

};

var storage = getLocalStorage();

const APP_SESSION = {
	data : storage,
	updateData : updateLocalStorage
};

export default APP_SESSION;