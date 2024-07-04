//feed接口，即根据笔记ID获取笔记详情
import axios from "axios";
import {X_S} from "../sign/X-S/X-S.js";
import {x_s_common} from "../sign/X-S-Common/X-S-Common.js";
import {b1} from "../config.js";
import {getRamNumber} from "../utils/random.js";

//xsec_token疑似不需要
export const feed = async (note_id, xsec_token) => {
    const data = {
        "source_note_id": note_id,
        "image_formats": ["jpg", "webp", "avif"],
        "extra": {"need_body_topic": "1"},
        "xsec_source": "pc_feed",
        "xsec_token": xsec_token
    }
    const url = '/api/sns/web/v1/feed'
    const x_t = Date.now()
    return (await axios.post(url, data, {
        headers: {
            'Accept': "application/json, text/plain, */*",
            'Accept-Encoding': 'gzip, deflate, br, zstd',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5',
            'Content-Type': 'application/json;charset=UTF-8',
            'Cookie': `abRequestId=7ece995a-1afd-5724-8363-de04c08e1404; a1=18a5ad1f076t0yctcdwa6bdda1tpax0wy6x5p2wlt50000167712; webId=ddb0e392cf98750332982f9d766d40ea; gid=yY020fyiW4viyY020fyi8KJEWK98vS9SfE0KC19Dff0y9228U0C8EU888yKWWyJ8WK4204W8; xsecappid=xhs-pc-web; web_session=040069b76f12d47d5ce21701b4344b8a19f353; webBuild=4.23.1; acw_tc=403bcc4a76ad8a430f81067a71a09ba3dc2a1447a5ed3521b551a45e5a30e05e; unread={%22ub%22:%22665d4df30000000015011a03%22%2C%22ue%22:%22668243b9000000001e0114b4%22%2C%22uc%22:10}; websectiga=6169c1e84f393779a5f7de7303038f3b47a78e47be716e7bec57ccce17d45f99; sec_poison_id=0cdee497-3025-4934-95c0-387285c08456`,
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
            'X-S': X_S('url=' + url + JSON.stringify(data), x_t),
            'X-T': x_t,
            'X-S-Common': x_s_common(X_S('url=' + url + JSON.stringify(data), x_t), x_t, b1)
        }
    })).data
}



