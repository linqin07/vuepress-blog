# 装饰者模式

动态的给对象添加一些额外的属性或行为。相比于使用继承，装饰者模式更加灵活。

类似于`JDK`自带的`IO`流，很多就是使用这个模式。

### 实现

1. 新建类`Food`

```java
public class Food {
    private String foodName;

    public Food() {
    }

    public Food(String foodName) {
        this.foodName = foodName;
    }

    public String make() {
        return foodName;
    }
}

```

2. 新建类`Bread`继承`Food`类

```java
public class Bread extends Food {

    private Food basicFood;

    public Bread(Food basicFood) {
        this.basicFood = basicFood;
    }

    public String make() {
        return basicFood.make() + "+ 面包";
    }
}
```

3. 新建类`Cream`继承`Food`类

```java
public class Cream extends Food {

    private Food food;

    public Cream(Food food) {
        this.food = food;
    }

    public String make() {
        return food.make() + "+ cream";
    }
}
```

4. 测试类

```java
public class Test {
    public static void main(String[] args) {
        Cream cream = new Cream(new Bread(new Food("food")));
        System.out.println(cream.make());
    }
}
```

输出：

> food+ 面包+ cream