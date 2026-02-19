import { useQuery } from '@tanstack/react-query';
import { QueryKey } from '../libs/queryKey';
import { GaslessApi } from '@tonkeeper/core/dist/tonApiV2';
import { useMemo } from 'react';
import { useActiveApi, useActiveTonNetwork } from './wallet';
import { Network } from '@tonkeeper/core/dist/entries/network';
import { ServerConfig } from './tonendpoint';
import { useAppContext } from '../hooks/appContext';

export const useGaslessApi = () => {
    const api = useActiveApi();
    return useMemo(() => new GaslessApi(api.tonApiV2), [api]);
};

export const useGaslessConfigQuery = (mainnetConfig?: ServerConfig['mainnetConfig']) => {
    const gaslessApi = useGaslessApi();
    return useQuery(
        [QueryKey.gaslessConfig, mainnetConfig?.tonapiV2Endpoint],
        async () => {
            return gaslessApi.gaslessConfig();
        },
        {
            keepPreviousData: true,
            enabled: Boolean(mainnetConfig),
            retry: false
        }
    );
};

export const useGaslessConfig = () => {
    const { mainnetConfig } = useAppContext();
    const network = useActiveTonNetwork();
    const config = network === Network.TESTNET ? undefined : mainnetConfig;
    const { data } = useGaslessConfigQuery(config);

    if (network === Network.TESTNET) return undefined;
    return data;
};
