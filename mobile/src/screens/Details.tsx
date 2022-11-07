import { VStack, useToast, HStack } from "native-base";
import { useRoute } from "@react-navigation/native";
import { Header } from "../components/Header";
import { Guesses } from "../components/Guesses";
import { useEffect, useState } from "react";
import { Loading } from "../components/Loading";
import { api } from "../api/api";
import { PoolPros } from "../components/PoolCard";
import { PoolHeader } from "../components/PoolHeader";
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";
import { Option } from "../components/Option";
import { Share } from 'react-native';

interface RouteParams {
    id: string,
}

export function Details() {
    const route = useRoute();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [optionSelected, setOptionSelected] = useState<'Seus palpites' | 'Ranking do grupo'>("Seus palpites");

    const [poolDetails, setPoolDetails] = useState<PoolPros>({} as PoolPros);
    const { id } = route.params as RouteParams;

    async function fetchPoolDetails() {
        try {
            const response = await api.get(`/pools/${id}`);
            setPoolDetails(response.data.pool);

            setIsLoading(true)
        } catch (error) {
            setIsLoading(false)
            toast.show({
                title: 'Não foi possível encontrar o bolão',
                placement: 'top',
                bgColor: 'red.500'
            });
        } finally {
            setIsLoading(false)

        }
    }

    async function handleShareCode() {
        await Share.share({
            message: poolDetails.code
        })
    }

    useEffect(() => {
        fetchPoolDetails();
    }, [id]);

    if (isLoading) {
        return <Loading />
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={poolDetails.title} showBackButton={true} showShareButton={true} onShare={handleShareCode} />
            {
                poolDetails._count?.participants > 0 ?
                    <VStack px={5} flex={1}>
                        <PoolHeader data={poolDetails} />

                        <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                            <Option title="Seus palpites"
                                isSelected={optionSelected === "Seus palpites"}
                                onPress={() => setOptionSelected("Seus palpites")} />
                            <Option title="Ranking do grupo"
                                isSelected={optionSelected === "Ranking do grupo"}
                                onPress={() => setOptionSelected("Ranking do grupo")} />
                        </HStack>
                        <Guesses poolId={poolDetails.id}  code={poolDetails.code}/>
                    </VStack> :
                    <EmptyMyPoolList code={poolDetails.code} />
            }
        </VStack>
    );
}