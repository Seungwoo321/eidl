
export interface OecdStatic {
    getIndicatorData(dataUrl: string): Promise<any[]>
}

export declare const oecd: OecdStatic
