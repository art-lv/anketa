import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { useNavigate } from 'react-router-dom'
import icon from '../../images/icon-step-4.svg'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addStep4 } from '../../redux/formSlice'


const Step4 = () => {


    // Навигация
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const step4 = useSelector(state => state.forms.step4)




    // Календарь
    const [date, setDate] = useState(new Date())
    const [showCalendar, setShowCalendar] = useState(false)
    const handleDateChange = (date) => {
        setDate(date)
        setShowCalendar(false)
    }
    function formatDate(dateString) {
        const date = new Date(dateString)
        // Метод padStart используется для добавления ведущих нулей, если день или месяц состоят из одной цифры.
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear().toString()
        return `${day}.${month}.${year}`
    }



    // Реакт хук форма
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const sendForm = (data) => {

        data.registrationDate = formatDate(date)

        //console.log (data)

        dispatch(addStep4(data))
        navigate('/step/5')
    }



    // Устанавливаем начальное значение элементам в форме, чтобы при нажатии кнопки назад даннык оставались
    useEffect(() => {
        setValue('country', step4.country)
        setValue('region', step4.region)
        setValue('city', step4.city)
        setValue('street', step4.street)
        setValue('house', step4.house)
        setValue('apartment', step4.apartment)
        setValue('registrationDate', step4.registrationDate)
    }, [step4])



    const [myApartment, setMyApartment] = useState(false)
    // Нет квартиры
    const noApartment = (e) => {
        setMyApartment(e.target.checked)
    }

    const [addressesMatch, setAddressesMatch] = useState(false)
    // Адреса совпадают
    const addressesMatchCheck = (e) => {
        setAddressesMatch(e.target.checked)
    }

    

    return (
        <div>


            <div className='page-icon'>
                <img src={icon} alt="" />
            </div>
            <div className='page-title'>Адрес проживания</div>
            <div className='page-description'>Введите свой действуйющий адрес проживания.</div>


            <form className='page-form' onSubmit={handleSubmit(sendForm)}>

                <div className="form-block w75">
                    <label className="form-checkbox">
                        <input {...register('match')} onInput={(e) => {(addressesMatchCheck(e))}} type="checkbox" name="noContract" />
                        <span>Адрес регистрации и фактического проживания совпадают</span>
                    </label>
                </div>

                <div className="form-block w50">
                    <label className='form-label'>Страна*</label>
                    <select className='form-control' {...register('country', { required: !addressesMatch })}>
                        <option value="russia">Россия</option>
                        <option value="belarus">Беларусь</option>
                        <option value="ukraine">Украина</option>
                    </select>
                    {errors.country && addressesMatch === false ? <span className="form-error">Данное поле обязательно для заполнения</span> : null}
                </div>


                <div className="form-block w50">
                    <label className='form-label'>Регион*</label>
                    <select className='form-control' {...register('region', { required: !addressesMatch })}>
                        <option value="russia">Воронеж</option>
                        <option value="belarus">Москва</option>
                        <option value="ukraine">Питер</option>
                    </select>
                    {errors.region && addressesMatch === false ?<span className="form-error">Данное поле обязательно для заполнения</span> : null}
                </div>


                <div className="form-block w50">
                    <label className='form-label'>Город / Населенный пункт*</label>
                    <input className='form-control' type="text" placeholder='Введите населенный пункт' {...register('city', { required: !addressesMatch })} />
                    {errors.city && addressesMatch === false ?<span className="form-error">Данное поле обязательно для заполнения</span> : null}
                </div>


                <div className="form-block w50">
                    <label className='form-label'>Улица*</label>
                    <input className='form-control' type="text" placeholder='Введите улицу' {...register('street', { required: !addressesMatch })} />
                    {errors.street && addressesMatch === false ?<span className="form-error">Данное поле обязательно для заполнения</span> : null}
                </div>


                <div className="form-block w12">
                    <label className='form-label'>Дом*</label>
                    <input className='form-control' type="text" placeholder='0' {...register('house', { required: !addressesMatch })} />
                    {errors.house && addressesMatch === false ? <span className="form-error">Данное поле обязательно для заполнения</span> : null}
                </div>



                <div className="form-block w12">
                    <label className='form-label'>Квартира*</label>
                    <input className='form-control' type="text" placeholder='0' {...register('apartment', { required: !addressesMatch })} />
                    {errors.apartment && addressesMatch === false ? <span className="form-error">Данное поле обязательно для заполнения</span> : null}
                </div>


                <div className="form-block w25">
                    <label className="form-checkbox">
                        <input onChange={(e) => { (noApartment(e)) }} type="checkbox" name="noContract" />
                        <span>Нет квартиры</span>
                    </label>
                </div>



                <div className="form-block w25">
                    <label className='form-label'>Дата прописки*</label>
                    <input
                        className='form-control date'
                        placeholder='21.03.1995'
                        type="text"
                        value={formatDate(date)}
                        onClick={() => setShowCalendar(true)}
                        {...register('registrationDate', { required: !addressesMatch })}
                    />
                    {showCalendar && (
                        <Calendar
                            onChange={handleDateChange}
                            value={date}
                            onClose={() => setShowCalendar(false)}
                        />
                    )}
                </div>



                <div className='form-bottom w100'>
                    <div onClick={() => navigate(-1)} className="button-back">
                        <div>Назад</div>
                    </div>
                    <button type="submit" className="button-next">Далее</button>
                </div>



            </form>





        </div>
    )
}

export default Step4