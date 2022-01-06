import { useState } from 'react';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css'

export default function Searchbar ({onSubmit}) {
    const [imageName, setImageName] = useState('')

    const onNameChange = evt => {
    setImageName(evt.currentTarget.value.toLowerCase());
    };

    const onSubmitForm = evt => {
        evt.preventDefault();

        if (imageName.trim() === '') {
        toast.warning('Введите запрос');
        return;
    }

        onSubmit(imageName);
        setImageName('');
  };

  return (
    <header className={s.Searchbar}>
        <form
        onSubmit={onSubmitForm}
        autoComplete="off"
        >
        <input
        className={s.SearchFormInput}        
        type="text"
        autoComplete="off"
        autoFocus
        value={imageName}
        onChange={onNameChange}
        />
        <button type="submit" className={s.SearchFormButton}>
        <FcSearch/>
        </button>
        </form>
    </header>
  )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

