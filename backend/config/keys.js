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
  twilio: {
    accountSid: 'yourSID',
    authToken: 'yourToken',
    fromPhone: 'yourPhone'
  }
};
