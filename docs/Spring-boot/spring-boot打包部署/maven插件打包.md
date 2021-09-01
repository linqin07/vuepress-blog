## maven 配置分离

一般打包 jar 不是默认打包，默认打包会把所有的 lib 和配置打进去，但是一般只打源码即可。下面这个配置可以分离打包。`manifest`标签标注资源路径关联。

```xml
 <build>
        <!-- 指定打包的名字 -->
        <finalName>${project.artifactId}</finalName>
        <!--Maven会从项目的src/main/resources目录下查找资源，加载配置，不能随便改，这个如果不行可以去掉，使用下面的 复制配置插件-->
        <resources>
            <resource>
                <directory>src/main/resources</directory>
                <targetPath>${project.build.outputDirectory}</targetPath>
                <filtering>false</filtering>
            </resource>
            <resource>
                <directory>src/main/resources</directory>
                <targetPath>${project.build.testOutputDirectory}</targetPath>
                <filtering>false</filtering>
            </resource>
            <!--把配置文件放在jar包外面的config文件夹，方便修改-->
            <resource>
                <directory>src/main/resources</directory>
                <!-- 当前项目下target目录新建一个项目名文件夹里面config文件夹 ${project.artifactId} -->
                <targetPath>${project.basedir}/target/${project.artifactId}/config</targetPath>
                <includes>
                    <include>application.yml</include>
                </includes>
            </resource>
        </resources>


        <plugins>
            <!--打包操作-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-jar-plugin</artifactId>
                <!--<version>${maven.jar.plugin.version}</version>-->
                <configuration>
                    <archive>
                        <manifest>
                            <!--表示需要加入到类构建路径-->
                            <addClasspath>true</addClasspath>
                            <!--classpathPrefix指定生成的Manifest文件中Class-Path依赖lib前面都加上路径,构建出lib/xx.jar-->
                            <classpathPrefix>lib/</classpathPrefix>
                            <!-- MAVEN插件打包SNAPSHOT包MANIFEST.MF中Class-Path带时间戳的问题 -->
                            <useUniqueVersions>false</useUniqueVersions>
                            <mainClass>com.GitbookApplication</mainClass>
                        </manifest>
                    </archive>
                    <!--打包排除-->
                    <excludes>
                        <exclude>application.yml</exclude>
                    </excludes>
                    <outputDirectory>
                        ${project.build.directory}/${project.artifactId}
                    </outputDirectory>

                </configuration>
            </plugin>

            <!--拷贝依赖到jar外面的lib目录-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-dependency-plugin</artifactId>
                <!--<version>${maven.dependency.plugin.version}</version>-->
                <executions>
                    <execution>
                        <id>copy-lib</id>
                        <phase>prepare-package</phase>
                        <goals>
                            <goal>copy-dependencies</goal>
                        </goals>
                        <configuration>
                            <outputDirectory>${project.build.directory}/${project.artifactId}/lib</outputDirectory>
                            <overWriteReleases>false</overWriteReleases>
                            <overWriteSnapshots>false</overWriteSnapshots>
                            <overWriteIfNewer>true</overWriteIfNewer>
                            <includeScope>compile</includeScope>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
            
              <!-- 复制配置文件 -->
            <plugin>
                <artifactId>maven-resources-plugin</artifactId>
                <version>3.0.2</version>
                <executions>
                    <execution>
                        <id>copy-resources</id>
                        <!-- 触发条件 -->
                        <phase>validate</phase>
                        <goals>
                            <goal>copy-resources</goal>
                        </goals>
                        <configuration>
                            <outputDirectory>${project.basedir}/target/${project.artifactId}/config</outputDirectory>
                            <resources>
                                <resource>
                                    <directory>src/main/resources</directory>
                                    <includes>
                                        <include>application.yml</include>
                                    </includes>
                                    <filtering>true</filtering>
                                </resource>
                            </resources>
                        </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
```

当配置文件是 YAML 时，打包后会报错

> Caused by: java.lang.IllegalStateException: Attempted to load applicationConfig: [classpath:/application.yml] but snakeyaml was not found on the classpath

新增依赖支持即可。

```xml
<dependency>
            <groupId>org.yaml</groupId>
            <artifactId>snakeyaml</artifactId>
 </dependency>
```

------

###### jar包下MANIFEST.MF 中的 Class-Path 设置

项目中如果有使用到 `xxx.class.getResource("/")`，idea 中能获取到值，打包后获取值为空，则为打包的classpath 路径设置不正确。

- 每行最多72个字符，换行继续必须以`空格`开头

- 文件最后必须要有一个回车换行

- Class-Path 当前路径是jar包所在目录，如果要引用当前目录下一个子目录中的jar包，使用以下格式 

  子目录/xxx.jar 子目录/yyy.jar  

- 在任何平台上路径分割符都是 /，多个jar包引用以空格分开

对应插件 `maven-jar-plugin` 设定 ClassPath 的配置如下，在标签 `<archive>` 内增加：

```xml
     <manifestEntries>
         <Class-Path>.</Class-Path>
         <Class-Path>config/</Class-Path>
     </manifestEntries>
```



## 插件上传部署

设置 install 命令为触发事件。

```xml
        <build>
        	<!-- 上传jar到linux -->
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>wagon-maven-plugin</artifactId>
                <version>1.0</version>
                <executions>
                    <execution>
                        <!--对应maven配置文件serverid-->
                        <!--<id>yun</id>-->
                        <phase>install</phase>
                        <goals>
                            <goal>upload</goal>
                            <goal>sshexec</goal>
                        </goals>
                        <configuration>
                            <fromDir>target/spring-boot-aplication-config</fromDir>
                            <url>scp://root:1qaz2wsx@192.168.2.149/root</url>
                            <excludes>lib/*</excludes>
                            <commands1921
                                <!-- 杀死原来的进程 -->
                                <command>pkill -f pring-boot-application-config-location.jar</command>
                                <!--<command>chmod a+x restart.sh</command>-->
                                <command>nohup java -jar /root/spring-boot-application-config-location.jar</command>
                            </commands>
                            <!-- 显示运行命令的输出结果 -->
                            <displayCommandOutputs>true</displayCommandOutputs>
                        </configuration>
                    </execution>
                </executions>
            </plugin>

        </plugins>
    </build>
```

## 构建源码包

pom 配置：

deploy 时也会把源码上传

```xml
            <!--配置生成源码包-->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-source-plugin</artifactId>
                <version>3.0.1</version>
                <configuration>
                    <outputDirectory>${project.build.directory}/${project.artifactId}</outputDirectory>
                </configuration>
                <executions>
                    <execution>
                        <id>attach-sources</id>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
```

