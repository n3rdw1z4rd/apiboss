export interface LoggerParams {

}

const DEFAULT_PARAMS: LoggerParams = {

};

export class Logger {
    constructor(params: LoggerParams) {
        params = {
            ...DEFAULT_PARAMS,
            ...params,
        };
    }

    private _log() { }
}