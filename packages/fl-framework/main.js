'use strict';

var copyResFiles = require('./libs/copy-res-files');

module.exports = {
    load () {
        // execute when package loaded
        Editor.log(Editor.projectPath);
        // resSync.copyResToAssets(Editor.projectPath);
    },

    unload () {
        // execute when package unloaded
    },

    // register your ipc messages here
    messages: {
        'import-fl-d-ts' () {
            // open entry panel registered in package.json
            copyResFiles.initFLDeclare();
        },
        'import-ts-js-newfile-template' () {
            // open entry panel registered in package.json
            copyResFiles.importTSAndJSNewFilewTemplate();
        },
        'init-assets-dir' () {
            // open entry panel registered in package.json
            copyResFiles.initDirs();
        },
        'import-res' () {
            Editor.log('[FL]开始导入框架资源到项目资源文件夹...');
            // send ipc message to panel
            // Editor.Ipc.sendToPanel('fl-framework', 'fl-framework:hello');
            copyResFiles.initResourcesDir();
        },
        'about' () {
            // open entry panel registered in package.json
            Editor.Panel.open('fl-framework');
        }
    },
};