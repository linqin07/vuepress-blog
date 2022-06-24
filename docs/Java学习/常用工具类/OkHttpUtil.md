#### Maven

```xml
        <!-- https://mvnrepository.com/artifact/com.squareup.okhttp3/okhttp -->
        <dependency>
            <groupId>com.squareup.okhttp3</groupId>
            <artifactId>okhttp</artifactId>
            <version>3.13.1</version>
        </dependency>
```



#### OkHttpUtil

```java
@Slf4j
@Component
public class OkHttpUtil {
    private static int maxRetryCount = 3;
    private volatile static OkHttpClient okHttpClient;

    /**
     * 单例
     *
     * @return
     */
    @PostConstruct
    public OkHttpClient getInstance() {
        if (okHttpClient == null) {
            synchronized (this) {
                if (okHttpClient == null) {
                    okHttpClient = OKHttpClientBuilder.buildOKHttpClient().build();
                }
            }
        }
        return okHttpClient;
    }

    public static JSONObject doGetOrPost(String method, String url, List<Param> params) {
        log.info("###### begin http request with URL: " + url);
        JSONObject result = null;

        if (result == null) {
            int downloadRetryCount = 0;

            while (downloadRetryCount < maxRetryCount) {
                switch (method) {
                    case HttpMethods.GET:
                        if (downloadRetryCount == 0) {
                            url = buildGetRequestUrl(url.trim(), params);
                        }
                        result = doGet(url.trim());
                        break;
                    case HttpMethods.POST:
                        result = doFormPost(url.trim(), params);
                        break;
                }
                downloadRetryCount = result == null ? downloadRetryCount + 1 : maxRetryCount;
            }
        }
        String logStr = "###### end http request with URL=" + url;
        if (!HttpMethods.GET.equals(method)) {
            logStr += ", params=" + params;
        }
        logStr += ", result=" + result;
        log.info(logStr);
        return result;

    }

    /**
     * post 表单提交
     *
     * @param url
     * @param params
     * @return
     */
    private static JSONObject doFormPost(String url, List<Param> params) {
        List<NameValuePair> nvps = new ArrayList<>();
        FormBody.Builder form = new FormBody.Builder();
        if (params != null && params.size() > 0) {
            for (Param param : params) {
                form.add(param.name, String.valueOf(param.value));
            }
        }

        JSONObject result = null;

        try {
            Request request = new Request.Builder()
                    .url(url)
                    .post(form.build())
                    .build();
            Response response = okHttpClient.newCall(request).execute();
            if (response != null && response.code() == HttpStatus.SC_OK) {
                String str = response.body().string();
                if (StringUtils.isNotBlank(str)) {
                    try {
                        result = JSONObject.parseObject(str);
                    } catch (Exception e) {
                        result = new JSONObject();
                        result.put("data", str);
                        log.error("http formPost请求反序列化异常：", e);
                    }
                } else {
                    result = new JSONObject();
                }
            } else {
                log.info("http formPost请求返回失败：" + response + "; body= " + response.body().string());
            }
        } catch (IOException e) {
            log.error("http formPost请求异常：", e);
        }
        return result;
    }

    private static String synPostJson(String url, String json) {
        // 2 构建参数
        RequestBody requestBody = RequestBody.create(MediaType.parse("application/json; charset=utf-8"), json);
        // 3 构建 request
        Request request = new Request.Builder()
                .url(url)
                .post(requestBody)
                .build();
        // 4 将Request封装为Call
        Call call = okHttpClient.newCall(request);
        // 5 同步调用
        try {
            Response response = call.execute();
            if (response != null && response.code() == HttpStatus.SC_OK) {
                String str = response.body().string();
                return str;
            } else {
                log.info("http formPost请求返回失败：" + response + "; body= " + response.body().string());
            }
        } catch (IOException e) {
            log.error("http post请求异常：", e);
        }
        return null;

    }


    public static String buildGetRequestUrl(String url, List<Param> params) {
        try {
            if (params != null && params.size() > 0) {
                StringBuilder builder = new StringBuilder();
                for (Param param : params) {
                    builder.append(param.name + "=" + URLEncoder.encode(param.value.toString(), "UTF-8") + "&");
                }
                String buildStr = builder.toString();
                String httpParams = buildStr.substring(0, buildStr.length() - 1);
                url = url + "?" + httpParams;
            }
        } catch (UnsupportedEncodingException e) {
            log.error("构建get参数请求url异常: ", e);
        }
        return url;
    }

    /**
     * get请求，参数拼接在地址上
     *
     * @param url 请求地址加参数
     * @return 响应
     */
    private static JSONObject doGet(String url) {
        JSONObject result = null;
        try {
            Request request = new Request.Builder().url(url).get().build();
            Response response = okHttpClient.newCall(request).execute();
            if (response != null && response.code() == HttpStatus.SC_OK) {
                String str = response.body().string();
                if (StringUtils.isNotBlank(str)) {
                    try {
                        result = JSONObject.parseObject(str);
                    } catch (Exception e) {
                        result = new JSONObject();
                        result.put("data", str);
                        log.error("http get请求反序列化异常：", e);
                    }
                } else {
                    result = new JSONObject();
                }
            } else {
                log.info("http get请求返回失败：" + response + "; body= " + response.body().string());
            }
        } catch (IOException e) {
            log.error("http get请求异常：", e);
        }
        return result;
    }

    private void download(String url, String target, String fileName) {
        // 1 获取OkHttpClient对象
        OkHttpClient client = new OkHttpClient();
        // 2构建 request
        Request request = new Request.Builder()
                .url(url)
                .build();
        // 3 异步调用
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    // 4 文件下载
                    downlodefile(response, target, fileName);
                }
            }
        });
    }

    private void downlodefile(Response response, String url, String fileName) {
        InputStream inputStream = null;
        byte[] buf = new byte[2048];
        int len = 0;
        FileOutputStream outputStream = null;
        try {
            inputStream = response.body().byteStream();
            //文件大小
            long total = response.body().contentLength();
            File file = new File(url, fileName);
            outputStream = new FileOutputStream(file);
            long sum = 0;
            while ((len = inputStream.read(buf)) != -1) {
                outputStream.write(buf, 0, len);
            }
            outputStream.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                if (inputStream != null)
                    inputStream.close();
                if (outputStream != null)
                    outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void upload(String url) {
        File file = new File("C:/mydata/generator/test.txt");
        if (!file.exists()) {
            System.out.println("文件不存在");
        } else {
            // 获取OkHttpClient对象
            OkHttpClient client = new OkHttpClient();
            // 2封装参数以 form形式
            RequestBody requestBody = new MultipartBody.Builder()
                    .setType(MultipartBody.FORM)
                    .addFormDataPart("username", "admin")
                    .addFormDataPart("password", "admin")
                    .addFormDataPart("file", "555.txt", RequestBody.create(MediaType.parse("application/octet-stream"), file))
                    .build();
            // 3 封装 request
            Request request = new Request.Builder()
                    .url(url)
                    .post(requestBody)
                    .build();
            // 4 异步回调
            client.newCall(request).enqueue(new Callback() {
                @Override
                public void onFailure(Call call, IOException e) {
                    e.printStackTrace();
                }

                @Override
                public void onResponse(Call call, Response response) throws IOException {

                }
            });
        }
    }


    public static void main(String[] args) {
    }
}
```

#### OKHttpClientBuilder

配置 okhttp 的连接属性以及免验证证书

```java
@Slf4j
@Component
public class OKHttpClientBuilder  {

    public static int maxIdleConnections = 200;
    public static long keepAliveDurationMills = 5;

    // 根据cpu的数量动态的配置核心线程数和最大线程数
    private static final int CPU_COUNT = Runtime.getRuntime().availableProcessors();
    // 核心线程数 = CPU核心数 + 1
    private static final int CORE_POOL_SIZE = CPU_COUNT * 2 + 1;
    // 线程池最大线程数 = CPU核心数 * 2 + 1
    private static final int MAXIMUM_POOL_SIZE = CPU_COUNT * 3 + 1;
    // 非核心线程闲置时超时
    private static final int KEEP_ALIVE = 60;

    public static Environment env;

    @Autowired
    public static void setEnv(Environment env) {
        OKHttpClientBuilder.env = env;
    }


    /**
     * 配置 okhttp 的连接属性以及免验证证书
     * @return
     */
    public static OkHttpClient.Builder buildOKHttpClient() {
        try {
            TrustManager[] trustAllCerts = buildTrustManagers();
            final SSLContext sslContext = SSLContext.getInstance("SSL");
            sslContext.init(null, trustAllCerts, new java.security.SecureRandom());

            final SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();
            OkHttpClient.Builder builder = new OkHttpClient.Builder();
            if (env != null) {
                // 请求连接超时ms设置，客户端连接到服务端耗时
                builder.connectTimeout(Long.parseLong(env.getProperty("http.request.connetionTimeout")), TimeUnit.MILLISECONDS);
                // socket读数据超时时间：从服务器获取响应数据的超时时间
                builder.readTimeout(Long.parseLong(env.getProperty("http.request.socketTimeout")), TimeUnit.MILLISECONDS);
                builder.writeTimeout(Long.parseLong(env.getProperty("http.request.socketTimeout")), TimeUnit.MILLISECONDS);
            }
            // 是否重连
            builder.retryOnConnectionFailure(true);
            // 设置线程池大、超时
            builder.connectionPool(new ConnectionPool(maxIdleConnections, keepAliveDurationMills, TimeUnit.MINUTES));
            builder.dispatcher(new Dispatcher(new ThreadPoolExecutor(CORE_POOL_SIZE, MAXIMUM_POOL_SIZE, KEEP_ALIVE,
                    TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(10), Util.threadFactory("OkHttp Dispatcher", true),
                    new ThreadPoolExecutor.CallerRunsPolicy())));
            log.info("init the okhttp threadPool, CORE_POOL_SIZE: {}, MAXIMUM_POOL_SIZE: {}", CORE_POOL_SIZE, MAXIMUM_POOL_SIZE);
            builder.sslSocketFactory(sslSocketFactory, (X509TrustManager) trustAllCerts[0]);
            builder.hostnameVerifier((hostname, session) -> true);
            return builder;
        } catch (NoSuchAlgorithmException | KeyManagementException e) {
            e.printStackTrace();
            return new OkHttpClient.Builder();
        }
    }

    private static TrustManager[] buildTrustManagers() {
        return new TrustManager[]{
                new X509TrustManager() {
                    @Override
                    public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) {
                    }

                    @Override
                    public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) {
                    }

                    @Override
                    public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                        return new java.security.cert.X509Certificate[]{};
                    }
                }
        };
    }

}
```

```java
public class Param {
    public String name;
    public Object value;

    public Param() {
    }

    public Param(String name, Object value) {
        this.name = name;
        this.value = value;
    }

    @Override
    public String toString() {
        return name + "=" + value;
    }
}

```

