(window.webpackJsonp=window.webpackJsonp||[]).push([[231],{454:function(n,o,t){"use strict";t.r(o);var e=t(2),a=Object(e.a)({},(function(){var n=this,o=n.$createElement,t=n._self._c||o;return t("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[t("p",[n._v("刷机准备")]),n._v(" "),t("p",[n._v("一、概念\n●Fastboot：小米手机关机状态下，按电源键+音量下键可进，界面为米兔。\n●Recovery：关机状态下，按电源键+音量上键可进。有官方rec和第三方rec之分。\n●bl锁：官方为了保护手机数据安全给bootloader上锁。使得手机只能使用官方系统。\n●root权限：Android最高权限。目前有MIUI自带root(半残废)、SuperSu和MagiskSu三种，两两互斥。对开发版MIUI，在解bl锁之后可以在「安全中心-权限管理-root权限」中开启MIUI自带root。")]),n._v(" "),t("p",[n._v("二、备份[托腮][托腮]\n●做任何操作之前，请先备份重要数据。可拷贝文档、照片至电脑。\n●MIUI小米云备份：可备份桌面、联系人、短信、照片、设置、应用及其数据。但仅能在MIUI、国际版MIUI或者第三方MIUI(官改)中使用。\n●MIUI本地备份：备份内容同云备份。适用范围同云备份。但是最好将备份数据(在MIUI/backup路径下)拷贝到电脑，防止需要清空内置存储的情况出现。\n●小米助手备份：使用小米助手3.0(一定要3.0)，适用范围同上。备份数据存放于电脑中。下载请在百度或MIUI论坛中。\n●第三方备份：需要root权限。常用有 http://www.coolapk.com/apk/com.keramidas.TitaniumBackup http://www.coolapk.com/apk/balti.migrate 两种。可备份设置、应用及其数据。文档照片请另行备份。适用于所有rom。可用MIUI开发版自带root，或者，先看完bl锁、rec和magisk操作后，用magisk获得root权限进行备份。\n●云盘备份：度盘或者OneDrive或者GoogleDrive。随你。")]),n._v(" "),t("p",[n._v("刷机。请确保做好了备份。请勿颠倒下列顺序。\n一、解bl锁\n对小米设备，请在 http://www.miui.com/unlock/index.html 申请。登录自己的账号，申请解锁，通过之后下载相应工具，按步骤连接手机进行操作。此处不做过多介绍，如有不懂请百度，教程很多。建议MIUI开发版用户解锁后顺手开启MIUI自带root权限。")]),n._v(" "),t("p",[n._v("二、刷入第三方recovery\n第三方rec现在基本上被TWRP统治，因此只介绍TWRP。\n●通过TWRP APP刷入：需要root权限(MIUI自带即可)。 http://www.coolapk.com/apk/me.twrp.twrpapp 下载安装，授予各种权限如下：\n即可进入主界面：\n授予root权限。\n首先点第二项「BACKUP EXISTING RECOVERY」，即备份已有rec。\n然后点第一项「TWRP FLASH」，\n点击第一项「Select Device」，即选择设备，选择你的设备：\n点击设备，进入版本选择：\n点击版本，跳转至浏览器，点击下图中对应地方下载twrp：\n下载完毕，返回「TWRP FLASH」界面，点击「Select a file to flash」：\n选择刚才下的img文件，如下\n然后点击上图中的「FLASH TO RECOVERY」，刷入即可。\n●通过Fastboot模式刷入：需要电脑。\n首先在 https://developer.android.google.cn/studio/releases/platform-tools 下载相应工具。对mac或者linux，直接在终端里输入命令「fastboot」，会提示安装fastboot组件，按提示安装即可，这里主要介绍windows。当然，如果你嫌麻烦，可以直接利用之前MIUI解锁工具目录下的fastboot.exe。操作方法和下面一模一样。\n下载windows版，解压，最好在全英文目录下。\n手机进入fastboot模式，数据线连接电脑。\n在解压目录下，按住「左shift」，然后在空白处点击鼠标右键，在出现的菜单里选择「在此处打开 Powershell窗口」。对win10以下系统，应是选择「打开cmd窗口」。\n去twrp官网下载对应设备的「twrp.img」文件，单击选中文件，选择「复制路径」。不知道官网的百度一下[受虐滑稽]\n在打开窗口内，输入「./fastboot devices」，注意，cmd窗口应该不需要输入「./」。确认设备已连接电脑。\n在powershell窗口中输入「./fastboot flash recovecy 复制的路径」，回车，若未报错，即成功。\n注意，若此时重启到MIUI，可能会出现rec恢复官方的问题。因此推荐操作为同时长按电源键＋音量上键，直接进入rec。")]),n._v(" "),t("p",[n._v("三、刷机前的部分操作\n●初次进入twrp\n会提示你选择语言，并选择是否保持system分区为只读。\n先把语言改为chinese，然后勾上不再显示，滑动按钮允许修改，进入twrp。注意，3.2.3以上的TWRP才支持中文。\n●twrp功能介绍\n安装，即安装刷机包或者镜像文件的地方。\n清除，可对分区进行操作\n备份/恢复，可备份/恢复分区数据\n挂载，可挂载相应分区\n设置，可设置时间，亮度，震动，语言，屏幕超时\n高级，很少用，不做过多介绍\n重启，不懂吗？？[受虐滑稽][受虐滑稽]\n注意，进行下面操作前，请先确保twrp下能够正常连接电脑传输数据。\n●格式化data(可选)\nMIUI会对data分区进行加密，虽然最新twrp支持自动解密，但是最好还是格式化data。注意，此操作不同于清除data分区，格式化data会清除手机上全部数据。需要保留数据的可以不清除。\n点击清除-格式化data分区，输入yes进行格式化。\n格式化的时候会出现红字，不管他，结束之后返回主界面，点击重启-recovery，重启进入rec。此时data已经被格式化了，连接电脑会发现存储全空，只有twrp文件夹。\n●清除某些分区数据\n刷机前必须清除上一个系统留下来的数据。根据情况清除不同分区。大部分只需要按twrp推荐操作，直接滑动清除即可，但是最好按照ROM开发者推荐的来做。比如我马上要刷的SuperiorOS，推荐清除System, Data, Cache, Dalvik四个分区，此时选择高级清除，选择这四个，滑动清除即可。")]),n._v(" "),t("p",[n._v("四、刷机\n请先将刷机包等需要的东西，通过twrp传到手机上。格式化data之后手机上是什么都没有的。这就是为什么之前要确认能够连接电脑。\n●固件(Firmware)\n刷入第三方ROM前，必须刷入合适的固件。根据ROM开发者要求不同，下载合适的固件。当然最新的固件肯定满足要求。至于下载地址，[流汗滑稽][流汗滑稽]机型不一样，你们自己找吧。一般如果从最新MIUI刷第三方，是不需要刷固件的。\n●ROM\n选择ROM，直接刷。刷完请先不要开机。\n●GAPPS(即Google APPS，可选，类原生推荐刷入)\n在 https://opengapps.org 网站下载合适的gapps。根据系统版本，处理器类型(现在一般都是arm64，请自行查清)，下载gapps。一般来说nano版本够用了。pico没有人脸解锁，因此不推荐，除非你分区已经小到无法刷入nano了。\n刷完GAPPS后，即可开机享受新系统了。选择重启-系统，开机。\n第一次开机时间长一点很正常，请耐心等待。但是如果等了20分钟以上，一般来说都是GG了[流汗滑稽][流汗滑稽]评论区欢迎你。\n若刷了gapps，启动后会进行Google的开机引导，可以修改下语言，然后从左上角开始，顺时针点击四角跳过。因为你此时是没有网络条件(大家都懂得，没办法直接连Google)进行设置的。可以后期进行，当然需要一个合适的网络访问。需要的可以私信我[受虐滑稽][受虐滑稽][doge]付费\n接下来就可以享受新系统啦！但是往往都会想把所有能刷的刷一遍[哼唧][哼唧]")]),n._v(" "),t("p",[n._v("五、附加组件\n●Magisk\n参见另一篇教程。由于年代久远，一些细小差异请自己鉴别。总得来说没有区别。只不过可以在TWRP里刷入img文件。 https://www.coolapk.com/feed/6033274\n●Xposed\n注意，XP框架目前官方支持的只有8.1及以下，官方MIUI最好不要刷xp避免卡米，官改请在开发者指导下刷入，类原生随意。\n但是，虚拟化xp可以刷入。目前有「virtual xposed」、「太极」以及「edxposed」可用。\n对Android 9，推荐「edxposed」。酷安搜索「Google APP助手」，里面有教程。此处不细说。\n若已经刷入了magisk，最好不要用原版xp，可使用magisk模块仓库里的xposed，仅支持8.1及以下。\n●内核\n「内核比ROM还重要」这是酷安一个话题。刷入前请先对原来的内核进行备份，推荐使用 https://www.coolapk.com/apk/flar2.exkernelmanager ，其评论区有大佬夜之浪子搬运最新版，可以点一波关注[牛啤]。\n下载好对应内核后，可直接在twrp刷入。方法同刷入ROM。想恢复原本内核，可重刷ROM，或者刷入刚才备份的img文件，在TWRP-安装-底部的刷入镜像里刷入即可。")]),n._v(" "),t("p",[n._v("六、救砖\n根据变砖程度不同，分几类。\n●刷入某个Magisk模块后无法开机或卡米\n请在刷入Magisk之前，先下载好「Magisk Uninstaller」。请在刷入任何Magisk模块前，先刷入「Magisk Manager for recovery mod」，这个模块有汉化版，由@毛线没有团团 发布。因为模块而变砖之后，优先尝试在Twrp里使用mm救砖，若不行，请刷入「Magisk Uninstaller」救砖。\n●未知原因进不去系统\n找到原因，评论区留言。\n找不到原因，请重刷系统。\n●TWRP和系统都进不去\n请进入Fastboot模式，线刷。线刷教程请百度，很简单，不写了[假笑][假笑]\n●Fastboot都进不去，变成黑砖\n尝试9008线刷模式救砖。我不会，不写了[受虐滑稽][受虐滑稽]\n或者直接送售后救砖。注意，一般来说，软件问题去售后是不花钱的，但是手机上资料会丢失，请自行备份[托腮]")]),n._v(" "),t("p",[n._v("最后，祝大家手机怎么刷都不变砖[受虐滑稽][受虐滑稽]")]),n._v(" "),t("p",[n._v("@酷安小编 @梨子 @阿酷 @八百标兵\n#刷机# #MIUI# #安卓日常#\n码字不易，求个头条[py交易][py交易][流汗滑稽]\n大家关注点赞收藏来一套呗[受虐滑稽][受虐滑稽][py交易]")])])}),[],!1,null,null,null);o.default=a.exports}}]);