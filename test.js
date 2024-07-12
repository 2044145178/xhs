import {homefeed} from "./api/homefeed.js";
import {feed} from "./api/feed.js";
import axios from "axios";
import {baseURL} from "./config.js";
import * as fs from 'node:fs';


axios.defaults.baseURL = baseURL
async function test() {
    const batch_size = 32//获取数量
    const index = 0//首页推荐笔记的索引
    const concurrency = 128//并发数
    const fs_path = './data/'//存放数据目录

    const feeds = []
    const homefeed_items = (await homefeed(batch_size, index)).data.items
    for (let i = 0; i < homefeed_items.length; i += concurrency) {
        let block = homefeed_items.slice(i, i + concurrency);
        const promises = block.map((item) => feed(item.id, item.xsec_token))
        const results = await Promise.all(promises)
        for (const result of results) {
            // console.log(result)
            feeds.push(result.data.items[0])
        }
    }
    fs.writeFile(fs_path + 'binggaokao_feed_recommend'+'_test_' + batch_size + '_' + Math.floor(index / batch_size) + '.json', JSON.stringify(feeds.slice(0, batch_size)), function (err) {
        if (err) throw err;
        console.log('binggaokao_feed_recommend'+'_test_' + batch_size + '_' + Math.floor(index / batch_size) + '.json' + '保存成功');
    });
}
test()
