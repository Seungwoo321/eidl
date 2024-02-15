import axios from 'axios'
import type {
    EcosConfigWithDefaultsOptional,
    DefaultValues,
    BaseUrlFormat,
    ItemCodes,
    EcosUrlRule,
    EcosStatic
} from './ecos.d';
/**
 * URL 생성 규칙
 * 
 * https://ecos.bok.or.kr/api/{서비스명}/{인증키}{요청유형}/{언어구분}/{요청시작건수}/{요청종료건수}/{통계표코드}/{주기}/{검색시작일자}/{검색종료일자}/{통계항목코드1}
 * 
 */

const API_URL = 'https://ecos.bok.or.kr/api'

const defaultValues: DefaultValues = {
    /** 서비스명 */
    serviceName: 'StatisticSearch',
    /** 요청유형 */
    format: 'json',
    /** 언어구분 */
    language: 'ko',
    /** 요청시작건수 */
    startCount: '1',
    /** 요청종료건수 */
    endCount: '1',
    /** 주기 */
    period: 'M',
    /** 통계항목코드2 ~ 4 */
    // itemCode2: undefined,
    // itemCode3: undefined,
    // itemCode4: undefined
};
const client = axios.create({
    baseURL: API_URL
})

const ecos: EcosStatic = {
    async getIndicatorData (config: EcosConfigWithDefaultsOptional) {
        try {
            const url = this._getEcosUrl(config)
            const data = await client.get(url)
            if (data.data.StatisticSearch) {
                return data.data.StatisticSearch.row
            } else {
                return data.data.RESULT
            }
        } catch (error) {
            throw error
        }
    },
    _getEcosUrl(config: EcosConfigWithDefaultsOptional): EcosUrlRule<EcosConfigWithDefaultsOptional> {
        const fullOptions = {
            ...defaultValues,
            ...config,
        }
        const baseUrl: BaseUrlFormat<typeof fullOptions> = '/' + [fullOptions.serviceName, fullOptions.apiKey, fullOptions.format, fullOptions.language, fullOptions.startCount, fullOptions.endCount, fullOptions.statCode, fullOptions.period, fullOptions.searchStartDate, fullOptions.searchEndDate].join('/') + '/' + fullOptions.itemCode1
        const itemCodes: ItemCodes<typeof fullOptions> = fullOptions.itemCode4 && fullOptions.itemCode3 && fullOptions.itemCode2
            ? `/${fullOptions.itemCode2}/${fullOptions.itemCode3}/${fullOptions.itemCode4}`
            : fullOptions.itemCode3 && fullOptions.itemCode2
                ? `/${fullOptions.itemCode2}/${fullOptions.itemCode3}`
                : fullOptions.itemCode2
                    ? `/${fullOptions.itemCode2}`
                    : ''
        const ecosUrl: EcosUrlRule<typeof fullOptions> = `${baseUrl}${itemCodes}`
        return ecosUrl
    }
}

export {
    ecos as default,
    ecos
}