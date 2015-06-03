class UserWrapper {
    Users = new Array<User>();

    Render() {
        console.log(this.Users.length);
        this.Draw();
        for (var i = 0; i < this.Users.length; i++) {
            this.Users[i].Render((50*i)+ 50);
        }
    }
    AdUsersToGame(id, nick) {
        this.Users.push(new User(id, nick));
    }
    DeleteUsersFromGame(id) {
        for (var i = 0; i < this.Users.length; i++) {
            if (this.Users[i].id === id) {
                this.Users.splice(i, 1);
            }
        }
    }
    Draw() {
        ctx.beginPath();
        ctx.rect(0, 0, 350, 800);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    }
} 