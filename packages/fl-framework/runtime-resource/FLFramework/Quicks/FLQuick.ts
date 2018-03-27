/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 快速编程插件
 * zengbinsi
 * 2017-12-14
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLQuick {

    /**
     * 将节点与它的组件绑定
     * @param node 节点对象
     */
    static bindComponents (node: cc.Node): void {
        let components = node.getComponents(cc.Component);
        for (let i = 0; i < components.length; i++) {
            node['$' + FLQuick.getComponentName(components[i])] = components[i];
        }
    }

    /**
     * 将当前组件与管理的节点上的所有组件关联
     * @param com 组件对象
     */
    static bindComponentsToThis (com: cc.Component): void {
        let components = com.node.getComponents(cc.Component);
        for (let i = 0; i < components.length; i++) {
            let comName = '$' + FLQuick.getComponentName(components[i]);
            com.node[comName] = components[i];
            com[comName] = components[i];
        }
    }

    /**
     * 获取组件的名字
     * @param com 组件对象
     */
    static getComponentName (com: cc.Component): string {
        return com.name.match(/<.*>$/)[0].slice(1, -1);
    }

    /**
     * 将节点与子节点绑定
     * @param node 节点对象
     * @param isRecursion 是否递归，默认递归
     */
    static bindChildrens (node: cc.Node, isRecursion: boolean = true): void {
        let childrens = node.children;

        for (let i = 0; i < childrens.length; i++) {
            node['_' + childrens[i].name] = childrens[i];

            if (isRecursion) {
                FLQuick.bindChildrens(childrens[i]);
            }
        }
    }
}
