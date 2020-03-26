import React, {useState} from 'react';
import './styles.css';
import {Link, useHistory} from 'react-router-dom'
import heroesImg from '../../assets/heroes.png'
import logoImg from '../../assets/logo.svg'
import {FiLogIn, FiAlertOctagon} from 'react-icons/fi'
import api from '../../services/api'

export default function Logon()
{
    const [id, setId] = useState('')
    const history = useHistory()
    async function handleLogin(e)
    {
        e.preventDefault()
        try {
            const response = await api.post('sessions', {id})
            localStorage.setItem('ongId', id)
            localStorage.setItem('ongNome', response.data.nome)
            history.push('/profile')
            //console.log(response.data.nome)
        } catch (error) {
            alert('falha no login')
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input 
                        placeholder="Sua ID"
                        value = {id}
                        onChange = {e => setId(e.target.value)}
                    />
                    <button className= "button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size="16" color="#E02041"/>
                        não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt= "Heroes"/>
        </div>
        
    );
}
