import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { useNavigate } from 'react-router-dom'
import icon from '../../images/icon-step-1.svg'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addStep1 } from '../../redux/formSlice'


const Step1 = () => {


    // Навигация
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const step1 = useSelector(state => state.forms.step1)




    // Календарь
    const [date, setDate] = useState(new Date())
    const [showCalendar, setShowCalendar] = useState(false)
    const handleDateChange = (date) => {
        // console.log(date.getDate())
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
        data.dateOfBirth = formatDate(date)
        // console.log(data)
        dispatch(addStep1(data))
        navigate('/step/2')
    }



    // Устанавливаем начальное значение элементам в форме, чтобы при нажатии кнопки назад даннык оставались
    useEffect(() => {
        setValue('surname', step1.surname)
        setValue('name', step1.name)
        setValue('patronymic', step1.patronymic)
        setValue('city', step1.city)
        setValue('citizenship', step1.citizenship)
        setValue('gender', step1.gender)
        setValue('dateOfBirth', step1.dateOfBirth)
        setValue('placeOfBirth', step1.placeOfBirth)
    }, [step1])

    


    return (
        <div>


            <div className='page-icon'>
                <img src={icon} alt="" />
            </div>
            <div className='page-title'>Общие</div>
            <div className='page-description'>Введите свои персональные данные.</div>


            <form className='page-form' onSubmit={handleSubmit(sendForm)}>

                <div className="form-block w50">
                    <label className='form-label'>Фамилия*</label>
                    <input className='form-control' type="text" placeholder='Васильев' {...register('surname', { required: true })} />
                    {errors.surname && <span className="form-error">Данное поле обязательно для заполнения</span>}
                </div>

                <div className="form-block w50">
                    <label className='form-label'>Имя*</label>
                    <input className='form-control' type="text" placeholder='Иван' {...register('name', { required: true })} />
                    {errors.name && <span className="form-error">Данное поле обязательно для заполнения</span>}
                </div>

                <div className="form-block w50">
                    <label className='form-label'>Отчество*</label>
                    <input className='form-control' type="text" placeholder='Сергеевич' {...register('patronymic', { required: true })} />
                    {errors.patronymic && <span className="form-error">Данное поле обязательно для заполнения</span>}
                </div>

                <div className="form-block w50">
                    <label className='form-label'>Основной город*</label>
                    <select className='form-control' {...register('city', { required: true })}>
                        <option value="vrn">Воронеж</option>
                        <option value="msk">Москва</option>
                        <option value="piter">Питер</option>
                    </select>
                    {errors.city && <span className="form-error">Данное поле обязательно для заполнения</span>}
                </div>


                <div className="form-block w50">
                    <label className='form-label'>Гражданство*</label>
                    <select className='form-control' {...register('citizenship', { required: true })}>
                        <option value="russia">Россия</option>
                        <option value="belarus">Беларусь</option>
                        <option value="ukraine">Украина</option>
                    </select>
                    {errors.citizenship && <span className="form-error">Данное поле обязательно для заполнения</span>}
                </div>


                <div className="form-block w25">
                    <label className='form-label'>Пол*</label>
                    <div className="radio-flex">
                        <label className='custom-radio'>
                            <input className="custom-radio-input" type="radio" value="man" {...register('gender', { required: true })} />
                            <div className='custom-radio-img'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 2.8125C10.663 2.8125 11.2989 3.07589 11.7678 3.54473C12.2366 4.01357 12.5 4.64946 12.5 5.3125C12.5 5.97554 12.2366 6.61143 11.7678 7.08027C11.2989 7.54911 10.663 7.8125 10 7.8125C9.33696 7.8125 8.70107 7.54911 8.23223 7.08027C7.76339 6.61143 7.5 5.97554 7.5 5.3125C7.5 4.64946 7.76339 4.01357 8.23223 3.54473C8.70107 3.07589 9.33696 2.8125 10 2.8125ZM8.125 9.0625H11.875C12.538 9.0625 13.1739 9.32589 13.6428 9.79473C14.1116 10.2636 14.375 10.8995 14.375 11.5625V17.1875H12.5H7.5H5.625V11.5625C5.625 10.8995 5.88839 10.2636 6.35723 9.79473C6.82607 9.32589 7.46196 9.0625 8.125 9.0625Z" fill="#5795FD" />
                                </svg>
                                <div>М</div>
                            </div>
                        </label>
                        <label className='custom-radio'>
                            <input className="custom-radio-input" type="radio" value="woman" {...register('gender', { required: true })} />
                            <div className='custom-radio-img'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.7678 3.54473C11.2989 3.07589 10.663 2.8125 10 2.8125C9.33696 2.8125 8.70107 3.07589 8.23223 3.54473C7.76339 4.01357 7.5 4.64946 7.5 5.3125C7.5 5.97554 7.76339 6.61143 8.23223 7.08027C8.70107 7.54911 9.33696 7.8125 10 7.8125C10.663 7.8125 11.2989 7.54911 11.7678 7.08027C12.2366 6.61143 12.5 5.97554 12.5 5.3125C12.5 4.64946 12.2366 4.01357 11.7678 3.54473Z" fill="#B8B8B8" />
                                    <path d="M5.625 17.1875H8.125H11.875H14.375L12.3875 10.825C12.075 9.8 11.125 9.0625 10 9.0625C8.875 9.0625 7.925 9.8 7.6125 10.825L5.625 17.1875Z" fill="#B8B8B8" />
                                </svg>
                                <div>Ж</div>
                            </div>
                        </label>
                    </div>
                    {errors.gender && <span className="form-error">Данное поле обязательно для заполнения</span>}
                </div>


               
                <div className="form-block w25">
                    <label className='form-label'>Дата рождения*</label>
                    <input
                        className='form-control date'
                        placeholder='21.03.1995'
                        type="text"
                        value={formatDate(date)}
                        onClick={() => setShowCalendar(true)}
                        {...register('dateOfBirth', { required: true })}
                    />
                    {showCalendar && (
                        <Calendar
                            onChange={handleDateChange}
                            value={date}
                            onClose={() => setShowCalendar(false)}
                        />
                    )}
                </div>

                
                <div className="form-block w100">
                    <label className='form-label'>Место рождения (как указано в паспорте)*</label>
                    <input className='form-control' type="text" placeholder='Введите наименование региона и населенного пункта' {...register('placeOfBirth', { required: true })} />
                    {errors.placeOfBirth && <span className="form-error">Данное поле обязательно для заполнения</span>}
                </div>


                <div className='form-bottom w100'>
                    <div className="button-back">
                        <div>Отмена</div>
                    </div>
                    <button type="submit" className="button-next">Далее</button>
                </div>

            </form>






        </div>
    )
}

export default Step1