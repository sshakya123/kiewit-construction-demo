type InputProps = {
  label: string;
  id: string;
};

export default function Input(props: InputProps) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <br />
      <input type='text' id={props.id} />
    </div>
  );
}
