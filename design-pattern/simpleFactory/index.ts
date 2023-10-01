// 产品接口
interface Product {
  operation(): string;
}

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
class SimpleFactory {
    createProduct(productType: string): Product | null {
        switch (productType) {
            case "A":
                return new ConcreteProductA();
            case "B":
                return new ConcreteProductB();
            default:
                return null; // 处理未知产品类型
        }
    }
}