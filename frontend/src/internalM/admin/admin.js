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
 */


avalon.ready(() => {

    //初始化方法
    (() => {
        $('select.dropdown').dropdown();
    })();

    //主模块
   const adminModal = avalon.define({
       $id : 'adminModal',
       currentTab : 'article',
       changeTab : (tab) => {
           adminModal.currentTab = tab;
       }
   });

    //文章模块
    const articleModal = avalon.define({
        $id : 'articleModal',
    });

    avalon.scan();
});