import { useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Input from './input';
import { isContactConfigured, sendMessage } from '../services/messages';
import '../styles/contact.css';

const emptyMessage = { name: '', email: '', message: '' };

export default function Contact() {
  const { state } = useLocation();
  const [values, setValues] = useState({ ...emptyMessage, message: state?.dish ? `Hola, me gustaría consultar por ${state.dish}.` : '' });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const submitting = useRef(false);
  const handleInput = (event) => {
    setValues((previous) => ({ ...previous, [event.target.name]: event.target.value }));
    setStatus(null);
  };
  const saveMessage = async (event) => {
    event.preventDefault();
    if (submitting.current || !isContactConfigured) return;
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setStatus({ type: 'error', message: 'Completa todos los campos con algo más que espacios.' });
      return;
    }
    submitting.current = true;
    setSaving(true);
    setStatus(null);
    try {
      await sendMessage(values);
      setValues(emptyMessage);
      setStatus({ type: 'success', message: '¡Mensaje enviado! Gracias por escribirnos.' });
    } catch {
      setStatus({ type: 'error', message: 'No pudimos enviar tu mensaje. Tus datos siguen aquí; inténtalo de nuevo.' });
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  };
  return (
    <section className="contact-page page-shell" aria-labelledby="contact-title">
      <div className="contact-copy"><span className="eyebrow">CONVERSEMOS</span><h1 id="contact-title">Te leemos.<br /><em>Con gusto.</em></h1><p>¿Una consulta sobre la carta o algo que quieras contarnos? Déjanos un mensaje.</p><div className="contact-note"><span aria-hidden="true">↗</span><div><h2>Una consulta, un primer paso.</h2><p>Este formulario es para consultas. El envío de un mensaje no confirma un pedido ni una reserva.</p></div></div></div>
      <form className="contact-form" onSubmit={saveMessage} aria-busy={saving}>
        <h2>Cuéntanos</h2><p className="form-intro">Todos los campos son obligatorios.</p>
        {!isContactConfigured && <p className="form-notice" role="status">El envío de mensajes no está disponible por el momento.</p>}
        <fieldset disabled={saving}><Input label="Tu nombre" id="name" type="text" autoComplete="name" required maxLength={100} placeholder="¿Cómo te llamas?" value={values.name} handleInput={handleInput} /><Input label="Correo electrónico" id="email" type="email" autoComplete="email" required maxLength={254} placeholder="tu@correo.com" value={values.email} handleInput={handleInput} /><div className="form-field"><label htmlFor="message">Tu mensaje</label><textarea name="message" id="message" required maxLength={2000} rows={5} placeholder="Cuéntanos en qué podemos ayudarte…" value={values.message} onChange={handleInput} /><span className="character-count">{values.message.length}/2000</span></div></fieldset>
        {status && <p className={`form-status ${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>{status.message}</p>}
        <button className="button" type="submit" disabled={saving || !isContactConfigured}>{saving ? 'Enviando…' : 'Enviar mensaje'}<span aria-hidden="true">↗</span></button>
        <p className="privacy-note">Usaremos tu nombre, correo y mensaje para responder a tu consulta.</p>
      </form>
    </section>
  );
}
