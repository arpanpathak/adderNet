// add this file to .gitignore
module.exports = {
  mongodb:{
    db: 'mongodb://localhost:27017/chatbox'
  },
  session:{
    name: 'adderKookie',
    cookieKey: ['cookies taste great']
  },
  salt:{
    key: '9)&'
  },
  hashSecret1: 'thisIsASecret',
  hashSecret2: 'thisIsAlsoASecret',

  api: {
  	googleMap: {
  		"key": "AIzaSyDv084m8ZnoPEnwZSEApjfVwM0eCY6OZ6M",
  	},
  	googleOAuth: {
  		"client_id": 					"250199819534-gof813kaa3ni165v67t455oqadtt1dmi.apps.googleusercontent.com",
  		"project_id": 					"addernet-199612",
  		"auth_uri": 					"https://accounts.google.com/o/oauth2/auth",
  		"token_uri": 					"https://accounts.google.com/o/oauth2/token",
  		"auth_provider_x509_cert_url":  "https://www.googleapis.com/oauth2/v1/certs",
  		"client_secret": 				"ETf36FQMkQNiXMf2j_goZqio"
  	}
  }, 	

  twilio: {
    accountSid: 'AC8f70e7f43aa90878c38f5b1c3f3c1100',
    authToken: '03196ebe1d0bc7b5a0c3b5c096496f23',
    fromPhone: '+19386666765'
  }
};
