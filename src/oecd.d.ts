
export interface OecdStatic {
    getIndicatorData(dataUrl: string): Promise<any[]>
}

declare const oecd: OecdStatic

export {
    oecd
}