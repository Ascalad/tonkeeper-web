import { TranslatableError } from './TranslatableError';

export class TronApiHttpError extends Error implements TranslatableError {
    public readonly translate = 'trc20_transfer_unavailable';

    constructor(public readonly status: number, message?: string) {
        super(message ?? `TronGrid HTTP error ${status}`);
        this.name = 'TronApiHttpError';
    }

    get isRateLimit() {
        return this.status === 429;
    }
}
