
const Online = require('../models/online-model');


module.exports = (io)=>{

  io.on('connection', (socket,data) => {
    // console.log(socket.request.user);
    let _id=socket.request.session.passport? socket.request.session.passport.user: null;
    // _id now contains user id of requested user....
    console.log("Someone connected", _id);
    if(_id!=null)
    new Online({id:_id,socket:socket.id}).save();

    socket.on('disconnect',()=>{
          Online.find({socket:socket.id}).remove(function(err){
            if(err) throw err;
          });
    });

    io.on('join',(data)=>console.log("fuck"));

  });

};
