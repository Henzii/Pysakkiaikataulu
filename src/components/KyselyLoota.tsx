import React, { useState, useRef, useEffect } from 'react';

const KyselyLoota = (props: KyselyLootaProps) => {
    const { open, onSubmit, onClose, title, text, placeHolder } = props;
    const [inputValue, setInputValue] = useState('')

    // Viite input tekstilootaan
    const reff = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (reff?.current && open) reff.current.focus();
    }, [open])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
    }
    const handleCancel = () => {
        onClose();
    }

    if (!open) return null;
    return (
        <div className="modal">
            <div className="modal-content">
                <h1>{title}</h1>
                <p>{text}</p>
                <form onSubmit={handleSubmit} data-testid="lomake">
                    <input
                        type="text"
                        ref={reff}
                        placeholder={placeHolder}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        data-testid="tekstikentta"
                    />
                    <div className="modal-buttons">
                        <button type="submit" className="ok-button">Ok</button>
                        <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default KyselyLoota;

export type KyselyLootaProps = {
    open: boolean,
    title: string,
    text?: string,
    placeHolder?: string,
    onClose: () => void,
    onSubmit: (nimi: string) => void
}