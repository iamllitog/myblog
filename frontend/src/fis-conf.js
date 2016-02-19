/**
 * Created by litong on 16-1-7.
 */
fis.set('project.ignore',['components/**','fis-conf.js']);
fis.hook('commonjs',{});
fis.match('::package',{
    postpackager : fis.plugin('loader',{
        useInlineMap : true
    }),
    spriter : fis.plugin('csssprites',{
        margin: 80,
        layout: 'matrix'
    })
});

//------------------css打包------------------
fis.match('{externalM/semanticUi/semantic.css,externalM/sweetalert/sweetalert.css,internalM/bodyHeader/bodyHeader.scss,internalM/bodyFooter/bodyFooter.scss}',{
    packTo : '/pkg/pkg.css'
});
fis.match('/pkg/**.css',{
    release : '/static/dist/$0',
    url : '/dist/$0'
});
fis.media('publish').match('/pkg/**.css',{
    release : '/static/dist/$0',
    url : '/dist/$0',
    optimizer : fis.plugin('clean-css'),
    useHash : true
});

//------------------js打包------------------
fis.match('externalM/{jquery,semanticUi/semantic,sweetalert/sweetalert.min,avalon/avalon.shim,boot/browser-polyfill,boot/external-helpers,lodash}.js',{
    packTo : '/pkg/pkg.js'
});
fis.match('externalM/simditor/{hotkeys,module,simditor,uploader}.js',{
    packTo : '/pkg/editor.js'
});
fis.match("externalM/jquery.js",{
    packOrder : -100
});
fis.match("externalM/simditor/module.js",{
    packOrder : 1
});
fis.match("externalM/simditor/hotkeys.js",{
    packOrder : 2
});
fis.match("externalM/simditor/uploader.js",{
    packOrder : 3
});
fis.match("externalM/simditor/simditor.js",{
    packOrder : 4
});
fis.match('/pkg/**.js',{
    release : '/static/dist/$0',
    url : '/dist/$0'
});
fis.media('publish').match('/pkg/**.js',{
    release : '/static/dist/$0',
    url : '/dist/$0',
    useHash : true,
    optimizer :fis.plugin('uglify-js',{
        compress:{
            drop_console : true
        }
    })
});

//------------------内部css------------------
fis.match('internalM/**.scss',{
    release : '/static/dist/$0',
    url : '/dist/$0',
    rExt : '.css',
    useSprite: true,
    parser : fis.plugin('node-sass',{
        include_paths:[
            './components/compass'
        ]
    })
});
fis.media('publish').match('internalM/**.scss',{
    release : '/static/dist/$0',
    url : '/dist/$0',
    rExt : '.css',
    useSprite: true,
    parser : fis.plugin('node-sass',{
        include_paths:[
            './components/compass'
        ]
    }),
    optimizer : fis.plugin('clean-css'),
    useHash : true
});

//------------------ejs------------------
fis.match('views/**.ejs',{
    isHtmlLike : true
});

//------------------ejs内部引用------------------
fis.match('inlinePart/**',{
    release : false
});

//------------------图片------------------
fis.match('*.png',{
    optimizer : fis.plugin('png-compressor',{
        type : 'pngquant'
    }),
    release : '/static/dist/$0',
    url : '/dist/$0'
});
//------------------字体------------------
fis.match('*.{eot,svg,ttf,woff,woff2}',{
    release : '/static/dist/$0',
    url : '/dist/$0'
});

//------------------js内部引用------------------
fis.match('internalM/**.js',{
    release : '/static/dist/$0',
    url : '/dist/$0',
    parser: fis.plugin('babel-5.x',{
        stage : 3,
        externalHelpers : true
    }),
    lint : fis.plugin('jshint',{
        i18n : 'zh-CN',
        esnext : true,
        camelcase :false,			//驼峰法命名
        curly : false,				//大口号包裹
        eqeqeq : true,				//对于简单类型，使用===和!==，而不是==和!=
        newcap : true,				//对于首字母大写的函数（声明的类），强制使用new
        noarg : true,				//禁用arguments.caller和arguments.callee
        sub : false,				//对于属性使用aaa.bbb而不是aaa['bbb']
        undef : true,				//查找所有未定义变量
        boss : true,				//查找类似与if(a = 0)这样的代码
        devel : true,				//定义用于调试的全局变量： console ， alert
        browser : true,				//浏览器环境
        nonstandard:true,
        scripturl:true,				//允许JavaScript:void 0
        globals : {
            //全局变量忽略--amd
            "$" : false,
            "avalon" : false,
            "swal" : false,
            "Simditor" : false,
            "_" : false
        }
    })
});
fis.media('publish').match('internalM/**.js',{
    release : '/static/dist/$0',
    url : '/dist/$0',
    parser: fis.plugin('babel-5.x',{
        stage : 3,
        externalHelpers : true
    }),
    lint : fis.plugin('jshint',{
        i18n : 'zh-CN',
        esnext : true,
        camelcase :false,			//驼峰法命名
        curly : false,				//大口号包裹
        eqeqeq : true,				//对于简单类型，使用===和!==，而不是==和!=
        newcap : true,				//对于首字母大写的函数（声明的类），强制使用new
        noarg : true,				//禁用arguments.caller和arguments.callee
        sub : false,				//对于属性使用aaa.bbb而不是aaa['bbb']
        undef : true,				//查找所有未定义变量
        boss : true,				//查找类似与if(a = 0)这样的代码
        devel : true,				//定义用于调试的全局变量： console ， alert
        browser : true,				//浏览器环境
        nonstandard:true,
        scripturl:true,				//允许JavaScript:void 0
        globals : {
            //全局变量忽略
            "$" : false,
            "avalon" : false,
            "swal" : false,
            "Simditor" : false
        }
    }),
    useHash : true,
    optimizer : fis.plugin('uglify-js',{
        compress:{
            drop_console : true
        }
    })
});

//------------------js外部引用------------------
fis.match("externalM/**.js",{
    release : '/static/dist/$0',
    url : '/dist/$0'
});
fis.media('publish').match("externalM/**.js",{
    release : '/static/dist/$0',
    url : '/dist/$0',
    optimizer : fis.plugin('uglify-js',{
        compress:{
            drop_console : true
        }
    }),
    useHash : true
});

//------------------资源外部引用------------------
fis.match("{externalM/**,!externalM/**.js}",{
    release : '/static/dist/$0',
    url : '/dist/$0'
});
fis.match("{externalM/**.css,!externalM/**.js}",{
    release : '/static/dist/$0',
    url : '/dist/$0',
    optimizer : fis.plugin('clean-css'),
    useHash : true
});