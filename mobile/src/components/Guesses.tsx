import { Box } from 'native-base';
import { useEffect, useState } from 'react';
import { Loading } from "../components/Loading";
import { useToast, FlatList } from "native-base";
import { api } from "../api/api";

import { Game, GameProps } from "../components/Game";
import { EmptyMyPoolList } from './EmptyMyPoolList';

interface Props {
  poolId: string;
  code: string;
}

export function Guesses({ poolId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [games, setGames] = useState([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  async function fetchGames() {
    try {
      setIsLoading(true);
      
      const response = await api.get(`/pools/${poolId}/games`);
      console.log('GAMES!!!', response.data);
      setGames(response.data);

    } catch (error) {
      setIsLoading(false)
      console.log('erro =====', error);
      toast.show({
        title: 'Não foi possível encontrar o jogo',
        placement: 'top',
        bgColor: 'red.500'
      });
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {

      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: 'Preencha todos os campos',
          placement: 'top',
          bgColor: 'red.500'
        });
      }

      const response = await api.post(`/pools/${poolId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints),
      });

      toast.show({
        title: 'Palpite enviado com sucesso',
        placement: 'top',
        bgColor: 'red.500'
      });

      setGames(response.data);

    } catch (error) {
      console.log('erro =====', error);
      toast.show({
        title: 'Não foi possível enviar o palpite',
        placement: 'top',
        bgColor: 'red.500'
      });
    }
  }

  useEffect(() => {
    fetchGames();
  }, [poolId]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList
      data={games}
      keyExtractor={item => item.id}
      renderItem={
        ({ item }) =>
          <Game data={item}
            setFirstTeamPoints={setFirstTeamPoints}
            setSecondTeamPoints={setSecondTeamPoints}
            onGuessConfirm={() => { handleGuessConfirm(item.id) }}
          />
      }
      _contentContainerStyle={{ pb: 10 }}
      ListEmptyComponent={() => <EmptyMyPoolList code={code}/>}
    />
  );
}
