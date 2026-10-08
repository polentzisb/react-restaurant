export default function Input({ label, id, handleInput, ...props }) {
  return <div className="form-field"><label htmlFor={id}>{label}</label><input id={id} name={id} onChange={handleInput} {...props} /></div>;
}
