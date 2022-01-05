import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { FcSearch } from 'react-icons/fc';
import s from './Searchbar.module.css'

export default class Searchbar extends Component {
    state = {
        imageName: '',
    };
    
    onNameChange = ({ currentTarget: { value }}) => {
        this.setState({ imageName: value.toLowerCase() });
    };

    onSubmit = evt => {
        evt.preventDefault();

        if (this.state.imageName.trim() === '') {
        toast.warning('Введите запрос');
        return;
    }

        this.props.onSubmit(this.state.imageName);
        this.setState({ imageName: '' });
  };

    render() {
        const { imageName } = this.state;

        return (
            <header className={s.Searchbar}>
                <form
                onSubmit={this.onSubmit}
                autoComplete="off"
                >
                <input
                className={s.SearchFormInput}        
                type="text"
                autoComplete="off"
                autoFocus
                value={imageName}
                onChange={this.onNameChange}
                />
                <button type="submit" className={s.SearchFormButton}>
                <FcSearch/>
                </button>
                </form>
            </header>
    );
  }
}