type InputProps = {
  label: string;
  id: string;
  value: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'date';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({
  label,
  id,
  value,
  type = 'text',
  onChange,
}: InputProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <br />
      <input type={type} onChange={onChange} id={id} value={value} />
    </div>
  );
}

// Alternative method for declaring default props
// Input.defaultProps = {
//   type: "text",
// };
