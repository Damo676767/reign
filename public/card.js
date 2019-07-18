class Card {

  constructor(card) {
    this.name = card.name;
  }

}


class MilCard {

  constructor(card) {
    this.type = "military";
    this.name = card.name;
    this.house = card.house;
    this.strength = card.strength;
//    this.img = loadImage("CardImgs/" + card.img_id + ".png");
    this.img = "CardImgs/" + card.img_id + ".png";
    this.special = card.special;
  }

}
