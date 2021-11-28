import React, { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Button from '@mui/material/Button';

import { makeStyles, styled } from '@material-ui/styles';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import { TextField } from '@mui/material';

import './App.scss';

const useStyles = styled(TextField)({
  input: { 
      '&input': {
      color: 'red',
      borderColor: 'red',
      }
  }
});

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [salary, setSalary] = React.useState('');
  const [errorMessage, serErrorMessage] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [openlist, setOpenList] = useState(false);

  const StyledTextField = styled(TextField)({
    '&input': {
      border: "1px solid #DFE3E6",
      borderRadius: 3, 
    },
    '&.Mui-error': {
      borderColor: 'red',
      borderWidth: 1,
      borderRadius: 3, 
    },
    '& input:focus + fieldset': {
      border: "1px solid #DFE3E6", 
    },
    '& .MuiOutlinedInput-root': {
      '&:focus-within': {
        borderColor: '#DFE3E6',
      },
      '&:hover fieldset': {
        borderColor: 'black',
        border: '1px solid',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
        borderWidth: 1,
        outline: 'none',
      },
    },
  });
  

  const classes = useStyles

  const handleOpen = () => {
    setModalOpen(!modalOpen);
    setSalary('');
    setOpenList(false);
  };

  const countPay = () => {
    const userSalary = Number(salary) 
    const procent = (userSalary * 12) * 0.13;
    let payForYear = 0
    let lastYearPay = 0
    if (procent >= 260000) {
      return (
        payForYear += 260000
      )
    } else {
      let years = 260000 / procent
      if (Number.isInteger(years)) {
        return (
          (payForYear += procent )*years
        )
      } else {
        const integer = Math.floor(years);
        const balance = years % 1;
        const lastProcent = procent * balance;
        return (
          Math.trunc((lastYearPay += procent) * integer)
          // (lastPay += lastProcent )
        )
      }
    }
  }

  const isOpen = () => {
    if (salary) {
      setOpenList(!openlist);
      countPay()
    } else {
      serErrorMessage(true);
    };
    
  }

  const handleChangeSalary = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSalary(event.target.value);
    serErrorMessage(false);
  },[setSalary]);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    bgcolor: '#fff',
    borderRadius: "30px",
    boxSizing: 'border-box',
    boxShadow: 24,
    pt: 4,
    px: 4,
    pb: 4,
  };//Модалка

  console.log(salary)

  return (
    <div className={`${modalOpen ? "white-bg" : ''} App`}> 
      <Button onClick={handleOpen} className="modal-button">Налоговый вычет</Button>
      <Modal
        open={modalOpen}
        onClose={handleOpen}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        className="modal-window"
      >
        <Box className="box">
          <button className="close" onClick={handleOpen}></button>
          <h2 className="modal-window-title">Налоговый вычет</h2>
          <p className="modal-window-text">
            Используйте налоговый вычет чтобы погасить ипотеку досрочно. Размер налогового вычета составляет не более 13% от своего официального годового дохода.
          </p>
          <div className="modal-window-counter">
            <p className="title">Ваша зарплата в месяц</p>
            <FormControl error={errorMessage} className="input-window"> 
              <StyledTextField
                autoFocus={true}
                error={errorMessage}
                required
                variant="outlined"
                placeholder="Введите данные"
                id="component-outlined"
                className="input"
                value={salary}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeSalary(event)}
                type='number'
              />
              {errorMessage
                ? <FormHelperText id="component-error-text">Поле обязательно для заполнения</FormHelperText>
                :""
              }
            </FormControl>
          </div>
          <div className="modal-window-accordion">
            <div className="count" onClick={isOpen}>
              Рассчитать
            </div>
            <div className={`count-items ${openlist && !errorMessage ? 'open' : ''}`}>
              <div className="title">Итого можете внести в качестве досрочных:</div>
              <div className="items">
                <div className="each-item"> 
                  <input className="check" type="checkbox" id="1"/>
                  <label className="label" >26 000 рублей <div className="year">в 4-ый год</div></label>
                </div>
              </div>
              <div className="items">
                <div className="each-item"> 
                  <input className="check" type="checkbox" id="1"/>
                  <label className="label" >26 000 рублей <div className="year">в 4-ый год</div></label>
                </div>
              </div>
              <div className="items">
                <div className="each-item"> 
                  <input className="check" type="checkbox" id="1"/>
                  <label className="label" >26 000 рублей <div className="year">в 4-ый год</div></label>
                </div>
              </div>
              <div className="items">
                <div className="each-item"> 
                  <input className="check" type="checkbox" id="1"/>
                  <label className="label" >26 000 рублей <div className="year">в 4-ый год</div></label>
                </div>
              </div>
            </div>
          </div>
          <div className="choise">
            <div className="title">Что уменьшаем?</div>
            <div className="radio">
              <button className="radio-button">Платёж</button>
              <button className="radio-button" disabled={true}>Срок</button>
            </div> 
          </div>
          <button className="submitBtn" disabled={!openlist} onClick={handleOpen}>Добавить</button>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
