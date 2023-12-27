"use client"

import {
  RegexNumber,
  maskCEP,
  maskCPF,
  maskCurrency,
  maskPhone
} from '@/Masks/masks';
import { Input } from '@/components/Input';
import { PDF } from '@/components/PDF';
import { Select } from '@/components/Select';
import { PDFDownloadLink, } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

import axios from 'axios';
import { InputDate } from '@/components/InputDate';
import { dateFormat } from '@/utils/dateFormart';
import { Button } from '@/components/Button';
import Link from 'next/link';

const maritalStateList = [
  { name: 'Selecionar estado civil' },
  { name: 'Solteiro(a)' },
  { name: 'Casado(a)' },
  { name: 'Viúvo(a)' },
  { name: 'Divorciado(a)' },
]

export default function Home() {
  const [address, setAddress] = useState("");
  const [CEP, setCEP] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [number, setNumber] = useState("");

  const [name, setName] = useState("");
  const [CPF, setCPF] = useState("");
  const [RG, setRG] = useState("");
  const [profession, setProfession] = useState("");
  const [nationality, setNationality] = useState("");
  const [phone, setPhone] = useState("");
  const [maritalState, setMaritalState] = useState(maritalStateList[0]);

  const [valueLoan, setValueLoan] = useState("");
  const [finalPaymentDate, setFinalPaymentDate] = useState("");

  const today = new Date().toISOString();
  const [date, setDate] = useState(dateFormat(today));

  const [isClient, setIsClient] = useState(false);

  function generateContract() {
    setAddress("");
    setCity("");
    setCEP("");
    setState("");
    setNumber("");

    setName("");
    setCPF("");
    setRG("");
    setProfession("");
    setNationality("");
    setPhone("");
    setMaritalState(maritalStateList[0]);

    setValueLoan("");
    setFinalPaymentDate("");
  };

  function handleDate(event: any) {
    const date = event.target.value;

    if (date === "") {
      setDate(today)
    } else {
      setDate(dateFormat(date))
    }
  };

  useEffect(() => {
    async function consultingCEP() {
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${CEP}/json/`);
        const data = response.data;

        setAddress(`${data.logradouro}, ${data.bairro}`);
        setCity(data.localidade);
        setState(data.uf);
      } catch (error) {
        console.error('Erro ao consultar o CEP:', error);
      }
    };

    consultingCEP()
  }, [CEP]);

  useEffect(() => {
    setIsClient(true)
  }, []);

  return (
    <main className='bg-zinc-100 w-full flex justify-center items-center flex-col gap-5 px-4 py-10'>
      <h1 className='text-[26px] font-medium text-zinc-600'>
        Gerador de contrato
      </h1>
      <div data-aos="zoom-in" className='w-full max-w-[700px] bg-white rounded-lg shadow-lg p-8 flex flex-col justify-between items-center'>
        <form onSubmit={generateContract}>
          <div className='mb-8'>
            <p className='text-base text-zinc-400 mb-6 font-bold'>
              Dados pessoais do devedor
            </p>
            <div className='flex gap-3 mb-3 flex-col'>
              <div className="flex gap-3">
                <Input
                  placeholder='Nome completo'
                  value={name}
                  width="w-[60%]"
                  onChange={e => setName(e.target.value)}
                />
                <Input
                  placeholder='Telefone'
                  width="w-[40%]"
                  value={phone}
                  onChange={e => setPhone(maskPhone(e.target.value))}
                />
              </div>
              <div className="flex gap-3">
                <Input
                  placeholder='RG'
                  width="max-w-[50%]"
                  value={RG}
                  onChange={e => setRG(RegexNumber(e.target.value))}
                />
                <Input
                  placeholder='CPF'
                  width="max-w-[50%]"
                  value={CPF}
                  onChange={e => setCPF(maskCPF(e.target.value))}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 mb-3 sm:flex-col">
              <Select
                selected={maritalState}
                setSelected={setMaritalState}
                paymentMethods={maritalStateList}
              />
              <div className="flex gap-3">
                <Input
                  placeholder='Profissão'
                  value={profession}
                  width="max-w-[50%]"
                  onChange={e => setProfession(e.target.value)}
                />
                <Input
                  placeholder='Nacionalidade'
                  width="max-w-[50%] sm:max-w-[50%]"
                  value={nationality}
                  onChange={e => setNationality(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className='mb-8'>
            <p className='text-l text-zinc-400 mb-6 font-bold'>
              Endereço do devedor
            </p>
            <div className='flex sm:flex-col gap-3 mb-3'>
              <div className="flex gap-3">
                <Input
                  placeholder='CEP'
                  width="max-w-[140px]"
                  value={CEP}
                  onChange={e => setCEP(maskCEP(e.target.value))}
                />
                <Input
                  placeholder='Cidade'
                  value={city}
                  onChange={e => setCity(e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Input
                  placeholder='UF'
                  width="max-w-[52px]"
                  value={state}
                  onChange={e => setState(e.target.value)}
                />
                <Input
                  placeholder='Complemento, número'
                  value={number}
                  onChange={e => setNumber(e.target.value)}
                />
              </div>
            </div>
            <Input
              placeholder='Endereço'
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className='mb-8'>
            <p className='text-l text-zinc-400 mb-3 font-bold'>
              Informações do empréstimo
            </p>
            <div className='flex gap-3 mb-3 sm:flex-col sm:gap-6'>
              <fieldset className="w-full">
                <label className="text-zinc-400 mb-3 w-full">
                  * Valor do empréstimo:
                </label>
                <Input
                  placeholder='R$ 0,00'
                  width="max-w-[100%]"
                  value={valueLoan}
                  onChange={e => setValueLoan(maskCurrency(e.target.value))}
                />
              </fieldset>
              <fieldset className="w-full">
                <label className="text-zinc-400 mb-3">
                  * Data final do empréstimo:
                </label>
                <InputDate
                  value={finalPaymentDate}
                  onChange={e => setFinalPaymentDate(dateFormat(e.target.value))}
                />
              </fieldset>
            </div>
          </div>
          <div>
            <p className='text-l text-zinc-400 mb-4 font-bold'>
              Data de emissão
            </p>
            <div className='flex gap-4 mb-3 sm:flex-col sm:gap-6'>
              <fieldset className="w-[50%] sm:w-[100%]">
                <label className="text-zinc-400 mb-3">
                  * Data de emissão do contrato:
                </label>
                <InputDate
                  value={date}
                  onChange={handleDate}
                />
              </fieldset>
            </div>
          </div>
        </form>

        {isClient &&
          <div className="mt-8 flex items-center justify-center w-full gap-6 sm:flex-col sm:gap-3">
            <PDFDownloadLink
              className="w-full flex items-center justify-center"
              fileName={`Contrato - ${name}.pdf`}
              document={
                <PDF
                  address={address}
                  cep={CEP}
                  city={city}
                  state={state}
                  number={number}
                  name={name}
                  cpf={CPF}
                  rg={RG}
                  phone={phone}
                  maritalState={maritalState.name}
                  profession={profession}
                  nationality={nationality}
                  valueLoal={valueLoan}
                  finalPaymentDate={finalPaymentDate}
                  date={date}
                  cityandstateofPedro="Manaus, Amazonas."
                />
              }
            >
              {({ url }) =>
                <div className="w-full flex items-center justify-center gap-3 sm:flex-col">
                  <Link
                    href={String(url)}
                    target="_blank"
                    className="w-full flex items-center justify-center"
                  >
                    <Button onClick={generateContract} title="Conferir contrato" />
                  </Link>
                  <Button title="Baixar contrato" />
                </div>
              }
            </PDFDownloadLink>
          </div>
        }
      </div>
    </main>
  )
}
