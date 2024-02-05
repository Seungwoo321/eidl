import { SDMXParser } from './sdmx-json-parser-node/index.js';
import { OecdStatic } from './oecd.d'

export const oecd: OecdStatic = {
    async getIndicatorData (dataUrl: string) {
        const sdmx = new SDMXParser()
        await sdmx.getDatasets(dataUrl)
        const data = sdmx.getData()
        return data
    }
}