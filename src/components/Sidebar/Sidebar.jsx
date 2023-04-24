import { useEffect } from "react";
import img from "../../images/ok.svg";
import { NavLink, useLocation } from 'react-router-dom'

const Sidebar = () => {

    const location = useLocation()






    // const num = parseInt(location.pathname.match(/\d+/)[0])

    let num = location.pathname.match(/\d+/)
    num = parseInt(num)



    //Выражение /\d+/ представляет собой регулярное выражение, которое ищет одну или более цифр. Когда это выражение используется в методе match(), он ищет совпадения в строке и возвращает массив найденных значений.


    // Функция проверяющая урл и подставляющая на сайдбар классы
    const checkUrl = (step) => {


        if (num > step) {
            return 'step checked'
        }

        else if (num < step) {
            return 'step no-checked'
        }

        else {
            return 'step'
        }

    }


    return (
        <div className="sidebar">


            <div className="sidebar-title">Создание аккаунта</div>
            <div className="sidebar-description">Заполните все пункты данной формы и нажмите кнопку «Сохранить».</div>

            <div className="sidebar-steps">

                <div className={checkUrl(1)}>
                    <div className="step-number">1</div>
                    <div className="step-text">Общие</div>
                    <img src={img} alt="" />
                </div>
                <div className={checkUrl(2)}>
                    <div className="step-number">2</div>
                    <div className="step-text">Форма собственности</div>
                    <img src={img} alt="" />
                </div>
                <div className={checkUrl(3)}>
                    <div className="step-number">3</div>
                    <div className="step-text">Адрес регистрации</div>
                    <img src={img} alt="" />
                </div>
                <div className={checkUrl(4)}>
                    <div className="step-number">4</div>
                    <div className="step-text">Адрес проживания</div>
                    <img src={img} alt="" />
                </div>
                <div className={checkUrl(5)}>
                    <div className="step-number">5</div>
                    <div className="step-text">Социальные сети</div>
                    <img src={img} alt="" />
                </div>

            </div>


            
            {/* <div>
                <NavLink to="/">Шаг 1</NavLink>
            </div>
            <div>
                <NavLink to="/step/2">Шаг 2</NavLink>
            </div>
            <div>
                <NavLink to="/step/3">Шаг 3</NavLink>
            </div>
            <div>
                <NavLink to="/step/4">Шаг 4</NavLink>
            </div>
            <div>
                <NavLink to="/step/5">Шаг 5</NavLink>
            </div> */}


        </div>
    )
}

export default Sidebar