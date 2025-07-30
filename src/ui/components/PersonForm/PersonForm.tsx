import Button from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import styles from "./PersonForm.module.css";

interface PersonFormProps {
  handlePersonSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state: {
    firstName: string;
    lastName: string;
  };
}

export default function PersonForm({
  handlePersonSubmit,
  handleChange,
  state,
}: PersonFormProps) {
  return (
    <form onSubmit={handlePersonSubmit}>
      <fieldset>
        <legend>✏️ Add personal info to address</legend>
        <div className={styles.formRow}>
          <InputText
            name="firstName"
            placeholder="First name"
            onChange={handleChange}
            value={state.firstName}
          />
        </div>
        <div className={styles.formRow}>
          <InputText
            name="lastName"
            placeholder="Last name"
            onChange={handleChange}
            value={state.lastName}
          />
        </div>
        <Button type="submit">Save</Button>
      </fieldset>
    </form>
  );
}
