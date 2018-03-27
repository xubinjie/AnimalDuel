/**
 * copyright (c) 厦门风领科技有限公司
 * http://www.fenglinghudong.com/
 * 
 * 物理系统工具类
 * zengbinsi
 * 2017-12-07
 */




 
const {ccclass, property} = cc._decorator;

@ccclass
export class FLPhysics {

    /**
     * 启用/禁用物理碰撞检测系统
     * @param isEnabled 是否启用物理碰撞检测
     */
    static enableCollisionSystem (isEnabled: boolean): void {
        cc.director.getCollisionManager().enabled = isEnabled;
    }

    /**
     * 启用/禁用物理碰撞检测系统的物理调试绘制
     * @param isEnabled 是否进行碰撞调试绘制
     */
    static enableCollisionDebugDraw (isEnabled: boolean): void {
        cc.director.getCollisionManager().enabledDebugDraw = isEnabled;
    }




    /**
     * 启用/禁用物理引擎进行物理状态模拟
     * @param isEnabled 是否启用物理引擎
     */
    static enablePhysicsSystem (isEnabled: boolean): void {
        cc.director.getPhysicsManager().enabled = isEnabled;
    }

    /**
     * 启用/禁用物理引擎调试绘制
     * @param isEnabled 是否启用物理引擎调试绘制
     */
    static enablePhysicsDebugDraw (isEnabled: boolean): void {
        if (isEnabled) {
            // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            //     cc.PhysicsManager.DrawBits.e_pairBit |
            //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            //     cc.PhysicsManager.DrawBits.e_jointBit |
            //     cc.PhysicsManager.DrawBits.e_shapeBit
            //     ;
            cc.director.getPhysicsManager().debugDrawFlags = 1;
        } else {
            cc.director.getPhysicsManager().debugDrawFlags = 0;
        }
    }

    /**
     * 设置物理世界的重力加速度
     * 
     * 重力是物理表现中非常重要的一点，大部分物理游戏都会使用到重力这一物理特性。 默认的重力加速度是 (0, -320) 像素/秒^2，按照上面描述的转换规则，即 (0, -10) 米/秒^2。
     * 如果希望修改重力加速度为其他值，比如每秒加速降落 640 像素，那么可以这样设置：
     *      cc.director.getPhysicsManager().gravity = cc.v2(0, -640);
     * 
     * @param gravity 重力加速度矢量
     */
    static setGravity (gravity: cc.Vec2): void {
        cc.director.getPhysicsManager().gravity = gravity;
    }

    /**
     * 查询物体-点测试
     * 
     * 点测试将测试是否有碰撞体会包含一个世界坐标系下的点，如果测试成功，则会返回一个包含这个点的碰撞体。注意，如果有多个碰撞体同时满足条件，下面的接口只会返回一个随机的结果。
     * 
     * @param point 世界坐标
     */
    static testPoint (point: cc.Vec2): cc.PhysicsCollider {
        return cc.director.getPhysicsManager().testPoint(point);
    }

    /**
     * 查询物体-矩形测试
     * 
     * 矩形测试将测试指定的一个世界坐标系下的矩形，如果一个碰撞体的包围盒与这个矩形有重叠部分，则这个碰撞体会给添加到返回列表中。
     * 
     * @param rect 世界坐标系下的矩形
     */
    static testAABB (rect: cc.Rect): Array<cc.PhysicsCollider> {
        return cc.director.getPhysicsManager().testAABB(rect);
    }

    /**
     * 查询物体-射线测试
     * 
     * 射线检测用来检测给定的线段穿过哪些碰撞体，我们还可以获取到碰撞体在线段穿过碰撞体的那个点的法线向量和其他一些有用的信息。
     * 
     * 射线检测的最后一个参数指定检测的类型，射线检测支持四种类型。 这是因为 box2d 的射线检测不是从射线起始点最近的物体开始检
     * 测的，所以检测结果不能保证结果是按照物体距离射线起始点远近来排序的。 CocosCreator 物理系统将根据射线检测传入的检测类型
     * 来决定是否对 box2d 检测结果进行排序，这个类型会影响到最后返回给用户的结果。
     * 
     * cc.RayCastType.Any: 检测射线路径上任意的碰撞体，一旦检测到任何碰撞体，将立刻结束检测其他的碰撞体，最快。
     * cc.RayCastType.Closest: 检测射线路径上最近的碰撞体，这是射线检测的默认值，稍慢。
     * cc.RayCastType.All: 检测射线路径上的所有碰撞体，检测到的结果顺序不是固定的。在这种检测类型下一个碰撞体可能会返回多个结
     *      果，这是因为 box2d 是通过检测夹具(fixture)来进行物体检测的，而一个碰撞体中可能由多个夹具(fixture)组成的，慢。更
     *      多细节可到 物理碰撞组件 查看。
     * cc.RayCastType.AllClosest: 检测射线路径上所有碰撞体，但是会对返回值进行删选，只返回每一个碰撞体距离射线起始点最近的那个点的相关信息，最慢。
     * 
     *      var results = cc.director.getPhysicsManager().rayCast(p1, p2, type);

            for (var i = 0; i < results.length; i++) {
                var result = results[i];
                // 碰撞器对象
                var collider = result.collider;
                // 碰撞点
                var point = result.point;
                // 射线与碰撞器产生碰撞的那个面的法向量
                var normal = result.normal;
                // 指定相交点在射线上的分数。
                var fraction = result.fraction;
            }
     * 
     * @param p1 射线起点
     * @param p2 射线终点
     * @param type 射线检测的类型
     */
    static rayCast (p1: cc.Vec2, p2: cc.Vec2, type: cc.RayCastType): Array<cc.PhysicsRayCastResult> {
        return cc.director.getPhysicsManager().rayCast(p1, p2, type);
    }
}
