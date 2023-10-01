// 产品类
class Product {
  private parts: string[] = [];

  public add(part: string): void {
    this.parts.push(part);
  }

  public show(): void {
    console.log(this.parts.join(", "));
  }
}

// 建造者接口
interface Builder {
  buildPart1(): void;
  buildPart2(): void;
  getResult(): Product;
}

// 具体建造者
class ConcreteBuilder implements Builder {
  private product: Product = new Product();

  public buildPart1(): void {
    this.product.add("Part1");
  }

  public buildPart2(): void {
    this.product.add("Part2");
  }

  public getResult(): Product {
    return this.product;
  }
}

// 指挥者
class Director {
  public construct(builder: Builder): void {
    builder.buildPart1();
    builder.buildPart2();
  }
}

// 客户端代码
const builder: Builder = new ConcreteBuilder();
const director: Director = new Director();
director.construct(builder);
const product: Product = builder.getResult();
product.show();