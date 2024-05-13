import { Container } from "./container";

// 示例使用
class UserService {
  greet(): string {
    return "Hello from UserService!";
  }
}

class UserController {
  private userService: UserService;

  // 这里没有显式传递依赖项
  constructor(userService: UserService) {
    this.userService = userService;
  }

  greet(): string {
    return this.userService.greet();
  }
}
// 创建容器
const container = new Container();

// 注册依赖项
container.register("userService", UserService);
container.register("userController", UserController);

// 解析依赖项
const userController = container.resolve<UserController>("userController");
console.log(userController.greet()); // 输出: Hello
