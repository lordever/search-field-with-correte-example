import React, {useState} from 'react';
import './App.css';
import DropdownTextInput, {Item} from "./dropdown-text-input.component";
import {Button} from "@mui/material";

const App: React.FC = () => {
    const [disabledButton, setDisabledButton] = useState<boolean>(true);
    const [items, setItems] = useState<Item[]>([
        {text: 'Jackson st. , buildNumber1', corretteIndex: 12},
        {text: 'Mayson st. , buildNumber2', corretteIndex: 11},
    ]);

    const fetchItems = (searchText: string) => {
        console.log('Fetching items for:', searchText);
        // Simulate a network request
        setTimeout(() => {
            setItems([
                {text: searchText, corretteIndex: 7},
                {text: searchText + ' room2', addressId: "123"},
            ]);
        }, 1500); // Simulate network delay
    };

    const handleItemSelect = (item: Item) => {
        if (item.addressId) {
            setDisabledButton(false);
            return;
        }

        setDisabledButton(true);
    }

    return (
        <div className="container">
            <DropdownTextInput onItemSelect={handleItemSelect} items={items} fetchItems={fetchItems}/>
            <Button disabled={disabledButton} className={"button"} variant="contained" color="success">Submit</Button>
        </div>
    );
};

export default App;
