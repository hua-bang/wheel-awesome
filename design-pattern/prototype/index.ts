// 原型接口
interface Prototype {
  clone(): Prototype;
}

// 具体原型
class ConcretePrototype implements Prototype {
  private field: string;

  constructor(field: string) {
    this.field = field;
  }

  public clone(): Prototype {
    return new ConcretePrototype(this.field);
  }

  public getField(): string {
    return this.field;
  }
}

// 客户端代码
const main = () => {
  const original = new ConcretePrototype("abc");
  const copy = original.clone() as ConcretePrototype;

  console.log(original.getField());  // 输出 "abc"
  console.log(copy.getField());  // 输出 "abc"
};

main();
