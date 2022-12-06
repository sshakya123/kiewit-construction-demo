type InputProps = {
  label: string;
  id: string;
  value: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'date';
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  id,
  value,
  type = 'text',
  error,
  onChange,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input type={type} onChange={onChange} id={id} value={value} />
      <div>{error}</div>
    </div>
  );
}

// Alternative method for declaring default props
// Input.defaultProps = {
//   type: "text",
// };
