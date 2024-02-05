import { AxiosRequestConfig } from 'axios';

export declare class SDMXParser {
    constructor();

    parseSeriesInDatasets(txt: string): Record<string, any>;

    getDatasets(api: string, options?: AxiosRequestConfig): Promise<Record<string, any>>;

    getName(): string;

    getDescription(): string;

    getAttributes(): any[];

    getDimensions(): any[];

    getDimension(id: string): any;

    getActiveDimensions(): any[];

    getObservations(): Record<string, any>;

    getAnnotations(): any[];

    getData(options?: Record<string, any>): any[];
}
