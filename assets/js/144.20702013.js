(window.webpackJsonp=window.webpackJsonp||[]).push([[144],{370:function(n,e,t){"use strict";t.r(e);var o=t(2),i=Object(o.a)({},(function(){var n=this.$createElement,e=this._self._c||n;return e("ContentSlotsDistributor",{attrs:{"slot-key":this.$parent.slotKey}},[e("p",[this._v("powerdesigner 显示 name 和 comment")]),this._v(" "),e("div",{staticClass:"language-vbscript extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[this._v("Option   Explicit   \nValidationMode   =   True   \nInteractiveMode   =   im_Batch  \n  \nDim   mdl   '   the   current   model  \n  \n'   get   the   current   active   model   \nSet   mdl   =   ActiveModel   \nIf   (mdl   Is   Nothing)   Then   \n      MsgBox   \"There   is   no   current   Model \"   \nElseIf   Not   mdl.IsKindOf(PdPDM.cls_Model)   Then   \n      MsgBox   \"The   current   model   is   not   an   Physical   Data   model. \"   \nElse   \n      ProcessFolder   mdl   \nEnd   If  \n  \nPrivate   sub   ProcessFolder(folder)   \nOn Error Resume Next  \n      Dim   Tab   'running     table   \n      for   each   Tab   in   folder.tables   \n            if   not   tab.isShortcut   then   \n                  tab.name   =   tab.comment  \n                  Dim   col   '   running   column   \n                  for   each   col   in   tab.columns   \n                  if col.comment=\"\" then  \n                  else  \n                        col.DataType=   col.comment   \n                  end if  \n                  next   \n            end   if   \n      next  \n  \n      Dim   view   'running   view   \n      for   each   view   in   folder.Views   \n            if   not   view.isShortcut   then   \n                  view.DataType   =   view.comment   \n            end   if   \n      next  \n  \n      '   go   into   the   sub-packages   \n      Dim   f   '   running   folder   \n      For   Each   f   In   folder.Packages   \n            if   not   f.IsShortcut   then   \n                  ProcessFolder   f   \n            end   if   \n      Next   \nend   sub\n")])])])])}),[],!1,null,null,null);e.default=i.exports}}]);