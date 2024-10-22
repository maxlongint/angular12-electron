/**
 * 后端返回的数据类型
 *
 * @export
 * @interface R
 */
export interface R<T = any> {
    /**
     * 请求结果状态码
     * 0：成功，其他：失败
     */
    code: number;
    /**
     * 消息代码
     */
    msgCode?: number;
    /**
     * 错误信息
     */
    msg: string;
    /**
     * 返回的数据
     */
    data: T;
}
