class Game{

  constructor(hostid){
    this.hostid = hostid;
    this.code = Math.floor(Math.random()*9000+1000);
    this.gamestate = "setup";
    this.mdeck = [];
    this.mdiscards=[];
    this.edeck = [];
    this.ediscards = [];
    this.hdeck = [];
    this.houselist=[];
    this.players=[];
    this.round = 0;
    this.carryover = [];


  }

}    

module.exports = Game;
