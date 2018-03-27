var fs = require('fs'),
    path = require('path'),
    os = require('os');

// 复制文件
var copy = (src, dst)=>{
    fs.writeFileSync(dst, fs.readFileSync(src));
};

// 创建预设文件夹
var initPreDir = ()=>{
    if (!Editor.assetdb.exists('db://assets/resources/pre')) {
        Editor.log('[FL]创建resources/pre文件夹');
        Editor.assetdb.create('db://assets/resources/pre', null, ()=>{
            importPrefabs();
        });
    } else {
        importPrefabs();
    }
};

// 导入动态预设
var importPrefabs = ()=>{
    Editor.log('[FL]导入resources/pre中的资源:');
    var predir = path.join(Editor.projectPath, 'assets', 'resources', 'pre');
    var pRoot = path.join(__dirname, '..');
    
    Editor.log('[FL]导入resources/pre/FLDialog.prefab...');
    copy(pRoot + '/runtime-resource/resources/pre/FLDialog.prefab', predir + '/FLDialog.prefab');
    // copy(pRoot + '/runtime-resource/resources/pre/FLDialog.prefab.meta', predir + '/FLDialog.prefab.meta');

    Editor.log('[FL]导入resources/pre/FLLoadingMaskLayer.prefab...');
    copy(pRoot + '/runtime-resource/resources/pre/FLLoadingMaskLayer.prefab', predir + '/FLLoadingMaskLayer.prefab');
    // copy(pRoot + '/runtime-resource/resources/pre/FLLoadingMaskLayer.prefab.meta', predir + '/FLLoadingMaskLayer.prefab.meta');

    Editor.log('[FL]导入resources/pre/FLToast.prefab...');
    copy(pRoot + '/runtime-resource/resources/pre/FLToast.prefab', predir + '/FLToast.prefab');
    // copy(pRoot + '/runtime-resource/resources/pre/FLToast.prefab.meta', predir + '/FLToast.prefab.meta');

    Editor.log('[FL]导入resources/pre导入完成！');
    Editor.assetdb.refresh('db://assets/resources/pre/', function (err, results) {
        Editor.log('[FL]resources/pre目录已刷新！');
    });
}


// 创建图片文件夹
var initImgDir = ()=>{
    if (!Editor.assetdb.exists('db://assets/resources/img')) {
        Editor.log('[FL]创建resources/img文件夹');
        Editor.assetdb.create('db://assets/resources/img', null, ()=>{
            
        });
    } else {
        
    }
};


// 创建音频文件夹
var initSndDir = ()=>{
    if (!Editor.assetdb.exists('db://assets/resources/snd')) {
        Editor.log('[FL]创建resources/snd文件夹');
        Editor.assetdb.create('db://assets/resources/snd', null, ()=>{
            
        });
    } else {
        
    }
};

// 创建i18n国际化文件夹
var initI18nDir = ()=>{
    if (!Editor.assetdb.exists('db://assets/resources/i18n')) {
        Editor.log('[FL]创建resources/i18n文件夹');
        Editor.assetdb.create('db://assets/resources/i18n', null, ()=>{
            
        });
    } else {
        
    }
};


/**
 * 创建项目基础文件夹
 */
exports.initDirs = ()=>{
    if (!Editor.assetdb.exists('db://assets/Animations')) {
        Editor.log('[FL]创建Animations文件夹');
        Editor.assetdb.create('db://assets/Animations', null, ()=>{
            
        });
    }
    if (!Editor.assetdb.exists('db://assets/Animations/common/')) {
        Editor.log('[FL]创建Animations/common文件夹');
        Editor.assetdb.create('db://assets/Animations/common/', null, ()=>{

        });
    }
    if (!Editor.assetdb.exists('db://assets/Audios')) {
        Editor.log('[FL]创建Audios文件夹');
        Editor.assetdb.create('db://assets/Audios', null, ()=>{
            
        });
    }
    if (!Editor.assetdb.exists('db://assets/Audios/common')) {
        Editor.log('[FL]创建Audios/common文件夹');
        Editor.assetdb.create('db://assets/Audios/common', null, ()=>{
            
        });
    }
    if (!Editor.assetdb.exists('db://assets/Prefabs')) {
        Editor.log('[FL]创建Prefabs文件夹');
        Editor.assetdb.create('db://assets/Prefabs', null, ()=>{
            
        });
    }
    if (!Editor.assetdb.exists('db://assets/Prefabs/common')) {
        Editor.log('[FL]创建Prefabs/common文件夹');
        Editor.assetdb.create('db://assets/Prefabs/common', null, ()=>{
            
        });
    }
    if (!Editor.assetdb.exists('db://assets/Protos')) {
        Editor.log('[FL]创建Protos文件夹');
        Editor.assetdb.create('db://assets/Protos', null, ()=>{
            
        });
    }
    if (!Editor.assetdb.exists('db://assets/resources/')) {
        Editor.log('[FL]创建resources文件夹');
        Editor.assetdb.create('db://assets/resources/', null, ()=>{

        });
    }
    if (!Editor.assetdb.exists('db://assets/resources/common/')) {
        Editor.log('[FL]创建resources/common文件夹');
        Editor.assetdb.create('db://assets/resources/common/', null, ()=>{

        });
    }
    if (!Editor.assetdb.exists('db://assets/Scenes')) {
        Editor.log('[FL]创建Scenes文件夹');
        Editor.assetdb.create('db://assets/Scenes', null, ()=>{
            
        });
    }
    if (!Editor.assetdb.exists('db://assets/Scripts')) {
        Editor.log('[FL]创建Scripts文件夹');
        Editor.assetdb.create('db://assets/Scripts', null, ()=>{
            
        });
    }
    if (!Editor.assetdb.exists('db://assets/Scripts/common')) {
        Editor.log('[FL]创建Scripts/common文件夹');
        Editor.assetdb.create('db://assets/Scripts/common', null, ()=>{
            
        });
    }
    if (!Editor.assetdb.exists('db://assets/Shaders')) {
        Editor.log('[FL]创建Shaders文件夹');
        Editor.assetdb.create('db://assets/Shaders', null, ()=>{
            
        });
    }
    if (!Editor.assetdb.exists('db://assets/Textures')) {
        Editor.log('[FL]创建Textures文件夹');
        Editor.assetdb.create('db://assets/Textures', null, ()=>{
            
        });
    }
    if (!Editor.assetdb.exists('db://assets/Textures/common')) {
        Editor.log('[FL]创建Textures/common文件夹');
        Editor.assetdb.create('db://assets/Textures/common', null, ()=>{
            
        });
    }
};


// 初始化动态资源到项目目录
exports.initResourcesDir = ()=>{
    if (!Editor.assetdb.exists('db://assets/resources/')) {
        Editor.log('[FL]创建resources文件夹');
        Editor.assetdb.create('db://assets/resources/', null, ()=>{
            initPreDir();
        });
    } else {
        initPreDir();
    }
};


// 导入框架全局模块定义
exports.initFLDeclare = ()=>{
    var prodir = Editor.projectPath;
    var pRoot = path.join(__dirname, '..');
    
    Editor.log('[FL]导入fl.d.ts...');
    copy(pRoot + '/templates/fl.d.ts', prodir + '/fl.d.ts');
    Editor.log('[FL]导入fl.d.ts文件成功！');
};


// 导入TS和ES6组件文件模板
exports.importTSAndJSNewFilewTemplate = ()=>{
    if (!fs.existsSync('/Applications/CocosCreator.app/Contents/Resources/static/template')) {
        return Editor.error('请检查CocosCreator安装位置，找不到目录：/Applications/CocosCreator.app/Contents/Resources/static/template');
    }

    // creator安装目录中的文件模板位置
    var cocosCreatorInstallDir = '/Applications/CocosCreator.app/Contents/Resources/static/template'
    var pRoot = path.join(__dirname, '..');
    
    Editor.log(Editor);
    Editor.log('[FL]导入JS脚本模板...');
    copy(pRoot + '/templates/new-script.js', cocosCreatorInstallDir + '/new-script.js');
    Editor.log('[FL]导入TS脚本模板...');
    copy(pRoot + '/templates/new-script.ts', cocosCreatorInstallDir + '/new-script.ts');
    Editor.log('[FL]替换JS、TS组件模板成功！');
};
