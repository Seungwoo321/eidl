
export interface IKosisConfig {
    apiKey: string;
    // method: string;
    orgId: string;
    tblId: string;
    itmId: string;
    prdSe: string;
    format: string;
    jsonVD: string;
    objL1: string;
    objL2?: string;
    objL3?: string;
    objL4?: string;
    objL5?: string;
    objL6?: string;
    objL7?: string;
    objL8?: string;
}

export interface PeriodCountConfig {
    newEstPrdCnt: string;
    prdInterval: string;
}

export interface PeriodDateConfig {
    startPrdDe: string;
    endPrdDe: string;
}

export type DefaultValueKey = 'prdSe' | 'format' | 'jsonVD'

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type DefaultValues = Pick<IKosisConfig, DefaultValueKey>

/**
 * Params
 */
export type KosisConfigWithDefaultOptional = Optional<IKosisConfig, keyof DefaultValues>

export interface KosisStatic {
    getIndicatorData(config: KosisConfigWithDefaultOptional & PeriodDateConfig): Promise<any[]>
    getIndicatorLatestData (config: KosisConfigWithDefaultOptional): Promise<any[]>
}

declare const kosis: KosisStatic

export {
    kosis
}

// declare module 'kosis'