/**
 *
 * @author ：smq
 * @date ：2021/7/21
 *
 */
import axios from 'axios'

export async function login(userName: string, password: string): Promise<R<LoginResult>> {
    const resp = await axios.post('/login', {
        username: userName,
        password
    })
    return resp.data
}
