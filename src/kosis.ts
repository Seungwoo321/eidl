import axios from 'axios'
import type {
    KosisConfigWithDefaultOptional,
    DefaultValues,
    KosisStatic,
    PeriodCountConfig,
    PeriodDateConfig
} from './kosis.d'

const API_URL = 'https://kosis.kr/openapi'

const PATH = {
    /** 파라메터 방식으로 데이터 호출 URL 경로 */
    statisticsParameterData: '/Param/statisticsParameterData.do'
}

const METHOD = {
    getList: 'getList'
}
/**
 * 기간 조회 방법
 * 1. 최신자료 기준
 *  - 최근 수록 시점 개수: newEstPrdCnt
 *  - 최근 수록 시점 간격: prdInterval
 * 2. 시점 기준
 *  - 시작 수록 시점: startPrdDe
 *  - 종료 수록 시점: endPrdDe
 */

const defaultValues: DefaultValues = {
    /** 수록 주기 */
    prdSe: 'M',
    /** JSON 포맷 */
    format: 'json',
    jsonVD: 'Y'
}

const latestOneOptions: PeriodCountConfig = {
    newEstPrdCnt: '1',
    prdInterval: '1'
}


const client = axios.create({
    baseURL: API_URL,
})

const kosis: KosisStatic = {
    async getIndicatorData (config: KosisConfigWithDefaultOptional & PeriodDateConfig): Promise<any[]> {
        const params = {
            method: METHOD.getList,
            ...defaultValues,
            ...config
        }
        const data = await client.get(PATH.statisticsParameterData, {
            params
        })
        return data.data
    },
    async getIndicatorLatestData (config: KosisConfigWithDefaultOptional): Promise<any[]> {
        const params = {
            method: METHOD.getList,
            ...defaultValues,
            ...latestOneOptions,
            ...config
        }
        const data = await client.get(PATH.statisticsParameterData, {
            params
        })
        return data.data
    }
}

export {
    kosis as default,
    kosis
}