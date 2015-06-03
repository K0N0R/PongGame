function Network(socket: SocketIOClient.Socket) {
   
    socket.on('PlayerJoin', function (data) {
        console.log("PlayerJoin");
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].nick);
            Game1.UserWrapper1.AdUsersToGame(data[i].id, data[i].nick);
        }
    });
    socket.on('PlayerLeave', function (data) {
        console.log("PlayerLeave");    
            Game1.UserWrapper1.DeleteUsersFromGame(data);
    });
    socket.on('UserBecomePlayer', function (data) {
        Game1.AddUsersAsPlayersToBoard({ BoardID: data.BoardID, UserID:data.UserID } )
    })
}