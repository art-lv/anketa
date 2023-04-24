import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { useNavigate } from 'react-router-dom'
import icon from '../../images/icon-step-2.svg'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { addStep2 } from '../../redux/formSlice'
import Dropzone from "../dropzone/Dropzone"
import axios from "axios"
import InputMask from 'react-input-mask';



const Step2 = () => {



    // При вводе отправляем введенные в инпут данные
    const handleInputChange = (event) => {
        const value = event.target.value
        axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party', { query: value }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Token 2ea5c8734f9c03caabd6f934e642c706b29be35e',
            },
        })
            .then((response) => {
                const data = response.data
                if (data.suggestions.length > 0) {
                    const suggestion = data.suggestions[0].data

                    setValue('fullName', suggestion.name.full_with_opf)
                    setValue('shortName', suggestion.name.short_with_opf)
                    setValue('dateOfRegistration', suggestion.state.registration_date)
                    setValue('ogrn', suggestion.ogrn)
                    
                }
            })
            .catch((error) => {
                console.error(error)
            })
    }



    // Навигация
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const step2 = useSelector(state => state.forms.step2)




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




    // Ошибки загруженных картинок
    const [errorInn, setErrorInn] = useState(null)
    const [errorOrgnip, setErrorOrgnip] = useState(null)
    const [errorRent, setErrorRent] = useState(null)
    const [errorEgrip, setErrorEgrip] = useState(null)

    const [errorInnOOO, setErrorInnOOO] = useState(null)
    const [errorOgrn, setErrorOgrn] = useState(null)




    // Загрузка картинки (Коллбеки)
    const [inn, setInn] = useState(null)
    const updateInn = (inn) => {
        setInn(inn)
        // Уберем ошибку
        setErrorInn(false)
    }
    const [orgnip, setOrgnip] = useState(null)
    const updateOrgnip = (orgnip) => {
        setOrgnip(orgnip)
        setErrorOrgnip(false)
    }
    const [rent, setRent] = useState(null)
    const updateRent = (rent) => {
        setRent(rent)
        setErrorRent(false)
    }
    const [egrip, setEgrip] = useState(null)
    const updateEgrip = (egrip) => {
        setEgrip(egrip)
        setErrorEgrip(false)
    }


    const [innOOO, setInnOOO] = useState(null)
    const updateInnOOO = (innOOO) => {
        setInnOOO(innOOO)
        setErrorInnOOO(false)
    }
    const [ogrn, setOgrn] = useState(null)
    const updateOgrn = (ogrn) => {
        setOgrn(ogrn)
        setErrorOgrn(false)
    }




    // Отправка формы
    const sendForm = (data) => {


        if (activity === 'un') {
            // Покажем ошибки
            if (inn === null) {
                setErrorInn(true)
                return
            }
            if (orgnip === null) {
                setErrorOrgnip(true)
                return
            }
            if (rent === null && data.noContract === false) {
                setErrorRent(true)
                return
            }
            if (egrip === null) {
                setErrorEgrip(true)
                return
            }
        }

        if (activity === 'ooo') {
            // Покажем ошибки
            if (innOOO === null) {
                setErrorInnOOO(true)
                return
            }

            if (ogrn === null) {
                setErrorOgrn(true)
                return
            }
        }





        if (activity === 'un') {
            // Запишем данные всех картинок
            data.innImg = inn
            data.orgnipImg = orgnip
            data.rentImg = rent
            data.egripImg = egrip
        }


        if (activity === 'ooo') {
            // Запишем данные всех картинок
            data.innOOOImg = innOOO
            data.ogrnImg = ogrn
        }



        // Запишем дату
        data.dateOfRegistration = formatDate(date)


        // console.log(data)
        dispatch(addStep2(data))
        navigate('/step/3')

    }


    // Устанавливаем начальное значение элементам в форме, чтобы при нажатии кнопки назад даннык оставались
    useEffect(() => {
        setValue('selectedActivity', step2.selectedActivity)
        setValue('inn', step2.inn)
        setValue('ogrn', step2.ogrn)
        setValue('dateOfRegistration', step2.dateOfRegistration)

        setValue('fullName', step2.fullName)
        setValue('shortName', step2.shortName)

    }, [step2])


    // Выбор инн или ооо, в зависимости от них показываем разные блоки
    const [activity, setActivity] = useState(step2.selectedActivity)
    const choiceOfActivity = (e) => {
        setActivity(e.target.value)
    }



    const [contract, setContract] = useState(false)
    // Нет договора
    const noContract = (e) => {
        setContract(e.target.checked)
    }
















    return (
        <div>




            <div className='page-icon'>
                <img src={icon} alt="" />
            </div>
            <div className='page-title'>Форма собственности</div>
            <div className='page-description'>Выберите форму собственности и заполните данные</div>




            <form className='page-form' onSubmit={handleSubmit(sendForm)}>




                <div className="form-block w75">
                    <label className='form-label'>Вид деятельности*</label>
                    <select className='form-control'
                        onClick={(e) => { choiceOfActivity(e) }}
                        {...register('selectedActivity', { required: true })}>
                        <option value="">Выбрать</option>
                        <option value="un">Индивидуальный предприниматель (ИП)</option>
                        <option value="ooo">Общество с ограниченной ответственностью (ООО)</option>
                    </select>
                </div>



                {activity === 'un' &&
                    <div className='page-flex'>


                        <div className="form-block w25">
                            <label className='form-label'>ИНН*</label>
                            <input className='form-control' type="text" placeholder='хххххххххх' {...register('inn', { required: true })} />
                            {errors.inn && <span className="form-error">Данное поле обязательно для заполнения</span>}
                        </div>


                        <div className="form-block w50">
                            <label className='form-label'>Скан ИНН*</label>
                            <Dropzone updateData={updateInn} />
                            {errorInn && <span className="form-error">Данное поле обязательно для заполнения</span>}
                        </div>






                        <div className="form-block w25">
                            <label className='form-label'>Дата регистрации*</label>
                            <input
                                className='form-control date'
                                placeholder='дд.мм.гггг'
                                type="text"
                                value={formatDate(date)}
                                onClick={() => setShowCalendar(true)}
                                {...register('dateOfRegistration', { required: true })}
                            />
                            {showCalendar && (
                                <Calendar
                                    onChange={handleDateChange}
                                    value={date}
                                    onClose={() => setShowCalendar(false)}
                                />
                            )}
                        </div>



                        <div className="form-block w50">
                            <label className='form-label'>ОГРНИП*</label>
                            <input className='form-control' type="text" placeholder='ххххххххххххххх' {...register('ogrn', { required: true })} />
                            {errors.ogrn && <span className="form-error">Данное поле обязательно для заполнения</span>}
                        </div>



                        <div className="form-block w50">
                            <label className='form-label'>Скан ОГРНИП*</label>
                            <Dropzone updateData={updateOrgnip} />
                            {errorOrgnip && <span className="form-error">Данное поле обязательно для заполнения</span>}
                        </div>







                        <div className="form-block w50">
                            <label className='form-label'>Скан договора аренды помещения (офиса)</label>
                            <Dropzone updateData={updateRent} />

                            {errorRent === true && contract === false ? <span className="form-error">Данное поле обязательно для заполнения</span> : null}

                            <label className="form-checkbox">
                                <input type="checkbox" onClick={(e) => { noContract(e) }} {...register('noContract')} />
                                <span>Нет договора</span>
                            </label>

                           
                        </div>



                        <div className="form-block w50">
                            <label className='form-label'>Скан выписки из ЕГРИП (не старше 3 месяцев)*</label>
                            <Dropzone updateData={updateEgrip} />
                            {errorEgrip && <span className="form-error">Данное поле обязательно для заполнения</span>}
                        </div>



                    </div>
                }


                {activity === 'ooo' &&
                    <div className='page-flex'>

                        <div className="form-block w75">
                            <label className='form-label'>Наименование полное*</label>
                            <input className='form-control' type="text" placeholder='ООО «Московская промышленная компания»' {...register('fullName')} />
                        </div>

                        <div className="form-block w25">
                            <label className='form-label'>Сокращение*</label>
                            <input className='form-control' type="text" placeholder='ООО «МПК»' {...register('shortName')} />
                        </div>




                        <div className="form-block w25">
                        <label className='form-label'>Дата регистрации*</label>
                            <input className='form-control' type="text" placeholder='дд.мм.гггг' {...register('dateOfRegistration')} />
                        </div>



                        <div className="form-block w25">
                            <label className='form-label'>ИНН* (366202262165)</label>
                            <input className='form-control' onInput={handleInputChange} type="text" placeholder='хххххххххх' {...register('inn', { required: true })} />
                            {errors.inn && <span className="form-error">Данное поле обязательно для заполнения</span>}
                        </div>

                        <div className="form-block w50">
                            <label className='form-label'>Скан ИНН*</label>
                            <Dropzone updateData={updateInnOOO} />
                            {errorInnOOO && <span className="form-error">Данное поле обязательно для заполнения</span>}
                        </div>



                        <div className="form-block w25">
                            <label className='form-label'>ОГРН*</label>
                            <input className='form-control' type="text" placeholder='хххххххххх' {...register('ogrn')} />
                        </div>


                        <div className="form-block w50">
                            <label className='form-label'>Скан ОГРН*</label>
                            <Dropzone updateData={updateOgrn} />
                            {errorOgrn && <span className="form-error">Данное поле обязательно для заполнения</span>}
                        </div>


                    </div>
                }






                <div className='form-bottom w100'>
                    <div onClick={() => navigate(-1)} className="button-back">
                        <div>Назад</div>
                    </div>
                    <button type="submit" className="button-next" disabled={
                        activity === "" || activity === undefined
                    }>Далее</button>
                </div>



            </form>






        </div>
    )
}

export default Step2