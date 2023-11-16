import React, {useState, useRef, useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

export type Item = {
    text: string;
    corretteIndex?: number | null;
    addressId?: string;
};

type Props = {
    items: Item[];
    fetchItems: (searchText: string) => void; // Function to trigger fetching new items
    onItemSelect: (item: Item) => void; // Callback for when an item is selected
};

const DropdownTextInput: React.FC<Props> = ({items, fetchItems, onItemSelect}) => {
    const [inputValue, setInputValue] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const prevItemsRef = useRef<Item[]>();

    useEffect(() => {
        if (prevItemsRef.current !== items) {
            setLoading(false);
            setOpen(true);
            prevItemsRef.current = items;
        }
    }, [items]);

    const handleInputChange = (event: React.ChangeEvent<{}>, value: string | null) => {
        setInputValue(value || '');

        if (value && !items.some(item => item.text === value)) {
            setLoading(true);
            fetchItems(value);
        }

        const selectedItem = items.find(item => item.text === value);
        if (selectedItem && inputRef.current) {
            // Set cursor position after the component updates
            setTimeout(() => {
                if (selectedItem.corretteIndex !== undefined) {
                    inputRef.current!.focus();
                    inputRef.current!.setSelectionRange(selectedItem.corretteIndex, selectedItem.corretteIndex);
                }
            }, 0);
        }
    };

    const handleDropdownChange = (event: React.ChangeEvent<{}>, value: string | null) => {
        const selectedItem = items.find(item => item.text === value);
        if (selectedItem) {
            onItemSelect(selectedItem); // Call the callback with the selected item
        }
    };

    return (
        <Autocomplete
            freeSolo
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            options={items.map((item) => item.text)}
            loading={loading}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select or address"
                    variant="outlined"
                    inputRef={inputRef}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={handleDropdownChange}
        />
    );
};

export default DropdownTextInput;
