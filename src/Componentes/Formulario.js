import React, {useEffect, useState}from 'react';
import styled from '@emotion/styled'
import useMoneda from '../Hooks/useMoneda'
import useCriptomoneda from '../Hooks/useCriptomoneda'
import Axios from 'axios'
import Error from '../Componentes/Error'

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #326AC0;
        cursor:pointer;
    }
`
const Formulario = ({guardarCriptomoneda, guardarMoneda,guardarCargando,guardarResultado}) => {

    //state del listado de criptomonedas
    const [ listacripto, guardarCriptoonedas ] = useState([])
    const [error, guardarError] = useState(false)


    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar Estadounidense'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'},
        {codigo: 'ARS', nombre: 'Peso Argentino'},
        {codigo: 'AUD', nombre: 'Dolar Austraiano'},
        {codigo: 'BRL', nombre: 'Real brasileño'},
        {codigo: 'CAD', nombre: 'Dolar canadiense'},
        {codigo: 'CLP', nombre: 'Peso Chileno'},
        {codigo: 'COP', nombre: 'Peso Colombiano'},
    ]



    // utilizar useMoneda
    const [moneda, SelecMoneda] = useMoneda('Elige tu moneda', '', MONEDAS);
    
    // utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Eligue tu Criptomoneda', '', listacripto)

    //llamado a la API
    useEffect ( ()=>{

        const cunsultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            
            const resultados = await Axios.get(url);

            guardarCriptoonedas(resultados.data.Data);
        }
        cunsultarAPI()
    },[])

    //cuando el usuario hace submit
    const cotizarMoneda = e => {
        guardarCargando(true)

        e.preventDefault();

        console.log('se hizo submit')
  

        //validar si ambos campos estan llenos
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            guardarCargando(false);
            guardarResultado({})
            return;
        }

        // pasar los datos al componente proncipal
        guardarError(false)
        guardarMoneda(moneda)
        guardarCriptomoneda(criptomoneda)

    }

    return ( 
        <form
        onSubmit={cotizarMoneda}
        >   
        {error ? <Error mensaje='Ambos campos son obligatorio'/> : null }
            <SelecMoneda/>
            <SelectCripto/>
            <Boton
                type='submit'
                value='calcular'
            />

        </form>
     );
}
 
export default Formulario;