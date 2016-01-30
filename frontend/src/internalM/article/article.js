/**
 * Created by litong on 16-1-4.
 */
/**
 * @require /externalM/boot/browser-polyfill.js
 * @require /externalM/boot/external-helpers.js
 * @require /externalM/jquery.js
 * @require /externalM/jqRaty/jquery.raty.js
 * @require /externalM/avalon/avalon.shim.js
 * @require /externalM/semanticUi/semantic.js
 * @require /externalM/semanticUi/semantic.css
 * @require /internalM/article/article.scss
 */
avalon.ready(function(){
   avalon.define({
       $id : 'infoModel',
       shockHead : () => {
           $(this).transition({
                   debug     : true,
                   animation : 'jiggle',
                   duration  : 500,
                   interval  : 200
           });
       }
   });

    avalon.scan();
});