import React, {useEffect, useState} from 'react'
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'

export default function Profile() {
    const [incidens, setIncidens] = useState([])
    const history = useHistory()
    const ongId = localStorage.getItem('ongId') 
    const ongNome = localStorage.getItem('ongNome')

        useEffect(() => {
            api.get('profile', {
                headers: {
                    Authorizations: ongId,
                }
            }).then(response => {
                setIncidens(response.data)
            })
        } ,[ongId]);

        async function handleDeleteIncidens(id)
        {
            try {
                await api.delete(`incidens/${id}`, {
                    headers: { 
                    Authorizations: ongId,
                    }
                })
                setIncidens(incidens.filter(incident => incident.id !== id))
            } catch (error) {
                alert('Erro ao deletar')
            }
        }

        function handleLogout()
        {
            localStorage.clear()
            history.push('/')
        }
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, Apad</span>

                <Link className="button" to="/incidens/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            
            <ul>
                {incidens.map(incident => (
                    <li key={incident.id}>
                    <strong>Caso:</strong>
                    <p>{incident.title}</p>

                    <strong>Descrição></strong>
                    <p>{incident.description}</p>

                    <strong>Valor:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'} ).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncidens(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
                
                
            </ul>
        </div>
    );
}