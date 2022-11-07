import { useNavigation } from "@react-navigation/native";
import { Heading, VStack, useToast } from "native-base";
import { useState } from "react";
import { api } from "../api/api";

import Logo from "../assets/logo.svg";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Find() {
    const { navigate } = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();
    const [code, setCode] = useState('');

    async function handleJoinPool() {

        try {
            if (!code.trim()) {
                return toast.show({
                    title: 'Informe o código',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            setIsLoading(true);
            await api.post('/pools/join', { code });

            toast.show({
                title: 'Você entrou no bolão!',
                placement: 'top',
                bgColor: 'green.500'
            });

            navigate('pools');
        } catch (error) {
            setIsLoading(false);
            if (error.response?.data?.message === 'Pool not found.') {
                return toast.show({
                    title: 'Não foi possível achar o bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }

            if (error.response?.data?.message === 'You already joined this pool.') {
                return toast.show({
                    title: 'Você já está no bolão',
                    placement: 'top',
                    bgColor: 'red.500'
                });
            }
        }
    }

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton={true} />

            <VStack mt="8" mx="5" alignItems="center">
                <Logo />

                <Heading
                    fontFamily="heading"
                    color="white"
                    fontSize="xl"
                    my="8"
                    textAlign="center"
                >
                    Encontre um bolão atráves {'\n'}
                    do código único
                </Heading>

                <Input
                    mb={2}
                    placeholder="Qual código do bolão?"
                    autoCapitalize="characters"
                    onChangeText={setCode}
                />

                <Button
                    title="Buscar bolão"
                    isLoading={isLoading}
                    onPress={() => handleJoinPool()}
                />
            </VStack>
        </VStack>
    )
}