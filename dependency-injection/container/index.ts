import container from "./container";
import { Injectable } from "./injectable";

@Injectable()
class NoticeService {
  notice(msg: string) {
    console.log(`notice, ${msg}`);
  }
}

@Injectable()
class App {
  constructor(private noticeService: NoticeService) {}

  notice(msg: string) {
    return this.noticeService.notice(msg);
  }
}

const appService = container.resolve<App>("App");
const appService2 = container.resolve<App>("App");
console.log("appService === appService2", appService === appService2);
