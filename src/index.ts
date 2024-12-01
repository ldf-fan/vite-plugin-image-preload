import { version } from "../package.json";
import { sync } from "fast-glob";

/**图片预加载插件可选参数 */
interface ImagePreloadOptions {
    /**
     * 预加载图片目录
     */
    dir: string;
    /**
     * link 标签属性
     */
    attrs?: {
        /**链接文档与当前文档的关系 */
        rel?: string;
    };
}
/**
 * 图片预加载
 * @param options 插件可选参数
 */
export default function imagePreload(options: ImagePreloadOptions) {
    const { dir = "", attrs = {} } = options || {};
    return {
        name: "vite-plugin-image-preload", // 插件名称
        version, // 插件的版本，用于插件间通信场景。
        // 转换 index.html 的专用钩子。钩子接收当前的 HTML 字符串和转换上下文。
        transformIndexHtml(html: string, ctx) {
            const files = sync(dir || "/", {
                // 当前工作目录
                cwd: ctx.server.config.publicDir,
            });
            const images = files.map((file) => {
                return ctx.server.config.base + file;
            });
            return images.map((href) => {
                return {
                    // 标签名
                    tag: "link",
                    attrs: {
                        // preload 预先获取和缓存目标资源。
                        rel: "preload", // 链接文档与当前文档的关系
                        href, // 链接资源的 URL。
                        as: "image", // 正在加载的内容类型
                        ...attrs,
                    },
                };
            });
        },
    };
}
