// 产品接口
interface Product {
  operation(): string;
}
// 抽象产品A
interface AbstractProductA {
    methodA(): string;
}

// 具体产品A1
class ConcreteProductA1 implements AbstractProductA {
    methodA(): string {
        return "Product A1";
    }
}

// 具体产品A2
class ConcreteProductA2 implements AbstractProductA {
    methodA(): string {
        return "Product A2";
    }
}

// 抽象产品B
interface AbstractProductB {
    methodB(): string;
}

// 具体产品B1
class ConcreteProductB1 implements AbstractProductB {
    methodB(): string {
        return "Product B1";
    }
}

// 具体产品B2
class ConcreteProductB2 implements AbstractProductB {
    methodB(): string {
        return "Product B2";
    }
}

// 抽象工厂接口
interface AbstractFactory {
    createProductA(): AbstractProductA;
    createProductB(): AbstractProductB;
}

// 具体工厂1，生产产品A1和产品B1
class ConcreteFactory1 implements AbstractFactory {
    createProductA(): AbstractProductA {
        return new ConcreteProductA1();
    }

    createProductB(): AbstractProductB {
        return new ConcreteProductB1();
    }
}

// 具体工厂2，生产产品A2和产品B2
class ConcreteFactory2 implements AbstractFactory {
    createProductA(): AbstractProductA {
        return new ConcreteProductA2();
    }

    createProductB(): AbstractProductB {
        return new ConcreteProductB2();
    }
}

// 客户端代码
function clientCode(factory: AbstractFactory): void {
    const productA = factory.createProductA();
    const productB = factory.createProductB();
    
    console.log(productA.methodA());
    console.log(productB.methodB());
}

// 使用具体工厂1创建产品
const factory1 = new ConcreteFactory1();
clientCode(factory1);

// 使用具体工厂2创建产品
const factory2 = new ConcreteFactory2();
clientCode(factory2);

// 具体产品A
class ConcreteProductA implements Product {
  operation(): string {
    return "ConcreteProductA";
  }
}

// 具体产品B
class ConcreteProductB implements Product {
  operation(): string {
   return "ConcreteProductB";
  }
}

// 简单工厂类
class Factory {
    createProduct(productType: string): Product | null {
      return null;
    }
}

// 具体工厂A，负责创建产品A
class ConcreteFactoryA extends Factory {
  createProduct(): Product {
    return new ConcreteProductA();
  }
}

// 具体工厂B，负责创建产品B
class ConcreteFactoryB extends Factory {
  createProduct(): Product {
    return new ConcreteProductB();
  }
}