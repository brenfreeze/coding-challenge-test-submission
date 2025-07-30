import Button from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import styles from "./AddressSearch.module.css";

interface AddressSearchProps {
  handleAddressSubmit: (e: React.ChangeEvent<HTMLFormElement>) => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  state: {
    postCode: string;
    houseNumber: string;
  };
  loading: boolean;
}

export default function AddressSearch({
  handleAddressSubmit,
  handleChange,
  state,
  loading,
}: AddressSearchProps) {
  return (
    <form onSubmit={handleAddressSubmit}>
      <fieldset>
        <legend>🏠 Find an address</legend>
        <div className={styles.formRow}>
          <InputText
            name="postCode"
            onChange={handleChange}
            placeholder="Post Code"
            value={state.postCode}
          />
        </div>
        <div className={styles.formRow}>
          <InputText
            name="houseNumber"
            onChange={handleChange}
            value={state.houseNumber}
            placeholder="House number"
          />
        </div>
        <Button type="submit" loading={loading}>
          Find
        </Button>
      </fieldset>
    </form>
  );
}
