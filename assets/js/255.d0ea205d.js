(window.webpackJsonp=window.webpackJsonp||[]).push([[255],{480:function(t,a,n){"use strict";n.r(a);var s=n(2),r=Object(s.a)({},(function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h2",{attrs:{id:"二叉树遍历"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#二叉树遍历","aria-hidden":"true"}},[t._v("#")]),t._v(" 二叉树遍历")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1592045412146.png",alt:"1592045412146.png"}})]),t._v(" "),n("ul",[n("li",[n("p",[n("strong",[t._v("先序：")]),t._v(" 6 3 2 5 7 8")]),t._v(" "),n("p",[t._v("考察到一个节点后，即刻输出该节点的值，并继续遍历其左右子树。(根左右)")])]),t._v(" "),n("li",[n("p",[n("strong",[t._v("中序：")]),t._v(" 2 3 5 6 7 8")]),t._v(" "),n("p",[t._v("考察到一个节点后，将其暂存，遍历完左子树后，再输出该节点的值，然后遍历右子树。(左根右)")])]),t._v(" "),n("li",[n("p",[n("strong",[t._v("后序：")]),t._v(" 2 5 3 8 7 6")]),t._v(" "),n("p",[t._v("考察到一个节点后，将其暂存，遍历完左右子树后，再输出该节点的值。(左右根)")])])]),t._v(" "),n("p",[n("img",{attrs:{src:"https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1592046122745.png",alt:"1592046122745.png"}})]),t._v(" "),n("p",[t._v("先序：2 3 5 7 6 8")]),t._v(" "),n("p",[t._v("中序：2 3 5 6 7 8")]),t._v(" "),n("p",[t._v("后序：6 8 7 5 3 2")]),t._v(" "),n("p",[n("a",{attrs:{href:"https://www.nowcoder.com/questionTerminal/6ab87beb7e4a4b1e810088dbbb423ba7",target:"_blank",rel:"noopener noreferrer"}},[t._v("试题："),n("OutboundLink")],1)]),t._v(" "),n("div",{staticClass:"language-markdown extra-class"},[n("pre",{pre:!0,attrs:{class:"language-markdown"}},[n("code",[t._v("已知一个二叉树的前序遍历结果是（ACDEFHGB） ，中序遍历结果是（DECAHFBG）,请问后续遍历结果是（）。\nA.HGFEDCBA\nB.EDCHBGFA\nC.BGFHEDCA\nD.EDCBGHFA\nE.BEGHDFCA\nF.BGHFEDCA\n")])])]),n("p",[n("img",{attrs:{src:"https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1592147667847.png",alt:"1592147667847.png"}})]),t._v(" "),n("h2",{attrs:{id:"平衡二叉树（红黑树）"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#平衡二叉树（红黑树）","aria-hidden":"true"}},[t._v("#")]),t._v(" 平衡二叉树（红黑树）")]),t._v(" "),n("p",[t._v("像红黑树这样的平衡二叉树，无论如何插入元素，他都可以通过一些旋转的方法调整树的高度，使得整棵树的查询效率维持在O(logN)")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1598075501363.png",alt:"1598075501363.png"}})]),t._v(" "),n("p",[t._v("但是平衡二叉树的每个节点只有两个孩子节点，如果一张表的数据量特别大，整棵树的高度也会随之上升。一个千万级别的表如果用平衡二叉树作为索引的话，树高将会达到二十多层。这也就意味着做一次查询需要二十多次磁盘io，这是一个不小的开销。")]),t._v(" "),n("img",{staticStyle:{zoom:"50%"},attrs:{src:"https://gitee.com/linqin07/pic/raw/master/1598075680703.png",alt:"1598076649896.png"}}),t._v(" "),n("h2",{attrs:{id:"b树和b-树"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#b树和b-树","aria-hidden":"true"}},[t._v("#")]),t._v(" B树和B+树")]),t._v(" "),n("p",[n("strong",[t._v("B树")]),t._v("：一个节点可以存放N个孩子节点，这就完美解决了树高的问题，我们可以把B树称为平衡多叉树。")]),t._v(" "),n("p",[n("img",{attrs:{src:"https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1598075680703.png",alt:"1598075680703.png"}})]),t._v(" "),n("p",[n("strong",[t._v("B+树")]),t._v("：")]),t._v(" "),n("ul",[n("li",[t._v("B+树的非叶子节点是不存储数据的，只存储索引，数据全部存储在叶子节点上。")]),t._v(" "),n("li",[t._v("叶子节点之间使用指针连接，提高区间访问效率。如果我们要进行范围查询，可以轻松通过B+树叶子节点之间的指针进行遍历，减少了不必要的磁盘 IO。")]),t._v(" "),n("li",[t._v("数据页都通过一个"),n("code",[t._v("双向链表")]),t._v("来进行链接。")])]),t._v(" "),n("p",[t._v("下面是一棵高度为 2 的 B+ 树，每页存放 4 条记录。上面一层叫 "),n("code",[t._v("leaf page")]),t._v("叶子页，下面的是"),n("code",[t._v("index page")]),t._v("索引页，插入删除操作都有可能对 leaf page 和 index page 进行拆分。"),n("a",{attrs:{href:"https://www.cnblogs.com/xibuhaohao/p/10910947.html",target:"_blank",rel:"noopener noreferrer"}},[t._v(" B+树的插入与删除"),n("OutboundLink")],1)]),t._v(" "),n("p",[n("img",{attrs:{src:"https://blog-07.oss-cn-guangzhou.aliyuncs.com/picBak/1598076649896.png",alt:"1598076649896.png"}})])])}),[],!1,null,null,null);a.default=r.exports}}]);