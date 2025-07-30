import React from "react";

import Address from "@/components/Address/Address";
import AddressBook from "@/components/AddressBook/AddressBook";
import Button from "@/components/Button/Button";
import InputText from "@/components/InputText/InputText";
import Radio from "@/components/Radio/Radio";
import Section from "@/components/Section/Section";
import useAddressBook from "@/hooks/useAddressBook";

import styles from "./App.module.css";
import { Address as AddressType } from "./types";
import useForm from "@/hooks/useForm";
import AddressSearch from "@/components/AddressSearch/AddressSearch";
import PersonForm from "@/components/PersonForm/PersonForm";

function App() {
  const { state, handleChange, reset } = useForm({
    initialState: {
      postCode: "",
      houseNumber: "",
      firstName: "",
      lastName: "",
      selectedAddress: "",
    },
  });

  /**
   * Results states
  */
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<undefined | string>(undefined);
  const [addresses, setAddresses] = React.useState<AddressType[]>([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();

  const handleAddressSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { postCode, houseNumber } = state;

    if (!postCode || !houseNumber) {
      setError("Post code and house number are required");
      return;
    }

    setAddresses([]);
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/getAddresses?postcode=${postCode}&streetnumber=${houseNumber}`
    );
    const data = await response.json();

    if (data.status === "error") {
      setError(data.errormessage);
      setLoading(false);
      return;
    }

    setAddresses(data.details.map((address: AddressType) => ({ ...address, id: addressToString(address) })));
    setError(undefined);
    setLoading(false);
  };

  const handlePersonSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!state.firstName || !state.lastName) {
      setError("First name and last name fields mandatory!");
      return;
    }

    if (!state.selectedAddress || !addresses.length) {
      setError(
        "No address selected, try to select an address or find one if you haven't"
      );
      return;
    }

    const foundAddress = addresses.find(
      (address) => address.id === state.selectedAddress
    );

    if (!foundAddress) {
      setError("Selected address not found");
      return;
    }

    addAddress({ ...foundAddress, firstName: state.firstName, lastName: state.lastName });
  };

  const addressToString = (address: AddressType) => {
    return `${address.street} ${address.houseNumber}, ${address.postcode}, ${address.city}`;
  };

  const handleClearAllFields = () => {
    reset();
    setAddresses([]);
    setError(undefined);
  };

  return (
    <main>
      <Section>
        <h1>
          Create your own address book!
          <br />
          <small>
            Enter an address by postcode add personal info and done! 👏
          </small>
        </h1>
        <AddressSearch
          handleAddressSubmit={handleAddressSubmit}
          handleChange={handleChange}
          state={state}
          loading={loading}
        /> 
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleChange}
              >
                <Address {...address} />
              </Radio>
            );
          })}
        {state.selectedAddress && (
          <PersonForm
            handlePersonSubmit={handlePersonSubmit}
            handleChange={handleChange}
            state={state}
          />
        )}

        {/* TODO: Create an <ErrorMessage /> component for displaying an error message */}
        {error && <div className="error">{error}</div>}

        <Button type="button" variant="secondary" onClick={handleClearAllFields}>Clear all fields</Button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
