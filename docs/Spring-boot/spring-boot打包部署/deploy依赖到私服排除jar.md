#### spring boot 打包排除其他依赖jar包

```xml
<build> 
  <plugins> 
    <plugin> 
      <groupId>org.springframework.boot</groupId>  
      <artifactId>spring-boot-maven-plugin</artifactId>  
      <configuration> 
        <layout>ZIP</layout>  
        <includes> 
          <include> 
            <groupId>自己项目</groupId>  
            <artifactId>项目名</artifactId> 
          </include> 
        </includes> 
      </configuration> 
    </plugin> 
  </plugins> 
</build>

```

