import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const Formulario = () => {
    const form = useRef();
    const [status, setStatus] = useState('');

    const sendEmail = (e) => {
        e.preventDefault();

        const SERVICE_ID = 'service_yz3ja5l';
        const TEMPLATE_ID = 'template_p79e0d1';
        const PUBLIC_KEY = 'BP05L64_VqRHfRJBb';

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY).then((result) => {
            console.log(resultado.text);
            setStatus('Enviado con exito');
            form.current.reset();
        }, (error) => {
            console.log(error.text);
            setStatus('Error al enviar');
        });
        };
{}
        return (
            <div className="form-container">
            <h1>Consultanos</h1>
            <form ref='form' onSubmit={sendEmail} className="contact-form">
            <div className='form-group'>
                <label htmlFor='user_name'>Nombre</label>
                <input type='text' id ='user_name' name='name' required />
            </div>
            <div className='form-group'>
                <label htmlFor="user_email">Email</label>
                <input type='email' id='user_email' name='email' required />
            </div>
            <div className='form-group'>
                <label htmlFor="message">Mensaje</label>    
                <textarea id="message" name='message' rows="3" required></textarea>
            </div>
            <button type="submit">Enviar</button>
            {status && <p className={"status-message ${status.includes('éxito') ? 'success' : 'error'}"}>{status}</p>}
        </form>
    </div>
);
};

export default Formulario;