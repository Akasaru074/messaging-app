import { Injectable } from '@angular/core';

const nickNameParts = [
  ["супер", "гипер", "мега", "дико", "ультра", "фантастически", "невероятно", "экстра", "космически", "чрезвычайно"],
  ["добрый", "хитрый", "злой", "чёткий", "весёлый", "смелый", "умный", "странный", "нереальный", "дерзкий"],
  ["пацан", "ёж", "лев", "табурет", "енот", "волк", "стул", "пандус", "рак", "олень"]
];

@Injectable({
  providedIn: 'root'
})
export class NicknameService {
  constructor() { }

  public nickname: string | undefined;

  generateNickname() {
      let nick = localStorage.getItem("nickname");
    
      if (!nick) {
        let part1 = nickNameParts[0][Math.floor(Math.random() * nickNameParts[0].length)];
        let part2 = nickNameParts[1][Math.floor(Math.random() * nickNameParts[1].length)];
        let part3 = nickNameParts[2][Math.floor(Math.random() * nickNameParts[2].length)];
        nick = [part1, part2, part3].join(" ");
  
        localStorage.setItem("nickname", nick);
  
      }
  
      this.nickname = nick;
  }

}
