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
 */
avalon.ready(() => {

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
               case 'label':
                   labelModal.init();
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
        init: () =>{}
    });

    //分类模块
    const labelModal = avalon.define({
        $id : 'labelModal',
        editLabel : (id) => {
            swal({
                title: "编辑类别!",
                text: "重命名此类别:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false
            },(labelName) => {
                if (labelName === false) return false;

                if (labelName === "") {
                    swal.showInputError("You need to write something!");
                    return false;
                }

                swal("成功!", "更改为 " + labelName, "success");

            });
        },
        delLabel : (id) => {

        },
        init: () => {
            $.ajax('/admin/api/tag',{
                dataType : 'json',
                success : (data) => {
                    swal(JSON.stringify(data));
                },error : (xhr) => {
                    let msg = xhr.responseText;
                    try{
                        msg = JSON.parse(msg).msg;
                    }finally{
                        swal("报错啦",msg,'error');
                    }
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