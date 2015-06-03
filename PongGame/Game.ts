class Game {
    BoardsID = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"];
    numOfBoards: number;
    Boards = new Array<Board>();
    UserWrapper1 = new UserWrapper;
    constructor(numOfBoards) {
        this.numOfBoards = numOfBoards;
        canvas.width = 350 + 700 * this.numOfBoards;
        this.AddBoardToGame();
    }
    AddBoardToGame() {
        for (var i = 0; i < this.numOfBoards; i++) {
            this.Boards.push(new Board(700, 800, 350 + 700 * i, this.BoardsID[i]));
        }
    }
    AddUsersAsPlayersToBoard(BoardID, PlayerID) {
        var CurrBoard = this.GetBoardById(BoardID);
        if (CurrBoard.UPPlayerID === 0) {
            CurrBoard.UPPlayerID = PlayerID;
            CurrBoard.PlayerUP.id = PlayerID
        }
        else if (CurrBoard.DOWNPlayerID === 0) {
            CurrBoard.DOWNPlayerID = PlayerID;
            CurrBoard.PlayerDOWN.id = PlayerID;
        }
    }
    Render() {
        this.UserWrapper1.Render();
        for (var i = 0; i < this.numOfBoards; i++) {
            this.Boards[i].Render();
        }
    }
    GetBoardById(id: string) {
        for (var i = 0; i < this.UserWrapper1.Users.length; i++) {
            if (this.Boards[i].id === id) {
                return this.Boards[i];
            }
        }
    }

}