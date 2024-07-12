import axios from "axios";
import {X_S} from "../sign/X-S/X-S.js";
import {x_s_common} from "../sign/X-S-Common/X-S-Common.js";
import {b1, cookie_a1} from "../config.js";
import {getRamNumber} from "../utils/random.js";
import obj from "../utils/json2URL.js";
// 获取子评论
//一次请求至多返回5条子评论
export const sub_comment = async (note_id,root_comment_id, cursor="") => {
    const data={
        "note_id": note_id,
        "root_comment_id": root_comment_id,
        "num": 10,
        "cursor": cursor,
        "image_formats": "jpg,webp,avif",
        "top_comment_id": ""
    }
    const url = '/api/sns/web/v2/comment/sub/page'
    const x_t=Date.now()
    return (await axios.get(url, {
        params: data,
        headers: {
            'Accept': "application/json, text/plain, */*",
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
            'Content-Type': 'application/json;charset=UTF-8',
            'Cookie': `abRequestId=7ece995a-1afd-5724-8363-de04c08e1404; a1=${cookie_a1}; webId=ddb0e392cf98750332982f9d766d40ea; gid=yY020fyiW4viyY020fyi8KJEWK98vS9SfE0KC19Dff0y9228U0C8EU888yKWWyJ8WK4204W8; xsecappid=xhs-pc-web; web_session=040069b76f12d47d5ce21701b4344b8a19f353; webBuild=4.23.1; acw_tc=403bcc4a76ad8a430f81067a71a09ba3dc2a1447a5ed3521b551a45e5a30e05e; unread={%22ub%22:%22665d4df30000000015011a03%22%2C%22ue%22:%22668243b9000000001e0114b4%22%2C%22uc%22:10}; websectiga=6169c1e84f393779a5f7de7303038f3b47a78e47be716e7bec57ccce17d45f99; sec_poison_id=0cdee497-3025-4934-95c0-387285c08456`,
            'Priority': 'u=1, i',
            'Referer': 'https://www.xiaohongshu.com/',
            'Sec-Ch-Ua':
                `"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"`,
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': "Windows",
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0',
            'X-B3-Traceid': getRamNumber(),
            'X-S': X_S('url=' + url + '?' + obj.makeSign(data), x_t),
            'X-T': x_t,
            'X-S-Common': x_s_common(X_S('url=' + url + '?' + obj.makeSign(data), x_t), x_t, b1)
        }
    })).data
}


