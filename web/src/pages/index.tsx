import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoIng from '../assets/logo.svg'
import userAvatarExampleIng from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'
import Image from 'next/image'
import { api } from '../lib/axios';
import { FormEvent, useState } from 'react'

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('');
  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const res = await api.post('/pools', {
        title: poolTitle
      });

      const code = res.data;

      await navigator.clipboard.writeText(code);

      alert('Bolão criado com sucesso!!!');
      setPoolTitle('');

    } catch (error) {
      alert('deu bigode');
    }

  }

  return (
    <div className='max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'>
      <main>
        <Image src={logoIng} alt="NLW Copa" />

        <h1 className='mt-14 text-white text-5xl font-bold leading-tight'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>

        <div className='mt-10 items-center flex gap-2'>
          <Image src={userAvatarExampleIng} alt="" />
          <strong className='text-gray-100'>
            <span className='text-ingnite-500'>+{props.userCount}</span> pessoas já estão usando
          </strong>
        </div>
        <form onSubmit={createPool} className='mt-10 flex gap-2'>
          <input type="text" onChange={event => setPoolTitle(event.target.value)}
            value={poolTitle}
            className='text-gray-100 flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm' required placeholder='Qual nome do seu bolão?' />
          <button className='bg-yellow-500 px-6 py-4 rounded hover:bg-yellow-700 text-gray-900 font-bold uppercase' type='submit'>Criar meu bolão</button>
        </form>

        <p className='mt-4 text-sm text-gray-300 leading-relaxed'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis quasi facilis inventore in maiores reprehenderit nam assumenda saepe odio ipsa, iusto fugiat, velit quis pariatur placeat unde vitae aliquid fuga.
        </p>

        <div className='mt-10 pt-10 border-t border-gray-600 grid grid-cols-2 justify-between items-center text-gray-100'>
          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>
                + {props.poolCount}
              </span>

              <span>
                Bolões criados
              </span>
            </div>
          </div>

          <div className='flex items-center gap-6'>
            <Image src={iconCheckImg} alt="" />
            <div className='flex flex-col'>
              <span className='font-bold text-2xl'>
                + {props.guessCount}
              </span>

              <span>
                Palpites enviados
              </span>
            </div>
          </div>
        </div>
      </main>

      <Image src={appPreviewImg} alt="Dois celulares previa aplicação" />
    </div>
  )
}

export const getServerSideProps = async () => {
  const [poolCount, guessCount, userCount] = await Promise.all([
    api.get('pools/count'),
    api.get('/guesses/count'),
    api.get('/users/count')
  ])

  return {
    props: {
      poolCount: poolCount.data.count,
      guessCount: guessCount.data.count,
      userCount: userCount.data.count,
    }
  }
}
