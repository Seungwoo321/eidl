/**
 * Config
 */
export interface IEcosConfig {
    apiKey: string;
    statCode: string;
    searchStartDate: string;
    searchEndDate: string;
    serviceName: string;
    format: string;
    language: string;
    startCount: string;
    endCount: string;
    period: string;
    itemCode1: string;
    itemCode2?: string;
    itemCode3?: string;
    itemCode4?: string;
}
export type DefaultValueKey = 'serviceName' | 'format' | 'language' | 'startCount' | 'endCount' | 'period' | 'itemCode2' | 'itemCode3' | 'itemCode4'

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type DefaultValues = Pick<IEcosConfig, DefaultValueKey>

export type EcosConfigWithDefaultsOptional = Optional<IEcosConfig, keyof DefaultValues>

/**
 * URL
 */
export type HasKeys<T extends EcosConfigWithDefaultsOptional, K extends any[]> = K extends [infer First, ...infer Rest]
    ? First extends keyof T
        ? HasKeys<T, Rest>
        : false
    : true;

export type BaseUrlFormat<T extends EcosConfigWithDefaultsOptional> = HasKeys<T, ['language', 'apiKey', 'format', 'startCount', 'endCount', 'statCode', 'period', 'searchStartDate', 'searchEndDate', 'itemCode1']> extends true ? string : ''

export type ItemCodes<T extends EcosConfigWithDefaultsOptional> = 
    HasKeys<T, ['itemCode2', 'itemCode3', 'itemCode4']> extends true 
        ? string
        : HasKeys<T, ['itemCode2', 'itemCode3']> extends true
            ? string
            : HasKeys<T, ['itemCode2']> extends true
                ? string
                : HasKeys<T, ['itemCode3']> extends true
                    ? never
                    : HasKeys<T, ['itemCode4']> extends true
                        ? never
                        : ''

export type EcosUrlRule<T extends EcosConfigWithDefaultsOptional> = `${BaseUrlFormat<T>}${ItemCodes<T>}`

/**
 * Ecos
 */
export interface EcosStatic {
    getIndicatorData(config: EcosConfigWithDefaultsOptional): Promise<any[]>;
    _getEcosUrl<T extends EcosConfigWithDefaultsOptional> (config: T): EcosUrlRule<EcosConfigWithDefaultsOptional>;
}

export declare const ecos: EcosStatic
