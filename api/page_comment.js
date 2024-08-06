import axios from "axios";
import {X_S} from "../sign/X-S/X-S_deprecated.js";
import {x_s_common} from "../sign/X-S-Common/X-S-Common.js";
import {b1, my_cookie, cookie_a1, baseURL} from "../config.js";
import {getRamNumber} from "../utils/random.js";
import obj from "../utils/json2URL.js";
import {get_xs_xt} from "../sign/X-S/X-S.js";
import json2URL from "../utils/json2URL.js";
// comment接口，即根据笔记ID获取评论
//cursor应该是当前已获取到最后一个的一级评论ID,可从上一个响应的cursor字段获取
//每次返回10个评论，当返回评论数小于10，则说明无更多评论
export const page_comment = async (note_id, cursor="") => {
    const data={
        "note_id": note_id,
        "image_formats": "jpg,webp,avif",
        "cursor": cursor,
        "top_comment_id": "",
    }
    const url = '/api/sns/web/v2/comment/page'
    const temp_sign =await get_xs_xt(url+'?'+obj.makeSign(data),undefined,cookie_a1)
    const x_s=temp_sign['X-s']
    const x_t=temp_sign['X-t']
    return (await axios.get(url, {
        params: data,
        headers: {
            'Accept': "application/json, text/plain, */*",
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
            'Content-Type': 'application/json;charset=UTF-8',
            'cache-control':'no-cache',
            'Cookie': my_cookie,
            'origin':'https://www.xiaohongshu.com',
            'pragma':'no-cache',
            'Priority': 'u=1, i',
            'Referer': 'https://www.xiaohongshu.com/',
            'Sec-Ch-Ua':
                `"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"`,
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': "Windows",
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
            'X-B3-Traceid': getRamNumber(),
            'X-S': x_s,
            'X-T': x_t,
            'X-S-Common': x_s_common(x_s, x_t, b1)
            // 'X-B3-Traceid': 'c4ffa3604fdbf8b3',
            // 'X-S': 'XYW_eyJzaWduU3ZuIjoiNTIiLCJzaWduVHlwZSI6IngyIiwiYXBwSWQiOiJ4aHMtcGMtd2ViIiwic2lnblZlcnNpb24iOiIxIiwicGF5bG9hZCI6IjI5N2Y5MmViZDhjNTE5ZGM5NjU5YWI4ZTZmZTIwYjBkYmRkODk3OTQ2NTAzZGVhMGIwZWI3MGI1ZDRiYmZjZmI0YTAxZmIxYzc5MmUwNzcyMDNiNDY0MzNlZWFjYWI0ZjVlYTBhNDMwNTNlOWZjN2YyMWFhMDY3ZDE0NGM4NGEzM2QzZDdiNDZmNWZmYzE2NjM1MDEzY2FlZjhlMTRhMjQ1NGNkNmRlZTRmYTI0YjNhMGRkOTQyYTI3YjM5OTgyNjcwOWM4MjAzNGE0NWJkNTE5NGYwNzE4NmQ3MzM3NDJhYTUyYmRmYTg0NTM0ODViOWU1N2IxZjg1MzYzMDJhZDI4NDYwMDI0YTc1MzBkN2M3ZjUyZWFjYWI0YzdjZWRkOGE1YmFiZDk2MjU1ZGE1MThkOTIxN2E5MjlmZGVlNDIwYmE3NWEzOWEwYjdmNDU2NmU0MDYyMzdkYTBmYzkwYzEyNTY2YTQ1Mjg2Yzc3MjQ0ZDlmYTZhZWMwMDVhNDk5NmU0MWNkZDcwYTZmODU2YTc3ZmNjZDQzZGJmZGY1NDVjIn0=',
            // 'X-T': 1722953249701,
            // 'X-S-Common': '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'
        }
    })).data
}
