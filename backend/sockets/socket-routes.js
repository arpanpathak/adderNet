const User = require('../models/user-model');
const Online = require('../models/online-model');
const ChatFunction = require('../models/chat-model');

module.exports = (io)=>{
  io.on('connection',(socket)=>{
    new Online({id:socket.request.user._id,socket:socket.id}).save();
    socket.on('typing',(data)=>{
    User.findOne({username:data}).then((user)=>{
      if(!user){
        socket.emit('typing',true);
      }
      else{
        socket.emit('typing',false);
      }
    });
    });
    //Online offline events
    socket.on('disconnect',()=>{
      Online.find({socket:socket.id}).remove(function(err){
        if(err) throw err;
      });
    });

    //global
    socket.on('global',(message)=>{
      socket.emit('global',{by:{name:socket.request.user.name, username:socket.request.user.username},message:message, class:'me'});
      socket.broadcast.emit('global',{by:{name:socket.request.user.name, username:socket.request.user.username},message:message, class:'you'});
    });

    //search
    socket.on('search',(name)=>{
      User.find({$or:[{name: new RegExp(name, "i")},{username: new RegExp(name, "i")}]},null,{sort:'id'}).select('name').select('username').then((data)=>{
        socket.emit('search',data);
      },(err)=>{});
    });

    //add friends
    socket.on('addFriend',(username)=>{
      User.findOne({username:username}).then((user)=>{
        if(user.friends.indexOf(socket.request.user._id) == -1){
          user.friends.push(socket.request.user._id);
          User.update({username:username},user,{new:false}).then((data)=>{
            Online.find({id:user._id}).then((onlineData)=>{
              onlineData.forEach((onlinePerson)=>{
                io.to(onlinePerson.socket).emit('friendRequest',{id:socket.request.user._id, name:socket.request.user.name});
              });
            });
          },(err)=>{});
          User.update({_id:socket.request.user._id},{$push:{friends:user._id}},{new:false}).then((data)=>{
            socket.emit('friendAdded',{id:user._id, name:user.name});
          },(err)=>{});
        }
        else{
          socket.emit('friendExists',{id:user._id, name:user.name});
        }
      },(err)=>{});
    });

    //retrive friends
    socket.on('retriveFriend',(userId)=>{
      let Chat = ChatFunction(socket.request.user._id, userId);
      Chat.update({to_id:socket.request.user._id},{$set:{read:true}},{multi:true}).then((data)=>{
        Chat.find({}).then((data)=>{
          socket.emit('retriveFriend',data);
        },(err)={});
      },(err)=>{});
    });

    //personal message
    socket.on('personal',(messageData)=>{
      let Chat = ChatFunction(socket.request.user._id, messageData.to);
      new Chat({by_id:socket.request.user._id, to_id:messageData.to, type:"text", message:{text:messageData.message}, time:messageData.time, read:false}).save().then((data)=>{
        Online.find({id:socket.request.user._id}).then((onlineData)=>{
          onlineData.forEach((onlinePerson)=>{
            io.to(onlinePerson.socket).emit('personal',data);
          });
        });
        Online.find({id:messageData.to}).then((onlineData)=>{
          onlineData.forEach((onlinePerson)=>{
            io.to(onlinePerson.socket).emit('personal',data);
          });
        });
      },(err)=>{
        console.log(err);
      });
    });

    socket.on('setRead',(data)=>{
      let Chat = ChatFunction(socket.request.user._id, data.by_id);
      Chat.update(data,{$set:{read:true}}).then((data)=>{},(err)=>{});
    });
  });
};
