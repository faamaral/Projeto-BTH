import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import logoImg from '../../assets/logo.svg'
import {FiArrowLeft} from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'

export default function NewIncidens()
{
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    const ongId = localStorage.get('ongId')
    const history = useHistory()

    async function handleNewIncidens(e)
    {
        e.preventDefault()

        const data = {
            title,
            description,
            value,
        }

        try {
            await api.post('incidens', data, {
                headers: {
                    Authorization: ongId,
                }
            })
            history.push('/profile')
        } catch (error) {
            alert("Erro ao cadastrar novo caso")
        }
    }

    return (
        <div className="new-incidens-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva detalhadamente o caso para encontrar o heroi para resolve-lo
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size="16" color="#E02041"/>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncidens}>
                    <input
                        placeholder="Titulo do caso"
                        value = {title}
                        onChange = {e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value = {description}
                        onChange = {e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais (R$)"
                        value = {value}
                        onChange = {e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}