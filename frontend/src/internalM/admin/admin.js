/**
 * Created by litong on 16-1-4.
 */
/**
 * @require /externalM/boot/browser-polyfill.js
 * @require /externalM/boot/external-helpers.js
 * @require /externalM/jquery.js
 * @require /externalM/avalon/avalon.shim.js
 * @require /externalM/semanticUi/semantic.js
 * @require /externalM/semanticUi/semantic.css
 * @require /internalM/admin/admin.scss
 *
 * @require /externalM/simditor/module.js
 * @require /externalM/simditor/hotkeys.js
 * @require /externalM/simditor/uploader.js
 * @require /externalM/simditor/simditor.js
 * @require /externalM/simditor/simditor.css
 *
 * @require /externalM/sweetalert/sweetalert.min.js
 * @require /externalM/sweetalert/sweetalert.css
 *
 * @require /externalM/lodash.js
 *
 * @require /externalM/Jcrop/css/jquery.Jcrop.min.css
 * @require /externalM/Jcrop/js/jquery.Jcrop.min.js
 */
avalon.ready(() => {

    //ajax公共方法，返回promise
    const ajaxApi = (url,option) => {

        return new Promise((resolve,reject) => {
            option.success = resolve;
            option.error = reject;

            $.ajax(url,option);
        });

    };

    //主模块
   const adminModal = avalon.define({
       $id : 'adminModal',
       currentTab : 'article',
       changeTab : (tab) => {
           adminModal.currentTab = tab;
           adminModal.init();
       },
       init : () => {
           switch (adminModal.currentTab){
               case 'article':
                   articleModal.init();
                   break;
               case 'tag':
                   tagModal.init();
                   break;
               case 'data':
                   dataModal.init();
                   break;
               case 'comment':
                   commentModal.init();
                   break;
               case 'master':
                   masterModal.init();
                   break;
           }
       },
       $skipArray: ["init"]
   });

    //文章模块
    const articleModal = avalon.define({
        $id : 'articleModal',
        isBlogModal : false,//false:博客列表模式,true:博客模式
        newBlog : () => {
            articleModal.isBlogModal = true;
        },
        editBlog : () => {
            articleModal.isBlogModal = true;
        },
        cancleEdit : () => {
            swal({
                title: "是否取消编辑?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes!",
                cancelButtonText: "No!",
                closeOnConfirm: true,
                closeOnCancel: true
            },(isConfirm) =>{
                if (isConfirm) {
                    articleModal.isBlogModal = false;
                }
            });

        },
        init: () => {
            ajaxApi('/admin/api/tag',{dataType : 'json'})
                .then((data) => {
                    tagModal.tagList = data.data;
                })
                .catch((xhr) => {
                    let msg = xhr.responseText;
                    try{
                        msg = JSON.parse(msg).msg;
                    }finally{
                        swal("报错啦",msg,'error');
                    }
                });
        }
    });

    //分类模块
    const tagModal = avalon.define({
        $id : 'tagModal',
        tagList : [],
        //新建标签
        addTag : () => {
            swal({
                title : '新建分类',
                type : 'input',
                showCancelButton : true,
                inputPlaceholder : '新建分类名称',
                closeOnConfirm : false
            },function(inputValue){
                inputValue = _.trim(inputValue);
                if (inputValue === false) return false;

                if(_.isEmpty(inputValue)){
                    swal.showInputError('请输入新建类别名称');
                    return false;
                }

                ajaxApi('/admin/api/tag',{
                    dataType : 'json',
                    type : 'post',
                    data : {
                        name : inputValue
                    }
                }).then((data) => {
                    swal("成功!", `添加类别 ${ inputValue } 成功`, "success");
                    tagModal.init();
                }).catch((xhr) => {
                    let msg = xhr.responseText;
                    try{
                        msg = JSON.parse(msg).msg;
                    }finally{
                        swal("报错啦",msg,'error');
                    }
                });

            });
        },
        editTag : (name,id) => {
            swal({
                title: "编辑类别!",
                text: "重命名此类别:",
                inputPlaceholder : '重命名分类名称',
                type: "input",
                closeOnConfirm: false,
                inputValue : name
            },(tagName) => {
                if (tagName === false) return false;

                if (_.isEmpty(tagName)) {
                    swal.showInputError('请输入重命名类别名称');
                    return false;
                }

                ajaxApi('/admin/api/tag/'+id,{
                    dataType : 'json',
                    type : 'put',
                    data : {
                        name : tagName
                    }
                }).then((data) => {
                    swal("成功!", `更改类别 ${ tagName } 成功`, "success");
                    tagModal.init();
                }).catch((xhr) => {
                    let msg = xhr.responseText;
                    try{
                        msg = JSON.parse(msg).msg;
                    }finally{
                        swal("报错啦",msg,'error');
                    }
                });

            });
        },
        delTag : (name,id) => {
            swal({
                title : `你确定删除 ${name} 吗？`,
                type : 'warning',
                showCancelButton : true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: '是的',
                cancelButtonText:'不',
                closeOnConfirm : false
            },(isConfirm) => {
                if(isConfirm){
                    ajaxApi('/admin/api/tag/'+id,{
                        dataType : 'json',
                        type : 'delete'
                    }).then((data) => {
                        swal("成功!", `删除类别 ${ name } 成功`, "success");
                        tagModal.init();
                    }).catch((xhr) => {
                        let msg = xhr.responseText;
                        try{
                            msg = JSON.parse(msg).msg;
                        }finally{
                            swal("报错啦",msg,'error');
                        }
                    });
                }
            });

        },
        init: () => {
            ajaxApi('/admin/api/tag',{dataType : 'json'})
            .then((data) => {
                tagModal.tagList = data.data;
            })
            .catch((xhr) => {
                let msg = xhr.responseText;
                try{
                    msg = JSON.parse(msg).msg;
                }finally{
                    swal("报错啦",msg,'error');
                }
            });
        }
    });

    //数据模块
    const dataModal = avalon.define({
        $id : 'dataModal',
        init: () =>{}
    });

    //评论模块
    const commentModal = avalon.define({
        $id : 'commentModal',
        isArticleList : true,
        changeToComment : () => {
            commentModal.isArticleList = false;
        },
        changeToArticle : () => {
            commentModal.isArticleList = true;
        },
        init: () =>{}
    });

    //主人模块
    const masterModal = avalon.define({
        init: () =>{}
    });

    //初始化方法
    (() => {
        $('select.dropdown').dropdown();
        $('.ui.accordion').accordion();
        var editor = new Simditor({
            textarea: $('#editor')
        });
        adminModal.init();
    })();

    avalon.scan();
});