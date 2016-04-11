/**
 * config
 */

var path = require('path');

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    get mini_assets() {
        return !this.debug;
    }, // 是否启用静态文件的合并压缩，详见视图中的Loader

    name: 'Guide', // 社区名字
    description: 'CNode：Node.js专业中文社区', // 社区的描述
    keywords: 'nodejs, node, express, connect, socket.io',

    // 添加到 html head 中的信息
    site_headers: [
        '<meta name="author" content="EDP@TAOBAO" />'
    ],
    site_logo: '/public/images/cnodejs_light.svg', // default is `name`
    site_icon: '/public/images/cnode_icon_32.png', // 默认没有 favicon, 这里填写网址
    // 右上角的导航区
    site_navs: [
        // 格式 [ path, title, [target=''] ]
        ['/about', '关于']
    ],
    site_static_host: '', // 静态文件存储域名
    // 社区的域名
    host: 'localhost',
    // 默认的Google tracker ID，自有站点请修改，申请地址：http://www.google.com/analytics/
    google_tracker_id: '',
    // 默认的cnzz tracker ID，自有站点请修改
    cnzz_tracker_id: '',

    // mongodb 配置
    db: 'mongodb://127.0.0.1/node_club_dev',

    // redis 配置，默认是本地
    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,

    session_secret: 'node_club_secret', // 务必修改
    auth_cookie_name: 'node_club',

    // 程序运行的端口
    port: 2888,

    // 话题列表显示的话题数量
    list_topic_count: 20,


    // 邮箱配置
    mail_opts: {
        host: 'smtp.126.com',
        port: 25,
        auth: {
            user: 'club@126.com',
            pass: 'club'
        }
    },


    // 文件上传配置
    // 注：如果填写 qn_access，则会上传到 7牛，以下配置无效
    upload: {
        path: path.join(__dirname, 'public/upload/'),
        path_uploadpage: path.join(__dirname, 'public/'),
        url: '/public/upload/'
    },
    url:'http://119.29.191.229',

    file_limit: '1MB',

    // 版块首页、发布，发现，我的
    tabs: [
        ['home', '首页'],
        ['submit', '发布'],
        ['discover', '发现'],
        ['mine', '我的']
    ],
    topShow: {
        //抢购 ，红包，宝箱，活动、商圈、教育、旅游、房产 、建材、医药、餐	饮、休闲，招商，招聘 ，汽车、金融、通讯、美妆、服务、公益内容

    },
    // 极光推送
    jpush: {
        appKey: 'YourAccessKeyyyyyyyyyyyy',
        masterSecret: 'YourSecretKeyyyyyyyyyyyyy',
        isDebug: false,
    },
    database_info: {
        host: 'localhost',
        user: 'root',
        password: 'dengyi',
        database: 'Guide',
        port: 3306
    },

    create_post_per_day: 1000, // 每个用户一天可以发的主题数
    create_reply_per_day: 1000, // 每个用户一天可以发的评论数
    visit_per_day: 1000, // 每个 ip 每天能访问的次数
};

if (process.env.NODE_ENV === 'test') {
    config.db = 'mongodb://127.0.0.1/node_club_test';
}

module.exports = config;
