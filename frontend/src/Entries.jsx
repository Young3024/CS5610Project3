import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

export default function Entries() {
    const [entries, setEntries] = useState([]);
    const [entryInput, setEntryInput] = useState({
        website: '',
        password: '',
        alphabet: false,
        numerals: false,
        symbols: false,
        length: '',
    });
    const [error, setError] = useState('');

    async function getAllEntries() {
        const response = await axios.get('/api/entry/');
        setEntries(response.data);
    }

    async function deleteEntry(id) {
        await axios.delete(`/api/entry/${id}`);
        await getAllEntries();
    }

    async function createNewEntry() {
        if (!entryInput.website) {
            setError('Please enter a website URL');
            return;
        }
    
        let password = entryInput.password;
        if (!password) {
            let selectedCharset = '';
            if (entryInput.alphabet) selectedCharset += 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (entryInput.numerals) selectedCharset += '0123456789';
            if (entryInput.symbols) selectedCharset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
            if (!selectedCharset || !entryInput.length) {
                setError('Please enter a password or enable at least one checkbox and specify a length');
                return;
            }
            if (entryInput.length<4 || entryInput.length>50){
                setError('Please enter a length between 4 and 50');
                return;
            }
    
            password = '';
            for (let i = 0; i < entryInput.length; i++) {
                password += selectedCharset.charAt(Math.floor(Math.random() * selectedCharset.length));
            }
        }
    
        const response = await axios.post('/api/entry/', { website: entryInput.website, password });
        setEntryInput({
            website: '',
            password: '',
            alphabet: false,
            numerals: false,
            symbols: false,
            length: ''
        });
        setError('');
        await getAllEntries();
    }

    return (
        <div>
            <Header />
            <div>
                <input
                    value={entryInput.website}
                    onChange={(e) => setEntryInput({ ...entryInput, website: e.target.value })}
                    type="text"
                    placeholder="Website URL"
                />
                <input
                    value={entryInput.password}
                    onChange={(e) => setEntryInput({ ...entryInput, password: e.target.value })}
                    type="password"
                    placeholder="Password"
                />
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={entryInput.alphabet}
                            onChange={(e) => setEntryInput({ ...entryInput, alphabet: e.target.checked })}
                        />
                        Alphabet
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={entryInput.numerals}
                            onChange={(e) => setEntryInput({ ...entryInput, numerals: e.target.checked })}
                        />
                        Numerals
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={entryInput.symbols}
                            onChange={(e) => setEntryInput({ ...entryInput, symbols: e.target.checked })}
                        />
                        Symbols
                    </label>
                </div>
                <input
                    value={entryInput.length}
                    onChange={(e) => setEntryInput({ ...entryInput, length: e.target.value })}
                    type="number"
                    placeholder="Length"
                />
                <button onClick={createNewEntry}>Submit</button>
                {error && <div>{error}</div>}
            </div>
            <div>
                {entries.map((entry, index) => (
                    <div key={index}>
                        <div>{entry.website} ----- {entry.password}</div>
                        {/* Include the date of last update here */}
                        <button onClick={() => deleteEntry(entry._id)}>Delete</button>
                    </div>
                ))}
            </div>
            <button onClick={getAllEntries}>Check passwords stored</button>
        </div>
    );
}
