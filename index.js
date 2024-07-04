import axios from "axios";
import {baseURL} from "./config.js";
import {homefeed} from "./api/homefeed.js";
import {feed} from "./api/feed.js";
import {page_comment} from "./api/page_comment.js";
import {sub_comment} from "./api/sub_comment.js";
import {sleep} from "./utils/sleep.js";
import * as fs from 'node:fs';
import ProgressBar from 'progress';
import {SingleBar} from 'cli-progress';


async function main(index = 512 * 67) {
    axios.defaults.baseURL = baseURL
    const feeds = []
    const fs_path = './data/'

    const bar = new SingleBar({
        format: '进度 | {bar} | {percentage}% | 预计剩余时间: {eta}s',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });
    const batch_size = 512
    const total_size = batch_size * 100
    const concurrency = 128

    try {
        // const bar = new ProgressBar(':bar :current/:total', {total: total_size});
        bar.start(total_size, index)

        while (index < total_size) {
            const homefeed_items = (await homefeed(batch_size, index)).data.items
            console.log(homefeed_items)
            return
            for (let i = 0; i < homefeed_items.length; i += concurrency) {
                let block = homefeed_items.slice(i, i + concurrency);
                const promises = block.map((item) => feed(item.id, item.xsec_token))
                const results = await Promise.all(promises)
                for (const result of results) {
                    // console.log(result)
                    feeds.push(result.data.items[0])
                    index++
                }
                bar.increment(concurrency)
            }

            if (feeds.length >= batch_size) {
                fs.writeFile(fs_path + 'binggaokao_feed_recommend' + '_' + batch_size + '_' + Math.floor(index / batch_size) + '.json', JSON.stringify(feeds.slice(0, batch_size)), function (err) {
                    if (err) throw err;
                    console.log('binggaokao_feed_recommend' + '_' + batch_size + '_' + Math.floor(index / batch_size) + '.json' + '保存成功');
                });
                for (let i = 0; i < batch_size; i++) {
                    feeds.shift()
                }
            }
        }
        // console.log(await feed('66842a99000000000d00d512',''))
        // console.log(await page_comment('66842a99000000000d00d512'))
    } catch (e) {
        console.log(e)
        await main(Math.floor(index / batch_size) * batch_size)
    }
    bar.stop()
}

main()
// async function test(){
//     axios.defaults.baseURL = baseURL
//     try {
//         console.log((await sub_comment('666cd486000000001c036754','666d5e18000000002300e257','666d613c000000002100c4ed')).data)
//     }catch (e) {
//         console.log(e)
//     }
// }
// test()
// axios.get('https://sns-webpic-qc.xhscdn.com/202407021444/74d7433d0605e9598f6e62bcd7f0d3fe/1040g2sg313mktq8eho005oldofpmso9bsgd68s0!nd_prv_wlteh_webp_3',{
//     responseType: 'arraybuffer'
// }).then((resp)=>{
//     console.log(resp)
//     fs.writeFile('out.png', resp.data, function (err) {
//         if (err) throw err;
//         console.log('保存成功');
//     });
// })
