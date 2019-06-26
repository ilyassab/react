import React from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import './styles.css';

/**
    Допиши конвертер валют.
    - Если пользователь ввел значение в рублях, то количество евро обновляется согласно курсу
    - Если пользователь ввел значение в евро, то количество рублей обновляется согласно курсу
 */

const RUBLES_IN_ONE_EURO = 70;

class MoneyConverter extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rub: 0,
      eur: 0
    };
  }

  render() {
    return (
      <div className="root">
        <div className="form">
          <h2>Конвертер валют</h2>
          <div>
            <span>&#8381;</span>
            <Money value={this.state.rub} change={this.handleChangeRub}/>
            &mdash;
            <Money value={this.state.eur} change={this.handleChangeEur}/>
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }


  handleChangeRub = event => {
    const value = extractNumberString(event.target.value);
    this.setState({
      eur: value/70,
      rub: value
    })
  };

  handleChangeEur = event => {
    const value = extractNumberString(event.target.value);
    this.setState({
      eur: value,
      rub: value*70
    })
  };

}

class Money extends React.Component {
  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        onChange={this.props.change}
      />
    );
  }
}

Money.propTypes = {
  value: PropTypes.number,
  change: PropTypes.func
};

function extractNumberString(value) {
  const str = value.replace(/^0+/g, '').replace(/[^\.0-9]/g, '');
  const parts = str.split('.');
  return parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str;
}

ReactDom.render(<MoneyConverter />, document.getElementById('app'));

/**
    Подсказки:
    - Сейчас каждый компонент Money хранит свое значение в собственном состоянии,
      чтобы конвертер работал, нужно уметь обновлять значение извне, поэтому нужно получать его из props.
    - В MoneyConverter наоборот надо создать состояние, которое будет хранить значения в обеих валютах.
      Таким образом ты сделаешь Lift State Up.
    - Заметь, что компонент Money теперь не содержит состояние и его можно переделать в функциональный компонент.
 */
