import "reflect-metadata";

import container from "./container";
import { Injectable } from "./injectable";

@Injectable()
class CatService {
  findAll() {
    return ["cat1", "cat2", "cat3"];
  }
}

@Injectable()
class AppService {
  constructor(private catsService: CatService) {}

  getCats() {
    return this.catsService.findAll();
  }
}

const appService = container.resolve<AppService>("AppService");
console.log(appService.getCats()); // ['cat1', 'cat2', 'cat3']
